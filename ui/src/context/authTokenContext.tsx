import React, { createContext, useEffect, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import { NewApolloClient } from '../graphql/apolloClient';

interface AuthTokenData { 
    token: string | undefined;
}

export const ApolloContext = createContext<AuthTokenData>({} as AuthTokenData);

export const AuthTokenProvider = ({ children }: any) => {
    return (
        <Auth0Provider
			domain={import.meta.env.VITE_AUTH0_DOMAIN}
			clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: window.location.origin,
				// audience: import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL,
				// scope: "read:current_user update:current_user_metadata"
			}}
		>
            <TokenHandler>
				{children}
			</TokenHandler>
        </Auth0Provider>
    );
}

const TokenHandler = ({ children }: any) => {
	const { getAccessTokenSilently } = useAuth0();
	const [token, setToken] = useState<string | undefined>('');
  
	const getToken = async () => {
	  try {
		const token = await getAccessTokenSilently();
		setToken(token);
		return token;
	  } catch (error) {
		console.error(error);
	  }
	};
  
	useEffect(() => {
	  getToken();
	}, []);
	
	const client = NewApolloClient(token ? token : undefined);
  
	return (
	  <ApolloProvider client={client}>
		{ children }
	  </ApolloProvider>
	);
};