'use client';

const taglines = [
  'We craft brands that move culture forward.',
  'Design is the weapon. Strategy is the plan.',
  'Building the visual language of Web3.',
  'From concept to culture shift.',
];

export default function MissionBanner() {
  const tagline = taglines[Math.floor(Date.now() / 86400000) % taglines.length];

  return (
    <div
      className="mb-5 rounded-xl px-5 py-3 flex items-center gap-3 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(213,56,66,.08), rgba(124,15,17,.04))',
        border: '1px solid rgba(223,101,110,.1)',
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-display text-xs font-black"
        style={{
          background: 'linear-gradient(135deg, rgba(213,56,66,.2), rgba(198,31,37,.12))',
          border: '1px solid rgba(223,101,110,.15)',
          color: 'var(--cherry)',
        }}
      >
        937
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold tracking-wide" style={{ color: 'var(--text-2)' }}>
          {tagline}
        </p>
        <p className="text-[9px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Mission Control · CDMX
        </p>
      </div>
      <div className="ml-auto flex items-center gap-1.5 shrink-0">
        <span
          className="w-[6px] h-[6px] rounded-full"
          style={{ background: 'var(--v-green)', boxShadow: '0 0 8px rgba(62,207,142,.4)', animation: 'pulseDot 2s infinite' }}
        />
        <span className="text-[10px] font-medium" style={{ color: 'var(--v-green)' }}>Systems Online</span>
      </div>
    </div>
  );
}
