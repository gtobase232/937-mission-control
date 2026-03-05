'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
  { href: '/tasks', label: 'Tasks', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
  { href: '/calendar', label: 'Calendar', icon: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18' },
  { href: '/clients', label: 'Clients', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
  { href: '/docs', label: 'Docs', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6' },
  { href: '/finance', label: 'Finance', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
  { href: '/leads', label: 'Leads', icon: 'M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0' },
  { href: '/analytics', label: 'Analytics', icon: 'M22 12l-4 0-3 9-6-18-3 9-4 0' },
  { href: '/content-calendar', label: 'Content', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
  { href: '/virtual-office', label: 'Virtual Team', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10' },
];

const assets = [
  { symbol: '₿', name: 'BTC', basePrice: 91247 },
  { symbol: 'Ξ', name: 'ETH', basePrice: 3842 },
  { symbol: '◎', name: 'SOL', basePrice: 187 },
];

export default function TopBar() {
  const pathname = usePathname();
  const [prices, setPrices] = useState(assets.map(a => ({ ...a, price: a.basePrice, change: 2.4 })));

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(a => {
        const delta = Math.floor((Math.random() - 0.48) * a.basePrice * 0.005);
        const price = a.basePrice + delta;
        const change = ((delta / a.basePrice) * 100);
        return { ...a, price, change: Math.round(change * 10) / 10 };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass flex items-center px-4 gap-3 h-12 shrink-0">
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="font-display text-xl font-black tracking-wider">937</span>
        <span className="font-display text-[8px] font-semibold uppercase tracking-[3px]" style={{ color: 'var(--text-3)' }}>Virtual Office</span>
      </div>

      <div className="w-px h-5 shrink-0" style={{ background: 'rgba(223,101,110,.15)' }} />

      <nav className="flex gap-0.5 flex-1 rounded-[10px] p-[3px] overflow-x-auto" style={{ background: 'rgba(124,15,17,.06)', border: '1px solid rgba(223,101,110,.06)' }}>
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all"
              style={isActive ? {
                background: 'linear-gradient(135deg, rgba(213,56,66,.15), rgba(198,31,37,.1))',
                color: '#fff',
                border: '1px solid rgba(223,101,110,.15)',
                boxShadow: 'inset 0 1px 0 rgba(255,180,170,.08), 0 2px 8px rgba(124,15,17,.1)',
              } : {
                color: 'var(--text-3)',
                border: '1px solid transparent',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span className="hidden xl:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="w-px h-5 shrink-0" style={{ background: 'rgba(223,101,110,.15)' }} />

      <div className="flex items-center gap-3 shrink-0">
        {prices.map(asset => (
          <div key={asset.name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px]" style={{ background: 'rgba(124,15,17,.06)', border: '1px solid rgba(223,101,110,.06)', color: 'var(--text-2)' }}>
            <span className="font-bold text-[13px]" style={{ color: asset.name === 'BTC' ? '#f7931a' : asset.name === 'ETH' ? '#627eea' : '#9945ff' }}>{asset.symbol}</span>
            <span className="font-bold text-white">${asset.price.toLocaleString()}</span>
            <span className="text-[10px]" style={{ color: asset.change >= 0 ? 'var(--v-green)' : 'var(--cherry)' }}>
              {asset.change >= 0 ? '+' : ''}{asset.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
