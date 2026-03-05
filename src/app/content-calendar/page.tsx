'use client';
import { useState, useMemo } from 'react';
import Modal from '@/components/Modal';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedContentPosts } from '@/lib/seed-data';
import { ContentPost, ContentPlatform } from '@/lib/types';

const platformIcon: Record<ContentPlatform, string> = {
  x: '𝕏',
  instagram: '📷',
  email: '✉️',
  blog: '📝',
};

const statusLabel: Record<ContentPost['status'], { bg: string; color: string }> = {
  draft: { bg: 'rgba(122,85,85,.15)', color: 'var(--text-3)' },
  scheduled: { bg: 'rgba(245,166,35,.12)', color: 'var(--v-amber)' },
  published: { bg: 'rgba(62,207,142,.12)', color: 'var(--v-green)' },
};

const emptyPost = (): ContentPost => ({
  id: Date.now().toString(),
  title: '',
  content: '',
  scheduledDate: new Date().toISOString().split('T')[0],
  scheduledTime: '10:00',
  status: 'draft',
  platform: 'x',
});

export default function ContentCalendarPage() {
  const [posts, setPosts] = useLocalStorage<ContentPost[]>('mc-content', seedContentPosts);
  const [currentMonth, setCurrentMonth] = useState(() => new Date(2026, 2, 1));
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<ContentPost | null>(null);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);
    return days;
  }, [currentMonth]);

  const monthStr = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getPostsForDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return posts.filter(p => p.scheduledDate === dateStr);
  };

  const openCreate = () => {
    setEditingPost(emptyPost());
    setModalOpen(true);
  };

  const openEdit = (post: ContentPost) => {
    setEditingPost({ ...post });
    setModalOpen(true);
  };

  const savePost = () => {
    if (!editingPost || !editingPost.title.trim()) return;
    setPosts(prev => {
      const exists = prev.find(p => p.id === editingPost.id);
      if (exists) return prev.map(p => p.id === editingPost.id ? editingPost : p);
      return [...prev, editingPost];
    });
    setModalOpen(false);
    setEditingPost(null);
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    setModalOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-sm font-bold uppercase tracking-wider">Content Calendar</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="glass-btn">←</button>
          <span className="font-display text-xs font-bold uppercase tracking-wider px-3">{monthStr}</span>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="glass-btn">→</button>
          <button onClick={openCreate} className="glass-btn ml-2">+ Content</button>
        </div>
      </div>

      <div className="glass overflow-hidden">
        <div className="grid grid-cols-7" style={{ borderBottom: '1px solid rgba(223,101,110,.1)' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="px-2 py-2 text-center label text-[9px]">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {daysInMonth.map((day, i) => {
            const dayPosts = day ? getPostsForDay(day) : [];
            return (
              <div
                key={i}
                className="min-h-[90px] p-1.5"
                style={{ borderBottom: '1px solid rgba(223,101,110,.06)', borderRight: '1px solid rgba(223,101,110,.06)', background: !day ? 'rgba(0,0,0,.15)' : undefined }}
              >
                {day && (
                  <>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-3)' }}>{day}</span>
                    <div className="mt-0.5 space-y-0.5">
                      {dayPosts.map(post => (
                        <div
                          key={post.id}
                          onClick={() => openEdit(post)}
                          className="flex items-center gap-1 px-1 py-0.5 rounded text-[8px] cursor-pointer truncate transition-all hover:bg-white/[.03]"
                          style={{ background: 'rgba(124,15,17,.08)', border: '1px solid rgba(223,101,110,.06)' }}
                        >
                          <span className="shrink-0">{platformIcon[post.platform]}</span>
                          <span className="truncate flex-1">{post.title}</span>
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: statusLabel[post.status].color }} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4 mt-3">
        {Object.entries(platformIcon).map(([platform, icon]) => (
          <div key={platform} className="flex items-center gap-1.5">
            <span className="text-sm">{icon}</span>
            <span className="text-[10px] capitalize" style={{ color: 'var(--text-3)' }}>{platform === 'x' ? 'X' : platform}</span>
          </div>
        ))}
        <div className="w-px" style={{ background: 'rgba(223,101,110,.1)' }} />
        {Object.entries(statusLabel).map(([status, style]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: style.color }} />
            <span className="text-[10px] capitalize" style={{ color: 'var(--text-3)' }}>{status}</span>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingPost(null); }} title={editingPost && posts.find(p => p.id === editingPost.id) ? 'Edit Content' : 'New Content'}>
        {editingPost && (
          <div className="space-y-3">
            <div>
              <label className="label text-[9px] mb-1">Title</label>
              <input value={editingPost.title} onChange={e => setEditingPost({ ...editingPost, title: e.target.value })} className="glass-input" placeholder="Post title..." />
            </div>
            <div>
              <label className="label text-[9px] mb-1">Content</label>
              <textarea value={editingPost.content} onChange={e => setEditingPost({ ...editingPost, content: e.target.value })} className="glass-textarea" placeholder="Post content..." />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="label text-[9px] mb-1">Platform</label>
                <select value={editingPost.platform} onChange={e => setEditingPost({ ...editingPost, platform: e.target.value as ContentPlatform })} className="glass-select">
                  <option value="x">X</option>
                  <option value="instagram">Instagram</option>
                  <option value="email">Email</option>
                  <option value="blog">Blog</option>
                </select>
              </div>
              <div>
                <label className="label text-[9px] mb-1">Date</label>
                <input type="date" value={editingPost.scheduledDate} onChange={e => setEditingPost({ ...editingPost, scheduledDate: e.target.value })} className="glass-input" />
              </div>
              <div>
                <label className="label text-[9px] mb-1">Time</label>
                <input type="time" value={editingPost.scheduledTime} onChange={e => setEditingPost({ ...editingPost, scheduledTime: e.target.value })} className="glass-input" />
              </div>
            </div>
            <div>
              <label className="label text-[9px] mb-1">Status</label>
              <select value={editingPost.status} onChange={e => setEditingPost({ ...editingPost, status: e.target.value as ContentPost['status'] })} className="glass-select">
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex justify-between pt-2">
              {posts.find(p => p.id === editingPost.id) && (
                <button onClick={() => deletePost(editingPost.id)} className="text-xs" style={{ color: 'var(--cherry)' }}>Delete</button>
              )}
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setModalOpen(false); setEditingPost(null); }} className="glass-btn">Cancel</button>
                <button onClick={savePost} className="glass-btn" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.2), rgba(198,31,37,.15))', color: '#fff' }}>Save</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
