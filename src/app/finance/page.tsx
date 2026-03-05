'use client';
import { useState, useMemo } from 'react';
import Modal from '@/components/Modal';
import GlassPanel from '@/components/GlassPanel';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedInvoices } from '@/lib/seed-data';
import { Invoice } from '@/lib/types';

const statusBadge: Record<Invoice['status'], { bg: string; color: string }> = {
  paid: { bg: 'rgba(62,207,142,.12)', color: 'var(--v-green)' },
  pending: { bg: 'rgba(245,166,35,.12)', color: 'var(--v-amber)' },
  overdue: { bg: 'rgba(210,32,40,.12)', color: 'var(--cherry)' },
};

const emptyInvoice = (): Invoice => ({
  id: Date.now().toString(),
  invoiceNumber: `INV-${String(Date.now()).slice(-3)}`,
  client: '',
  amount: 0,
  status: 'pending',
  date: new Date().toISOString().split('T')[0],
  dueDate: '',
  description: '',
});

export default function FinancePage() {
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('mc-invoices', seedInvoices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const totalPaid = useMemo(() => invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0), [invoices]);
  const totalPending = useMemo(() => invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0), [invoices]);
  const totalOverdue = useMemo(() => invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0), [invoices]);

  const openCreate = () => {
    setEditingInvoice(emptyInvoice());
    setModalOpen(true);
  };

  const openEdit = (inv: Invoice) => {
    setEditingInvoice({ ...inv });
    setModalOpen(true);
  };

  const saveInvoice = () => {
    if (!editingInvoice || !editingInvoice.client.trim()) return;
    setInvoices(prev => {
      const exists = prev.find(i => i.id === editingInvoice.id);
      if (exists) return prev.map(i => i.id === editingInvoice.id ? editingInvoice : i);
      return [...prev, editingInvoice];
    });
    setModalOpen(false);
    setEditingInvoice(null);
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
    setModalOpen(false);
    setEditingInvoice(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-sm font-bold uppercase tracking-wider">Finance</h1>
        <button onClick={openCreate} className="glass-btn">+ Invoice</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <GlassPanel className="p-4" elevated>
          <div className="label text-[9px] mb-2">Collected</div>
          <div className="font-display text-2xl font-black" style={{ color: 'var(--v-green)' }}>${totalPaid.toLocaleString()}</div>
          <div className="text-[10px] mt-1" style={{ color: 'var(--text-3)' }}>{invoices.filter(i => i.status === 'paid').length} invoices paid</div>
        </GlassPanel>
        <GlassPanel className="p-4" elevated>
          <div className="label text-[9px] mb-2">Pending</div>
          <div className="font-display text-2xl font-black" style={{ color: 'var(--v-amber)' }}>${totalPending.toLocaleString()}</div>
          <div className="text-[10px] mt-1" style={{ color: 'var(--text-3)' }}>{invoices.filter(i => i.status === 'pending').length} invoices pending</div>
        </GlassPanel>
        <GlassPanel className="p-4" elevated>
          <div className="label text-[9px] mb-2">Overdue</div>
          <div className="font-display text-2xl font-black" style={{ color: 'var(--cherry)' }}>${totalOverdue.toLocaleString()}</div>
          <div className="text-[10px] mt-1" style={{ color: 'var(--text-3)' }}>{invoices.filter(i => i.status === 'overdue').length} invoices overdue</div>
        </GlassPanel>
      </div>

      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(223,101,110,.1)' }}>
                <th className="px-4 py-3 text-left label text-[9px]">Invoice</th>
                <th className="px-4 py-3 text-left label text-[9px]">Client</th>
                <th className="px-4 py-3 text-left label text-[9px]">Description</th>
                <th className="px-4 py-3 text-right label text-[9px]">Amount</th>
                <th className="px-4 py-3 text-left label text-[9px]">Date</th>
                <th className="px-4 py-3 text-left label text-[9px]">Due</th>
                <th className="px-4 py-3 text-center label text-[9px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr
                  key={inv.id}
                  onClick={() => openEdit(inv)}
                  className="cursor-pointer transition-colors hover:bg-white/[.02]"
                  style={{ borderBottom: '1px solid rgba(223,101,110,.06)' }}
                >
                  <td className="px-4 py-2.5 font-mono text-xs font-bold">{inv.invoiceNumber}</td>
                  <td className="px-4 py-2.5 text-xs font-semibold">{inv.client}</td>
                  <td className="px-4 py-2.5 text-xs" style={{ color: 'var(--text-2)' }}>{inv.description}</td>
                  <td className="px-4 py-2.5 text-xs font-mono font-bold text-right">${inv.amount.toLocaleString()}</td>
                  <td className="px-4 py-2.5 font-mono text-[10px]" style={{ color: 'var(--text-3)' }}>{inv.date}</td>
                  <td className="px-4 py-2.5 font-mono text-[10px]" style={{ color: 'var(--text-3)' }}>{inv.dueDate}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className="text-[9px] font-bold uppercase px-2 py-1 rounded" style={{ background: statusBadge[inv.status].bg, color: statusBadge[inv.status].color }}>{inv.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingInvoice(null); }} title={editingInvoice && invoices.find(i => i.id === editingInvoice.id) ? 'Edit Invoice' : 'New Invoice'}>
        {editingInvoice && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label text-[9px] mb-1">Invoice #</label>
                <input value={editingInvoice.invoiceNumber} onChange={e => setEditingInvoice({ ...editingInvoice, invoiceNumber: e.target.value })} className="glass-input" />
              </div>
              <div>
                <label className="label text-[9px] mb-1">Client</label>
                <input value={editingInvoice.client} onChange={e => setEditingInvoice({ ...editingInvoice, client: e.target.value })} className="glass-input" placeholder="Client name..." />
              </div>
            </div>
            <div>
              <label className="label text-[9px] mb-1">Description</label>
              <input value={editingInvoice.description} onChange={e => setEditingInvoice({ ...editingInvoice, description: e.target.value })} className="glass-input" placeholder="Description..." />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="label text-[9px] mb-1">Amount ($)</label>
                <input type="number" value={editingInvoice.amount} onChange={e => setEditingInvoice({ ...editingInvoice, amount: Number(e.target.value) })} className="glass-input" />
              </div>
              <div>
                <label className="label text-[9px] mb-1">Date</label>
                <input type="date" value={editingInvoice.date} onChange={e => setEditingInvoice({ ...editingInvoice, date: e.target.value })} className="glass-input" />
              </div>
              <div>
                <label className="label text-[9px] mb-1">Due Date</label>
                <input type="date" value={editingInvoice.dueDate} onChange={e => setEditingInvoice({ ...editingInvoice, dueDate: e.target.value })} className="glass-input" />
              </div>
            </div>
            <div>
              <label className="label text-[9px] mb-1">Status</label>
              <select value={editingInvoice.status} onChange={e => setEditingInvoice({ ...editingInvoice, status: e.target.value as Invoice['status'] })} className="glass-select">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div className="flex justify-between pt-2">
              {invoices.find(i => i.id === editingInvoice.id) && (
                <button onClick={() => deleteInvoice(editingInvoice.id)} className="text-xs" style={{ color: 'var(--cherry)' }}>Delete</button>
              )}
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setModalOpen(false); setEditingInvoice(null); }} className="glass-btn">Cancel</button>
                <button onClick={saveInvoice} className="glass-btn" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.2), rgba(198,31,37,.15))', color: '#fff' }}>Save</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
