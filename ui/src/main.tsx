import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ComponentsLibrary from './pages/components-library.tsx';
import Error from './pages/error-page.tsx';
import { ApolloProvider } from '@apollo/client';
import { NewApolloClient } from './graphql/apolloClient.tsx';

const Index = () => {
	const [token, setToken] = useState<string | undefined>('');

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
	
	const client = NewApolloClient(token ? token : undefined);

	return (
	  <React.StrictMode>
		<ApolloProvider client={client}>
		  <RouterProvider router={router} />
		</ApolloProvider>
	  </React.StrictMode>
	);
};
  
ReactDOM.createRoot(document.getElementById('root')!).render(<Index />);
