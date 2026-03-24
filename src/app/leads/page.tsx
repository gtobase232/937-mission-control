"use client";

import { useState, useEffect, useCallback } from "react";

interface Interaction {
  date: string;
  type: string;
  note: string;
}

interface Lead {
  id: string;
  company: string;
  contact: string;
  xHandle: string;
  fundingAmount: string;
  stage: string;
  notes: string;
  interactions: Interaction[];
  createdAt: string;
}

const STAGES = [
  { id: "discovery", label: "Discovery" },
  { id: "researched", label: "Researched" },
  { id: "outreach", label: "Outreach" },
  { id: "response", label: "Response" },
  { id: "call", label: "Call" },
  { id: "proposal", label: "Proposal" },
  { id: "closed_won", label: "Won" },
  { id: "closed_lost", label: "Lost" },
];

const stageColors: Record<string, string> = {
  discovery: "border-t-gray-400",
  researched: "border-t-blue-400",
  outreach: "border-t-yellow-400",
  response: "border-t-orange-400",
  call: "border-t-purple-400",
  proposal: "border-t-indigo-400",
  closed_won: "border-t-green-500",
  closed_lost: "border-t-red-400",
};

export default function LeadPipeline() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [draggedLead, setDraggedLead] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    const { getAll } = await import("@/lib/static-data");
    const data = await getAll<Lead>("leads");
    setLeads(data);
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleDrop = async (stage: string) => {
    if (!draggedLead) return;
    const lead = leads.find((l) => l.id === draggedLead);
    if (!lead || lead.stage === stage) { setDraggedLead(null); return; }
    const { update } = await import("@/lib/static-data");
    await update<Lead>("leads", draggedLead, { ...lead, stage } as Partial<Lead>);
    setDraggedLead(null);
    fetchLeads();
  };

  const handleNewLead = async (formData: FormData) => {
    const lead = {
      company: formData.get("company") as string,
      contact: formData.get("contact") as string,
      xHandle: formData.get("xHandle") as string,
      fundingAmount: formData.get("fundingAmount") as string,
      stage: "discovery",
      notes: formData.get("notes") as string,
      interactions: [],
    };
    const { create } = await import("@/lib/static-data");
    await create<Lead>("leads", lead as unknown as Omit<Lead, "id">);
    setShowModal(false);
    fetchLeads();
  };

  if (selectedLead) {
    return (
      <div className="animate-fade-in max-w-3xl">
        <button onClick={() => setSelectedLead(null)} className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          Back to Pipeline
        </button>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{selectedLead.company}</h1>
              <p className="text-sm text-gray-500 mt-1">{selectedLead.contact}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600`}>
              {STAGES.find((s) => s.id === selectedLead.stage)?.label}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-[10px] text-gray-400 uppercase">X Handle</div>
              <div className="text-sm text-gray-700 mt-0.5">{selectedLead.xHandle || "—"}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Funding</div>
              <div className="text-sm text-gray-700 mt-0.5">{selectedLead.fundingAmount || "—"}</div>
            </div>
          </div>
          {selectedLead.notes && (
            <div className="mt-4 bg-gray-50 rounded-lg p-3">
              <div className="text-[10px] text-gray-400 uppercase mb-1">Notes</div>
              <p className="text-sm text-gray-700">{selectedLead.notes}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Interaction History</h3>
          {selectedLead.interactions.length > 0 ? (
            <div className="space-y-3">
              {selectedLead.interactions.map((interaction, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-sand-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-700">{interaction.type}</span>
                      <span className="text-[10px] text-gray-400">{new Date(interaction.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{interaction.note}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400">No interactions recorded yet.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Lead Pipeline</h1>
          <p className="text-sm text-gray-500 mt-0.5">{leads.length} leads in pipeline</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">+ Add Lead</button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGES.map((stage) => (
          <div
            key={stage.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(stage.id)}
            className="min-w-[180px] flex-1"
          >
            <div className="flex items-center justify-between mb-2 px-1">
              <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{stage.label}</h3>
              <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                {leads.filter((l) => l.stage === stage.id).length}
              </span>
            </div>
            <div className="bg-gray-50 rounded-xl p-2 min-h-[300px] space-y-2">
              {leads
                .filter((l) => l.stage === stage.id)
                .map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => setDraggedLead(lead.id)}
                    onClick={() => setSelectedLead(lead)}
                    className={`kanban-card bg-white rounded-lg p-3 border border-gray-200 border-t-2 ${stageColors[lead.stage]} cursor-pointer`}
                  >
                    <h4 className="text-xs font-medium text-gray-900">{lead.company}</h4>
                    <p className="text-[10px] text-gray-500 mt-1">{lead.contact}</p>
                    {lead.fundingAmount && (
                      <div className="text-[10px] text-sand-600 font-medium mt-1.5">{lead.fundingAmount}</div>
                    )}
                    {lead.xHandle && (
                      <div className="text-[10px] text-gray-400 mt-0.5">{lead.xHandle}</div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* New Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">New Lead</h2>
            <form action={handleNewLead} className="space-y-3">
              <input name="company" placeholder="Company name" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input name="contact" placeholder="Contact name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input name="xHandle" placeholder="X handle (e.g. @company)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input name="fundingAmount" placeholder="Funding amount (e.g. $5M Series A)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <textarea name="notes" placeholder="Notes" rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800">Add Lead</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
