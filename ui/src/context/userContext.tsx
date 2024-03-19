import { createContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface CurrentUserData {
    name?: string;
    email?: string;
}

interface UserContextData { 
    currentUser: CurrentUserData
}

export const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState({} as CurrentUserData);
    const { isAuthenticated, user,  } = useAuth0();

    if(isAuthenticated) {
        if(user && Object.keys(currentUser).length === 0) {
            setCurrentUser({
                name: user?.name,
                email: user?.email
            })
        }
    }

    return (
        <UserContext.Provider value={{ currentUser }}>
          {children}
        </UserContext.Provider>
    );
}