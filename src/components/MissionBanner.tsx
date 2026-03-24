"use client";

import { useState, useEffect } from "react";

export default function MissionBanner() {
  const [currentTime, setCurrentTime] = useState("");
  const [showInternal, setShowInternal] = useState(true);

  useEffect(() => {
    const update = () => {
      setCurrentTime(
        new Date().toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
      <div
        className="flex-1 cursor-pointer select-none"
        onClick={() => setShowInternal(!showInternal)}
      >
        <p className="text-xs text-gray-500 max-w-3xl leading-relaxed">
          {showInternal ? (
            <>
              <span className="font-medium text-gray-700">Mission: </span>
              Build an autonomous AI workforce that eliminates every repetitive task — so you only touch decisions that require human judgment.
            </>
          ) : (
            <>
              <span className="font-medium text-gray-700">Vision: </span>
              We build AI agents that run your operations while you run your vision. Your company works 24/7, even when you don&apos;t.
            </>
          )}
        </p>
      </div>
      <div className="flex items-center gap-4 ml-4 shrink-0">
        <button className="relative text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-sand-400 rounded-full" />
        </button>
        <span className="text-xs text-gray-400 font-medium">{currentTime}</span>
      </div>
    </div>
  );
}
