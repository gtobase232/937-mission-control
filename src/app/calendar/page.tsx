"use client";

import { useState, useEffect, useCallback } from "react";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: string;
  assignee: string;
  color: string;
  project: string;
}

const VIEWS = ["month", "week", "day"] as const;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const typeColors: Record<string, string> = {
  meeting: "bg-blue-100 text-blue-700 border-blue-200",
  deadline: "bg-red-100 text-red-700 border-red-200",
  work_session: "bg-sand-100 text-sand-700 border-sand-200",
};

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<typeof VIEWS[number]>("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    const { getAll } = await import("@/lib/static-data");
    const data = await getAll<CalendarEvent>("calendar");
    setEvents(data);
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const navigate = (dir: number) => {
    const d = new Date(currentDate);
    if (view === "month") d.setMonth(d.getMonth() + dir);
    else if (view === "week") d.setDate(d.getDate() + dir * 7);
    else d.setDate(d.getDate() + dir);
    setCurrentDate(d);
  };

  const getDaysInMonth = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.start.startsWith(dateStr));
  };

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const handleSave = async (formData: FormData) => {
    const event = {
      title: formData.get("title") as string,
      start: `${formData.get("date")}T${formData.get("startTime") || "09:00"}`,
      end: `${formData.get("date")}T${formData.get("endTime") || "10:00"}`,
      type: formData.get("type") as string,
      assignee: formData.get("assignee") as string,
      color: "",
      project: formData.get("project") as string,
    };
    const { create } = await import("@/lib/static-data");
    await create<CalendarEvent>("calendar", event as Omit<CalendarEvent, "id">);
    setShowModal(false);
    fetchEvents();
  };

  const today = new Date();
  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-500 mt-0.5">{events.length} events scheduled</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          + Add Event
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900 min-w-[200px] text-center">
            {view === "day"
              ? currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
              : `${MONTHS[month]} ${year}`}
          </h2>
          <button onClick={() => navigate(1)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          {VIEWS.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize ${
                view === v ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Month View */}
      {view === "month" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-7">
            {DAYS.map((d) => (
              <div key={d} className="p-2 text-xs font-semibold text-gray-500 text-center border-b border-gray-100">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {getDaysInMonth().map((day, i) => (
              <div
                key={i}
                className={`min-h-[100px] p-1.5 border-b border-r border-gray-50 ${day ? "cursor-pointer hover:bg-gray-50" : ""}`}
                onClick={() => {
                  if (day) {
                    setSelectedDate(`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
                    setShowModal(true);
                  }
                }}
              >
                {day && (
                  <>
                    <span className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full ${
                      isToday(day) ? "bg-gray-900 text-white" : "text-gray-700"
                    }`}>
                      {day}
                    </span>
                    <div className="mt-0.5 space-y-0.5">
                      {getEventsForDay(day).slice(0, 3).map((evt) => (
                        <div
                          key={evt.id}
                          className={`text-[10px] px-1.5 py-0.5 rounded truncate border ${typeColors[evt.type] || "bg-gray-100 text-gray-700 border-gray-200"}`}
                        >
                          {evt.title}
                        </div>
                      ))}
                      {getEventsForDay(day).length > 3 && (
                        <div className="text-[10px] text-gray-400 px-1.5">
                          +{getEventsForDay(day).length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Week View */}
      {view === "week" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-7">
            {getWeekDays().map((d, i) => {
              const dateStr = d.toISOString().split("T")[0];
              const dayEvents = events.filter((e) => e.start.startsWith(dateStr));
              const isTodayDate = d.toDateString() === today.toDateString();
              return (
                <div key={i} className="border-r border-gray-50 last:border-r-0">
                  <div className={`p-2 text-center border-b border-gray-100 ${isTodayDate ? "bg-gray-900 text-white" : ""}`}>
                    <div className="text-[10px] font-semibold uppercase">{DAYS[d.getDay()]}</div>
                    <div className="text-lg font-semibold">{d.getDate()}</div>
                  </div>
                  <div className="p-1.5 space-y-1 min-h-[300px]">
                    {dayEvents.map((evt) => (
                      <div key={evt.id} className={`text-[10px] p-1.5 rounded border ${typeColors[evt.type] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                        <div className="font-medium truncate">{evt.title}</div>
                        <div className="opacity-70">{evt.start.split("T")[1]?.slice(0, 5)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {view === "day" && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          {Array.from({ length: 16 }, (_, i) => i + 7).map((hour) => {
            const dateStr = currentDate.toISOString().split("T")[0];
            const hourStr = String(hour).padStart(2, "0");
            const hourEvents = events.filter((e) => e.start.startsWith(dateStr) && e.start.includes(`T${hourStr}:`));
            return (
              <div key={hour} className="flex border-b border-gray-50 min-h-[48px]">
                <div className="w-16 text-xs text-gray-400 py-2 shrink-0">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`}
                </div>
                <div className="flex-1 py-1 space-y-1">
                  {hourEvents.map((evt) => (
                    <div key={evt.id} className={`text-xs p-2 rounded border ${typeColors[evt.type] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                      <span className="font-medium">{evt.title}</span>
                      <span className="ml-2 opacity-60">{evt.assignee}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => { setShowModal(false); setSelectedDate(null); }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">New Event</h2>
            <form action={handleSave} className="space-y-3">
              <input name="title" placeholder="Event title" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input name="date" type="date" defaultValue={selectedDate || ""} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <input name="startTime" type="time" defaultValue="09:00" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input name="endTime" type="time" defaultValue="10:00" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <select name="type" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="meeting">Meeting</option>
                <option value="deadline">Deadline</option>
                <option value="work_session">Work Session</option>
              </select>
              <input name="assignee" placeholder="Assignee" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input name="project" placeholder="Project" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800">Create</button>
                <button type="button" onClick={() => { setShowModal(false); setSelectedDate(null); }} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
