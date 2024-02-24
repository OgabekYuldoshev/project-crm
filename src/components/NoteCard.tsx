import dayjs from 'dayjs';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

export type TNoteCard = {
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  username: string;
  avatar: string;
} & Omit<React.ComponentProps<'div'>, 'className'>;

const NoteCard = ({
  tags,
  title,
  content,
  createdAt,
  username,
  avatar,
  ...props
}: TNoteCard) => {
  return (
    <div
      {...props}
      className='relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg border'
    >
      <div className='block space-y-2 p-4'>
        {/* Tags */}
        <div className='flex space-x-2'>
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        {/* Content */}
        <h4 className='font-semibold'>{title}</h4>
        <p className='line-clamp-2 text-sm text-muted-foreground'>{content}</p>
      </div>
      {/* Footer card */}
      <div className='flex items-center justify-between border-t px-4 py-2'>
        <div className='flex items-center space-x-2'>
          <Avatar className='size-10'>
            <AvatarImage src={avatar} alt='avatar' />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
          <span className='text-sm font-semibold'>{username}</span>
        </div>
        <span className='text-sm text-muted-foreground'>
          {dayjs(createdAt).format('DD/MM/YYYY')}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
