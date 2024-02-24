import { DatabaseBackup } from 'lucide-react';
import React from 'react';

const EmptyContent = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <DatabaseBackup size={40} className='text-muted-foreground' />
      <h1 className='mt-4 text-xl text-muted-foreground'>No Data Available</h1>
    </div>
  );
};

export default EmptyContent;
