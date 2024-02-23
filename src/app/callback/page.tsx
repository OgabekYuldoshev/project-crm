'use client';

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

import { trpc } from '@/trpc/client'

const Page = () => {
  const router = useRouter()

  const data = trpc.auth.callback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  })

  if (data.isSuccess) {
    router.push('/dashboard')
  }

  if (data.isError) {
    router.push('/auth')
  }

  return (
    <div className='min-h-screen w-full grid place-items-center'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 mt-8'>
        <Image src="/logo.png" alt="logo" width={120} height={60} />
      </div>
      <div className='p-2 flex flex-col items-center justify-center space-y-4'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          Setting up your account...
        </h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

export default Page