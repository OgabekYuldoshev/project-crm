import type { Metadata } from 'next';

import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Welcome to our CRM page',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
