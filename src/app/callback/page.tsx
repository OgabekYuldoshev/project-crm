'use client';

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { trpc } from '@/trpc/client';

const Page = () => {
  const router = useRouter();

  const data = trpc.auth.callback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  });

  if (data.isSuccess) {
    router.push('/dashboard');
  }

  if (data.isError) {
    router.push('/auth');
  }

  return (
    <div className='grid min-h-screen w-full place-items-center'>
      <div className='absolute left-1/2 top-0 mt-8 -translate-x-1/2'>
        <Image src='/logo.png' alt='logo' width={120} height={60} />
      </div>
      <div className='flex flex-col items-center justify-center space-y-4 p-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='text-xl font-semibold'>Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
