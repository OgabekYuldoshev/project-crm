import {
  BarChart,
  Bell,
  Briefcase,
  Contact,
  Gauge,
  ListTodo,
  Mail,
  NotebookText,
  Settings
} from 'lucide-react';

export const menu = {
  main: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Gauge
    },
    {
      title: 'Notification',
      href: '/dashboard/notification',
      icon: Bell
    },
    {
      title: 'Notes',
      href: '/dashboard/notes',
      icon: NotebookText
    },
    {
      title: 'Tasks',
      href: '/dashboard/tasks',
      icon: ListTodo
    },
    {
      title: 'Emails',
      href: '/dashboard/emails',
      icon: Mail
    }
  ],
  analysis: [
    {
      title: 'Analysis',
      href: '/dashboard/analysis',
      icon: BarChart
    },
    {
      title: 'Contacts',
      href: '/dashboard/contacts',
      icon: Contact
    },
    {
      title: 'Companies',
      href: '/dashboard/companies',
      icon: Briefcase
    }
  ],
  settings: [
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings
    }
  ]
};
