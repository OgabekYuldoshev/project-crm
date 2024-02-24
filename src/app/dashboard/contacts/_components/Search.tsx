'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDebounce } from '@/app/hooks/useDebounce';
import { Input } from '@/components/ui/input';
import { createQueryString } from '@/lib/utils';

const Search = () => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(queryParams.get('q') || '');
  const debounceSearch = useDebounce(search, 500);
  useEffect(() => {
    if (search) {
      const query = createQueryString({
        queryParams,
        name: 'q',
        value: debounceSearch
      });

      router.push(`${pathname}?${query}`);
    }
    if (!search) {
      router.push(`${pathname}`);
    }
  }, [debounceSearch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Input
      value={search}
      className='w-1/3'
      placeholder='search...'
      onChange={handleChange}
    />
  );
};

export default Search;
