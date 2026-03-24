"use client";

import { useState, useEffect, useCallback } from "react";

interface ContentPost {
  id: string;
  title: string;
  body: string;
  scheduledDate: string;
  status: string;
  platform: string;
  performance: {
    impressions: number;
    engagement: number;
    clicks: number;
  };
}

const STATUS_OPTIONS = ["draft", "scheduled", "published"];
const PLATFORM_OPTIONS = ["x", "linkedin", "blog"];

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  scheduled: "bg-blue-100 text-blue-700",
  published: "bg-green-100 text-green-700",
};

const platformColors: Record<string, string> = {
  x: "bg-gray-900 text-white",
  linkedin: "bg-blue-600 text-white",
  blog: "bg-orange-100 text-orange-700",
};

export default function ContentCalendar() {
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ContentPost | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchPosts = useCallback(async () => {
    const { getAll } = await import("@/lib/static-data");
    const data = await getAll<ContentPost>("content");
    setPosts(data);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const filtered = posts.filter((p) => {
    if (filterStatus && p.status !== filterStatus) return false;
    if (filterPlatform && p.platform !== filterPlatform) return false;
    return true;
  });

  const handleNewPost = async (formData: FormData) => {
    const post = {
      title: formData.get("title") as string,
      body: formData.get("body") as string,
      scheduledDate: formData.get("scheduledDate") as string,
      status: formData.get("status") as string,
      platform: formData.get("platform") as string,
      performance: { impressions: 0, engagement: 0, clicks: 0 },
    };
    const { create } = await import("@/lib/static-data");
    await create<ContentPost>("content", post as Omit<ContentPost, "id">);
    setShowModal(false);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    const { remove } = await import("@/lib/static-data");
    await remove<ContentPost>("content", id);
    setSelectedPost(null);
    fetchPosts();
  };

  if (selectedPost) {
    return (
      <div className="animate-fade-in max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setSelectedPost(null)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            Back
          </button>
          <button onClick={() => handleDelete(selectedPost.id)} className="text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium">Delete</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${platformColors[selectedPost.platform] || "bg-gray-100 text-gray-600"}`}>
              {selectedPost.platform}
            </span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[selectedPost.status]}`}>
              {selectedPost.status}
            </span>
            <span className="text-[10px] text-gray-400 ml-auto">
              {new Date(selectedPost.scheduledDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-4">{selectedPost.title}</h1>
          <div className="prose prose-sm max-w-none">
            {selectedPost.body.split("\n").map((line, i) => {
              if (line.trim() === "") return <div key={i} className="h-3" />;
              return <p key={i} className="text-sm text-gray-700 leading-relaxed">{line}</p>;
            })}
          </div>
          {selectedPost.status === "published" && (
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
              <div>
                <div className="text-[10px] text-gray-400 uppercase">Impressions</div>
                <div className="text-lg font-semibold text-gray-900">{selectedPost.performance.impressions.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase">Engagement</div>
                <div className="text-lg font-semibold text-gray-900">{selectedPost.performance.engagement}%</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase">Clicks</div>
                <div className="text-lg font-semibold text-gray-900">{selectedPost.performance.clicks.toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Content Calendar</h1>
          <p className="text-sm text-gray-500 mt-0.5">{posts.length} posts planned</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">+ New Post</button>
      </div>

      <div className="flex gap-3 mb-6">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700">
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700">
          <option value="">All Platforms</option>
          {PLATFORM_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filtered
          .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
          .map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:border-sand-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${platformColors[post.platform] || "bg-gray-100 text-gray-600"}`}>
                {post.platform}
              </span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[post.status]}`}>
                {post.status}
              </span>
              <span className="text-[10px] text-gray-400 ml-auto">
                {new Date(post.scheduledDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <h3 className="font-medium text-gray-900">{post.title}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.body.slice(0, 200)}...</p>
            {post.status === "published" && post.performance.impressions > 0 && (
              <div className="flex gap-4 mt-3 text-[10px] text-gray-400">
                <span>{post.performance.impressions.toLocaleString()} impressions</span>
                <span>{post.performance.engagement}% engagement</span>
                <span>{post.performance.clicks.toLocaleString()} clicks</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">New Content Post</h2>
            <form action={handleNewPost} className="space-y-3">
              <input name="title" placeholder="Post title" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <select name="platform" className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {PLATFORM_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <select name="status" className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <input name="scheduledDate" type="datetime-local" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <textarea name="body" placeholder="Post content..." rows={8} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800">Create</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
