'use client';
import { useState, useMemo } from 'react';
import Modal from '@/components/Modal';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedCalendarEvents } from '@/lib/seed-data';
import { CalendarEvent } from '@/lib/types';

const typeDot: Record<string, string> = {
  meeting: 'var(--v-green)',
  deadline: 'var(--cherry)',
  milestone: 'var(--v-amber)',
  other: 'var(--text-3)',
};

const emptyEvent = (): CalendarEvent => ({
  id: Date.now().toString(),
  title: '',
  date: '',
  time: '',
  type: 'meeting',
});

export default function CalendarPage() {
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('mc-calendar', seedCalendarEvents);
  const [currentMonth, setCurrentMonth] = useState(() => new Date(2026, 2, 1));
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

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

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const openCreate = (day: number) => {
    const ev = emptyEvent();
    ev.date = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setEditingEvent(ev);
    setModalOpen(true);
  };

  const openEdit = (ev: CalendarEvent) => {
    setEditingEvent({ ...ev });
    setModalOpen(true);
  };

  const saveEvent = () => {
    if (!editingEvent || !editingEvent.title.trim()) return;
    setEvents(prev => {
      const exists = prev.find(e => e.id === editingEvent.id);
      if (exists) return prev.map(e => e.id === editingEvent.id ? editingEvent : e);
      return [...prev, editingEvent];
    });
    setModalOpen(false);
    setEditingEvent(null);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-sm font-bold uppercase tracking-wider">Calendar</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="glass-btn">←</button>
          <span className="font-display text-xs font-bold uppercase tracking-wider px-3">{monthStr}</span>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="glass-btn">→</button>
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
            const dayEvents = day ? getEventsForDay(day) : [];
            return (
              <div
                key={i}
                onClick={() => day && openCreate(day)}
                className="min-h-[90px] cursor-pointer p-1.5 transition-colors hover:bg-white/[.02]"
                style={{ borderBottom: '1px solid rgba(223,101,110,.06)', borderRight: '1px solid rgba(223,101,110,.06)', background: !day ? 'rgba(0,0,0,.15)' : undefined }}
              >
                {day && (
                  <>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-3)' }}>{day}</span>
                    <div className="mt-0.5 space-y-0.5">
                      {dayEvents.map(ev => (
                        <div
                          key={ev.id}
                          onClick={e => { e.stopPropagation(); openEdit(ev); }}
                          className="flex items-center gap-1 px-1 py-0.5 rounded text-[9px] truncate"
                          style={{ background: 'rgba(124,15,17,.08)', border: '1px solid rgba(223,101,110,.06)' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: typeDot[ev.type] }} />
                          <span className="truncate">{ev.title}</span>
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

      <div className="mt-3 flex gap-4">
        {Object.entries(typeDot).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-[10px] capitalize" style={{ color: 'var(--text-3)' }}>{type}</span>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingEvent(null); }} title={editingEvent && events.find(e => e.id === editingEvent.id) ? 'Edit Event' : 'New Event'}>
        {editingEvent && (
          <div className="space-y-3">
            <div>
              <label className="label text-[9px] mb-1">Title</label>
              <input value={editingEvent.title} onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })} className="glass-input" placeholder="Event title..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label text-[9px] mb-1">Date</label>
                <input type="date" value={editingEvent.date} onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })} className="glass-input" />
              </div>
              <div>
                <label className="label text-[9px] mb-1">Time</label>
                <input value={editingEvent.time} onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })} className="glass-input" placeholder="e.g. 14:00 or All Day" />
              </div>
            </div>
            <div>
              <label className="label text-[9px] mb-1">Type</label>
              <select value={editingEvent.type} onChange={e => setEditingEvent({ ...editingEvent, type: e.target.value as CalendarEvent['type'] })} className="glass-select">
                <option value="meeting">Meeting</option>
                <option value="deadline">Deadline</option>
                <option value="milestone">Milestone</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex justify-between pt-2">
              {events.find(e => e.id === editingEvent.id) && (
                <button onClick={() => deleteEvent(editingEvent.id)} className="text-xs" style={{ color: 'var(--cherry)' }}>Delete</button>
              )}
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setModalOpen(false); setEditingEvent(null); }} className="glass-btn">Cancel</button>
                <button onClick={saveEvent} className="glass-btn" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.2), rgba(198,31,37,.15))', color: '#fff' }}>Save</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
