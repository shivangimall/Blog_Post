import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const OnlyAdminPrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser && currentUser.data.role==="admin" ? (
      <Outlet />
    ) : (
      <Navigate to='/sign-in' />
    );
}

export default OnlyAdminPrivateRoute