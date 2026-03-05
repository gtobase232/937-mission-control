'use client';
import { useState, useMemo } from 'react';
import MissionBanner from '@/components/MissionBanner';
import Modal from '@/components/Modal';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedLeads } from '@/lib/seed-data';
import { Lead, LeadStage, LeadTemperature } from '@/lib/types';

const stages: LeadStage[] = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

const stageColors: Record<LeadStage, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-cyan-500/20 text-cyan-400',
  qualified: 'bg-amber-500/20 text-amber-400',
  proposal: 'bg-purple-500/20 text-purple-400',
  negotiation: 'bg-orange-500/20 text-orange-400',
  won: 'bg-emerald-500/20 text-emerald-400',
  lost: 'bg-neutral-500/20 text-neutral-400',
};

const tempColors: Record<LeadTemperature, { bg: string; dot: string; label: string }> = {
  hot: { bg: 'bg-red-500/15', dot: '#ef4444', label: '🔥 Hot' },
  warm: { bg: 'bg-amber-500/15', dot: '#f59e0b', label: '🌤 Warm' },
  cold: { bg: 'bg-blue-500/15', dot: '#3b82f6', label: '❄️ Cold' },
};

const emptyLead = (): Lead => ({
  id: Date.now().toString(),
  company: '',
  contact: '',
  source: '',
  value: 0,
  stage: 'new',
  temperature: 'warm',
  notes: '',
  lastContact: new Date().toISOString().split('T')[0],
});

export default function LeadsPage() {
  const [leads, setLeads] = useLocalStorage<Lead[]>('bs-leads', seedLeads);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [view, setView] = useState<'pipeline' | 'table'>('pipeline');

  const pipelineValue = useMemo(() => leads.filter(l => l.stage !== 'lost').reduce((s, l) => s + l.value, 0), [leads]);
  const hotLeads = leads.filter(l => l.temperature === 'hot').length;

  const openCreate = () => { setEditingLead(emptyLead()); setModalOpen(true); };
  const openEdit = (l: Lead) => { setEditingLead({ ...l }); setModalOpen(true); };

  const save = () => {
    if (!editingLead || !editingLead.company) return;
    setLeads(prev => {
      const exists = prev.find(l => l.id === editingLead.id);
      return exists ? prev.map(l => l.id === editingLead.id ? editingLead : l) : [...prev, editingLead];
    });
    setModalOpen(false);
    setEditingLead(null);
  };

  const remove = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    setModalOpen(false);
    setEditingLead(null);
  };

  return (
    <div>
      <MissionBanner />
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Lead Pipeline</h1>
        <div className="flex gap-2">
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(223,101,110,.12)' }}>
            <button onClick={() => setView('pipeline')} className="px-3 py-1.5 text-xs font-semibold transition-all" style={view === 'pipeline' ? { background: 'rgba(213,56,66,.15)', color: '#fff' } : { color: 'var(--text-3)' }}>Pipeline</button>
            <button onClick={() => setView('table')} className="px-3 py-1.5 text-xs font-semibold transition-all" style={view === 'table' ? { background: 'rgba(213,56,66,.15)', color: '#fff' } : { color: 'var(--text-3)' }}>Table</button>
          </div>
          <button onClick={openCreate} className="glass-btn">+ New Lead</button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="glass p-4">
          <p className="label text-[10px]">Pipeline Value</p>
          <p className="mt-1 text-xl font-bold font-mono" style={{ color: 'var(--v-green)' }}>${pipelineValue.toLocaleString()}</p>
        </div>
        <div className="glass p-4">
          <p className="label text-[10px]">Hot Leads</p>
          <p className="mt-1 text-xl font-bold font-mono" style={{ color: 'var(--cherry)' }}>{hotLeads}</p>
        </div>
        <div className="glass p-4">
          <p className="label text-[10px]">Total Leads</p>
          <p className="mt-1 text-xl font-bold font-mono">{leads.length}</p>
        </div>
      </div>

      {view === 'pipeline' ? (
        /* Pipeline view */
        <div className="flex gap-3 overflow-x-auto pb-2">
          {stages.filter(s => s !== 'won' && s !== 'lost').map(stage => {
            const stageLeads = leads.filter(l => l.stage === stage);
            return (
              <div key={stage} className="min-w-[220px] flex-1">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${stageColors[stage]}`}>{stage.replace('-', ' ')}</span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{stageLeads.length}</span>
                </div>
                <div className="space-y-2">
                  {stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => openEdit(lead)}
                      className="glass p-3 cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-xs font-semibold">{lead.company}</h4>
                        <span className="text-[10px]">{tempColors[lead.temperature].label}</span>
                      </div>
                      <p className="text-[11px] mb-2" style={{ color: 'var(--text-3)' }}>{lead.contact}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold" style={{ color: 'var(--v-green)' }}>${lead.value.toLocaleString()}</span>
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{lead.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table view */
        <div className="glass overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(223,101,110,.1)' }}>
                  {['Company', 'Contact', 'Stage', 'Temp', 'Value', 'Source', 'Last Contact'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-display text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr
                    key={lead.id}
                    onClick={() => openEdit(lead)}
                    className="cursor-pointer transition-colors hover:bg-white/[.02]"
                    style={{ borderBottom: '1px solid rgba(223,101,110,.05)' }}
                  >
                    <td className="px-4 py-3 font-semibold">{lead.company}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{lead.contact}</td>
                    <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${stageColors[lead.stage]}`}>{lead.stage}</span></td>
                    <td className="px-4 py-3">{tempColors[lead.temperature].label}</td>
                    <td className="px-4 py-3 font-mono font-bold" style={{ color: 'var(--v-green)' }}>${lead.value.toLocaleString()}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-3)' }}>{lead.source}</td>
                    <td className="px-4 py-3 font-mono" style={{ color: 'var(--text-muted)' }}>{lead.lastContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingLead(null); }} title={editingLead && leads.find(l => l.id === editingLead.id) ? 'Edit Lead' : 'New Lead'}>
        {editingLead && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Company</label>
                <input value={editingLead.company} onChange={e => setEditingLead({ ...editingLead, company: e.target.value })} className="glass-input" />
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Contact</label>
                <input value={editingLead.contact} onChange={e => setEditingLead({ ...editingLead, contact: e.target.value })} className="glass-input" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Stage</label>
                <select value={editingLead.stage} onChange={e => setEditingLead({ ...editingLead, stage: e.target.value as LeadStage })} className="glass-select">
                  {stages.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Temperature</label>
                <select value={editingLead.temperature} onChange={e => setEditingLead({ ...editingLead, temperature: e.target.value as LeadTemperature })} className="glass-select">
                  <option value="hot">🔥 Hot</option>
                  <option value="warm">🌤 Warm</option>
                  <option value="cold">❄️ Cold</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Value ($)</label>
                <input type="number" value={editingLead.value} onChange={e => setEditingLead({ ...editingLead, value: Number(e.target.value) })} className="glass-input" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Source</label>
                <input value={editingLead.source} onChange={e => setEditingLead({ ...editingLead, source: e.target.value })} className="glass-input" />
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Last Contact</label>
                <input type="date" value={editingLead.lastContact} onChange={e => setEditingLead({ ...editingLead, lastContact: e.target.value })} className="glass-input" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Notes</label>
              <textarea value={editingLead.notes} onChange={e => setEditingLead({ ...editingLead, notes: e.target.value })} className="glass-textarea" />
            </div>
            <div className="flex justify-between pt-2">
              {leads.find(l => l.id === editingLead.id) && (
                <button onClick={() => remove(editingLead.id)} className="rounded-lg px-4 py-2 text-sm transition-colors hover:bg-white/5" style={{ color: 'var(--cherry)' }}>Delete</button>
              )}
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setModalOpen(false); setEditingLead(null); }} className="glass-btn">Cancel</button>
                <button onClick={save} className="glass-btn" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.2), rgba(198,31,37,.15))', color: '#fff' }}>Save</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
