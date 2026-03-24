"use client";

import { useState, useEffect, useCallback } from "react";

interface FinanceData {
  budget: { total: number; spent: number; remaining: number };
  revenue: { total: number; monthly: { month: string; amount: number }[] };
  expenses: { id: string; category: string; description: string; amount: number; date: string; project: string }[];
  projectBudgets: { projectId: string; name: string; budget: number; spent: number }[];
}

function BarChart({ data, maxVal }: { data: { label: string; value: number }[]; maxVal: number }) {
  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="text-[10px] text-gray-500 font-medium">{d.value >= 1000 ? `${(d.value / 1000).toFixed(0)}k` : d.value}</div>
          <div className="w-full bg-gray-100 rounded-t-md relative" style={{ height: "100%" }}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-sand-400 rounded-t-md transition-all"
              style={{ height: `${(d.value / maxVal) * 100}%` }}
            />
          </div>
          <div className="text-[9px] text-gray-400">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

function PieChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulative = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          {segments.map((seg, i) => {
            const pct = (seg.value / total) * 100;
            const dashArray = `${pct} ${100 - pct}`;
            const dashOffset = -cumulative;
            cumulative += pct;
            return (
              <circle
                key={i}
                cx="18" cy="18" r="15.9"
                fill="transparent"
                stroke={seg.color}
                strokeWidth="3"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">${(total / 1000).toFixed(0)}k</div>
            <div className="text-[9px] text-gray-400">Total</div>
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-gray-600">{seg.label}</span>
            <span className="text-xs text-gray-400 ml-auto">${seg.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Finance() {
  const [data, setData] = useState<FinanceData | null>(null);

  const fetchFinance = useCallback(async () => {
    const { getObject } = await import("@/lib/static-data");
    const d = await getObject<FinanceData>("finance");
    setData(d);
  }, []);

  useEffect(() => { fetchFinance(); }, [fetchFinance]);

  if (!data) return <div className="animate-pulse text-sm text-gray-400 p-8">Loading finance data...</div>;

  const expensesByCategory = data.expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const categoryColors: Record<string, string> = {
    "Engineering": "#3B82F6",
    "Infrastructure": "#8B5CF6",
    "Marketing": "#F59E0B",
    "Operations": "#10B981",
    "Software": "#EC4899",
    "Salaries": "#6366F1",
  };

  const pieSegments = Object.entries(expensesByCategory).map(([label, value]) => ({
    label,
    value,
    color: categoryColors[label] || "#9CA3AF",
  }));

  const revenueChartData = data.revenue.monthly.map((m) => ({
    label: m.month.slice(0, 3),
    value: m.amount,
  }));

  const maxRevenue = Math.max(...data.revenue.monthly.map((m) => m.amount));
  const budgetUsedPct = Math.round((data.budget.spent / data.budget.total) * 100);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Finance</h1>
        <p className="text-sm text-gray-500 mt-0.5">Budget, revenue, and expense tracking</p>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-xs text-gray-500">Total Budget</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">${data.budget.total.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-xs text-gray-500">Spent</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">${data.budget.spent.toLocaleString()}</div>
          <div className="mt-2">
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className={`h-1.5 rounded-full ${budgetUsedPct > 80 ? "bg-red-500" : "bg-sand-400"}`} style={{ width: `${budgetUsedPct}%` }} />
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">{budgetUsedPct}% used</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-xs text-gray-500">Remaining</div>
          <div className="text-2xl font-semibold text-green-600 mt-1">${data.budget.remaining.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-xs text-gray-500">Total Revenue</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">${data.revenue.total.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Revenue</h3>
          <BarChart data={revenueChartData} maxVal={maxRevenue} />
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Expense Breakdown</h3>
          <PieChart segments={pieSegments} />
        </div>
      </div>

      {/* Project Budgets */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Project Budgets</h3>
        <div className="space-y-3">
          {data.projectBudgets.map((pb) => {
            const pct = Math.round((pb.spent / pb.budget) * 100);
            return (
              <div key={pb.projectId}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{pb.name}</span>
                  <span className="text-xs text-gray-500">${pb.spent.toLocaleString()} / ${pb.budget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${pct > 90 ? "bg-red-500" : pct > 70 ? "bg-yellow-500" : "bg-sand-400"}`} style={{ width: `${Math.min(100, pct)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Expenses</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] text-gray-400 uppercase tracking-wider">
              <th className="pb-2 font-semibold">Description</th>
              <th className="pb-2 font-semibold">Category</th>
              <th className="pb-2 font-semibold">Project</th>
              <th className="pb-2 font-semibold">Date</th>
              <th className="pb-2 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.expenses.slice(0, 8).map((expense) => (
              <tr key={expense.id} className="border-t border-gray-50">
                <td className="py-2 text-sm text-gray-700">{expense.description}</td>
                <td className="py-2 text-xs text-gray-500">{expense.category}</td>
                <td className="py-2 text-xs text-gray-500">{expense.project}</td>
                <td className="py-2 text-xs text-gray-400">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="py-2 text-sm text-gray-900 text-right font-medium">${expense.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
