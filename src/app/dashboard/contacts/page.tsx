import List from './_components/List';
import Search from './_components/Search';

const Page = () => {
  return (
    <main className='block'>
      <div className='flex items-center justify-between border-b px-8 py-4'>
        <h1 className='text-xl'>Contacts</h1>
        <Search />
      </div>
      <div className='px-8 py-4'>
        <List />
      </div>
    </main>
  );
};

export default Page;
