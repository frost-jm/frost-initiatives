import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ComponentsLibrary from './pages/components-library.tsx';
import Error from './pages/error-page.tsx';
import { DataProvider } from './context/DataContext.tsx';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<DataProvider>
			<RouterProvider router={router} />
		</DataProvider>
	</React.StrictMode>
);
