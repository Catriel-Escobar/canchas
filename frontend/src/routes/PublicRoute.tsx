import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return isAuthenticated ? <Navigate to={'/'} /> : <Outlet />;
}
