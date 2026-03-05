'use client';
import { useState } from 'react';
import Modal from '@/components/Modal';
import GlassPanel from '@/components/GlassPanel';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedTeam } from '@/lib/seed-data';
import { TeamMember } from '@/lib/types';

const statusColor: Record<TeamMember['status'], string> = {
  online: 'var(--v-green)',
  away: 'var(--v-amber)',
  busy: 'var(--cherry)',
  offline: 'var(--text-muted)',
};

const emptyMember = (): TeamMember => ({
  id: Date.now().toString(),
  name: '',
  role: '',
  status: 'online',
  currentTask: '',
  avatar: '👤',
});

export default function TeamPage() {
  const [team, setTeam] = useLocalStorage<TeamMember[]>('mc-team', seedTeam);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const openCreate = () => {
    setEditingMember(emptyMember());
    setModalOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditingMember({ ...member });
    setModalOpen(true);
  };

  const saveMember = () => {
    if (!editingMember || !editingMember.name.trim()) return;
    setTeam(prev => {
      const exists = prev.find(m => m.id === editingMember.id);
      if (exists) return prev.map(m => m.id === editingMember.id ? editingMember : m);
      return [...prev, editingMember];
    });
    setModalOpen(false);
    setEditingMember(null);
  };

  const deleteMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    setModalOpen(false);
    setEditingMember(null);
  };

  const toggleStatus = (id: string) => {
    const order: TeamMember['status'][] = ['online', 'away', 'busy', 'offline'];
    setTeam(prev => prev.map(m => {
      if (m.id !== id) return m;
      const idx = order.indexOf(m.status);
      return { ...m, status: order[(idx + 1) % order.length] };
    }));
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-sm font-bold uppercase tracking-wider">Team</h1>
        <button onClick={openCreate} className="glass-btn">+ Member</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {team.map(member => (
          <GlassPanel key={member.id} className="p-4 cursor-pointer transition-all hover:scale-[1.01]" elevated>
            <div onClick={() => openEdit(member)}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.12), rgba(124,15,17,.08))', border: '1px solid rgba(223,101,110,.1)' }}>
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold">{member.name}</h3>
                  <p className="text-[10px] font-semibold" style={{ color: 'var(--text-3)' }}>{member.role}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <button
                      onClick={e => { e.stopPropagation(); toggleStatus(member.id); }}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: statusColor[member.status], boxShadow: member.status === 'online' ? '0 0 6px rgba(62,207,142,.4)' : 'none' }} />
                      <span className="text-[9px] font-semibold uppercase" style={{ color: statusColor[member.status] }}>{member.status}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-3 py-2 rounded-lg" style={{ background: 'rgba(124,15,17,.06)', border: '1px solid rgba(223,101,110,.06)' }}>
                <div className="label text-[8px] mb-0.5">Current Task</div>
                <div className="text-[11px] font-semibold truncate">{member.currentTask || 'No task assigned'}</div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingMember(null); }} title={editingMember && team.find(m => m.id === editingMember.id) ? 'Edit Member' : 'New Member'}>
        {editingMember && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label text-[9px] mb-1">Name</label>
                <input value={editingMember.name} onChange={e => setEditingMember({ ...editingMember, name: e.target.value })} className="glass-input" placeholder="Name..." />
              </div>
              <div>
                <label className="label text-[9px] mb-1">Avatar Emoji</label>
                <input value={editingMember.avatar} onChange={e => setEditingMember({ ...editingMember, avatar: e.target.value })} className="glass-input" placeholder="e.g. 🎨" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label text-[9px] mb-1">Role</label>
                <input value={editingMember.role} onChange={e => setEditingMember({ ...editingMember, role: e.target.value })} className="glass-input" placeholder="Role..." />
              </div>
              <div>
                <label className="label text-[9px] mb-1">Status</label>
                <select value={editingMember.status} onChange={e => setEditingMember({ ...editingMember, status: e.target.value as TeamMember['status'] })} className="glass-select">
                  <option value="online">Online</option>
                  <option value="away">Away</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label text-[9px] mb-1">Current Task</label>
              <input value={editingMember.currentTask} onChange={e => setEditingMember({ ...editingMember, currentTask: e.target.value })} className="glass-input" placeholder="What are they working on..." />
            </div>
            <div className="flex justify-between pt-2">
              {team.find(m => m.id === editingMember.id) && (
                <button onClick={() => deleteMember(editingMember.id)} className="text-xs" style={{ color: 'var(--cherry)' }}>Delete</button>
              )}
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setModalOpen(false); setEditingMember(null); }} className="glass-btn">Cancel</button>
                <button onClick={saveMember} className="glass-btn" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.2), rgba(198,31,37,.15))', color: '#fff' }}>Save</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
