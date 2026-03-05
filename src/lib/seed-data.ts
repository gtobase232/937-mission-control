import { Task, CalendarEvent, Project, MemoryEntry, Doc, TeamMember, FinanceEntry, Lead, AnalyticsData, ContentPost } from './types';

export const seedTasks: Task[] = [
  { id: '1', title: 'LIQD brand guidelines v2', description: 'Finalize updated brand guidelines for LIQD — typography, color system, logo usage rules', assignee: 'Trinkster', priority: 'critical', status: 'in-progress', dueDate: '2026-03-10', createdAt: '2026-03-01' },
  { id: '2', title: 'Content calendar — March', description: 'Plan and schedule Instagram/X content for all active client campaigns', assignee: 'Both', priority: 'high', status: 'todo', dueDate: '2026-03-08', createdAt: '2026-03-01' },
  { id: '3', title: 'Social media audit — LIQD', description: 'Full audit of LIQD social channels: engagement rates, content gaps, competitor analysis', assignee: 'Trinkster', priority: 'high', status: 'in-progress', dueDate: '2026-03-12', createdAt: '2026-03-02' },
  { id: '4', title: 'Website copy for 937 portfolio', description: 'Write compelling copy for the 937 Studio website case studies section', assignee: 'Trinkster', priority: 'medium', status: 'review', dueDate: '2026-03-06', createdAt: '2026-03-01' },
  { id: '5', title: 'Brand proposal — new crypto client', description: 'Create brand identity proposal for incoming fintech/crypto lead', assignee: 'Both', priority: 'critical', status: 'todo', dueDate: '2026-03-07', createdAt: '2026-03-02' },
  { id: '6', title: 'Website redesign — Zama', description: 'Complete website redesign mockups for Zama (reference client)', assignee: 'Both', priority: 'high', status: 'backlog', dueDate: '2026-03-20', createdAt: '2026-03-03' },
  { id: '7', title: 'Mood board — LIQD campaign', description: 'Create visual mood board for LIQD Q2 content campaign', assignee: 'Trinkster', priority: 'medium', status: 'done', dueDate: '2026-03-04', createdAt: '2026-02-28' },
  { id: '8', title: 'Weekly Instagram content plan', description: 'Plan and schedule Instagram posts for the upcoming week across clients', assignee: 'Both', priority: 'medium', status: 'todo', dueDate: '2026-03-05', createdAt: '2026-03-03' },
  { id: '9', title: 'Design system — 937 internal', description: 'Build internal design system with reusable components for faster client delivery', assignee: 'Both', priority: 'critical', status: 'backlog', dueDate: '2026-03-15', createdAt: '2026-03-03' },
  { id: '10', title: 'Client onboarding deck', description: 'Design the onboarding presentation for new 937 clients', assignee: 'Trinkster', priority: 'high', status: 'backlog', dueDate: '2026-03-18', createdAt: '2026-03-03' },
];

export const seedCalendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Team standup', date: '2026-03-04', time: '09:00', assignee: 'Both', type: 'meeting' },
  { id: '2', title: 'LIQD brand review call', date: '2026-03-06', time: '14:00', assignee: 'Both', type: 'meeting' },
  { id: '3', title: 'Content shoot — LIQD', date: '2026-03-10', time: '10:00', assignee: 'Trinkster', type: 'launch' },
  { id: '4', title: 'Design review — website mockups', date: '2026-03-08', time: '16:00', assignee: 'Both', type: 'review' },
  { id: '5', title: 'Sprint review', date: '2026-03-14', time: '11:00', assignee: 'Both', type: 'review' },
  { id: '6', title: 'CDMX Creative Meetup', date: '2026-03-12', time: '18:00', assignee: 'Both', type: 'other' },
  { id: '7', title: 'Zama website deadline', date: '2026-03-20', time: '23:59', assignee: 'Both', type: 'deadline' },
  { id: '8', title: 'Content strategy session', date: '2026-03-05', time: '15:00', assignee: 'Both', type: 'meeting' },
];

export const seedProjects: Project[] = [
  {
    id: '1', name: 'Brand Identity', description: 'Full brand identity services — logos, color systems, typography, brand guidelines, and visual language for clients.',
    status: 'active', progress: 65,
    kpis: [{ label: 'Brands Delivered', value: '8', target: '15' }, { label: 'Client Satisfaction', value: '96%', target: '95%' }, { label: 'Avg Turnaround', value: '12 days', target: '10 days' }]
  },
  {
    id: '2', name: 'Content Production', description: 'End-to-end content production — photography, video, copywriting, and asset creation for social and web.',
    status: 'active', progress: 40,
    kpis: [{ label: 'Assets Created', value: '340', target: '500' }, { label: 'Engagement Rate', value: '4.8%', target: '5%' }, { label: 'Posts Published', value: '128', target: '200' }]
  },
  {
    id: '3', name: 'Social Media Management', description: 'Full-service social media management — strategy, content calendars, community management, and analytics reporting.',
    status: 'active', progress: 55,
    kpis: [{ label: 'Accounts Managed', value: '6', target: '10' }, { label: 'Follower Growth', value: '+32%', target: '+40%' }, { label: 'Monthly Reach', value: '850K', target: '1M' }]
  },
  {
    id: '4', name: 'Web Design', description: 'Custom website design and development — landing pages, portfolios, and brand sites built for conversion.',
    status: 'planning', progress: 15,
    kpis: [{ label: 'Sites Delivered', value: '3', target: '10' }, { label: 'Avg Load Time', value: '1.2s', target: '1s' }, { label: 'Client Revenue', value: '$18K', target: '$50K' }]
  },
];

export const seedMemoryEntries: MemoryEntry[] = [
  { id: '1', date: '2026-03-04', content: 'Decided to position 937 as a premium creative studio focused on crypto, AI, and fintech brands. CDMX gives us cost advantage with global-tier output.', category: 'decision' },
  { id: '2', date: '2026-03-03', content: 'Instagram reels outperforming static posts 3x for client accounts. Key insight: behind-the-scenes content drives highest engagement.', category: 'insight' },
  { id: '3', date: '2026-03-02', content: 'Completed LIQD brand guidelines v1 delivery. $8K project fee collected. Client requesting ongoing retainer.', category: 'milestone' },
  { id: '4', date: '2026-03-01', content: 'Met 3 potential clients at CDMX design event. Two crypto companies showed strong interest in full rebrand. Follow up scheduled for March 6.', category: 'note' },
  { id: '5', date: '2026-02-28', content: 'Social media management for LIQD achieving 4.8% engagement rate — well above industry average of 1.5%. Carousel format working best on Instagram.', category: 'insight' },
  { id: '6', date: '2026-02-25', content: 'Decided on pricing model: Brand Identity $8K-25K, Content Production $3K-8K/month retainer, Social Media $2K-6K/month, Web Design $5K-15K per project.', category: 'decision' },
  { id: '7', date: '2026-02-20', content: 'Hit 2,500 followers on Instagram. Engagement rate at 5.1% — strong organic growth from portfolio posts and process videos.', category: 'milestone' },
  { id: '8', date: '2026-02-18', content: 'Zama website redesign concept approved by client. Full build starts next week. Target delivery in 3 weeks.', category: 'milestone' },
];

export const seedDocs: Doc[] = [
  { id: '1', title: 'Brand Identity Process', project: 'Brand Identity', content: '# Brand Identity Process\n\n## Our Approach\n\n937 follows a **4-phase brand identity process**:\n\n1. **Discovery** — Client interviews, market research, competitive analysis\n2. **Strategy** — Brand positioning, voice & tone, visual direction\n3. **Design** — Logo system, color palette, typography, visual language\n4. **Delivery** — Brand guidelines document, asset library, team training\n\n## Deliverables\n- Logo system (primary, secondary, icon)\n- Color palette (primary, secondary, accent)\n- Typography system\n- Brand guidelines PDF\n- Social media templates\n- Business card & stationery design\n\n## Timeline\n- Discovery: 1 week\n- Strategy: 1 week\n- Design: 2-3 weeks\n- Revisions & Delivery: 1 week', updatedAt: '2026-03-03', tags: ['process', 'brand'] },
  { id: '2', title: 'Content Production Playbook', project: 'Content Production', content: '# Content Production Playbook\n\n## Strategy\n\n### Content Pillars\n- **Behind the scenes** — studio life, process, team\n- **Client work** — case studies, before/after, results\n- **Industry insights** — trends, tips, thought leadership\n- **Culture** — CDMX life, creative community, events\n\n### Posting Schedule\n1. **Instagram**: 5x/week (3 feed, 2 reels)\n2. **X/Twitter**: Daily threads + engagement\n3. **LinkedIn**: 2x/week (case studies, insights)\n\n### Metrics to Track\n- Engagement rate > 4%\n- Follower growth > 8%/month\n- DM inquiries > 10/week', updatedAt: '2026-03-02', tags: ['content', 'playbook'] },
  { id: '3', title: 'Social Media Audit Template', project: 'Social Media Management', content: '# Social Media Audit Template\n\n## Audit Framework\n\n### Account Analysis\n- Profile optimization (bio, links, highlights)\n- Content quality and consistency\n- Posting frequency and timing\n- Engagement patterns\n\n### Competitive Analysis\n- Top 5 competitors identified\n- Content strategy comparison\n- Engagement benchmarking\n- Gap and opportunity identification\n\n### Recommendations\n- Content strategy adjustments\n- Posting schedule optimization\n- Community management improvements\n- Paid amplification opportunities\n\n### Reporting\n- Monthly performance reports\n- Quarterly strategy reviews\n- Annual brand health check', updatedAt: '2026-03-01', tags: ['social', 'template'] },
  { id: '4', title: '937 Brand Guidelines', project: 'Brand Identity', content: '# 937 Studio Brand Guidelines\n\n## Brand Identity\n\n### Colors\n- Primary: #0a0a0a (Black)\n- Accent: #8B5CF6 (Studio Purple)\n- White: #ffffff\n\n### Voice\n- **Confident** but not arrogant\n- **Creative** but strategic\n- **Bold** but refined\n\n### Mission\n"We craft brands that move culture forward. Design, strategy, content — built to dominate."\n\n### Tagline Options\n- "Brands that hit different."\n- "Design with intent."\n- "Culture-forward creative."', updatedAt: '2026-03-04', tags: ['brand', 'design'] },
  { id: '5', title: 'Client Proposal Template', project: 'Brand Identity', content: '# Client Proposal Template\n\n## Sections\n\n### 1. Introduction\n937 Studio overview and relevant case studies.\n\n### 2. Understanding\nClient brief summary and our interpretation of the challenge.\n\n### 3. Approach\nProposed strategy and creative direction.\n\n### 4. Scope of Work\nDetailed deliverables list with timeline.\n\n```\nPhase 1: Discovery (Week 1)\nPhase 2: Strategy (Week 2)\nPhase 3: Design (Weeks 3-4)\nPhase 4: Delivery (Week 5)\n```\n\n### 5. Investment\nPricing breakdown by phase.\n\n### 6. Case Studies\n2-3 relevant past projects with results.', updatedAt: '2026-03-03', tags: ['proposal', 'template'] },
];

export const seedTeam: TeamMember[] = [
  { id: '1', name: 'Trinkster', role: 'Creative Director', status: 'active', currentTask: 'Leading LIQD brand identity project', avatar: '🎨' },
  { id: '2', name: 'Check Rossi', role: 'Architect', status: 'active', currentTask: 'Designing Zama website architecture', avatar: '🏛️' },
  { id: '3', name: 'Maya Solano', role: 'Content Strategist', status: 'active', currentTask: 'Planning March content calendars', avatar: '📋' },
  { id: '4', name: 'Diego Reyes', role: 'Graphic Designer', status: 'active', currentTask: 'Creating social media assets for LIQD', avatar: '🖌️' },
];

export const seedFinance: FinanceEntry[] = [
  { id: '1', project: 'Brand Identity', type: 'revenue', category: 'Project Fee', amount: 8000, date: '2026-03-01', description: 'LIQD — brand guidelines project' },
  { id: '2', project: 'Social Media Management', type: 'revenue', category: 'Retainer', amount: 4500, date: '2026-03-01', description: 'LIQD — monthly social media retainer' },
  { id: '3', project: 'Content Production', type: 'revenue', category: 'Retainer', amount: 3000, date: '2026-03-01', description: 'Content production retainer — 2 clients' },
  { id: '4', project: 'Web Design', type: 'revenue', category: 'Project Fee', amount: 5000, date: '2026-03-01', description: 'Zama — website redesign deposit' },
  { id: '5', project: 'Brand Identity', type: 'revenue', category: 'Project Fee', amount: 3500, date: '2026-03-01', description: 'Small brand refresh project' },
  { id: '6', project: 'Content Production', type: 'expense', category: 'Freelancers', amount: 2500, date: '2026-03-01', description: 'Freelance photographers & videographers' },
  { id: '7', project: 'General', type: 'expense', category: 'Software', amount: 800, date: '2026-03-01', description: 'Figma, Adobe CC, Notion, scheduling tools' },
  { id: '8', project: 'Social Media Management', type: 'expense', category: 'Tools', amount: 400, date: '2026-03-01', description: 'Social media management & analytics tools' },
  { id: '9', project: 'General', type: 'expense', category: 'Operations', amount: 1500, date: '2026-03-01', description: 'CDMX studio space & utilities' },
  { id: '10', project: 'General', type: 'expense', category: 'Marketing', amount: 600, date: '2026-03-01', description: '937 own marketing & portfolio site hosting' },
];

export const seedLeads: Lead[] = [
  { id: '1', company: 'LIQD', contact: 'Marcus Chen', value: 15000, stage: 'closed', notes: 'Active client — brand identity + social media management retainer. Expanding scope Q2.', lastContact: '2026-03-04' },
  { id: '2', company: 'Zama', contact: 'Sophie Laurent', value: 12000, stage: 'proposal', notes: 'Website redesign project. Concept approved, finalizing full build scope.', lastContact: '2026-03-03' },
  { id: '3', company: 'Gnosis', contact: 'Stefan Mueller', value: 20000, stage: 'discovery', notes: 'Full rebrand inquiry. Lost previous agency, looking for new creative partner. High potential.', lastContact: '2026-03-02' },
  { id: '4', company: 'Aleo', contact: 'David Park', value: 18000, stage: 'call', notes: 'Privacy-focused blockchain. Need brand identity + content strategy for mainnet launch.', lastContact: '2026-03-01' },
  { id: '5', company: 'Aztec Protocol', contact: 'Elena Vasquez', value: 25000, stage: 'outreach', notes: 'ZK-rollup protocol. Interested in full rebrand + social media management.', lastContact: '2026-03-03' },
  { id: '6', company: 'Penumbra', contact: 'James Wei', value: 10000, stage: 'call', notes: 'Privacy DeFi protocol. Looking for content production and social media help.', lastContact: '2026-03-02' },
  { id: '7', company: 'Monad', contact: 'Kenji Tanaka', value: 30000, stage: 'discovery', notes: 'Layer 1 blockchain. Need full brand identity, website, and launch campaign.', lastContact: '2026-02-28' },
  { id: '8', company: 'Scroll', contact: 'Lisa Zhang', value: 15000, stage: 'proposal', notes: 'ZK-EVM rollup. Brand refresh + content calendar for ecosystem growth phase.', lastContact: '2026-03-02' },
];

export const seedAnalytics: AnalyticsData = {
  xFollowers: [
    { date: '2026-02-01', count: 1200 },
    { date: '2026-02-08', count: 1450 },
    { date: '2026-02-15', count: 1780 },
    { date: '2026-02-22', count: 2100 },
    { date: '2026-03-01', count: 2500 },
    { date: '2026-03-04', count: 2750 },
  ],
  contentPerformance: [
    { title: 'Brand identity process reel (Instagram)', impressions: 65000, engagement: 3200, clicks: 1100 },
    { title: 'LIQD case study thread (X)', impressions: 42000, engagement: 2400, clicks: 890 },
    { title: 'Creative studio life in CDMX', impressions: 38000, engagement: 2100, clicks: 520 },
    { title: 'Design trends 2026 carousel', impressions: 28000, engagement: 1800, clicks: 640 },
    { title: 'Before/after brand transformation', impressions: 52000, engagement: 3600, clicks: 950 },
  ],
  conversionRates: [
    { source: 'Instagram', visitors: 4200, leads: 52, rate: 1.2 },
    { source: 'X (Twitter)', visitors: 2800, leads: 38, rate: 1.4 },
    { source: 'Portfolio Site', visitors: 3500, leads: 42, rate: 1.2 },
    { source: 'Referrals', visitors: 300, leads: 24, rate: 8.0 },
    { source: 'LinkedIn', visitors: 1200, leads: 18, rate: 1.5 },
  ],
};

export const seedContentPosts: ContentPost[] = [
  { id: '1', title: 'Reel: Our brand identity process in 60 seconds', content: 'Watch how we take a brand from zero to iconic in just 5 weeks.\n\nDiscovery → Strategy → Design → Delivery\n\nEvery detail matters. Every decision is intentional.\n\n#BrandIdentity #Design #937Studio', scheduledDate: '2026-03-04', scheduledTime: '10:00', status: 'published', platform: 'both', impressions: 18000, engagement: 1200 },
  { id: '2', title: 'Behind the scenes: Studio day in CDMX', content: 'A day inside 937 Studio.\n\nMorning light in our CDMX studio hits different. Coffee, mood boards, and pixel-perfect designs.\n\nThis is where brands are born.', scheduledDate: '2026-03-05', scheduledTime: '14:00', status: 'scheduled', platform: 'both' },
  { id: '3', title: 'Case study: How we rebranded LIQD', content: 'LIQD came to us with a fragmented brand and unclear positioning.\n\nWe rebuilt everything from the ground up — logo, color system, typography, social presence.\n\nResults: 3x engagement, 40% more inbound leads.', scheduledDate: '2026-03-06', scheduledTime: '11:00', status: 'scheduled', platform: 'both' },
  { id: '4', title: 'Design trends reshaping crypto brands in 2026', content: 'The best crypto brands are moving away from generic gradients.\n\nHere are 5 design trends dominating the space:\n\n1. Brutalist typography\n2. Monochrome with single accent\n3. Motion-first identity\n4. Utility-driven design systems\n5. Culture-coded visuals', scheduledDate: '2026-03-07', scheduledTime: '09:00', status: 'draft', platform: 'x' },
  { id: '5', title: 'Carousel: Brand identity checklist for startups', content: 'Every startup needs these brand fundamentals:\n\n1. Clear positioning statement\n2. Logo system (not just one logo)\n3. Color palette with meaning\n4. Typography hierarchy\n5. Voice & tone guidelines\n6. Social media templates\n7. Brand guidelines doc\n\nMissing any? DM us.', scheduledDate: '2026-03-08', scheduledTime: '10:00', status: 'draft', platform: 'both' },
  { id: '6', title: 'Weekly wins roundup', content: 'This week at 937 Studio:\n- LIQD brand guidelines delivered\n- 2 new client calls booked\n- Instagram hit 2,750 followers\n- Zama website concept approved\n\nBuilding in public. 🔥', scheduledDate: '2026-03-09', scheduledTime: '16:00', status: 'draft', platform: 'x' },
];
