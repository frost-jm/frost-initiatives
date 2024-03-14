import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ComponentsLibrary from './pages/components-library.tsx';
import Error from './pages/error-page.tsx';
import { UserProvider } from './context/userContext.tsx';
import { AuthTokenProvider } from './context/authTokenContext.tsx';

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
