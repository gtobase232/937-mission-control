"use client";

import { useState, useEffect, useCallback } from "react";

interface Agent {
  id: string;
  name: string;
  status: string;
  currentTask: string;
  avatar: string;
  deskX: number;
  deskY: number;
}

const FLOOR_COLOR = "#F5F0E8";
const WALL_COLOR = "#E8E3DB";
const DESK_COLOR = "#D4C4A0";
const CHAIR_COLOR = "#8B7355";
const SCREEN_ON = "#4ADE80";
const SCREEN_OFF = "#374151";
const PLANT_GREEN = "#22C55E";
const PLANT_POT = "#A16207";

function PixelDesk({ x, y, hasAgent, agentStatus }: { x: number; y: number; hasAgent: boolean; agentStatus: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Desk surface */}
      <rect x="0" y="20" width="80" height="35" rx="2" fill={DESK_COLOR} stroke="#BBA878" strokeWidth="1" />
      <rect x="5" y="22" width="70" height="6" rx="1" fill="#E5D5B3" opacity="0.5" />
      {/* Desk legs */}
      <rect x="5" y="55" width="4" height="20" fill={CHAIR_COLOR} />
      <rect x="71" y="55" width="4" height="20" fill={CHAIR_COLOR} />
      {/* Monitor */}
      <rect x="25" y="2" width="30" height="20" rx="2" fill="#1F2937" stroke="#111" strokeWidth="1" />
      <rect x="27" y="4" width="26" height="14" rx="1" fill={hasAgent && agentStatus === "active" ? SCREEN_ON : SCREEN_OFF} opacity={hasAgent && agentStatus === "active" ? 0.8 : 0.4} />
      {hasAgent && agentStatus === "active" && (
        <>
          <rect x="29" y="6" width="12" height="1.5" fill="#166534" opacity="0.6" rx="0.5" />
          <rect x="29" y="9" width="18" height="1.5" fill="#166534" opacity="0.4" rx="0.5" />
          <rect x="29" y="12" width="8" height="1.5" fill="#166534" opacity="0.6" rx="0.5" />
          <rect x="29" y="15" width="15" height="1.5" fill="#166534" opacity="0.3" rx="0.5" />
        </>
      )}
      {/* Monitor stand */}
      <rect x="37" y="22" width="6" height="3" fill="#374151" />
      <rect x="33" y="24" width="14" height="2" rx="1" fill="#374151" />
      {/* Keyboard */}
      <rect x="28" y="32" width="24" height="8" rx="1" fill="#4B5563" />
      <rect x="30" y="34" width="20" height="4" rx="0.5" fill="#6B7280" />
      {/* Coffee mug */}
      <rect x="60" y="30" width="8" height="10" rx="2" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="0.5" />
      <rect x="67" y="33" width="3" height="4" rx="1" fill="none" stroke="#D1D5DB" strokeWidth="0.5" />
      {/* Chair */}
      <rect x="28" y="65" width="24" height="16" rx="3" fill={CHAIR_COLOR} />
      <rect x="31" y="67" width="18" height="10" rx="2" fill="#9A8468" />
      <rect x="36" y="81" width="3" height="8" fill="#6B5B45" />
      <rect x="41" y="81" width="3" height="8" fill="#6B5B45" />
      {/* Chair wheels */}
      <circle cx="34" cy="90" r="2" fill="#4B5563" />
      <circle cx="46" cy="90" r="2" fill="#4B5563" />
    </g>
  );
}

function PixelAgent({ x, y, name, status, avatar }: { x: number; y: number; name: string; status: string; avatar: string }) {
  if (status === "offline") return null;

  const isActive = status === "active";
  const offsetY = isActive ? -8 : 0;
  const offsetX = !isActive ? 15 : 0;

  return (
    <g transform={`translate(${x + 28 + offsetX}, ${y + 40 + offsetY})`} className={isActive ? "animate-typing" : "animate-idle"}>
      {/* Body */}
      <rect x="4" y="12" width="16" height="14" rx="2" fill={isActive ? "#3B82F6" : "#9CA3AF"} />
      {/* Head */}
      <rect x="6" y="0" width="12" height="12" rx="3" fill="#FBBF24" />
      {/* Eyes */}
      <rect x="8" y="4" width="3" height="3" rx="1" fill="#1F2937" />
      <rect x="13" y="4" width="3" height="3" rx="1" fill="#1F2937" />
      {/* Mouth */}
      <rect x="10" y="8" width="4" height="1.5" rx="0.5" fill="#92400E" />
      {/* Arms */}
      {isActive ? (
        <>
          <rect x="0" y="14" width="4" height="8" rx="1" fill="#FBBF24" />
          <rect x="20" y="14" width="4" height="8" rx="1" fill="#FBBF24" />
        </>
      ) : (
        <>
          <rect x="0" y="16" width="4" height="6" rx="1" fill="#FBBF24" />
          <rect x="20" y="16" width="4" height="6" rx="1" fill="#FBBF24" />
        </>
      )}
      {/* Name tag */}
      <text x="12" y="36" textAnchor="middle" className="text-[7px] fill-gray-600 font-medium">{avatar} {name}</text>
    </g>
  );
}

function PixelPlant({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="6" y="15" width="12" height="12" rx="2" fill={PLANT_POT} />
      <rect x="8" y="14" width="8" height="3" rx="1" fill="#B87A0A" />
      <ellipse cx="12" cy="10" rx="8" ry="8" fill={PLANT_GREEN} opacity="0.8" />
      <ellipse cx="8" cy="6" rx="5" ry="5" fill="#16A34A" opacity="0.6" />
      <ellipse cx="16" cy="7" rx="4" ry="4" fill="#15803D" opacity="0.7" />
    </g>
  );
}

function CoffeeMachine({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="30" height="40" rx="3" fill="#374151" />
      <rect x="3" y="3" width="24" height="12" rx="2" fill="#1F2937" />
      <circle cx="15" cy="9" r="3" fill="#EF4444" opacity="0.8" />
      <rect x="8" y="28" width="14" height="10" rx="1" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="0.5" />
      <rect x="10" y="20" width="4" height="8" fill="#6B7280" />
      <rect x="16" y="20" width="4" height="8" fill="#6B7280" />
    </g>
  );
}

function WallPoster({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="60" height="40" rx="2" fill="#1F2937" />
      <rect x="2" y="2" width="56" height="36" rx="1" fill="#111827" />
      <text x="30" y="15" textAnchor="middle" className="text-[7px] fill-sand-400 font-bold">BLACK SAND</text>
      <text x="30" y="25" textAnchor="middle" className="text-[5px] fill-gray-400">{text}</text>
      <rect x="15" y="30" width="30" height="2" rx="1" fill="#C4A265" opacity="0.5" />
    </g>
  );
}

export default function Office() {
  const [agents, setAgents] = useState<Agent[]>([]);

  const fetchTeam = useCallback(async () => {
    try {
      const { getAll } = await import("@/lib/static-data");
      const data = await getAll<TeamMemberData>("team");
      const deskPositions = [
        { x: 40, y: 120 },
        { x: 180, y: 120 },
        { x: 320, y: 120 },
        { x: 100, y: 260 },
        { x: 250, y: 260 },
        { x: 400, y: 260 },
        { x: 550, y: 120 },
      ];
      setAgents(
        data.map((m: TeamMemberData, i: number) => ({
          id: m.id,
          name: m.name,
          status: m.status,
          currentTask: m.currentTask,
          avatar: m.avatar,
          deskX: deskPositions[i % deskPositions.length].x,
          deskY: deskPositions[i % deskPositions.length].y,
        }))
      );
    } catch {
      /* fallback */
    }
  }, []);

  useEffect(() => { fetchTeam(); }, [fetchTeam]);
  useEffect(() => {
    const interval = setInterval(fetchTeam, 10000);
    return () => clearInterval(interval);
  }, [fetchTeam]);

  const activeCount = agents.filter((a) => a.status === "active").length;
  const idleCount = agents.filter((a) => a.status === "idle").length;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">The Office</h1>
          <p className="text-sm text-gray-500 mt-0.5">Virtual headquarters — {activeCount} active, {idleCount} idle</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500" /> Working</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Idle</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-400" /> Offline</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <svg viewBox="0 0 700 420" className="w-full" style={{ backgroundColor: FLOOR_COLOR }}>
          {/* Floor tiles */}
          {Array.from({ length: 15 }, (_, i) => (
            <line key={`fv${i}`} x1={i * 50} y1="80" x2={i * 50} y2="420" stroke="#E8E0D0" strokeWidth="0.5" opacity="0.4" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`fh${i}`} x1="0" y1={80 + i * 50} x2="700" y2={80 + i * 50} stroke="#E8E0D0" strokeWidth="0.5" opacity="0.4" />
          ))}

          {/* Wall */}
          <rect x="0" y="0" width="700" height="80" fill={WALL_COLOR} />
          <rect x="0" y="78" width="700" height="4" fill="#D4C8B8" />
          {/* Baseboard */}
          <rect x="0" y="80" width="700" height="3" fill="#C8B898" />

          {/* Wall decorations */}
          <WallPoster x={60} y={15} text="BUILD THE FUTURE" />
          <WallPoster x={280} y={15} text="AI WORKFORCE" />
          <WallPoster x={500} y={15} text="24/7 OPERATIONS" />

          {/* Window */}
          <rect x="175" y="8" width="50" height="55" rx="2" fill="#87CEEB" opacity="0.3" stroke="#C8B898" strokeWidth="1" />
          <line x1="200" y1="8" x2="200" y2="63" stroke="#C8B898" strokeWidth="0.5" />
          <line x1="175" y1="35" x2="225" y2="35" stroke="#C8B898" strokeWidth="0.5" />

          <rect x="400" y="8" width="50" height="55" rx="2" fill="#87CEEB" opacity="0.3" stroke="#C8B898" strokeWidth="1" />
          <line x1="425" y1="8" x2="425" y2="63" stroke="#C8B898" strokeWidth="0.5" />
          <line x1="400" y1="35" x2="450" y2="35" stroke="#C8B898" strokeWidth="0.5" />

          {/* Plants */}
          <PixelPlant x={10} y={85} />
          <PixelPlant x={650} y={85} />
          <PixelPlant x={460} y={340} />

          {/* Coffee machine area */}
          <rect x="580" y="340" width="100" height="70" rx="3" fill="#E5E0D8" stroke="#D4CFC5" strokeWidth="1" />
          <CoffeeMachine x={600} y={348} />
          <text x="630" y="395" textAnchor="middle" className="text-[6px] fill-gray-400">COFFEE</text>

          {/* Desks and agents */}
          {agents.map((agent) => (
            <g key={agent.id}>
              <PixelDesk x={agent.deskX} y={agent.deskY} hasAgent={agent.status !== "offline"} agentStatus={agent.status} />
              <PixelAgent x={agent.deskX} y={agent.deskY} name={agent.name.split(" ")[0]} status={agent.status} avatar={agent.avatar} />
            </g>
          ))}

          {/* Black Sand logo on floor */}
          <text x="350" y="400" textAnchor="middle" className="text-[10px] fill-sand-400 font-bold" opacity="0.2">BLACK SAND HQ</text>
        </svg>
      </div>

      {/* Agent status cards below */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{agent.avatar}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-gray-900 truncate">{agent.name}</span>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    agent.status === "active" ? "bg-green-500" : agent.status === "idle" ? "bg-yellow-500" : "bg-gray-400"
                  }`} />
                </div>
                <p className="text-[10px] text-gray-400 truncate">{agent.currentTask || "No active task"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface TeamMemberData {
  id: string;
  name: string;
  status: string;
  currentTask: string;
  avatar: string;
}
