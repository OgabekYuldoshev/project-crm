'use client';

import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { trpc } from '@/trpc/client';

const List = () => {
  const queryParams = useSearchParams();
  const { data, isFetched } = trpc.auth.getUsers.useQuery({
    params: {
      q: queryParams.get('q')
    }
  });

  const renderSkeleton = useMemo(() => {
    if (!isFetched) {
      return (
        <TableRow>
          <TableCell>
            <Skeleton className='size-12 rounded-full' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-8 w-full' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-8 w-full' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-8 w-full' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-8 w-full' />
          </TableCell>
        </TableRow>
      );
    }

    return null;
  }, [isFetched]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Avatar</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Firstname</TableHead>
          <TableHead>Lastname</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {renderSkeleton}
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Avatar className='size-12'>
                <AvatarImage src={item.avatar!} />
                <AvatarFallback>{item.firstName}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.firstName}</TableCell>
            <TableCell>{item.lastName}</TableCell>
            <TableCell>
              <Badge variant={item.role === 'WORKER' ? 'secondary' : 'default'}>
                {item.role}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default List;
