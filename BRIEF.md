# Black Sand Mission Control

## Mission Statements (always visible at top of every screen)
**Internal:** Build an autonomous AI workforce that eliminates every repetitive task from Trinkster, Sergio, and Juan Andres's businesses — so they only touch decisions that require human judgment. Every tool we build serves us first, then becomes a product.
**External:** We build AI agents that run your operations while you run your vision. From project management to sales to finance — your company works 24/7, even when you don't.

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Clean, Apple-feeling interface (minimal, white space, SF Pro feel, subtle shadows, rounded corners)
- Local hosting (localhost:3000)
- Use local JSON files or SQLite for data persistence (no external DB needed yet)

## Design System
- Clean Apple aesthetic: lots of white space, subtle gray borders, smooth transitions
- Font: Inter or system font stack
- Color palette: Black primary, subtle grays, one accent color (warm sand/gold #C4A265 for Black Sand branding)
- Dark mode support
- Responsive but desktop-first

## Screens to Build

### 1. Task Board (/tasks)
- Kanban board with columns: Backlog, In Progress, Review, Done
- Each task has: title, description, assignee (Wolve/Trinkster/Team), priority (P0-P3), due date, project tag
- Filter by assignee, project, priority
- API endpoint to read tasks (so heartbeat can check for assigned tasks)
- Add/edit/delete tasks inline

### 2. Calendar (/calendar)
- Monthly/weekly/daily views
- Shows scheduled activities for all team members and agents
- Color coded by: person, project, type (meeting, deadline, work session)
- My daily work sessions should appear: 2PM afternoon, 11PM night, 7AM morning report
- Add/edit events

### 3. Projects (/projects)
- Grid/list of all active projects with status cards
- Click into project → detailed view with:
  - Project description, timeline, status
  - KPI tracker (custom KPIs per project, e.g., leads found, revenue, completion %)
  - Progress bar
  - Related tasks from Task Board
  - Related documents from Docs

### 4. Memory (/memory)
- Daily conversation logs organized by date (YYYY-MM-DD)
- Click a day → see full conversation log
- Long-Term Memory section showing MEMORY.md content
- Searchable across all dates
- Read from workspace memory/ directory

### 5. Docs (/docs)
- Document library organized by project
- Categories/tags for filtering
- Search across all documents
- Markdown rendering
- Create new docs, edit existing ones
- Auto-discovers files from workspace

### 6. Team (/team)
- Cards for each agent and sub-agent
- Shows: name, role, status (active/idle/offline), current task
- Their role relative to Black Sand mission
- Performance metrics (tasks completed, uptime)

### 7. Office (/office)
- 2D pixel art office environment
- Desk, computers, posters on walls (Black Sand branding), chairs, plants, coffee machine
- Agent avatars (pixel art style) that move to their desk when working
- Status indicators: working (at desk typing), idle (standing around), offline (desk empty)
- Fun and visual — this is the soul of Mission Control
- Use HTML5 Canvas or CSS pixel art

### 8. Finance (/finance)
- Budget overview: total budget, spent, remaining
- Revenue tracker
- Expense categories
- Per-project financial breakdown
- Charts (bar, line, pie)

### 9. Lead Pipeline (/leads)
- Kanban: Discovery → Researched → Outreach → Response → Call → Proposal → Closed Won/Lost
- Lead cards with: company name, X handle, funding amount, contact, notes
- Click lead → detailed view with all interactions
- Add leads manually or via API

### 10. Analytics (/analytics)
- X account metrics (followers, engagement, impressions)
- Content performance tracker
- Website traffic (placeholder for now)
- Custom metric cards

### 11. Content Calendar (/content)
- Calendar view for planned X posts
- Draft, scheduled, published states
- Content editor with preview
- Performance tracking per post

## Navigation
- Left sidebar with icons + labels for each screen
- Mission statement banner at top of every page
- Global search
- Notification bell (for task updates, agent completions)
- Current date/time display

## Data Storage
- Use local JSON files in a /data directory for MVP
- Each screen has its own data file (tasks.json, projects.json, leads.json, etc.)
- Memory screen reads directly from the OpenClaw workspace memory/ folder
- API routes in Next.js for CRUD operations

## Important
- This is an MVP. Make it functional and clean first.
- Every screen must show the mission statement at the top
- Apple-clean aesthetic is NON-NEGOTIABLE
- Make it feel premium even though it's an internal tool
