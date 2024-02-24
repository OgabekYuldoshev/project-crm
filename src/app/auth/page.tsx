import {
  LoginLink,
  RegisterLink
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

import { buttonVariants } from '@/components/ui/button';

const Page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (isAuth) {
    redirect('/dashboard');
  }

  return (
    <div className='grid min-h-screen w-full place-items-center'>
      <div className='absolute left-1/2 top-0 mt-8 -translate-x-1/2'>
        <Image src='/logo.png' alt='logo' width={120} height={60} />
      </div>
      <div className='flex flex-col items-center justify-center space-y-4 p-2'>
        <h1 className='text-2xl'>
          Welcome to our <b className='underline'>CRM Systeam</b>
        </h1>
        <div className='mt-6 flex gap-4'>
          <LoginLink className={buttonVariants()}>Login</LoginLink>
          <RegisterLink className={buttonVariants({ variant: 'secondary' })}>
            SignUp
          </RegisterLink>
        </div>
      </div>
    </div>
  );
};

export default Page;
