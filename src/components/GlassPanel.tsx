'use client';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export default function GlassPanel({ children, className = '', elevated = false }: GlassPanelProps) {
  return (
    <div className={`glass ${elevated ? 'glass-elevated' : ''} ${className}`}>
      {children}
    </div>
  );
}
