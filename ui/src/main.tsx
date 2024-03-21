import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ComponentsLibrary from './pages/components-library.tsx';
import Error from './pages/error-page.tsx';
import { UserProvider } from './context/userContext.tsx';
import { AuthTokenProvider } from './context/AuthToken.tsx';
import React from 'react';

const Index = () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 055a65a503c3c36beabf6b12924c30ea3a44e3ab
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Index />);
