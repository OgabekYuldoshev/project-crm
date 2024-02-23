import React, { PropsWithChildren } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className='relative flex min-h-screen w-full'>
      <Sidebar />
      <section className='flex-1'>
        <Navbar />
        <div>{children}</div>
      </section>
    </main>
  );
};

export default Layout;
