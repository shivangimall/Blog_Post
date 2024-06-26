import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { navigate } from 'react-router-dom';

export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate(); // Change here

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  

  const handleSignout = () => {
    try {
      // Clear token from localStorage
      localStorage.removeItem('token');
      // Dispatch action to clear user data
      dispatch(signoutSuccess());
      // Redirect to /login
      navigate('/sign-in');
    } catch (error) {
      console.log(error.message);
    }
  };
  
 
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
        
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
       
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {
              currentUser && currentUser.role==="admin" && <div><Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
              <Dropdown.Divider />
            <Link to={'/create-post'}>
            <Dropdown.Item>Create Post</Dropdown.Item>
          </Link></div>
            }
            
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
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