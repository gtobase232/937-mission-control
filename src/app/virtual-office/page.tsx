'use client';
import { useEffect, useRef } from 'react';
import GlassPanel from '@/components/GlassPanel';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { seedTeam } from '@/lib/seed-data';
import { TeamMember } from '@/lib/types';

const PIXEL = 4;

const officeMap = [
  '################################',
  '#..............................#',
  '#..DDDD....DDDD....DDDD........#',
  '#..DDDD....DDDD....DDDD........#',
  '#..cccc....cccc....cccc........#',
  '#..............................#',
  '#..........####................#',
  '#..........#  #................#',
  '#..........####....DDDD........#',
  '#......................cccc....#',
  '#...PPP....................PPP.#',
  '#...PPP....................PPP.#',
  '#..............................#',
  '#..DDDD....DDDD................#',
  '#..DDDD....DDDD................#',
  '#..cccc....cccc................#',
  '#..............................#',
  '################################',
];

const colorMap: Record<string, string> = {
  '#': '#2a1012',
  '.': '#1a0c0d',
  'D': '#3a1518',
  'c': '#4a1a1e',
  'P': '#2d1214',
  ' ': '#221011',
};

const statusColor: Record<TeamMember['status'], string> = {
  online: 'var(--v-green)',
  away: 'var(--v-amber)',
  busy: 'var(--cherry)',
  offline: 'var(--text-muted)',
};

export default function VirtualOfficePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [team, setTeam] = useLocalStorage<TeamMember[]>('mc-team', seedTeam);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = officeMap[0].length;
    const rows = officeMap.length;
    canvas.width = cols * PIXEL;
    canvas.height = rows * PIXEL;

    officeMap.forEach((row, y) => {
      [...row].forEach((cell, x) => {
        ctx.fillStyle = colorMap[cell] || '#1a0c0d';
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      });
    });

    const memberPositions = [
      { x: 3, y: 4 }, { x: 9, y: 4 }, { x: 15, y: 4 },
      { x: 3, y: 15 }, { x: 9, y: 15 }, { x: 25, y: 9 },
    ];

    team.forEach((member, i) => {
      if (i >= memberPositions.length || member.status === 'offline') return;
      const pos = memberPositions[i];
      const color = member.status === 'online' ? '#3ecf8e' : member.status === 'busy' ? '#D22028' : '#f5a623';
      ctx.fillStyle = color;
      ctx.fillRect(pos.x * PIXEL, pos.y * PIXEL, PIXEL * 2, PIXEL * 2);
      ctx.fillStyle = '#fff';
      ctx.fillRect(pos.x * PIXEL, (pos.y - 1) * PIXEL, PIXEL * 2, PIXEL);
    });
  }, [team]);

  const toggleStatus = (id: string) => {
    const order: TeamMember['status'][] = ['online', 'away', 'busy', 'offline'];
    setTeam(prev => prev.map(m => {
      if (m.id !== id) return m;
      const idx = order.indexOf(m.status);
      return { ...m, status: order[(idx + 1) % order.length] };
    }));
  };

  return (
    <div className="p-4">
      <h1 className="font-display text-sm font-bold uppercase tracking-wider mb-4">Virtual Office</h1>

      <GlassPanel className="p-4 mb-4" elevated>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="rounded-lg"
            style={{ imageRendering: 'pixelated', width: officeMap[0].length * PIXEL * 2, height: officeMap.length * PIXEL * 2 }}
          />
        </div>
        <div className="flex justify-center gap-4 mt-3">
          {[{ label: 'Desk', color: '#3a1518' }, { label: 'Chair', color: '#4a1a1e' }, { label: 'Plant', color: '#2d1214' }, { label: 'Online', color: '#3ecf8e' }, { label: 'Busy', color: '#D22028' }].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} />
              <span className="text-[9px]" style={{ color: 'var(--text-3)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </GlassPanel>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {team.map(member => (
          <div key={member.id} onClick={() => toggleStatus(member.id)} className="cursor-pointer transition-all hover:scale-[1.02]">
          <GlassPanel className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{member.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold truncate">{member.name}</div>
                <div className="text-[9px]" style={{ color: 'var(--text-3)' }}>{member.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: statusColor[member.status], boxShadow: member.status === 'online' ? '0 0 6px rgba(62,207,142,.4)' : 'none' }} />
              <span className="text-[9px] font-semibold uppercase" style={{ color: statusColor[member.status] }}>{member.status}</span>
            </div>
            <div className="text-[9px] mt-1.5 truncate" style={{ color: 'var(--text-muted)' }}>{member.currentTask}</div>
          </GlassPanel>
          </div>
        ))}
      </div>
    </div>
  );
}
