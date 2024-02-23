import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'

const Page = async () => {
  const { isAuthenticated } = getKindeServerSession()
  const isAuth = await isAuthenticated()

  if (isAuth) {
    redirect('/dashboard')
  }

  return (
    <div className='min-h-screen w-full grid place-items-center'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 mt-8'>
        <Image src="/logo.png" alt="logo" width={120} height={60} />
      </div>
      <div className='p-2 flex flex-col items-center justify-center space-y-4'>
        <h1 className='text-2xl'>Welcome to our <b className='underline'>CRM Systeam</b></h1>
        <div className='flex gap-4 mt-6'>
          <LoginLink className={buttonVariants()}>Login</LoginLink>
          <RegisterLink className={buttonVariants({ variant: "secondary" })}>SignUp</RegisterLink>
        </div>
      </div>
    </div>
  )
}

export default Page