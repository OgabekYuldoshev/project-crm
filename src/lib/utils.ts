import { type ClassValue, clsx } from 'clsx';
import memoizeOne from 'memoize-one';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const createQueryString = memoizeOne(
  ({
    queryParams,
    name,
    value
  }: {
    queryParams: ReadonlyURLSearchParams;
    name: string;
    value: string;
  }) => {
    const params = new URLSearchParams(queryParams.toString());

    params.set(name, value);

    return params.toString();
  }
);
