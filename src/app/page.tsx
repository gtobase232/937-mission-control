import Link from "next/link";

const screens = [
  { href: "/tasks", label: "Task Board", desc: "Kanban board for all tasks", icon: "check-square" },
  { href: "/calendar", label: "Calendar", desc: "Team schedules & events", icon: "calendar" },
  { href: "/projects", label: "Projects", desc: "Active projects & KPIs", icon: "folder" },
  { href: "/memory", label: "Memory", desc: "Conversation logs & long-term memory", icon: "brain" },
  { href: "/docs", label: "Docs", desc: "Document library", icon: "file-text" },
  { href: "/team", label: "Team", desc: "Agents & team members", icon: "users" },
  { href: "/office", label: "Office", desc: "Virtual pixel art office", icon: "monitor" },
  { href: "/finance", label: "Finance", desc: "Budget & revenue tracking", icon: "dollar" },
  { href: "/leads", label: "Lead Pipeline", desc: "Sales pipeline & outreach", icon: "target" },
  { href: "/analytics", label: "Analytics", desc: "Metrics & performance", icon: "bar-chart" },
  { href: "/content", label: "Content Calendar", desc: "Social media planning", icon: "edit" },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Mission Control</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back. Here&apos;s your command center.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {screens.map((screen) => (
          <Link
            key={screen.href}
            href={screen.href}
            className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-sand-400 hover:shadow-md transition-all"
          >
            <h3 className="font-medium text-gray-900 group-hover:text-sand-600 transition-colors">
              {screen.label}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{screen.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
