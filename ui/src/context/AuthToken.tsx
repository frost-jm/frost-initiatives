import { createContext, useEffect, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import { NewApolloClient } from '../graphql/apolloClient';

interface AuthTokenData {
	token: string | undefined;
}

export const ApolloContext = createContext<AuthTokenData>({} as AuthTokenData);

export const AuthTokenProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Auth0Provider
			domain={import.meta.env.VITE_AUTH0_DOMAIN}
			clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}
		>
			<TokenHandler>{children}</TokenHandler>
		</Auth0Provider>
	);
};

const TokenHandler = ({ children }: { children: React.ReactNode }) => {
	const { getAccessTokenSilently, isAuthenticated, getIdTokenClaims } = useAuth0();
	const [token, setToken] = useState<string | undefined>('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (isAuthenticated) {
					const idToken = await getIdTokenClaims();
					setToken(idToken?.__raw);
				}
			} catch (error) {
				console.error('Error fetching ID token:', error);
			}
		};

		fetchData();

		const tokenRefreshTimer = setInterval(async () => {
			try {
				if (isAuthenticated) {
					await getAccessTokenSilently();
					console.log('Access token renewed.');
				}
			} catch (error) {
				console.error('Error renewing access token:', error);
			}
		}, 300000);

		return () => {
			clearInterval(tokenRefreshTimer);
		};
	}, [isAuthenticated, getIdTokenClaims, getAccessTokenSilently]);

	const client = NewApolloClient(token ? token : undefined);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
