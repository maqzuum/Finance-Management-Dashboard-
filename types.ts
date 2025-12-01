export interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

export enum LeadStatus {
  Booked = 'Booked',
  Replied = 'Replied',
  Ignored = 'Ignored',
  Opened = 'Opened',
}

export interface Message {
  id: string;
  lead: User;
  messagePreview: string;
  date: string;
  status: LeadStatus;
  organization: string;
  tags: string[];
}

export interface StatMetric {
  label: string;
  value: number;
  trendPercentage: number;
  trendDirection: 'up' | 'down';
}

export interface StatGroup {
  title: string;
  metrics: StatMetric[];
}

export interface SidebarItem {
  icon: any;
  label: string;
  active?: boolean;
}
