/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { gql, useQuery } from '@apollo/client';

import { departmentToPositions, assignDepartments } from '../utils/assignDepartments.js';
interface UserData {
	userId: string;
	firstName: string;
	lastName: string;
	bindname: string;
	email: string;
	position: string;
	picture?: string;
	department?: string[];
}

interface UserContextData {
	currentUser: UserData | null;
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
	const { user } = useAuth0();

	useEffect(() => {
		if (!currentUser && !loading && data) {
			if (data.hailstormData && user) {
				const hs_user: UserData = data.hailstormData.find((hs_user: UserData) => hs_user.email === user.email);
				if (hs_user) {
					const userWithDepartment = assignDepartments([hs_user], departmentToPositions)[0];
					setCurrentUser(userWithDepartment);
				}
			}
		}
	}, [currentUser, loading, data, user]);

	console.log('current User', currentUser);

	return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextData => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a DataProvider');
	}
	return context;
};
