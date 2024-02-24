import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import EmptyContent from '@/components/EmptyContent';
import NoteCard from '@/components/NoteCard';
import { Dialog } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { trpc } from '@/trpc/client';

import Single from './Single';

const List = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const { data, isFetched } = trpc.note.getNotes.useQuery({
    params: {
      sort: searchParams.get('sort') || 'desc'
    }
  });

  return (
    <div className='grid grid-cols-3 gap-6 px-8 py-4'>
      {!isFetched ? (
        <>
          <Skeleton className='h-[180px] w-full' />
          <Skeleton className='h-[180px] w-full' />
          <Skeleton className='h-[180px] w-full' />
        </>
      ) : data?.notes.length == 0 ? (
        <div className='col-span-3'>
          <EmptyContent />
        </div>
      ) : (
        data?.notes.map((note) => (
          <NoteCard
            onClick={() => setSelected(note.id)}
            key={note.id}
            tags={note.tags}
            username={[note.user.firstName, note.user.lastName].join(' ')}
            avatar={note.user.avatar!}
            createdAt={note.createdAt}
            title={note.title}
            content={note.content}
          />
        ))
      )}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <Single id={selected!} onClose={() => setSelected(null)} />
      </Dialog>
    </div>
  );
};

export default List;
