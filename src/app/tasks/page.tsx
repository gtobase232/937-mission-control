"use client";

import { useState, useEffect, useCallback } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  priority: string;
  dueDate: string;
  project: string;
  createdAt: string;
}

const COLUMNS = [
  { id: "backlog", label: "Backlog" },
  { id: "in_progress", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "done", label: "Done" },
];

const PRIORITIES = ["P0", "P1", "P2", "P3"];
const ASSIGNEES = ["Wolve", "Trinkster", "Sergio", "Juan Andres"];

const priorityColor: Record<string, string> = {
  P0: "bg-red-100 text-red-700",
  P1: "bg-orange-100 text-orange-700",
  P2: "bg-blue-100 text-blue-700",
  P3: "bg-gray-100 text-gray-600",
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterAssignee, setFilterAssignee] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    const { getAll } = await import("@/lib/static-data");
    const data = await getAll<Task>("tasks");
    setTasks(data);
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const filteredTasks = tasks.filter((t) => {
    if (filterAssignee && t.assignee !== filterAssignee) return false;
    if (filterProject && t.project !== filterProject) return false;
    if (filterPriority && t.priority !== filterPriority) return false;
    return true;
  });

  const projects = [...new Set(tasks.map((t) => t.project).filter(Boolean))];

  const handleDrop = async (status: string) => {
    if (!draggedTask) return;
    const task = tasks.find((t) => t.id === draggedTask);
    if (!task || task.status === status) { setDraggedTask(null); return; }
    const { update } = await import("@/lib/static-data");
    await update<Task>("tasks", draggedTask, { ...task, status } as Partial<Task>);
    setDraggedTask(null);
    fetchTasks();
  };

  const handleSave = async (formData: FormData) => {
    const taskData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      assignee: formData.get("assignee") as string,
      priority: formData.get("priority") as string,
      dueDate: formData.get("dueDate") as string,
      project: formData.get("project") as string,
      status: editingTask?.status || "backlog",
    };

    if (editingTask) {
      const { update } = await import("@/lib/static-data");
      await update<Task>("tasks", editingTask.id, taskData as Partial<Task>);
    } else {
      const { create } = await import("@/lib/static-data");
      await create<Task>("tasks", taskData as unknown as Omit<Task, "id">);
    }
    setShowModal(false);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    const { remove } = await import("@/lib/static-data");
    await remove<Task>("tasks", id);
    fetchTasks();
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Task Board</h1>
          <p className="text-sm text-gray-500 mt-0.5">{tasks.length} tasks across all projects</p>
        </div>
        <button
          onClick={() => { setEditingTask(null); setShowModal(true); }}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          + Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700"
        >
          <option value="">All Assignees</option>
          {ASSIGNEES.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <select
          value={filterProject}
          onChange={(e) => setFilterProject(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700"
        >
          <option value="">All Projects</option>
          {projects.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700"
        >
          <option value="">All Priorities</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.id)}
            className="bg-gray-50 rounded-xl p-3 min-h-[400px]"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{col.label}</h3>
              <span className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded-full">
                {filteredTasks.filter((t) => t.status === col.id).length}
              </span>
            </div>
            <div className="space-y-2">
              {filteredTasks
                .filter((t) => t.status === col.id)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTask(task.id)}
                    onClick={() => { setEditingTask(task); setShowModal(true); }}
                    className="kanban-card bg-white rounded-lg p-3 border border-gray-200 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-gray-900 leading-snug">{task.title}</h4>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${priorityColor[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{task.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                        {task.project}
                      </span>
                      <span className="text-[10px] text-gray-400">{task.assignee}</span>
                    </div>
                    {task.dueDate && (
                      <div className="text-[10px] text-gray-400 mt-1">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(task.id); }}
                      className="text-[10px] text-red-400 hover:text-red-600 mt-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">{editingTask ? "Edit Task" : "New Task"}</h2>
            <form action={handleSave} className="space-y-3">
              <input name="title" defaultValue={editingTask?.title || ""} placeholder="Task title" required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <textarea name="description" defaultValue={editingTask?.description || ""} placeholder="Description" rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <select name="assignee" defaultValue={editingTask?.assignee || ""} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">Assignee</option>
                  {ASSIGNEES.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                <select name="priority" defaultValue={editingTask?.priority || "P2"} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <input name="dueDate" type="date" defaultValue={editingTask?.dueDate?.split("T")[0] || ""} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input name="project" defaultValue={editingTask?.project || ""} placeholder="Project" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800">
                  {editingTask ? "Update" : "Create"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
