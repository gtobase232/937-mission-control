import { Task, CalendarEvent, Client, Doc, Invoice, Lead, TeamMember, ContentPost, FinanceEntry, AnalyticsData } from './types';

export const seedTasks: Task[] = [
  { id: '1', title: 'Nexus — finalize logo variations', description: 'Complete all logo variations for Nexus Protocol brand identity', assignee: 'Trinkster', priority: 'high', status: 'done', dueDate: '2026-03-03', createdAt: '2026-02-25' },
  { id: '2', title: 'Orbital — wireframe review', description: 'Review and approve wireframes for Orbital Labs website redesign', assignee: 'Check Rossi', priority: 'high', status: 'done', dueDate: '2026-03-04', createdAt: '2026-02-26' },
  { id: '3', title: 'ChainMind — export deck PDF', description: 'Export final pitch deck to PDF for ChainMind presentation', assignee: 'Jade', priority: 'medium', status: 'done', dueDate: '2026-03-04', createdAt: '2026-02-28' },
  { id: '4', title: 'Vanta — dark mode toggle', description: 'Implement dark mode toggle for Vanta Finance dashboard UI', assignee: 'Check Rossi', priority: 'medium', status: 'in-progress', dueDate: '2026-03-08', createdAt: '2026-03-01' },
  { id: '5', title: 'Strata — motion storyboard v1', description: 'Create first version of motion storyboard for Strata L2 launch video', assignee: 'Leo', priority: 'critical', status: 'in-progress', dueDate: '2026-03-05', createdAt: '2026-03-01' },
  { id: '6', title: 'Send proposal to Meridian DAO', description: 'Draft and send brand identity proposal to Meridian DAO lead', assignee: 'Trinkster', priority: 'critical', status: 'todo', dueDate: '2026-03-06', createdAt: '2026-03-02' },
  { id: '7', title: 'Invoice Nexus milestone 2', description: 'Send invoice for Nexus Protocol brand identity phase 2 completion', assignee: 'Nico', priority: 'medium', status: 'done', dueDate: '2026-03-03', createdAt: '2026-02-28' },
  { id: '8', title: 'Portfolio — Vanta case study', description: 'Write and design Vanta Finance case study for 937 portfolio', assignee: 'Maya', priority: 'medium', status: 'done', dueDate: '2026-03-04', createdAt: '2026-03-01' },
  { id: '9', title: 'Flux AI — brand discovery call', description: 'Schedule and prepare for brand discovery call with Flux AI team', assignee: 'Trinkster', priority: 'high', status: 'todo', dueDate: '2026-03-07', createdAt: '2026-03-03' },
  { id: '10', title: 'Design system — component library', description: 'Build reusable component library for faster client delivery', assignee: 'Check Rossi', priority: 'high', status: 'backlog', dueDate: '2026-03-15', createdAt: '2026-03-03' },
  { id: '11', title: 'March newsletter draft', description: 'Write March newsletter with studio updates and case studies', assignee: 'Maya', priority: 'medium', status: 'todo', dueDate: '2026-03-09', createdAt: '2026-03-03' },
  { id: '12', title: 'Orbital — site launch prep', description: 'Final QA and launch preparation for Orbital Labs website', assignee: 'Check Rossi', priority: 'high', status: 'backlog', dueDate: '2026-03-28', createdAt: '2026-03-04' },
  { id: '13', title: 'Social media audit — Strata', description: 'Full audit of Strata social channels for content strategy', assignee: 'Maya', priority: 'medium', status: 'review', dueDate: '2026-03-10', createdAt: '2026-03-02' },
  { id: '14', title: 'Zenith Labs — mood board', description: 'Create visual mood board for Zenith Labs brand exploration', assignee: 'Jade', priority: 'low', status: 'backlog', dueDate: '2026-03-18', createdAt: '2026-03-04' },
  { id: '15', title: 'Client onboarding deck update', description: 'Update the onboarding presentation with new case studies', assignee: 'Nico', priority: 'medium', status: 'review', dueDate: '2026-03-12', createdAt: '2026-03-03' },
];

export const seedCalendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Strata — Storyboard Due', date: '2026-03-05', time: 'All Day', type: 'deadline' },
  { id: '2', title: 'ChainMind — Final Deck', date: '2026-03-06', time: '14:00', type: 'deadline' },
  { id: '3', title: 'Nexus — Brand Review', date: '2026-03-10', time: '10:00', type: 'meeting' },
  { id: '4', title: 'Meridian DAO Call', date: '2026-03-14', time: '16:00', type: 'meeting' },
  { id: '5', title: 'Vanta — Handoff', date: '2026-03-20', time: '11:00', type: 'milestone' },
  { id: '6', title: 'Flux AI — Discovery Call', date: '2026-03-07', time: '15:00', type: 'meeting' },
  { id: '7', title: 'Sprint Review', date: '2026-03-12', time: '11:00', type: 'meeting' },
  { id: '8', title: 'Orbital — Site Launch', date: '2026-03-28', time: 'All Day', type: 'milestone' },
  { id: '9', title: 'CDMX Creative Meetup', date: '2026-03-18', time: '18:00', type: 'other' },
  { id: '10', title: 'Flux AI — Brand Kit Due', date: '2026-03-20', time: 'All Day', type: 'deadline' },
];

export const seedClients: Client[] = [
  { id: '1', name: 'Nexus Protocol', industry: 'DeFi · Token Launch', service: 'Brand Identity', dealValue: 18000, status: 'active', contact: 'Alex Rivera', email: 'alex@nexusprotocol.io' },
  { id: '2', name: 'Orbital Labs', industry: 'AI Infra · Series A', service: 'Web Design', dealValue: 22000, status: 'active', contact: 'Sam Chen', email: 'sam@orbitallabs.ai' },
  { id: '3', name: 'Vanta Finance', industry: 'Fintech · B2B', service: 'UI/UX', dealValue: 15000, status: 'active', contact: 'Maria Lopez', email: 'maria@vantafinance.com' },
  { id: '4', name: 'ChainMind', industry: 'AI × Crypto', service: 'Pitch Deck', dealValue: 8000, status: 'review', contact: 'Kenji Tanaka', email: 'kenji@chainmind.xyz' },
  { id: '5', name: 'Strata', industry: 'L2 · Mainnet', service: 'Motion Design', dealValue: 12000, status: 'active', contact: 'Elena Vasquez', email: 'elena@strata.network' },
];

export const seedDocs: Doc[] = [
  { id: '1', title: 'Nexus Protocol — Brand Proposal', category: 'proposals', date: '2026-02-20', size: '2.4 MB', description: 'Full brand identity proposal for Nexus Protocol DeFi platform' },
  { id: '2', title: 'Meridian DAO — Brand Proposal', category: 'proposals', date: '2026-03-04', size: '1.8 MB', description: 'Brand identity and visual language proposal for Meridian DAO' },
  { id: '3', title: 'Orbital Labs — SOW', category: 'contracts', date: '2026-02-15', size: '340 KB', description: 'Statement of work for Orbital Labs website redesign project' },
  { id: '4', title: 'Vanta Finance — Service Agreement', category: 'contracts', date: '2026-02-10', size: '280 KB', description: 'Service agreement for ongoing UI/UX design retainer' },
  { id: '5', title: 'Nexus — Brand Guidelines v2', category: 'brand-guidelines', date: '2026-03-03', size: '8.2 MB', description: 'Complete brand guidelines including logo, colors, typography, and usage rules' },
  { id: '6', title: '937 Studio — Brand Guidelines', category: 'brand-guidelines', date: '2026-02-25', size: '5.6 MB', description: 'Internal brand guidelines for 937 Studio identity' },
  { id: '7', title: 'INV-001 — Nexus Protocol', category: 'invoices', date: '2026-03-01', size: '120 KB', description: 'Invoice for brand identity phase 1 completion — $18,000' },
  { id: '8', title: 'INV-002 — Orbital Labs', category: 'invoices', date: '2026-02-28', size: '115 KB', description: 'Invoice for website design deposit — $11,000' },
  { id: '9', title: 'Team Onboarding Guide', category: 'internal', date: '2026-02-01', size: '1.2 MB', description: 'Onboarding documentation for new 937 team members' },
  { id: '10', title: 'Design Process Playbook', category: 'internal', date: '2026-02-18', size: '960 KB', description: 'Internal design process and methodology documentation' },
];

export const seedInvoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-001', client: 'Nexus Protocol', amount: 18000, status: 'paid', date: '2026-02-15', dueDate: '2026-03-01', description: 'Brand Identity — Phase 1 Complete' },
  { id: '2', invoiceNumber: 'INV-002', client: 'Orbital Labs', amount: 11000, status: 'paid', date: '2026-02-20', dueDate: '2026-03-05', description: 'Website Design — Deposit (50%)' },
  { id: '3', invoiceNumber: 'INV-003', client: 'Vanta Finance', amount: 15000, status: 'pending', date: '2026-03-01', dueDate: '2026-03-15', description: 'UI/UX Design — Full Project' },
  { id: '4', invoiceNumber: 'INV-004', client: 'ChainMind', amount: 8000, status: 'paid', date: '2026-02-25', dueDate: '2026-03-10', description: 'Pitch Deck Design — Complete' },
  { id: '5', invoiceNumber: 'INV-005', client: 'Strata', amount: 6000, status: 'pending', date: '2026-03-03', dueDate: '2026-03-17', description: 'Motion Design — Phase 1' },
  { id: '6', invoiceNumber: 'INV-006', client: 'Nexus Protocol', amount: 4500, status: 'paid', date: '2026-03-01', dueDate: '2026-03-15', description: 'Monthly Retainer — Social Media' },
  { id: '7', invoiceNumber: 'INV-007', client: 'Orbital Labs', amount: 11000, status: 'overdue', date: '2026-02-10', dueDate: '2026-02-25', description: 'Website Design — Phase 2' },
  { id: '8', invoiceNumber: 'INV-008', client: 'Strata', amount: 6000, status: 'pending', date: '2026-03-05', dueDate: '2026-03-20', description: 'Motion Design — Phase 2' },
];

export const seedLeads: Lead[] = [
  { id: '1', company: 'Meridian DAO', contact: 'James Wei', source: 'Referral', value: 15000, stage: 'proposal', temperature: 'hot', notes: 'Referred by Nexus. Call scheduled for Mar 14.', lastContact: '2026-03-04' },
  { id: '2', company: 'Flux AI', contact: 'Sarah Kim', source: 'Twitter DM', value: 12000, stage: 'contacted', temperature: 'hot', notes: 'Interested in full brand kit. Discovery call Mar 7.', lastContact: '2026-03-03' },
  { id: '3', company: 'Zenith Labs', contact: 'David Park', source: 'Website', value: 8000, stage: 'new', temperature: 'warm', notes: 'Inbound inquiry for brand identity refresh.', lastContact: '2026-03-02' },
  { id: '4', company: 'Prism Network', contact: 'Elena Vasquez', source: 'Conference', value: 20000, stage: 'qualified', temperature: 'warm', notes: 'Met at CDMX Web3 Summit. Full rebrand interest.', lastContact: '2026-03-01' },
  { id: '5', company: 'Aether Protocol', contact: 'Marco Silva', source: 'Cold Outreach', value: 10000, stage: 'contacted', temperature: 'cold', notes: 'Privacy-focused DeFi. Sent portfolio deck.', lastContact: '2026-02-28' },
  { id: '6', company: 'Monad Labs', contact: 'Lisa Zhang', source: 'Referral', value: 30000, stage: 'new', temperature: 'hot', notes: 'L1 blockchain. Need full brand + website + launch campaign.', lastContact: '2026-03-04' },
  { id: '7', company: 'Scroll', contact: 'Ryan Chen', source: 'LinkedIn', value: 15000, stage: 'negotiation', temperature: 'warm', notes: 'ZK-EVM rollup. Brand refresh + content calendar.', lastContact: '2026-03-03' },
  { id: '8', company: 'Penumbra', contact: 'Ava Torres', source: 'Twitter DM', value: 10000, stage: 'qualified', temperature: 'warm', notes: 'Privacy DeFi. Content production + social media.', lastContact: '2026-03-02' },
  { id: '9', company: 'Aztec', contact: 'Stefan Mueller', source: 'Conference', value: 25000, stage: 'contacted', temperature: 'hot', notes: 'ZK-rollup. Full rebrand + social media management.', lastContact: '2026-03-01' },
  { id: '10', company: 'Celestia', contact: 'Nina Patel', source: 'Website', value: 18000, stage: 'new', temperature: 'cold', notes: 'Modular blockchain. Inbound inquiry, needs follow-up.', lastContact: '2026-02-25' },
  // Real pipeline leads (from research)
  { id: '11', company: 'Circuit & Chisel', contact: 'TBD', source: 'Research', value: 55000, stage: 'new', temperature: 'hot', notes: '$19.2M seed. Ex-Stripe founders. Backed by Stripe, Coinbase, Solana Ventures, Samsung Next. Website barely renders — needs full brand/web build.', lastContact: '2026-03-05' },
  { id: '12', company: 'Brale', contact: 'TBD', source: 'Research', value: 52000, stage: 'new', temperature: 'hot', notes: '$30M Series A led by Lightspeed. Stablecoin issuance platform, US regulated. May need rebrand for enterprise tier.', lastContact: '2026-03-05' },
  { id: '13', company: 'Dynasty Studios', contact: 'TBD', source: 'Research', value: 42000, stage: 'new', temperature: 'hot', notes: '$14M seed. Blockchain gaming for mainstream players. Big seed = big design budget. Needs premium UI/brand.', lastContact: '2026-03-05' },
  { id: '14', company: 'Standard Economics (Uno)', contact: 'TBD', source: 'Research', value: 35000, stage: 'new', temperature: 'warm', notes: '$9M seed led by Paradigm + Lightspeed. Cross-border stablecoin payments. No X presence — needs full brand build.', lastContact: '2026-03-05' },
  { id: '15', company: 'Bluprynt', contact: 'TBD', source: 'Research', value: 35000, stage: 'new', temperature: 'hot', notes: '$4.25M seed (Mar 2026). Backed by Mark Cuban, Coinbase Ventures, Robinhood. Compliance OS for digital assets.', lastContact: '2026-03-05' },
  { id: '16', company: 'Levl', contact: 'TBD', source: 'Research', value: 27000, stage: 'new', temperature: 'warm', notes: '$7M seed led by Galaxy Ventures. Stablecoin payment infra, $1B annualized volume. No X presence.', lastContact: '2026-03-05' },
  { id: '17', company: 'Tarta Labs', contact: 'TBD', source: 'Research', value: 35000, stage: 'new', temperature: 'warm', notes: '$4.5M pre-seed. Anime RPG "Spot Zero". Backed by Bitkraft, Spartan, HashKey. Gaming = heavy brand/art needs.', lastContact: '2026-03-05' },
  { id: '18', company: 'Orange Cap Games', contact: 'TBD', source: 'Research', value: 27000, stage: 'new', temperature: 'warm', notes: '$3.5M seed. Blockchain card game. Backed by Yuga Labs + 1kx. Card games need heavy visual work.', lastContact: '2026-03-05' },
  { id: '19', company: 'Stablecore', contact: 'TBD', source: 'Research', value: 37000, stage: 'new', temperature: 'warm', notes: '$20M Series A. Enables banks/credit unions to offer stablecoin products. Enterprise B2B — needs trust-signaling brand.', lastContact: '2026-03-05' },
  { id: '20', company: 'Unicity Labs', contact: 'TBD', source: 'Research', value: 20000, stage: 'new', temperature: 'warm', notes: '$3M seed. P2P AI agent marketplace. Led by Blockchange Ventures. Early stage — needs full brand identity.', lastContact: '2026-03-05' },
];

export const seedTeam: TeamMember[] = [
  { id: '1', name: 'Trinkster', role: 'Creative Director', status: 'online', currentTask: 'Leading Nexus brand identity', avatar: '🎨' },
  { id: '2', name: 'Check Rossi', role: 'Lead Developer', status: 'online', currentTask: 'Building Orbital Labs website', avatar: '💻' },
  { id: '3', name: 'Maya', role: 'Content Strategist', status: 'online', currentTask: 'Planning March content calendars', avatar: '📋' },
  { id: '4', name: 'Leo', role: 'Motion Designer', status: 'away', currentTask: 'Strata launch video storyboard', avatar: '🎬' },
  { id: '5', name: 'Jade', role: 'UI/UX Designer', status: 'online', currentTask: 'Vanta Finance dashboard design', avatar: '✨' },
  { id: '6', name: 'Nico', role: 'Brand Strategist', status: 'busy', currentTask: 'Client onboarding deck update', avatar: '🧠' },
];

export const seedContentPosts: ContentPost[] = [
  { id: '1', title: 'Vanta case study thread', scheduledDate: '2026-03-05', scheduledTime: '10:00', status: 'scheduled', platform: 'x', content: 'How we redesigned Vanta Finance — a deep dive into our process.' },
  { id: '2', title: 'Nexus brand reel', scheduledDate: '2026-03-06', scheduledTime: '14:00', status: 'scheduled', platform: 'instagram', content: 'Behind the scenes of the Nexus Protocol brand identity.' },
  { id: '3', title: 'March newsletter', scheduledDate: '2026-03-09', scheduledTime: '09:00', status: 'draft', platform: 'email', content: 'Monthly studio update with new case studies and insights.' },
  { id: '4', title: 'Design process blog post', scheduledDate: '2026-03-07', scheduledTime: '11:00', status: 'scheduled', platform: 'blog', content: 'Our 4-phase brand identity process explained.' },
  { id: '5', title: 'Crypto design trends 2026', scheduledDate: '2026-03-10', scheduledTime: '10:00', status: 'draft', platform: 'x', content: '5 design trends reshaping crypto brands this year.' },
  { id: '6', title: 'Studio life in CDMX', scheduledDate: '2026-03-04', scheduledTime: '16:00', status: 'published', platform: 'instagram', content: 'A day inside 937 Studio in Mexico City.' },
  { id: '7', title: 'Brand identity checklist carousel', scheduledDate: '2026-03-12', scheduledTime: '10:00', status: 'draft', platform: 'instagram', content: '7 brand fundamentals every startup needs.' },
  { id: '8', title: 'Weekly wins roundup', scheduledDate: '2026-03-08', scheduledTime: '16:00', status: 'draft', platform: 'x', content: 'This week at 937: new clients, new work, new milestones.' },
];

export const seedFinance: FinanceEntry[] = [
  { id: '1', project: 'Nexus Protocol', type: 'revenue', category: 'Brand Identity', amount: 18000, date: '2026-02-15', description: 'Brand Identity — Phase 1 payment' },
  { id: '2', project: 'Orbital Labs', type: 'revenue', category: 'Web Design', amount: 11000, date: '2026-02-20', description: 'Website Design — Deposit (50%)' },
  { id: '3', project: 'ChainMind', type: 'revenue', category: 'Pitch Deck', amount: 8000, date: '2026-02-25', description: 'Pitch Deck — Full payment' },
  { id: '4', project: 'Vanta Finance', type: 'revenue', category: 'UI/UX', amount: 7500, date: '2026-03-01', description: 'UI/UX Design — Phase 1' },
  { id: '5', project: 'Strata', type: 'revenue', category: 'Motion Design', amount: 6000, date: '2026-03-03', description: 'Motion Design — Phase 1' },
  { id: '6', project: 'Nexus Protocol', type: 'revenue', category: 'Retainer', amount: 4500, date: '2026-03-01', description: 'Monthly Retainer — Social Media' },
  { id: '7', project: 'General', type: 'expense', category: 'Software', amount: 890, date: '2026-03-01', description: 'Figma, Adobe CC, Framer licenses' },
  { id: '8', project: 'General', type: 'expense', category: 'Office', amount: 2400, date: '2026-03-01', description: 'CDMX studio rent — March' },
  { id: '9', project: 'Strata', type: 'expense', category: 'Freelancer', amount: 1500, date: '2026-03-02', description: '3D artist freelancer — Strata video' },
  { id: '10', project: 'General', type: 'expense', category: 'Marketing', amount: 600, date: '2026-02-28', description: 'Twitter/X ads — February campaign' },
  { id: '11', project: 'Orbital Labs', type: 'expense', category: 'Hosting', amount: 120, date: '2026-03-01', description: 'Vercel Pro — staging environment' },
  { id: '12', project: 'General', type: 'expense', category: 'Equipment', amount: 1800, date: '2026-02-15', description: 'Studio monitor + peripherals' },
];

export const seedAnalytics: AnalyticsData = {
  pageViews: 14280,
  visitors: 3847,
  bounceRate: 38.2,
  avgSession: '2m 45s',
  topPages: [
    { page: '/portfolio', views: 4120 },
    { page: '/about', views: 2890 },
    { page: '/services', views: 2340 },
    { page: '/blog', views: 1950 },
    { page: '/contact', views: 1480 },
    { page: '/case-studies/nexus', views: 1200 },
    { page: '/careers', views: 300 },
  ],
  trafficSources: [
    { source: 'Twitter / X', visitors: 1420, percentage: 36.9 },
    { source: 'Direct', visitors: 980, percentage: 25.5 },
    { source: 'Google', visitors: 690, percentage: 17.9 },
    { source: 'Instagram', visitors: 420, percentage: 10.9 },
    { source: 'Referral', visitors: 337, percentage: 8.8 },
  ],
  weeklyViews: [
    { day: 'Mon', views: 1840 },
    { day: 'Tue', views: 2210 },
    { day: 'Wed', views: 2450 },
    { day: 'Thu', views: 2100 },
    { day: 'Fri', views: 1980 },
    { day: 'Sat', views: 1850 },
    { day: 'Sun', views: 1850 },
  ],
  socialMetrics: [
    { platform: 'Twitter / X', followers: 12400, engagement: 4.2, growth: 8.5 },
    { platform: 'Instagram', followers: 8900, engagement: 5.8, growth: 6.2 },
    { platform: 'LinkedIn', followers: 3200, engagement: 3.1, growth: 4.8 },
    { platform: 'Farcaster', followers: 1800, engagement: 7.4, growth: 15.3 },
  ],
};
