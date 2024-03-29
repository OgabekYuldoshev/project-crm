'use client';
import { Suspense } from 'react';

// import { Filter } from 'lucide-react';
import Filter from './_components/Filter';
import List from './_components/List';
import Sort from './_components/Sort';
import CreateNoteForm from './_form/CreateNoteForm';

const Page = () => {
  return (
    <main className='block'>
      <div className='flex items-center justify-between border-b px-8 py-4'>
        <h1 className='text-xl'>Notes</h1>
        <div className='flex items-center gap-2'>
          <Suspense>
            <Sort />
          </Suspense>
          <Filter />
          <CreateNoteForm />
        </div>
      </div>
      <Suspense>
        <List />
      </Suspense>
    </main>
  );
};

export default Page;
