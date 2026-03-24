"use client";

import { useState, useEffect, useCallback } from "react";

interface KPI {
  name: string;
  value: number;
  target: number;
  unit: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  timeline: { start: string; end: string };
  kpis: KPI[];
  tags: string[];
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  planning: "bg-blue-100 text-blue-700",
  completed: "bg-gray-100 text-gray-600",
  paused: "bg-yellow-100 text-yellow-700",
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const fetchProjects = useCallback(async () => {
    const { getAll } = await import("@/lib/static-data");
    const data = await getAll<Project>("projects");
    setProjects(data);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  if (selected) {
    return (
      <div className="animate-fade-in max-w-4xl">
        <button onClick={() => setSelected(null)} className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          Back to Projects
        </button>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{selected.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{selected.description}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[selected.status]}`}>
              {selected.status}
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium text-gray-700">{selected.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-sand-400 h-2 rounded-full transition-all" style={{ width: `${selected.progress}%` }} />
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-xs text-gray-500">
            <span>Start: {new Date(selected.timeline.start).toLocaleDateString()}</span>
            <span>End: {new Date(selected.timeline.end).toLocaleDateString()}</span>
          </div>
          <div className="flex gap-1.5 mt-3">
            {selected.tags.map((tag) => (
              <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {selected.kpis.map((kpi) => (
            <div key={kpi.name} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">{kpi.name}</div>
              <div className="text-2xl font-semibold text-gray-900 mt-1">
                {kpi.value.toLocaleString()}{kpi.unit && <span className="text-sm text-gray-400 ml-1">{kpi.unit}</span>}
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-400">Target: {kpi.target.toLocaleString()}{kpi.unit}</span>
                  <span className="text-[10px] font-medium text-gray-600">{Math.round((kpi.value / kpi.target) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div className="bg-sand-400 h-1 rounded-full" style={{ width: `${Math.min(100, (kpi.value / kpi.target) * 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">{projects.length} active projects</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button onClick={() => setViewMode("grid")} className={`px-3 py-1 rounded-md text-xs font-medium ${viewMode === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>Grid</button>
          <button onClick={() => setViewMode("list")} className={`px-3 py-1 rounded-md text-xs font-medium ${viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>List</button>
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid grid-cols-2 gap-4" : "space-y-3"}>
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelected(project)}
            className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:border-sand-400 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-gray-900">{project.name}</h3>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[project.status]}`}>
                {project.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{project.description}</p>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-gray-400">Progress</span>
                <span className="text-[10px] font-medium text-gray-600">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-sand-400 h-1.5 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
            <div className="flex gap-1.5 mt-3">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
