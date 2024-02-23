import {
  getKindeServerSession,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { ArrowDown, ChevronDown, HelpCircle, LogOut } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { buttonVariants } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className='inline-flex h-16 w-full items-center justify-end gap-4 border-b border-zinc-300 px-5 py-2'>
      <a
        href='https://yuldashoff.uz/'
        target='__blank'
        className={buttonVariants({
          variant: 'ghost',
          className: 'text-accent-foreground',
        })}
      >
        <HelpCircle className='mr-2' />
        Help center
      </a>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='inline-flex cursor-pointer select-none items-center gap-2 rounded-lg p-1 transition-colors hover:bg-muted'>
            <Avatar className='size-10'>
              <AvatarImage src={user?.picture || ''} alt='user image' />
              <AvatarFallback>
                {!!user && user.family_name?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span>
              {!!user &&
                [user.given_name, user.family_name?.substring(0, 1)].join(' ')}
              .
            </span>
            <ChevronDown size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuItem asChild>
            <LogoutLink className='text-red-400'>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
