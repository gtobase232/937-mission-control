'use client';
import { useState } from 'react';
import MissionBanner from '@/components/MissionBanner';
import Modal from '@/components/Modal';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedClients } from '@/lib/seed-data';
import { Client } from '@/lib/types';

const statusColors: Record<Client['status'], string> = {
  active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
  review: 'bg-amber-500/20 text-amber-400 border-amber-500/20',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
  paused: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/20',
};

const emptyClient = (): Client => ({
  id: Date.now().toString(),
  name: '',
  industry: '',
  service: '',
  dealValue: 0,
  status: 'active',
  contact: '',
  email: '',
});

export default function ClientsPage() {
  const [clients, setClients] = useLocalStorage<Client[]>('bs-clients', seedClients);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [filter, setFilter] = useState<Client['status'] | 'all'>('all');

  const filtered = filter === 'all' ? clients : clients.filter(c => c.status === filter);
  const totalValue = clients.reduce((s, c) => s + c.dealValue, 0);
  const activeCount = clients.filter(c => c.status === 'active').length;

  const openCreate = () => { setEditingClient(emptyClient()); setModalOpen(true); };
  const openEdit = (c: Client) => { setEditingClient({ ...c }); setModalOpen(true); };

  const save = () => {
    if (!editingClient || !editingClient.name) return;
    setClients(prev => {
      const exists = prev.find(c => c.id === editingClient.id);
      return exists ? prev.map(c => c.id === editingClient.id ? editingClient : c) : [...prev, editingClient];
    });
    setModalOpen(false);
    setEditingClient(null);
  };

  const remove = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
    setModalOpen(false);
    setEditingClient(null);
  };

  return (
    <div>
      <MissionBanner />
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <button onClick={openCreate} className="glass-btn">+ New Client</button>
      </div>

      {/* Stats */}
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="glass p-4">
          <p className="label text-[10px]">Total Pipeline</p>
          <p className="mt-1 text-xl font-bold font-mono" style={{ color: 'var(--v-green)' }}>${totalValue.toLocaleString()}</p>
        </div>
        <div className="glass p-4">
          <p className="label text-[10px]">Active Clients</p>
          <p className="mt-1 text-xl font-bold font-mono">{activeCount}</p>
        </div>
        <div className="glass p-4">
          <p className="label text-[10px]">Total Clients</p>
          <p className="mt-1 text-xl font-bold font-mono">{clients.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        {(['all', 'active', 'review', 'completed', 'paused'] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
            style={filter === s
              ? { background: 'linear-gradient(135deg, rgba(213,56,66,.15), rgba(198,31,37,.1))', color: '#fff', border: '1px solid rgba(223,101,110,.15)' }
              : { color: 'var(--text-3)', border: '1px solid transparent' }
            }
          >
            {s}
          </button>
        ))}
      </div>

      {/* Client grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(client => (
          <div
            key={client.id}
            onClick={() => openEdit(client)}
            className="glass glass-elevated p-4 cursor-pointer transition-all hover:scale-[1.01]"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm">{client.name}</h3>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-3)' }}>{client.industry}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${statusColors[client.status]}`}>
                {client.status}
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--text-3)' }}>Service</span>
                <span style={{ color: 'var(--text-2)' }}>{client.service}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--text-3)' }}>Deal Value</span>
                <span className="font-mono font-bold" style={{ color: 'var(--v-green)' }}>${client.dealValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--text-3)' }}>Contact</span>
                <span style={{ color: 'var(--text-2)' }}>{client.contact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingClient(null); }} title={editingClient && clients.find(c => c.id === editingClient.id) ? 'Edit Client' : 'New Client'}>
        {editingClient && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Company Name</label>
              <input value={editingClient.name} onChange={e => setEditingClient({ ...editingClient, name: e.target.value })} className="glass-input" placeholder="Acme Protocol" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Industry</label>
                <input value={editingClient.industry} onChange={e => setEditingClient({ ...editingClient, industry: e.target.value })} className="glass-input" placeholder="DeFi · Series A" />
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Service</label>
                <input value={editingClient.service} onChange={e => setEditingClient({ ...editingClient, service: e.target.value })} className="glass-input" placeholder="Brand Identity" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Deal Value ($)</label>
                <input type="number" value={editingClient.dealValue} onChange={e => setEditingClient({ ...editingClient, dealValue: Number(e.target.value) })} className="glass-input" />
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Status</label>
                <select value={editingClient.status} onChange={e => setEditingClient({ ...editingClient, status: e.target.value as Client['status'] })} className="glass-select">
                  <option value="active">Active</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Contact Name</label>
                <input value={editingClient.contact} onChange={e => setEditingClient({ ...editingClient, contact: e.target.value })} className="glass-input" />
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Email</label>
                <input value={editingClient.email} onChange={e => setEditingClient({ ...editingClient, email: e.target.value })} className="glass-input" type="email" />
              </div>
            </div>
            <div className="flex justify-between pt-2">
              {clients.find(c => c.id === editingClient.id) && (
                <button onClick={() => remove(editingClient.id)} className="rounded-lg px-4 py-2 text-sm transition-colors hover:bg-white/5" style={{ color: 'var(--cherry)' }}>Delete</button>
              )}
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setModalOpen(false); setEditingClient(null); }} className="glass-btn">Cancel</button>
                <button onClick={save} className="glass-btn" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.2), rgba(198,31,37,.15))', color: '#fff' }}>Save</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
