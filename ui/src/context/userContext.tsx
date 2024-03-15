import React, { createContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface CurrentUserData {
    name?: string;
    email?: string;
}

interface UserContextData { 
    currentUser: CurrentUserData
    validateUser: (component: any) => React.ReactElement
}

export const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState({} as CurrentUserData);
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
 
    const validateUser = (component:any) => { 
        if(isAuthenticated) {
            return component;
        } else {
            loginWithRedirect()
        }
    }

    useEffect(() => {
        if(isAuthenticated) {
            if(user && Object.keys(currentUser).length === 0) {
                setCurrentUser({
                    name: user?.name,
                    email: user?.email
                })
            }
        }
    }, [user])

    return (
        <UserContext.Provider value={{ currentUser, validateUser }}>
          {children}
        </UserContext.Provider>
    );
}