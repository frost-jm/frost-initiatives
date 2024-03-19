/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { gql, useQuery } from '@apollo/client';

interface UserData {
	userId: string;
	firstName: string;
	lastName: string;
	bindname: string;
	email: string;
	position?: string;
	picture?: string;
}

interface UserContextData {
	currentUser: UserData | null;
	validateUser: (component: React.ReactElement) => React.ReactElement | HTMLButtonElement;
}

interface UserProviderProps {
	children: React.ReactNode;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

const GET_HAILSTORM = gql`
	query GetHailstormData {
		hailstormData {
			userId
			bindname
			email
			firstName
			lastName
			position
		}
	}
`;

export const UserProvider = ({ children }: UserProviderProps) => {
	const [currentUser, setCurrentUser] = useState<UserData | null>(null);
	const { loading, data } = useQuery(GET_HAILSTORM);
	const { isAuthenticated, loginWithRedirect, user } = useAuth0();

	const validateUser = (component: React.ReactElement) => {
		if (isAuthenticated) {
			return component;
		} else {
			return <button onClick={() => loginWithRedirect()}>Log in</button>;
		}
	};

	useEffect(() => {
		if (!currentUser && !loading && data) {
			if (data.hailstormData && user) {
				const hs_user: UserData = data.hailstormData.find((hs_user: UserData) => hs_user.email === user.email);
				setCurrentUser({
					...hs_user,
				});
			}
		}
	}, [currentUser, loading, data, user]);

	return <UserContext.Provider value={{ currentUser, validateUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextData => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a DataProvider');
	}
	return context;
};
