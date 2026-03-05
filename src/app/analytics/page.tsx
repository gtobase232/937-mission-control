'use client';
import { useState, useMemo } from 'react';
import GlassPanel from '@/components/GlassPanel';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedInvoices, seedClients, seedLeads } from '@/lib/seed-data';
import { Invoice, Client, Lead } from '@/lib/types';

export default function AnalyticsPage() {
  const [invoices] = useLocalStorage<Invoice[]>('mc-invoices', seedInvoices);
  const [clients] = useLocalStorage<Client[]>('mc-clients', seedClients);
  const [leads] = useLocalStorage<Lead[]>('mc-leads', seedLeads);
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('quarter');

  const totalRevenue = useMemo(() => invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0), [invoices]);
  const totalPipeline = useMemo(() => leads.reduce((s, l) => s + l.value, 0), [leads]);
  const avgDealSize = useMemo(() => {
    const paid = invoices.filter(i => i.status === 'paid');
    return paid.length ? Math.round(paid.reduce((s, i) => s + i.amount, 0) / paid.length) : 0;
  }, [invoices]);
  const closeRate = useMemo(() => {
    const won = leads.filter(l => l.stage === 'won').length;
    const lost = leads.filter(l => l.stage === 'lost').length;
    const total = won + lost;
    return total ? Math.round((won / total) * 100) : 0;
  }, [leads]);

  const monthlyRevenue = useMemo(() => {
    const data: Record<string, number> = {};
    invoices.filter(i => i.status === 'paid').forEach(inv => {
      const month = inv.date.substring(0, 7);
      data[month] = (data[month] || 0) + inv.amount;
    });
    return [
      { month: 'Jan', value: data['2026-01'] || 0 },
      { month: 'Feb', value: data['2026-02'] || 18000 + 11000 + 8000 },
      { month: 'Mar', value: data['2026-03'] || 4500 },
    ];
  }, [invoices]);

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value), 1);

  const clientRevenue = useMemo(() => {
    const data: Record<string, number> = {};
    invoices.forEach(inv => {
      data[inv.client] = (data[inv.client] || 0) + inv.amount;
    });
    return Object.entries(data).sort(([, a], [, b]) => b - a);
  }, [invoices]);

  const kpis = [
    { label: 'Total Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}K`, color: 'var(--v-green)' },
    { label: 'Pipeline Value', value: `$${(totalPipeline / 1000).toFixed(0)}K`, color: 'var(--v-amber)' },
    { label: 'Avg Deal Size', value: `$${(avgDealSize / 1000).toFixed(1)}K`, color: 'var(--rose)' },
    { label: 'Close Rate', value: `${closeRate}%`, color: 'var(--cherry)' },
    { label: 'Active Clients', value: clients.filter(c => c.status === 'active').length, color: 'var(--v-green)' },
    { label: 'Hot Leads', value: leads.filter(l => l.temperature === 'hot').length, color: 'var(--cherry)' },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-sm font-bold uppercase tracking-wider">Analytics</h1>
        <div className="flex gap-1">
          {(['month', 'quarter', 'year'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase transition-all"
              style={period === p ? {
                background: 'linear-gradient(135deg, rgba(213,56,66,.15), rgba(198,31,37,.1))',
                color: '#fff',
                border: '1px solid rgba(223,101,110,.15)',
              } : {
                color: 'var(--text-3)',
                border: '1px solid transparent',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {kpis.map(kpi => (
          <GlassPanel key={kpi.label} className="p-3" elevated>
            <div className="label text-[8px] mb-1.5">{kpi.label}</div>
            <div className="font-display text-xl font-black" style={{ color: kpi.color }}>{kpi.value}</div>
          </GlassPanel>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <GlassPanel className="p-4">
          <span className="label mb-4 block">Monthly Revenue</span>
          <div className="flex items-end gap-4" style={{ height: 180 }}>
            {monthlyRevenue.map(item => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="font-mono text-[10px] font-bold">${(item.value / 1000).toFixed(0)}K</span>
                <div className="w-full rounded-t-lg transition-all" style={{
                  height: `${(item.value / maxRevenue) * 140}px`,
                  background: 'linear-gradient(180deg, var(--cherry), var(--maroon))',
                  boxShadow: '0 0 12px rgba(210,32,40,.3)',
                }} />
                <span className="label text-[8px]">{item.month}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-4">
          <span className="label mb-4 block">Revenue by Client</span>
          <div className="space-y-2">
            {clientRevenue.map(([client, amount]) => {
              const maxClient = clientRevenue[0]?.[1] || 1;
              return (
                <div key={client}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold">{client}</span>
                    <span className="font-mono text-[10px] font-bold">${amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'rgba(124,15,17,.08)' }}>
                    <div className="h-full rounded-full transition-all" style={{
                      width: `${(amount / maxClient) * 100}%`,
                      background: 'linear-gradient(90deg, var(--cherry), var(--rose))',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
