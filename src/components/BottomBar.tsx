'use client';

export default function BottomBar() {
  return (
    <div className="glass flex items-center px-4 h-10 shrink-0 text-xs overflow-hidden">
      <div className="flex items-center gap-3.5 flex-1 min-w-0 px-3.5" style={{ borderRight: '1px solid rgba(223,101,110,.1)' }}>
        <span className="font-display text-[10px] font-bold uppercase tracking-[2.5px] shrink-0 flex items-center gap-1.5" style={{ color: 'var(--cherry)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          TODO
        </span>
        <div className="flex gap-4 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 whitespace-nowrap" style={{ color: 'var(--text-2)' }}>
            <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--cherry)', boxShadow: '0 0 6px rgba(210,32,40,.4)' }} />
            <span>Strata storyboard v1</span>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>tmrw</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap" style={{ color: 'var(--text-2)' }}>
            <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--cherry)', boxShadow: '0 0 6px rgba(210,32,40,.4)' }} />
            <span>Meridian DAO proposal</span>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>2d</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap" style={{ color: 'var(--text-2)' }}>
            <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--text-3)' }} />
            <span>Vanta dark mode</span>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Mar 8</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3.5 flex-1 min-w-0 px-3.5">
        <span className="font-display text-[10px] font-bold uppercase tracking-[2.5px] shrink-0 flex items-center gap-1.5" style={{ color: 'var(--cherry)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          BUILDING
        </span>
        <div className="flex gap-4 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 whitespace-nowrap" style={{ color: 'var(--text-2)' }}>
            <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--cherry)', boxShadow: '0 0 8px rgba(210,32,40,.5)', animation: 'bpulse 2s infinite' }} />
            <span>937 Virtual Office UI</span>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>now</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap" style={{ color: 'var(--text-2)' }}>
            <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--cherry)', boxShadow: '0 0 8px rgba(210,32,40,.5)', animation: 'bpulse 2s infinite' }} />
            <span>Lead research pipeline</span>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>11pm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
