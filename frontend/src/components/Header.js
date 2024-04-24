import {Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

import { useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Blog
        </span>
        Post
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>


        <Link to='/sign-in'>
          <Button gradientDuoTone='purpleToBlue' outline>
            Sign In
          </Button>
        </Link>

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}