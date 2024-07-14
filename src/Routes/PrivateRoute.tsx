import { Navigate } from 'react-router-dom';
import useAuth from '../Hook/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default PrivateRoute;
