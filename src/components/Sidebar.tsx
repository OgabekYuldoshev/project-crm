'use client';
import Image from 'next/image'
import Link from "next/link"
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react'

import { menu } from '@/helpers/sidebar'
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname()
  const activePathname = useCallback((link: string) => link === pathname, [pathname])

  return (
    <aside className='w-[300px] flex-shrink-0 bg-muted border-r border-zinc-300'>
      <div className='px-5 py-2 h-16 border-b border-zinc-300 inline-flex items-center w-full'>
        <Image src={'/logo.png'} alt='logo' width={120} height={60} />
      </div>
      {/* Menu */}
      <div className="px-4 py-6 border-b border-zinc-300 space-y-2">
        {
          menu.main.map(item => (
            <Link key={item.href} className={cn(`inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none hover:text-accent-foreground h-9 px-4 py-2 hover:bg-zinc-200 w-full text-muted-foreground`, {
              'text-accent-foreground bg-zinc-200': activePathname(item.href)
            })} href={item.href}>
              <item.icon size={24} className="mr-2" />
              {item.title}
            </Link>
          ))
        }
      </div>
      <div className="px-4 py-6 border-b border-zinc-300 space-y-2">
        {
          menu.analysis.map(item => (
            <Link key={item.href} className={cn(`inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none hover:text-accent-foreground h-9 px-4 py-2 hover:bg-zinc-200 w-full text-muted-foreground`, {
              'text-accent-foreground bg-zinc-200': activePathname(item.href)
            })} href={item.href}>
              <item.icon size={24} className="mr-2" />
              {item.title}
            </Link>
          ))
        }
      </div>
      <div className="px-4 py-6 border-b border-zinc-300 space-y-2">
        {
          menu.settings.map(item => (
            <Link key={item.href} className={cn(`inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none hover:text-accent-foreground h-9 px-4 py-2 hover:bg-zinc-200 w-full text-muted-foreground`, {
              'text-accent-foreground bg-zinc-200': activePathname(item.href)
            })} href={item.href}>
              <item.icon size={24} className="mr-2" />
              {item.title}
            </Link>
          ))
        }
      </div>
    </aside>
  )
}

export default Sidebar