'use client';
import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedTasks, seedClients, seedLeads, seedCalendarEvents, seedContentPosts, seedInvoices } from '@/lib/seed-data';
import { Task, Client, Lead, CalendarEvent, ContentPost, Invoice } from '@/lib/types';
import GlassPanel from '@/components/GlassPanel';

export default function Dashboard() {
  const [tasks] = useLocalStorage<Task[]>('mc-tasks', seedTasks);
  const [clients] = useLocalStorage<Client[]>('mc-clients', seedClients);
  const [leads] = useLocalStorage<Lead[]>('mc-leads', seedLeads);
  const [events] = useLocalStorage<CalendarEvent[]>('mc-calendar', seedCalendarEvents);
  const [content] = useLocalStorage<ContentPost[]>('mc-content', seedContentPosts);
  const [invoices] = useLocalStorage<Invoice[]>('mc-invoices', seedInvoices);

  const activeTasks = tasks.filter(t => t.status !== 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const hotLeads = leads.filter(l => l.temperature === 'hot').length;
  const upcomingEvents = events.filter(e => e.date >= '2026-03-05').slice(0, 5);
  const scheduledContent = content.filter(c => c.status === 'scheduled').length;
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const pendingRevenue = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
  const pipelineValue = leads.reduce((s, l) => s + l.value, 0);

  const cards = [
    { label: 'Active Tasks', value: activeTasks, sub: `${inProgress} in progress`, href: '/tasks', icon: '9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
    { label: 'Clients', value: activeClients, sub: `${clients.length} total`, href: '/clients', icon: '17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8' },
    { label: 'Hot Leads', value: hotLeads, sub: `$${(pipelineValue / 1000).toFixed(0)}K pipeline`, href: '/leads', icon: '12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0' },
    { label: 'Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}K`, sub: `$${(pendingRevenue / 1000).toFixed(0)}K pending`, href: '/finance', icon: '12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
    { label: 'Scheduled Content', value: scheduledContent, sub: `${content.length} total posts`, href: '/content-calendar', icon: '21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
    { label: 'Upcoming Events', value: upcomingEvents.length, sub: 'this month', href: '/calendar', icon: '3 4h18v18H3zM16 2v4M8 2v4M3 10h18' },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-sm font-bold uppercase tracking-wider">Mission Control</h1>
        <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>March 2026</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {cards.map(card => (
          <Link key={card.label} href={card.href}>
            <GlassPanel className="p-4 cursor-pointer transition-all hover:scale-[1.02]">
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.15), rgba(124,15,17,.1))', border: '1px solid rgba(223,101,110,.12)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cherry)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={`M${card.icon}`} />
                  </svg>
                </div>
                <span className="label text-[9px]">{card.label}</span>
              </div>
              <div className="font-display text-2xl font-black">{card.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{card.sub}</div>
            </GlassPanel>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="label">Upcoming Deadlines</span>
            <Link href="/calendar" className="glass-btn text-[10px]">View Calendar</Link>
          </div>
          <div className="space-y-2">
            {upcomingEvents.map(ev => (
              <div key={ev.id} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: 'rgba(124,15,17,.06)', border: '1px solid rgba(223,101,110,.06)' }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: ev.type === 'deadline' ? 'var(--cherry)' : ev.type === 'meeting' ? 'var(--v-green)' : ev.type === 'milestone' ? 'var(--v-amber)' : 'var(--text-3)' }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{ev.title}</div>
                  <div className="text-[10px] font-mono" style={{ color: 'var(--text-3)' }}>{ev.date} {ev.time !== 'All Day' ? `· ${ev.time}` : ''}</div>
                </div>
                <span className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded" style={{ background: 'rgba(213,56,66,.1)', color: 'var(--rose)' }}>{ev.type}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="label">Active Tasks</span>
            <Link href="/tasks" className="glass-btn text-[10px]">View Board</Link>
          </div>
          <div className="space-y-2">
            {tasks.filter(t => t.status === 'in-progress' || t.status === 'todo').slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: 'rgba(124,15,17,.06)', border: '1px solid rgba(223,101,110,.06)' }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: task.priority === 'critical' ? 'var(--cherry)' : task.priority === 'high' ? 'var(--v-amber)' : 'var(--v-green)', boxShadow: task.priority === 'critical' ? '0 0 6px rgba(210,32,40,.5)' : 'none' }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{task.title}</div>
                  <div className="text-[10px]" style={{ color: 'var(--text-3)' }}>{task.assignee} · {task.status}</div>
                </div>
                <span className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded" style={{ background: task.priority === 'critical' ? 'rgba(210,32,40,.15)' : 'rgba(124,15,17,.08)', color: task.priority === 'critical' ? 'var(--cherry)' : 'var(--text-3)' }}>{task.priority}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
