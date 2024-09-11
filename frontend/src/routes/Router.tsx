import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import HomeLayout from '../layouts/home/HomeLayout';
import PublicRoute from './PublicRoute';
import AuthLayout from '../layouts/auth/AuthLayout';
import { lazy, Suspense, useEffect } from 'react';
import { userStore } from '../store/User.store';
import Spinner from '../components/Spinner';
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Home = lazy(() => import('../pages/home/Home'));
export default function Router() {
  const { checkLogin, isAuthenticated } = userStore();
  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<HomeLayout />}>
            <Route
              path='/'
              element={
                <Suspense fallback={<Spinner />}>
                  <Home />
                </Suspense>
              }
            />
          </Route>
        </Route>
        {/* PUBLICS ROUTES */}
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<AuthLayout />}>
            <Route
              path='/login'
              element={
                <Suspense fallback={<Spinner />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path='/register'
              element={
                <Suspense fallback={<Spinner />}>
                  <Register />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
