'use client';
import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(4px)', animation: 'fadeIn 0.15s ease-out' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="glass glass-elevated w-full max-w-lg p-6 mx-4"
        style={{ animation: 'slideIn 0.15s ease-out' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-white/5"
            style={{ color: 'var(--text-3)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
