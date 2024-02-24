'use client';
import { Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import EmptyContent from '@/components/EmptyContent';
import NoteCard from '@/components/NoteCard';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { trpc } from '@/trpc/client';

import Single from './_components/Single';
import Sort from './_components/Sort';
import CreateNoteForm from './_form/CreateNoteForm';

const Page = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const { data, isFetched } = trpc.note.getNotes.useQuery({
    params: {
      sort: searchParams.get('sort') || 'desc',
    },
  });

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
      <div className='grid grid-cols-3 gap-6 px-8 py-4'>
        {!isFetched ? (
          <>
            <Skeleton className='h-[180px] w-full' />
            <Skeleton className='h-[180px] w-full' />
            <Skeleton className='h-[180px] w-full' />
          </>
        ) : data?.notes.length == 0 ? (
          <EmptyContent />
        ) : (
          data?.notes.map((note) => (
            <NoteCard
              onClick={() => setSelected(note.id)}
              key={note.id}
              tags={note.tags}
              username={[note.user.firstName, note.user.lastName].join(' ')}
              createdAt={note.createdAt}
              title={note.title}
              content={note.content}
            />
          ))
        )}
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <Single id={selected!} />
        </Dialog>
      </div>
    </main>
  );
};

export default Page;
