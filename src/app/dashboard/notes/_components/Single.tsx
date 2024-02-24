import { Loader2, Trash } from 'lucide-react';
import React, { useCallback } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { trpc } from '@/trpc/client';

const Single = ({ id, onClose }: { id: number; onClose: () => void }) => {
  const { note } = trpc.useUtils();
  const { mutate, isPending } = trpc.note.deleteNote.useMutation();
  const { isFetched, data } = trpc.note.getSingle.useQuery(
    { id },
    {
      enabled: !!id
    }
  );

  const handleDelete = useCallback((id: number) => {
    mutate(
      {
        id
      },
      {
        onSuccess: () => {
          toast.success(`Successfully deleted note: ${id}`);
          note.getNotes.invalidate().then(onClose);
        },
        onError: () => toast.error(`Error deleting note`)
      }
    );
  }, []);

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
      <div className='block space-y-4'>
        <div className='flex flex-wrap gap-2'>
          {data?.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
        <p className='text-muted-foreground'>{data?.content}</p>
        <div className='mt-4 flex justify-end'>
          <Button
            disabled={isPending}
            variant={'destructive'}
            onClick={() => handleDelete(data?.id!)}
          >
            {isPending ? (
              <Loader2 size={18} className='mr-2 animate-spin' />
            ) : (
              <Trash size={18} className='mr-2' />
            )}
            Delete
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default Single;
