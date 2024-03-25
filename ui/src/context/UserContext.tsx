/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { gql, useQuery } from '@apollo/client';

import { departmentToPositions, assignDepartments } from '../utils/assignDepartments.js';
export interface UserData {
	userId: string;
	firstName: string;
	lastName: string;
	bindname: string;
	email: string;
	position: string;
	picture?: string;
	department?: string[];
	color?: string;
}

interface UserContextData {
	currentUser: UserData | null;
	hailstorm: UserData[];
	hailstormUsers: UserData[] | null;
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
	const [hailstormUsers, setHailstormUsers] = useState<UserData[] | null>([]);

	const { loading, data: hailstorm } = useQuery(GET_HAILSTORM);
	const { user } = useAuth0();

	const colors = useMemo(() => ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#d35400', '#2c3e50', '#27ae60', '#c0392b'], []);

	useEffect(() => {
		if (!currentUser && !loading && hailstorm) {
			if (hailstorm.hailstormData && user) {
				const hs_user: UserData = hailstorm.hailstormData.find((hs_user: UserData) => hs_user.email === user.email);
				if (hs_user) {
					const userWithDepartment = assignDepartments([hs_user], departmentToPositions)[0];
					setCurrentUser(userWithDepartment);
				}
			}
		}
	}, [currentUser, loading, hailstorm, user]);

	useEffect(() => {
		if (!loading && hailstorm) {
			const usersWithColor = hailstorm.hailstormData.map((user: UserData[], index: number) => ({
				...user,
				color: colors[index % colors.length],
			}));
			setHailstormUsers(usersWithColor);
		}
	}, [loading, hailstorm, colors]);

	return <UserContext.Provider value={{ currentUser, hailstorm, hailstormUsers }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextData => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a DataProvider');
	}
	return context;
};
