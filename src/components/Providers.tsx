'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/react-query';
import React, { PropsWithChildren } from 'react';

import { getBaseUrl } from '@/lib/utils';
import { trpc } from '@/trpc/client';

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: getBaseUrl() + '/api/trpc',
    }),
  ],
});
export const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
