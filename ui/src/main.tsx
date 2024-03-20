import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ComponentsLibrary from './pages/components-library.tsx';
import Error from './pages/error-page.tsx';
import { UserProvider } from './context/userContext.tsx';
import { AuthTokenProvider } from './context/AuthToken.tsx';
import Authorize from './pages/authorize.tsx';
import Success from './pages/success.tsx';
import React from 'react';

const Index = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <Error />,
    },
    {
      path: '/components-library',
      element: <ComponentsLibrary />,
      errorElement: <Error />,
    },
    {
      path: '/authorize',
      element: <Authorize />,
      errorElement: <Error />,
    },
    {
      path: '/success',
      element: <Success />,
      errorElement: <Error />,
    },
  ]);

  return (
    <React.StrictMode>
      <AuthTokenProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthTokenProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Index />);
