import {
  BarChart,
  Bell,
  Briefcase,
  Contact,
  Gauge,
  ListTodo,
  Mail,
  NotebookText,
  Settings,
} from 'lucide-react';

export const menu = {
  main: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Gauge,
    },
    {
      title: 'Notification',
      href: '/notification',
      icon: Bell,
    },
    {
      title: 'Notes',
      href: '/notes',
      icon: NotebookText,
    },
    {
      title: 'Tasks',
      href: '/tasks',
      icon: ListTodo,
    },
    {
      title: 'Emails',
      href: '/emails',
      icon: Mail,
    },
  ],
  analysis: [
    {
      title: 'Analysis',
      href: '/analysis',
      icon: BarChart,
    },
    {
      title: 'Contacts',
      href: '/contacts',
      icon: Contact,
    },
    {
      title: 'Companies',
      href: '/companies',
      icon: Briefcase,
    },
  ],
  settings: [
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ],
};
