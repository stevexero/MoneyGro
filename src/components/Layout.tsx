import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import useAuthStore from '../stores/authStore';

const Layout = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className='container mx-auto px-4 md:px-0 overflow-x-hidden'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
