import { createContext, useEffect, useState } from 'react';
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
				redirect_uri: 'http://localhost:5173/success',
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
	  } catch (error) {
		console.error(error);
	  }
	};
  
	useEffect(() => {
		getToken();
	}, [token]);
	
	const client = NewApolloClient(token ? token : undefined);
  
	return (
	  <ApolloProvider client={client}>
		{ children }
	  </ApolloProvider>
	);
};