export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'milestone' | 'other';
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  service: string;
  dealValue: number;
  status: 'active' | 'review' | 'completed' | 'paused';
  contact: string;
  email: string;
}

export type DocCategory = 'proposals' | 'contracts' | 'brand-guidelines' | 'invoices' | 'internal';

export interface Doc {
  id: string;
  title: string;
  category: DocCategory;
  date: string;
  size: string;
  description: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
  description: string;
}

export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type LeadTemperature = 'hot' | 'warm' | 'cold';

export interface Lead {
  id: string;
  company: string;
  contact: string;
  source: string;
  value: number;
  stage: LeadStage;
  temperature: LeadTemperature;
  notes: string;
  lastContact: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  currentTask: string;
  avatar: string;
}

export type ContentPlatform = 'x' | 'instagram' | 'email' | 'blog';

export interface ContentPost {
  id: string;
  title: string;
  content: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'draft' | 'scheduled' | 'published';
  platform: ContentPlatform;
}

export type Assignee = 'Trinkster' | 'Check Rossi' | 'Maya' | 'Leo' | 'Jade' | 'Nico';

export interface FinanceEntry {
  id: string;
  project: string;
  type: 'revenue' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface AnalyticsData {
  pageViews: number;
  visitors: number;
  bounceRate: number;
  avgSession: string;
  topPages: { page: string; views: number }[];
  trafficSources: { source: string; visitors: number; percentage: number }[];
  weeklyViews: { day: string; views: number }[];
  socialMetrics: { platform: string; followers: number; engagement: number; growth: number }[];
}
