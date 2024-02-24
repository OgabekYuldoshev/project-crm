'use client';
import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';

import List from './_components/List';
import Sort from './_components/Sort';
import CreateNoteForm from './_form/CreateNoteForm';

const Page = () => {
  return (
    <main className='block'>
      <div className='flex items-center justify-between border-b px-8 py-4'>
        <h1 className='text-xl'>Notes</h1>
        <div className='flex items-center gap-2'>
          <Sort />
          <Button variant={'outline'}>
            <Filter className='mr-2' size={18} />
            Filter
          </Button>
          <CreateNoteForm />
        </div>
      </div>
      <List />
    </main>
  );
};

export default Page;
