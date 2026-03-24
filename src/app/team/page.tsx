"use client";

import { useState, useEffect, useCallback } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  type: string;
  status: string;
  currentTask: string;
  avatar: string;
  tasksCompleted: number;
  uptime: string;
  description: string;
}

const statusStyles: Record<string, { dot: string; label: string; bg: string }> = {
  active: { dot: "bg-green-500", label: "Active", bg: "bg-green-50 text-green-700" },
  idle: { dot: "bg-yellow-500", label: "Idle", bg: "bg-yellow-50 text-yellow-700" },
  offline: { dot: "bg-gray-400", label: "Offline", bg: "bg-gray-100 text-gray-500" },
};

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [filter, setFilter] = useState<string>("");

  const fetchTeam = useCallback(async () => {
    const { getAll } = await import("@/lib/static-data");
    const data = await getAll<TeamMember>("team");
    setTeam(data);
  }, []);

  useEffect(() => { fetchTeam(); }, [fetchTeam]);

  const filtered = team.filter((m) => !filter || m.type === filter);
  const agents = team.filter((m) => m.type === "agent");
  const humans = team.filter((m) => m.type === "human");

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Team</h1>
          <p className="text-sm text-gray-500 mt-0.5">{agents.length} agents, {humans.length} humans</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button onClick={() => setFilter("")} className={`px-3 py-1 rounded-md text-xs font-medium ${!filter ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>All</button>
          <button onClick={() => setFilter("agent")} className={`px-3 py-1 rounded-md text-xs font-medium ${filter === "agent" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>Agents</button>
          <button onClick={() => setFilter("human")} className={`px-3 py-1 rounded-md text-xs font-medium ${filter === "human" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>Humans</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => {
          const style = statusStyles[member.status] || statusStyles.offline;
          return (
            <div key={member.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{member.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 truncate">{member.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${style.dot} shrink-0`} />
                  </div>
                  <p className="text-xs text-gray-500">{member.role}</p>
                  <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 ${member.type === "agent" ? "bg-sand-100 text-sand-700" : "bg-blue-50 text-blue-600"}`}>
                    {member.type}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-3 leading-relaxed">{member.description}</p>

              {member.currentTask && (
                <div className="mt-3 bg-gray-50 rounded-lg p-2.5">
                  <div className="text-[10px] text-gray-400 mb-0.5">Current Task</div>
                  <div className="text-xs text-gray-700 font-medium">{member.currentTask}</div>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{member.tasksCompleted}</div>
                  <div className="text-[10px] text-gray-400">Tasks Done</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700">{member.uptime}</div>
                  <div className="text-[10px] text-gray-400">Uptime</div>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${style.bg}`}>
                  {style.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
