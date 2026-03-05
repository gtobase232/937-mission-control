'use client';
import { useState } from 'react';
import Modal from '@/components/Modal';
import GlassPanel from '@/components/GlassPanel';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedDocs } from '@/lib/seed-data';
import { Doc, DocCategory } from '@/lib/types';

const categories: { key: DocCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'proposals', label: 'Proposals' },
  { key: 'contracts', label: 'Contracts' },
  { key: 'brand-guidelines', label: 'Brand Guidelines' },
  { key: 'invoices', label: 'Invoices' },
  { key: 'internal', label: 'Internal' },
];

const categoryIcon: Record<DocCategory, string> = {
  proposals: '📄',
  contracts: '📝',
  'brand-guidelines': '🎨',
  invoices: '💰',
  internal: '🔒',
};

const emptyDoc = (): Doc => ({
  id: Date.now().toString(),
  title: '',
  category: 'internal',
  date: new Date().toISOString().split('T')[0],
  size: '0 KB',
  description: '',
});

export default function DocsPage() {
  const [docs, setDocs] = useLocalStorage<Doc[]>('mc-docs', seedDocs);
  const [filter, setFilter] = useState<DocCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Doc | null>(null);
  const [viewingDoc, setViewingDoc] = useState<Doc | null>(null);

  const filtered = docs
    .filter(d => filter === 'all' || d.category === filter)
    .filter(d => !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => {
    setEditingDoc(emptyDoc());
    setModalOpen(true);
  };

  const saveDoc = () => {
    if (!editingDoc || !editingDoc.title.trim()) return;
    setDocs(prev => {
      const exists = prev.find(d => d.id === editingDoc.id);
      if (exists) return prev.map(d => d.id === editingDoc.id ? editingDoc : d);
      return [...prev, editingDoc];
    });
    setModalOpen(false);
    setEditingDoc(null);
  };

  const deleteDoc = (id: string) => {
    setDocs(prev => prev.filter(d => d.id !== id));
    setModalOpen(false);
    setEditingDoc(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-sm font-bold uppercase tracking-wider">Documents</h1>
        <button onClick={openCreate} className="glass-btn">+ Doc</button>
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex gap-1 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
              style={filter === cat.key ? {
                background: 'linear-gradient(135deg, rgba(213,56,66,.15), rgba(198,31,37,.1))',
                color: '#fff',
                border: '1px solid rgba(223,101,110,.15)',
              } : {
                color: 'var(--text-3)',
                border: '1px solid transparent',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="glass-input max-w-xs text-xs"
          placeholder="Search documents..."
        />
      </div>

      <div className="space-y-2">
        {filtered.map(doc => (
          <GlassPanel key={doc.id} className="p-3 cursor-pointer transition-all hover:scale-[1.005]">
            <div onClick={() => setViewingDoc(doc)} className="flex items-center gap-3">
              <span className="text-lg shrink-0">{categoryIcon[doc.category]}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold truncate">{doc.title}</h3>
                <p className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--text-3)' }}>{doc.description}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded" style={{ background: 'rgba(124,15,17,.08)', color: 'var(--text-3)' }}>{doc.category}</div>
                <div className="font-mono text-[9px] mt-1" style={{ color: 'var(--text-muted)' }}>{doc.size} · {doc.date}</div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>

      <Modal isOpen={!!viewingDoc} onClose={() => setViewingDoc(null)} title="Document Details">
        {viewingDoc && (
          <div className="space-y-3">
            <div className="text-center py-4">
              <span className="text-4xl">{categoryIcon[viewingDoc.category]}</span>
              <h3 className="text-sm font-bold mt-2">{viewingDoc.title}</h3>
              <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{viewingDoc.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="glass p-2 text-center">
                <div className="label text-[8px] mb-1">Category</div>
                <div className="text-[11px] font-semibold">{viewingDoc.category}</div>
              </div>
              <div className="glass p-2 text-center">
                <div className="label text-[8px] mb-1">Size</div>
                <div className="text-[11px] font-mono font-semibold">{viewingDoc.size}</div>
              </div>
              <div className="glass p-2 text-center">
                <div className="label text-[8px] mb-1">Date</div>
                <div className="text-[11px] font-mono font-semibold">{viewingDoc.date}</div>
              </div>
            </div>
            <button onClick={() => { setViewingDoc(null); setEditingDoc({ ...viewingDoc }); setModalOpen(true); }} className="glass-btn w-full justify-center">Edit Document</button>
          </div>
        )}
      </Modal>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingDoc(null); }} title={editingDoc && docs.find(d => d.id === editingDoc.id) ? 'Edit Document' : 'New Document'}>
        {editingDoc && (
          <div className="space-y-3">
            <div>
              <label className="label text-[9px] mb-1">Title</label>
              <input value={editingDoc.title} onChange={e => setEditingDoc({ ...editingDoc, title: e.target.value })} className="glass-input" placeholder="Document title..." />
            </div>
            <div>
              <label className="label text-[9px] mb-1">Description</label>
              <textarea value={editingDoc.description} onChange={e => setEditingDoc({ ...editingDoc, description: e.target.value })} className="glass-textarea" placeholder="Description..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label text-[9px] mb-1">Category</label>
                <select value={editingDoc.category} onChange={e => setEditingDoc({ ...editingDoc, category: e.target.value as DocCategory })} className="glass-select">
                  {categories.filter(c => c.key !== 'all').map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="label text-[9px] mb-1">Size</label>
                <input value={editingDoc.size} onChange={e => setEditingDoc({ ...editingDoc, size: e.target.value })} className="glass-input" placeholder="e.g. 2.4 MB" />
              </div>
            </div>
            <div className="flex justify-between pt-2">
              {docs.find(d => d.id === editingDoc.id) && (
                <button onClick={() => deleteDoc(editingDoc.id)} className="text-xs" style={{ color: 'var(--cherry)' }}>Delete</button>
              )}
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setModalOpen(false); setEditingDoc(null); }} className="glass-btn">Cancel</button>
                <button onClick={saveDoc} className="glass-btn" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.2), rgba(198,31,37,.15))', color: '#fff' }}>Save</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
