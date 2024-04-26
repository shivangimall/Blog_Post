import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import DashBoard from "./pages/Dashboard";
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <BrowserRouter>
       <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Route>
        <Route path='/post/:id' element={<PostPage />} />
      </Routes>

    
    </BrowserRouter>
  );
}

export default App;
