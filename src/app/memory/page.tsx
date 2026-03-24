"use client";

import { useState } from "react";

const SAMPLE_LOGS: Record<string, string[]> = {
  "2026-03-03": [
    "[07:00] Morning report: All agents operational. Wolve completed 3 tasks overnight.",
    "[07:15] Sales Agent identified 2 new leads matching ICP criteria.",
    "[09:30] Trinkster started sprint planning for Mission Control v0.2.",
    "[14:00] Afternoon session: Reviewing AI Sales Agent pipeline integrations.",
    "[14:45] Content Agent drafted 3 X posts for review.",
    "[23:00] Night session: Wolve optimizing lead research prompts.",
  ],
  "2026-03-02": [
    "[07:00] Morning report: System health check passed. 12 tasks in progress.",
    "[10:00] Sergio reviewing financial projections for Q2.",
    "[14:00] Afternoon session: Mission Control dashboard development.",
    "[16:30] Juan Andres testing client onboarding automation flow.",
    "[23:00] Night session: Deploying content pipeline updates.",
  ],
  "2026-03-01": [
    "[07:00] Morning report: New month kickoff. February metrics compiled.",
    "[11:00] Team sync: Reviewed February performance, set March goals.",
    "[14:00] Afternoon session: Lead research agent v2 development.",
    "[20:00] Sales Agent processed 15 new company profiles.",
    "[23:00] Night session: Infrastructure optimization.",
  ],
};

const LONG_TERM_MEMORY = `# Long-Term Memory

## Key Decisions
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS for all internal tools
- **AI Framework**: Claude API for all agent operations
- **Data Persistence**: Local JSON files for MVP, migrate to PostgreSQL later
- **Deployment**: Local-first, Docker containers for production

## Team Preferences
- Trinkster: Prefers concise updates, values speed over perfection
- Sergio: Focuses on financial metrics and ROI tracking
- Juan Andres: Handles client relationships and onboarding flows

## Agent Architecture
- Wolve: Lead AI agent, coordinates all sub-agents
- Sales Agent: Lead research, outreach drafting, pipeline management
- Content Agent: Social media content creation and scheduling
- Research Agent: Market research, competitor analysis, data gathering

## Active Goals (March 2026)
1. Launch Mission Control MVP
2. Close 3 new AI automation clients
3. Achieve 1000 X followers
4. Automate 80% of lead research pipeline
`;

export default function Memory() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"logs" | "memory">("logs");

  const dates = Object.keys(SAMPLE_LOGS).sort().reverse();

  const filteredDates = dates.filter((date) => {
    if (!searchQuery) return true;
    const logs = SAMPLE_LOGS[date];
    return logs?.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
      date.includes(searchQuery);
  });

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Memory</h1>
          <p className="text-sm text-gray-500 mt-0.5">Conversation logs & long-term memory</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button onClick={() => setActiveTab("logs")} className={`px-3 py-1 rounded-md text-xs font-medium ${activeTab === "logs" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>
            Daily Logs
          </button>
          <button onClick={() => setActiveTab("memory")} className={`px-3 py-1 rounded-md text-xs font-medium ${activeTab === "memory" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>
            Long-Term Memory
          </button>
        </div>
      </div>

      {activeTab === "logs" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all logs..."
              className="w-full max-w-md border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="flex gap-6">
            {/* Date List */}
            <div className="w-48 shrink-0 space-y-1">
              {filteredDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    selectedDate === date
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium">{new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div>
                  <div className={`text-[10px] ${selectedDate === date ? "text-gray-400" : "text-gray-400"}`}>
                    {SAMPLE_LOGS[date]?.length || 0} entries
                  </div>
                </button>
              ))}
            </div>

            {/* Log Content */}
            <div className="flex-1">
              {selectedDate ? (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">
                    {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </h3>
                  <div className="space-y-2">
                    {SAMPLE_LOGS[selectedDate]?.map((log, i) => (
                      <div key={i} className="text-sm text-gray-700 font-mono bg-gray-50 rounded-lg px-3 py-2">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <p className="text-sm text-gray-400">Select a date to view conversation logs</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {activeTab === "memory" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="prose prose-sm max-w-none">
            {LONG_TERM_MEMORY.split("\n").map((line, i) => {
              if (line.startsWith("# ")) return <h1 key={i} className="text-lg font-semibold text-gray-900 mt-0">{line.slice(2)}</h1>;
              if (line.startsWith("## ")) return <h2 key={i} className="text-sm font-semibold text-gray-700 mt-5 mb-2">{line.slice(3)}</h2>;
              if (line.startsWith("- **")) {
                const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
                if (match) return <div key={i} className="text-sm text-gray-600 py-0.5"><span className="font-medium text-gray-800">{match[1]}:</span> {match[2]}</div>;
              }
              if (line.match(/^\d+\./)) return <div key={i} className="text-sm text-gray-600 py-0.5 pl-4">{line}</div>;
              if (line.trim()) return <p key={i} className="text-sm text-gray-600">{line}</p>;
              return <div key={i} className="h-2" />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
