'use client';
import Link from 'next/link';

const stats = [
  { label: 'Revenue', value: '$47K', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
  { label: 'Active Projects', value: '7', icon: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z' },
  { label: 'Leads', value: '12', icon: 'M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0' },
  { label: 'Close Rate', value: '33%', icon: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6' },
  { label: 'Sales Calls', value: '18', icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z' },
];

export default function AnalyticsBar() {
  return (
    <div className="glass flex items-center px-6 h-[52px] shrink-0">
      <div className="flex items-center flex-1">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-3 px-5" style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(223,101,110,.08)' : 'none' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, rgba(213,56,66,.12), rgba(124,15,17,.08))', border: '1px solid rgba(223,101,110,.1)', color: 'var(--cherry)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={stat.icon} />
              </svg>
            </div>
            <div>
              <div className="font-display text-base font-extrabold leading-none">{stat.value}</div>
              <div className="text-[9px] font-semibold uppercase tracking-[1.5px] mt-1" style={{ color: 'var(--text-3)' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link href="/analytics" className="glass-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12l-4 0-3 9-6-18-3 9-4 0" />
          </svg>
          See All Analytics
        </Link>
      </div>
    </div>
  );
}
