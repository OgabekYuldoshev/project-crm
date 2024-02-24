import { zodResolver } from '@hookform/resolvers/zod';
import { Eraser, FilterIcon, Search } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

export const FilterValidation = z.object({
  title: z.string().optional()
});

export type TFilterValidation = z.infer<typeof FilterValidation>;

const Filter = () => {
  const { register, handleSubmit } = useForm<TFilterValidation>({
    resolver: zodResolver(FilterValidation)
  });

  const onSubmit = (data: TFilterValidation) => {
    console.log(data);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'}>
          <FilterIcon className='mr-2' size={18} />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>You can filter your notes</SheetDescription>
        </SheetHeader>
        {/* content */}
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 grid gap-4'>
          <div className='grid gap-1'>
            <Label htmlFor='title'>Title</Label>
            <Input id='title' {...register('title')} placeholder='enter...' />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Button variant={'destructive'}>
              <Eraser size={18} className='mr-2' />
              Clear
            </Button>
            <Button>
              <Search size={18} className='mr-2' />
              Search
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default Filter;
