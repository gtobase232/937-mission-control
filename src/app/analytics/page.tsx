"use client";

import { useState, useEffect, useCallback } from "react";

interface FollowerPoint {
  date: string;
  count: number;
}

interface ContentPerf {
  id: string;
  title: string;
  impressions: number;
  engagement: number;
  clicks: number;
  date: string;
}

interface TrafficSource {
  name: string;
  percentage: number;
}

interface TopPage {
  path: string;
  views: number;
}

interface CustomMetric {
  name: string;
  value: number;
  change: number;
  unit: string;
}

interface AnalyticsData {
  xMetrics: {
    followers: number;
    engagement: number;
    impressions: number;
    followersHistory: FollowerPoint[];
  };
  contentPerformance: ContentPerf[];
  websiteTraffic: {
    visitors: number;
    pageViews: number;
    bounceRate: number;
    topPages: TopPage[];
    sources: TrafficSource[];
  };
  customMetrics: CustomMetric[];
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  const fetchAnalytics = useCallback(async () => {
    const { getObject } = await import("@/lib/static-data");
    const d = await getObject<AnalyticsData>("analytics");
    setData(d);
  }, []);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  if (!data) return <div className="animate-pulse text-sm text-gray-400 p-8">Loading analytics...</div>;

  const maxFollowers = Math.max(...data.xMetrics.followersHistory.map((p) => p.count));

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Metrics & performance overview</p>
      </div>

      {/* Custom Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {data.customMetrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">{metric.name}</div>
            <div className="text-2xl font-semibold text-gray-900 mt-1">
              {metric.unit === "$" ? `$${metric.value.toLocaleString()}` : metric.value.toLocaleString()}
              {metric.unit !== "$" && <span className="text-xs text-gray-400 ml-1">{metric.unit}</span>}
            </div>
            <div className={`text-xs mt-1 ${metric.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {metric.change >= 0 ? "+" : ""}{metric.change}%
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* X Metrics */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">X (Twitter) Growth</h3>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-semibold text-gray-900">{data.xMetrics.followers.toLocaleString()}</span>
            <span className="text-xs text-gray-400">followers</span>
            <span className="text-xs text-gray-400 ml-auto">{data.xMetrics.engagement}% engagement</span>
          </div>
          <div className="flex items-end gap-1 h-32">
            {data.xMetrics.followersHistory.map((point, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-sand-400 rounded-t-sm transition-all"
                  style={{ height: `${(point.count / maxFollowers) * 100}%` }}
                />
                <div className="text-[8px] text-gray-400">{point.date.slice(5)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Website Traffic</h3>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-semibold text-gray-900">{data.websiteTraffic.visitors.toLocaleString()}</span>
            <span className="text-xs text-gray-400">visitors</span>
            <span className="text-xs text-gray-400 ml-auto">{data.websiteTraffic.bounceRate}% bounce</span>
          </div>
          <div className="space-y-2">
            {data.websiteTraffic.sources.map((source) => (
              <div key={source.name}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs text-gray-600">{source.name}</span>
                  <span className="text-xs text-gray-400">{source.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-sand-400 h-1.5 rounded-full" style={{ width: `${source.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Top Content Performance</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] text-gray-400 uppercase tracking-wider">
              <th className="pb-2 font-semibold">Content</th>
              <th className="pb-2 font-semibold text-right">Impressions</th>
              <th className="pb-2 font-semibold text-right">Engagement</th>
              <th className="pb-2 font-semibold text-right">Clicks</th>
              <th className="pb-2 font-semibold text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.contentPerformance
              .sort((a, b) => b.impressions - a.impressions)
              .map((content) => (
              <tr key={content.id} className="border-t border-gray-50">
                <td className="py-2.5 text-sm text-gray-700 max-w-xs truncate">{content.title}</td>
                <td className="py-2.5 text-sm text-gray-900 text-right font-medium">{content.impressions.toLocaleString()}</td>
                <td className="py-2.5 text-sm text-gray-600 text-right">{content.engagement}%</td>
                <td className="py-2.5 text-sm text-gray-600 text-right">{content.clicks.toLocaleString()}</td>
                <td className="py-2.5 text-xs text-gray-400 text-right">{new Date(content.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Top Pages</h3>
        <div className="space-y-2">
          {data.websiteTraffic.topPages.map((page) => (
            <div key={page.path} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 font-mono">{page.path}</span>
              <span className="text-sm text-gray-900 font-medium">{page.views.toLocaleString()} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
