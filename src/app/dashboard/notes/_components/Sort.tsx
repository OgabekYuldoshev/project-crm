'use client';

import { SortAsc } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

import { Button } from '@/components/ui/button';

const Sort = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleSort = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const sort = searchParams.get('sort') || 'desc';
    if (sort === 'desc') {
      params.set('sort', 'asc');
    } else {
      params.set('sort', 'desc');
    }
    router.push(pathname + '?' + params.toString());
  }, [pathname, router, searchParams]);

  return (
    <Button variant={'outline'} onClick={toggleSort}>
      <SortAsc className='mr-2' size={18} />
      Sort by
    </Button>
  );
};

export default Sort;
