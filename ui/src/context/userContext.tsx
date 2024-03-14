import React, { createContext, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface UserContextData { 
    validateUser: (component: any) => React.ReactElement | HTMLButtonElement
}

export const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider = ({ children }: any) => {
    
    const validateUser = (component:any) => {
        const { isAuthenticated, loginWithRedirect } = useAuth0();
    
        if(isAuthenticated) {
            return component;
        } else {
            return <button onClick={() => loginWithRedirect()}>Log in</button>;
        }
    }

    return (
        <UserContext.Provider value={{ validateUser }}>
          {children}
        </UserContext.Provider>
    );
}