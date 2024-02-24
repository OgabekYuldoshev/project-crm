import { Trash } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { trpc } from '@/trpc/client';

const Single = ({ id }: { id: number }) => {
  const { isFetched, data } = trpc.note.getSingle.useQuery(
    { id },
    {
      enabled: !!id,
    }
  );

  if (!data && !isFetched) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Skeleton className='h-6 w-1/2' />
          </DialogTitle>
        </DialogHeader>
        <Skeleton className='h-20 w-full' />
      </DialogContent>
    );
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='flex items-start justify-between'>
          <span>{data?.title}</span>
        </DialogTitle>
      </DialogHeader>
      <div className='block'>
        <div className='flex flex-wrap gap-2'>
          {data?.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
        <div className='mt-4 flex justify-end'>
          <Button variant={'destructive'}>
            <Trash size={18} className='mr-2' />
            Delete
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default Single;
