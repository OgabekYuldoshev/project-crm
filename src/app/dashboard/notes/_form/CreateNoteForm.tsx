'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Save } from 'lucide-react';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TagsInput } from 'react-tag-input-component';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  CreateNoteValidation,
  TCreateNoteValidation
} from '@/helpers/validators';
import { trpc } from '@/trpc/client';

const CreateNoteForm = () => {
  const [isModal, setModal] = useState(false);
  const { note } = trpc.useContext();
  const { mutate, isPending } = trpc.note.createNote.useMutation();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TCreateNoteValidation>({
    resolver: zodResolver(CreateNoteValidation),
    defaultValues: {
      title: '',
      content: '',
      tags: []
    }
  });

  const onSubmit = (data: TCreateNoteValidation) =>
    mutate(data, {
      onSuccess: ({ note_id }) => {
        toast.success(`Successfully created note: ${note_id}`);
        note.invalidate().then(() => {
          reset({
            title: '',
            content: '',
            tags: []
          });
          setModal(false);
        });
      },
      onError: () => toast.error(`Error creating note`)
    });

  return (
    <Dialog open={isModal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2' size={18} />
          Add Notes
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create note</DialogTitle>
          <DialogDescription>Note your new ideas and dreams</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='grid space-y-4'>
          <div className='grid gap-2'>
            <Label htmlFor='title'>Title</Label>
            <Input {...register('title')} type='text' placeholder='write...' />
            {errors.title && (
              <span className='test-xs text-red-500'>
                {errors.title.message}
              </span>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='tags'>Tags</Label>
            <Controller
              name='tags'
              control={control}
              render={({ field }) => (
                <TagsInput {...field} placeHolder='enter tags' />
              )}
            />
            {errors.tags && (
              <span className='test-xs text-red-500'>
                {errors.tags.message}
              </span>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='content'>Content</Label>
            <Textarea {...register('content')} placeholder='write...' />
            {errors.content && (
              <span className='test-xs text-red-500'>
                {errors.content.message}
              </span>
            )}
          </div>
          <div className='grid justify-end gap-2'>
            <Button disabled={isPending}>
              {isPending ? (
                <Loader2 size={18} className='mr-2 animate-spin' />
              ) : (
                <Save size={18} className='mr-2' />
              )}
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteForm;
