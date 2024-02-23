import React, { PropsWithChildren } from 'react'

import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className='w-full min-h-screen relative flex'>
      <Sidebar />
      <section className='flex-1'>
        <Navbar />
        <div>
          {children}
        </div>
      </section>
    </main>
  )
}

export default Layout