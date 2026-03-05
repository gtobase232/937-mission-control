'use client';
import { useState, useMemo } from 'react';
import MissionBanner from '@/components/MissionBanner';
import Modal from '@/components/Modal';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedTasks } from '@/lib/seed-data';
import { Task, TaskStatus, Priority } from '@/lib/types';

const priorityColors: Record<Priority, string> = {
  low: 'bg-neutral-500/20 text-neutral-400',
  medium: 'bg-blue-500/20 text-blue-400',
  high: 'bg-amber-500/20 text-amber-400',
  critical: 'bg-purple-500/20 text-purple-400',
};

const statusColors: Record<TaskStatus, string> = {
  backlog: 'bg-neutral-500/20 text-neutral-400',
  todo: 'bg-blue-500/20 text-blue-400',
  'in-progress': 'bg-amber-500/20 text-amber-400',
  review: 'bg-purple-500/20 text-purple-400',
  done: 'bg-emerald-500/20 text-emerald-400',
};

const allStatuses: TaskStatus[] = ['backlog', 'todo', 'in-progress', 'review', 'done'];
const allPriorities: Priority[] = ['low', 'medium', 'high', 'critical'];

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('bs-tasks', seedTasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'status'>('dueDate');

  const priorityOrder: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  const statusOrder: Record<TaskStatus, number> = { backlog: 0, todo: 1, 'in-progress': 2, review: 3, done: 4 };

  const filtered = useMemo(() => {
    let result = [...tasks];
    if (statusFilter !== 'all') result = result.filter(t => t.status === statusFilter);
    if (priorityFilter !== 'all') result = result.filter(t => t.priority === priorityFilter);
    result.sort((a, b) => {
      if (sortBy === 'dueDate') return a.dueDate.localeCompare(b.dueDate);
      if (sortBy === 'priority') return priorityOrder[a.priority] - priorityOrder[b.priority];
      return statusOrder[a.status] - statusOrder[b.status];
    });
    return result;
  }, [tasks, statusFilter, priorityFilter, sortBy]);

  const openEdit = (t: Task) => { setEditingTask({ ...t }); setModalOpen(true); };
  const openCreate = () => {
    setEditingTask({
      id: Date.now().toString(),
      title: '',
      description: '',
      assignee: 'Trinkster',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      createdAt: new Date().toISOString().split('T')[0],
    });
    setModalOpen(true);
  };

  const save = () => {
    if (!editingTask || !editingTask.title) return;
    setTasks(prev => {
      const exists = prev.find(t => t.id === editingTask.id);
      return exists ? prev.map(t => t.id === editingTask.id ? editingTask : t) : [...prev, editingTask];
    });
    setModalOpen(false);
    setEditingTask(null);
  };

  const remove = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    setModalOpen(false);
    setEditingTask(null);
  };

  const doneCount = tasks.filter(t => t.status === 'done').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;

  return (
    <div>
      <MissionBanner />
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
        <button onClick={openCreate} className="glass-btn">+ New Task</button>
      </div>

      {/* Stats */}
      <div className="mb-5 grid gap-3 sm:grid-cols-4">
        <div className="glass p-4">
          <p className="label text-[10px]">Total</p>
          <p className="mt-1 text-xl font-bold font-mono">{tasks.length}</p>
        </div>
        <div className="glass p-4">
          <p className="label text-[10px]">In Progress</p>
          <p className="mt-1 text-xl font-bold font-mono" style={{ color: 'var(--v-amber)' }}>{inProgressCount}</p>
        </div>
        <div className="glass p-4">
          <p className="label text-[10px]">Done</p>
          <p className="mt-1 text-xl font-bold font-mono" style={{ color: 'var(--v-green)' }}>{doneCount}</p>
        </div>
        <div className="glass p-4">
          <p className="label text-[10px]">Completion</p>
          <p className="mt-1 text-xl font-bold font-mono">{tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Status</span>
          <div className="flex gap-1">
            {(['all', ...allStatuses] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-2.5 py-1 rounded-md text-[10px] font-semibold capitalize transition-all"
                style={statusFilter === s
                  ? { background: 'rgba(213,56,66,.15)', color: '#fff', border: '1px solid rgba(223,101,110,.15)' }
                  : { color: 'var(--text-muted)', border: '1px solid transparent' }
                }
              >
                {s === 'in-progress' ? 'In Prog' : s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Priority</span>
          <div className="flex gap-1">
            {(['all', ...allPriorities] as const).map(p => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className="px-2.5 py-1 rounded-md text-[10px] font-semibold capitalize transition-all"
                style={priorityFilter === p
                  ? { background: 'rgba(213,56,66,.15)', color: '#fff', border: '1px solid rgba(223,101,110,.15)' }
                  : { color: 'var(--text-muted)', border: '1px solid transparent' }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Sort</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="glass-select text-[11px] py-1 px-2" style={{ width: 'auto' }}>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Task table */}
      <div className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(223,101,110,.1)' }}>
                {['Task', 'Assignee', 'Status', 'Priority', 'Due', 'Created'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-display text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(task => (
                <tr
                  key={task.id}
                  onClick={() => openEdit(task)}
                  className="cursor-pointer transition-colors hover:bg-white/[.02]"
                  style={{ borderBottom: '1px solid rgba(223,101,110,.05)' }}
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold">{task.title}</p>
                    {task.description && <p className="text-[10px] mt-0.5 line-clamp-1" style={{ color: 'var(--text-muted)' }}>{task.description}</p>}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{task.assignee}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusColors[task.status]}`}>{task.status}</span></td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${priorityColors[task.priority]}`}>{task.priority}</span></td>
                  <td className="px-4 py-3 font-mono" style={{ color: 'var(--text-2)' }}>{task.dueDate}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: 'var(--text-muted)' }}>{task.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingTask(null); }} title={editingTask && tasks.find(t => t.id === editingTask.id) ? 'Edit Task' : 'New Task'}>
        {editingTask && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Title</label>
              <input value={editingTask.title} onChange={e => setEditingTask({ ...editingTask, title: e.target.value })} className="glass-input" />
            </div>
            <div>
              <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Description</label>
              <textarea value={editingTask.description} onChange={e => setEditingTask({ ...editingTask, description: e.target.value })} className="glass-textarea" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Assignee</label>
                <select value={editingTask.assignee} onChange={e => setEditingTask({ ...editingTask, assignee: e.target.value })} className="glass-select">
                  {['Trinkster', 'Check Rossi', 'Maya', 'Leo', 'Jade', 'Nico'].map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Priority</label>
                <select value={editingTask.priority} onChange={e => setEditingTask({ ...editingTask, priority: e.target.value as Priority })} className="glass-select">
                  {allPriorities.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Status</label>
                <select value={editingTask.status} onChange={e => setEditingTask({ ...editingTask, status: e.target.value as TaskStatus })} className="glass-select">
                  {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: 'var(--text-3)' }}>Due Date</label>
                <input type="date" value={editingTask.dueDate} onChange={e => setEditingTask({ ...editingTask, dueDate: e.target.value })} className="glass-input" />
              </div>
            </div>
            <div className="flex justify-between pt-2">
              {tasks.find(t => t.id === editingTask.id) && (
                <button onClick={() => remove(editingTask.id)} className="rounded-lg px-4 py-2 text-sm transition-colors hover:bg-white/5" style={{ color: 'var(--cherry)' }}>Delete</button>
              )}
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setModalOpen(false); setEditingTask(null); }} className="glass-btn">Cancel</button>
                <button onClick={save} className="glass-btn" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.2), rgba(198,31,37,.15))', color: '#fff' }}>Save</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
