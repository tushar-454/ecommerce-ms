import { Navigate } from 'react-router-dom';
import useAuth from '../Hook/useAuth';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to='/' />;
  }
  return children;
};

export default PublicRoute;
