'use client';
import MissionBanner from '@/components/MissionBanner';

const PIXEL = 4;

function PixelRect({ x, y, w, h, color }: { x: number; y: number; w: number; h: number; color: string }) {
  return <div className="absolute" style={{ left: x * PIXEL, top: y * PIXEL, width: w * PIXEL, height: h * PIXEL, backgroundColor: color }} />;
}

function Desk({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <>
      {/* Desk surface */}
      <PixelRect x={x} y={y} w={20} h={12} color="#3d2b1f" />
      <PixelRect x={x + 1} y={y + 1} w={18} h={10} color="#5c3d2e" />
      {/* Monitor */}
      <PixelRect x={x + 6} y={y - 6} w={8} h={5} color="#1a1a1a" />
      <PixelRect x={x + 7} y={y - 5} w={6} h={3} color="#2563eb" />
      {/* Monitor stand */}
      <PixelRect x={x + 9} y={y - 1} w={2} h={1} color="#555" />
      {/* Keyboard */}
      <PixelRect x={x + 5} y={y + 3} w={10} h={3} color="#333" />
      <PixelRect x={x + 6} y={y + 4} w={8} h={1} color="#444" />
      {/* Desk legs */}
      <PixelRect x={x + 1} y={y + 12} w={2} h={4} color="#3d2b1f" />
      <PixelRect x={x + 17} y={y + 12} w={2} h={4} color="#3d2b1f" />
      {/* Label */}
      <div className="absolute text-[10px] text-[#888] font-medium" style={{ left: (x + 5) * PIXEL, top: (y + 18) * PIXEL }}>{label}</div>
    </>
  );
}

function Chair({ x, y }: { x: number; y: number }) {
  return (
    <>
      <PixelRect x={x} y={y} w={8} h={8} color="#1a1a1a" />
      <PixelRect x={x + 1} y={y + 1} w={6} h={6} color="#8B5CF6" />
      <PixelRect x={x + 2} y={y + 8} w={4} h={2} color="#333" />
      {/* Wheels */}
      <PixelRect x={x + 1} y={y + 10} w={2} h={1} color="#555" />
      <PixelRect x={x + 5} y={y + 10} w={2} h={1} color="#555" />
    </>
  );
}

function Agent({ x, y, emoji, name }: { x: number; y: number; emoji: string; name: string }) {
  return (
    <>
      {/* Body */}
      <PixelRect x={x + 1} y={y + 4} w={6} h={6} color="#222" />
      {/* Head */}
      <PixelRect x={x + 2} y={y} w={4} h={4} color="#d4a574" />
      {/* Eyes */}
      <PixelRect x={x + 2} y={y + 1} w={1} h={1} color="#111" />
      <PixelRect x={x + 5} y={y + 1} w={1} h={1} color="#111" />
      {/* Emoji label */}
      <div className="absolute text-lg" style={{ left: (x) * PIXEL, top: (y - 5) * PIXEL }}>{emoji}</div>
      <div className="absolute text-[9px] text-green-400 font-mono" style={{ left: (x - 1) * PIXEL, top: (y + 11) * PIXEL }}>{name}</div>
    </>
  );
}

function Plant({ x, y }: { x: number; y: number }) {
  return (
    <>
      {/* Pot */}
      <PixelRect x={x} y={y + 6} w={6} h={4} color="#8b4513" />
      <PixelRect x={x + 1} y={y + 10} w={4} h={2} color="#6b3410" />
      {/* Leaves */}
      <PixelRect x={x + 2} y={y} w={2} h={6} color="#22c55e" />
      <PixelRect x={x} y={y + 1} w={2} h={3} color="#16a34a" />
      <PixelRect x={x + 4} y={y + 1} w={2} h={3} color="#16a34a" />
      <PixelRect x={x + 1} y={y - 1} w={1} h={2} color="#22c55e" />
      <PixelRect x={x + 4} y={y - 1} w={1} h={2} color="#22c55e" />
    </>
  );
}

function Poster({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <>
      <PixelRect x={x} y={y} w={14} h={10} color="#1a1a1a" />
      <PixelRect x={x + 1} y={y + 1} w={12} h={8} color="#222" />
      <div className="absolute text-[8px] text-[#8B5CF6] font-bold leading-tight" style={{ left: (x + 2) * PIXEL, top: (y + 2) * PIXEL, width: 10 * PIXEL }}>{text}</div>
    </>
  );
}

function CoffeeMachine({ x, y }: { x: number; y: number }) {
  return (
    <>
      {/* Table */}
      <PixelRect x={x} y={y + 8} w={10} h={4} color="#3d2b1f" />
      <PixelRect x={x + 1} y={y + 12} w={2} h={3} color="#3d2b1f" />
      <PixelRect x={x + 7} y={y + 12} w={2} h={3} color="#3d2b1f" />
      {/* Machine */}
      <PixelRect x={x + 2} y={y} w={6} h={8} color="#333" />
      <PixelRect x={x + 3} y={y + 1} w={4} h={3} color="#444" />
      {/* Cup */}
      <PixelRect x={x + 3} y={y + 5} w={3} h={2} color="#fff" />
      <div className="absolute text-[8px] text-[#888]" style={{ left: (x + 1) * PIXEL, top: (y + 16) * PIXEL }}>☕</div>
    </>
  );
}

export default function VirtualOfficePage() {
  return (
    <div>
      <MissionBanner />
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Virtual Office</h1>
        <p className="text-sm text-[#888] mt-1">937 Studio — CDMX</p>
      </div>

      <div className="rounded-xl border border-[#222] bg-[#111] p-6 overflow-auto">
        <div className="relative" style={{ width: 160 * PIXEL, height: 115 * PIXEL, minWidth: 160 * PIXEL }}>
          {/* Floor */}
          <div className="absolute inset-0 rounded-lg" style={{ backgroundColor: '#0d0d0d' }}>
            {/* Floor grid pattern */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`h${i}`} className="absolute w-full" style={{ top: i * 10 * PIXEL, height: 1, backgroundColor: '#151515' }} />
            ))}
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={`v${i}`} className="absolute h-full" style={{ left: i * 10 * PIXEL, width: 1, backgroundColor: '#151515' }} />
            ))}
          </div>

          {/* Wall */}
          <PixelRect x={0} y={0} w={160} h={2} color="#222" />

          {/* Posters on wall */}
          <Poster x={10} y={3} text="937 STUDIO" />
          <Poster x={70} y={3} text="DESIGN WITH INTENT" />
          <Poster x={130} y={3} text="BRANDS > LOGOS" />

          {/* Trinkster's desk */}
          <Desk x={10} y={30} label="Trinkster's Desk" />
          <Chair x={16} y={48} />
          <Agent x={17} y={36} emoji="🎨" name="Trinkster" />

          {/* Check Rossi's desk */}
          <Desk x={60} y={30} label="Check Rossi's Desk" />
          <Chair x={66} y={48} />
          <Agent x={67} y={36} emoji="🏛️" name="Check Rossi" />

          {/* Maya's desk */}
          <Desk x={110} y={30} label="Maya's Desk" />
          <Chair x={116} y={48} />
          <Agent x={117} y={36} emoji="📋" name="Maya" />

          {/* Plants */}
          <Plant x={45} y={25} />
          <Plant x={95} y={25} />
          <Plant x={148} y={55} />

          {/* Coffee area */}
          <CoffeeMachine x={110} y={60} />

          {/* Mood board */}
          <PixelRect x={130} y={60} w={8} h={16} color="#1a1a1a" />
          <PixelRect x={131} y={61} w={6} h={2} color="#8B5CF6" />
          <PixelRect x={131} y={64} w={6} h={2} color="#f59e0b" />
          <PixelRect x={131} y={67} w={6} h={2} color="#3b82f6" />
          <PixelRect x={131} y={70} w={6} h={2} color="#ec4899" />
          <div className="absolute text-[8px] text-[#555]" style={{ left: 127 * PIXEL, top: 78 * PIXEL }}>Mood Board</div>

          {/* Whiteboard */}
          <PixelRect x={10} y={70} w={30} h={18} color="#1a1a1a" />
          <PixelRect x={11} y={71} w={28} h={16} color="#222" />
          <div className="absolute text-[8px] text-[#8B5CF6] font-mono leading-tight" style={{ left: 13 * PIXEL, top: 73 * PIXEL, width: 24 * PIXEL }}>
            TODO:<br/>- LIQD v2<br/>- Zama site<br/>- March content
          </div>
          <div className="absolute text-[8px] text-[#555]" style={{ left: 17 * PIXEL, top: 90 * PIXEL }}>Whiteboard</div>

          {/* Rug */}
          <PixelRect x={55} y={65} w={30} h={20} color="#0d0a14" />
          <PixelRect x={56} y={66} w={28} h={18} color="#130e1e" />

          {/* 937 logo on rug */}
          <div className="absolute text-xs text-[#8B5CF6]/30 font-bold" style={{ left: 63 * PIXEL, top: 72 * PIXEL }}>937</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-lg border border-[#222] bg-[#111] p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" style={{ animation: 'pulseDot 2s ease-in-out infinite' }} />
            <span className="text-xs text-[#888]">🎨 Trinkster</span>
          </div>
          <p className="mt-1 text-[10px] text-[#666]">At desk · Creative Direction</p>
        </div>
        <div className="rounded-lg border border-[#222] bg-[#111] p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" style={{ animation: 'pulseDot 2s ease-in-out infinite' }} />
            <span className="text-xs text-[#888]">🏛️ Check Rossi</span>
          </div>
          <p className="mt-1 text-[10px] text-[#666]">At desk · Architecture</p>
        </div>
        <div className="rounded-lg border border-[#222] bg-[#111] p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" style={{ animation: 'pulseDot 2s ease-in-out infinite' }} />
            <span className="text-xs text-[#888]">📋 Maya</span>
          </div>
          <p className="mt-1 text-[10px] text-[#666]">At desk · Content Strategy</p>
        </div>
        <div className="rounded-lg border border-[#222] bg-[#111] p-3">
          <p className="text-xs text-[#888]">☕ Coffee</p>
          <p className="mt-1 text-[10px] text-[#666]">Fresh brew ready</p>
        </div>
        <div className="rounded-lg border border-[#222] bg-[#111] p-3">
          <p className="text-xs text-[#888]">🎨 Mood Board</p>
          <p className="mt-1 text-[10px] text-[#8B5CF6]">Inspiration loaded</p>
        </div>
      </div>
    </div>
  );
}
