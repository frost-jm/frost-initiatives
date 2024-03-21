/* eslint-disable react-refresh/only-export-components */
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ComponentsLibrary from './pages/components-library.tsx';
import Error from './pages/error-page.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { AuthTokenProvider } from './context/AuthToken.tsx';

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
