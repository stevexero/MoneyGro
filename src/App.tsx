import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Distributions from './pages/Distributions';
import Register from './pages/Register';
import RegisterView from './pages/RegisterView';
import Layout from './components/Layout';

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
        path: 'register',
        element: <Register />,
        children: [{ path: ':id', element: <RegisterView /> }],
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
