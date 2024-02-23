'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react';

import { menu } from '@/helpers/sidebar';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();
  const activePathname = useCallback(
    (link: string) => link === pathname,
    [pathname]
  );

  return (
    <aside className='w-[300px] flex-shrink-0 border-r border-zinc-300 bg-muted'>
      <div className='inline-flex h-16 w-full items-center border-b border-zinc-300 px-5 py-2'>
        <Image src={'/logo.png'} alt='logo' width={120} height={60} />
      </div>
      {/* Menu */}
      <div className='space-y-2 border-b border-zinc-300 px-4 py-6'>
        {menu.main.map((item) => (
          <Link
            key={item.href}
            className={cn(
              `inline-flex h-9 w-full items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-zinc-200 hover:text-accent-foreground focus-visible:outline-none`,
              {
                'bg-zinc-200 text-accent-foreground': activePathname(item.href),
              }
            )}
            href={item.href}
          >
            <item.icon size={24} className='mr-2' />
            {item.title}
          </Link>
        ))}
      </div>
      <div className='space-y-2 border-b border-zinc-300 px-4 py-6'>
        {menu.analysis.map((item) => (
          <Link
            key={item.href}
            className={cn(
              `inline-flex h-9 w-full items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-zinc-200 hover:text-accent-foreground focus-visible:outline-none`,
              {
                'bg-zinc-200 text-accent-foreground': activePathname(item.href),
              }
            )}
            href={item.href}
          >
            <item.icon size={24} className='mr-2' />
            {item.title}
          </Link>
        ))}
      </div>
      <div className='space-y-2 border-b border-zinc-300 px-4 py-6'>
        {menu.settings.map((item) => (
          <Link
            key={item.href}
            className={cn(
              `inline-flex h-9 w-full items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-zinc-200 hover:text-accent-foreground focus-visible:outline-none`,
              {
                'bg-zinc-200 text-accent-foreground': activePathname(item.href),
              }
            )}
            href={item.href}
          >
            <item.icon size={24} className='mr-2' />
            {item.title}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
