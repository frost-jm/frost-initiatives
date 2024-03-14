import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ComponentsLibrary from './pages/components-library.tsx';
import Error from './pages/error-page.tsx';
import { ApolloProvider } from '@apollo/client';
import { NewApolloClient } from './graphql/apolloClient.tsx';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { UserProvider } from './context/userContext.tsx';


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
		<Auth0Provider
			domain={import.meta.env.VITE_AUTH0_DOMAIN}
			clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}
		>
			<ApolloProvider client={client}>
				<UserProvider>
					<RouterProvider router={router} /> 
				</UserProvider>
			</ApolloProvider>
		</Auth0Provider>
	  </React.StrictMode>
	);
};
  
ReactDOM.createRoot(document.getElementById('root')!).render(<Index />);
