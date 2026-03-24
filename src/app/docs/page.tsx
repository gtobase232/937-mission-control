"use client";

import { useState, useEffect, useCallback } from "react";

interface Doc {
  id: string;
  title: string;
  content: string;
  project: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = ["guide", "brief", "spec", "report"];

export default function Docs() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [selected, setSelected] = useState<Doc | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [showNewDoc, setShowNewDoc] = useState(false);

  const fetchDocs = useCallback(async () => {
    const { getAll } = await import("@/lib/static-data");
    const data = await getAll<Doc>("docs");
    setDocs(data);
  }, []);

  useEffect(() => { fetchDocs(); }, [fetchDocs]);

  const filtered = docs.filter((d) => {
    if (filterCategory && d.category !== filterCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return d.title.toLowerCase().includes(q) || d.content.toLowerCase().includes(q) || d.tags.some((t) => t.toLowerCase().includes(q));
    }
    return true;
  });

  const handleSaveEdit = async () => {
    if (!selected) return;
    const { update } = await import("@/lib/static-data");
    await update<Doc>("docs", selected.id, { content: editContent, updatedAt: new Date().toISOString() } as Partial<Doc>);
    setEditing(false);
    setSelected({ ...selected, content: editContent });
    fetchDocs();
  };

  const handleNewDoc = async (formData: FormData) => {
    const doc = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      project: formData.get("project") as string,
      category: formData.get("category") as string,
      tags: (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean),
    };
    const { create } = await import("@/lib/static-data");
    await create<Doc>("docs", doc as Omit<Doc, "id">);
    setShowNewDoc(false);
    fetchDocs();
  };

  const handleDelete = async (id: string) => {
    const { remove } = await import("@/lib/static-data");
    await remove<Doc>("docs", id);
    setSelected(null);
    fetchDocs();
  };

  const renderMarkdown = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("### ")) return <h3 key={i} className="text-base font-semibold text-gray-800 mt-4 mb-1">{line.slice(4)}</h3>;
      if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-semibold text-gray-800 mt-5 mb-2">{line.slice(3)}</h2>;
      if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-bold text-gray-900 mt-4 mb-2">{line.slice(2)}</h1>;
      if (line.startsWith("- ")) return <li key={i} className="text-sm text-gray-700 ml-4 list-disc">{line.slice(2)}</li>;
      if (line.match(/^\d+\./)) return <li key={i} className="text-sm text-gray-700 ml-4 list-decimal">{line.replace(/^\d+\.\s*/, "")}</li>;
      if (line.startsWith("```")) return <div key={i} className="text-xs bg-gray-100 rounded px-2 py-1 font-mono my-1">{line.slice(3)}</div>;
      if (line.startsWith("> ")) return <blockquote key={i} className="text-sm text-gray-600 border-l-2 border-sand-400 pl-3 italic my-2">{line.slice(2)}</blockquote>;
      if (line.trim() === "") return <div key={i} className="h-3" />;
      return <p key={i} className="text-sm text-gray-700 leading-relaxed">{line}</p>;
    });
  };

  const categoryColors: Record<string, string> = {
    guide: "bg-green-100 text-green-700",
    brief: "bg-blue-100 text-blue-700",
    spec: "bg-purple-100 text-purple-700",
    report: "bg-orange-100 text-orange-700",
  };

  if (selected) {
    return (
      <div className="animate-fade-in max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => { setSelected(null); setEditing(false); }} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            Back
          </button>
          <div className="flex gap-2">
            {editing ? (
              <button onClick={handleSaveEdit} className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-800">Save</button>
            ) : (
              <button onClick={() => { setEditing(true); setEditContent(selected.content); }} className="border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50">Edit</button>
            )}
            <button onClick={() => handleDelete(selected.id)} className="text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium">Delete</button>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[selected.category] || "bg-gray-100 text-gray-600"}`}>{selected.category}</span>
            <span className="text-[10px] text-gray-400">{selected.project}</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-4">{selected.title}</h1>
          {editing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full min-h-[400px] border border-gray-200 rounded-lg p-4 text-sm font-mono"
            />
          ) : (
            <div className="prose prose-sm max-w-none">{renderMarkdown(selected.content)}</div>
          )}
          <div className="flex gap-1.5 mt-6 pt-4 border-t border-gray-100">
            {selected.tags.map((tag) => (
              <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Docs</h1>
          <p className="text-sm text-gray-500 mt-0.5">{docs.length} documents</p>
        </div>
        <button onClick={() => setShowNewDoc(true)} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">+ New Doc</button>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search documents..."
          className="flex-1 max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((doc) => (
          <div key={doc.id} onClick={() => setSelected(doc)} className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:border-sand-400 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[doc.category] || "bg-gray-100 text-gray-600"}`}>{doc.category}</span>
              <span className="text-[10px] text-gray-400">{doc.project}</span>
            </div>
            <h3 className="font-medium text-gray-900">{doc.title}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{doc.content.slice(0, 150)}...</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-1">
                {doc.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded">{tag}</span>
                ))}
              </div>
              <span className="text-[10px] text-gray-400">{new Date(doc.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Doc Modal */}
      {showNewDoc && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowNewDoc(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">New Document</h2>
            <form action={handleNewDoc} className="space-y-3">
              <input name="title" placeholder="Document title" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <select name="category" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input name="project" placeholder="Project" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input name="tags" placeholder="Tags (comma-separated)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <textarea name="content" placeholder="Document content (Markdown)" rows={8} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono" />
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800">Create</button>
                <button type="button" onClick={() => setShowNewDoc(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
