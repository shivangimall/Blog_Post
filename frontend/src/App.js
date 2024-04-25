import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import DashBoard from "./pages/Dashboard";

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
        </Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
