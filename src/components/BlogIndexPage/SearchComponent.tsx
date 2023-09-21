import { useState } from 'react';

function SearchForm(props: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.handleSearchChange(searchTerm);
  };

  return (
    <form
      className='flex flex-col lg:flex-row items-center justify-center mx-auto gap-2'
      onSubmit={handleSearch}
    >
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='sm:min-w-[1rem] relative lg-min-w-[30rem] m-2'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-7 h-7 text-gray-500 dark:text-gray-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <input
          type='text'
          id='simple-search'
          style={{
            boxShadow: '0px 5px 15px 0px rgba(255, 125, 25, 0.25)',
          }}
          className='w-full text-gray-900 text-[1.2rem] rounded-[1rem] pl-14 py-5 border-[2px] pr-5 border-orange-300 ring-0 focus:ring-0 focus:border-orange-500'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex flex-row lg:gap-2 gap-5'>
        <button
          type='submit'
          className='text-white bg-blue-700 border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-5 px-5 rounded-[1rem] border-[2px]'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
          <span className='sr-only'>Search</span>
        </button>
        <button
          onClick={props.setFilters}
          className='text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-5 px-5 rounded-[1rem] border-[2px]'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              style={{ fill: '#0B1719' }}
              d='M8,9.142V4H6v5.142c-1.72,0.447-3,2-3,3.858c0,1.858,1.28,3.411,3,3.858v10.096h2V16.858
          c1.72-0.447,3-2,3-3.858C11,11.142,9.72,9.589,8,9.142z M7,15c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2
          C9,14.105,8.105,15,7,15z M17,16.142V10V4h-2v6v6.142c-1.72,0.447-3,2-3,3.858c0,1.858,1.28,3.411,3,3.858v3.096h2v-3.096
          c1.72-0.447,3-2,3-3.858C20,18.142,18.72,16.589,17,16.142z M16,22c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2
          C18,21.105,17.105,22,16,22z M29,16c0-1.858-1.28-3.411-3-3.858V4h-2v8.142c-1.72,0.447-3,2-3,3.858c0,1.858,1.28,3.411,3,3.858
          v7.096h2v-7.096C27.72,19.411,29,17.858,29,16z M25,18c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2
          C27,17.105,26.105,18,25,18z'
            />
          </svg>
          <span className='sr-only'>Search</span>
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
