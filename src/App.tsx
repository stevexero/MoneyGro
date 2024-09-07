import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Distributions from './pages/Distributions';
import Layout from './components/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Distributions />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

const App: React.FC = () => {
  useEffect(() => {
    if (import.meta.env.VITE_ENVIRONMENT === 'development') {
      localStorage.setItem('umami.disabled', '1');
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
