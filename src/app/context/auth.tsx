"use client"
import React, { ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebase_auth } from '../lib/firebase/config';

import LoadingComp from '@/components/loading/loading';

interface AuthContextValue {
    user?: User | undefined;
}

export const AuthContext = React.createContext<AuthContextValue>({});

export const useAuthContext = (): AuthContextValue => { return React.useContext(AuthContext) };

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children } : AuthContextProviderProps) => {
    const [user, setUser] = React.useState<User | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebase_auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Inject loading component bellow
    return (
        <AuthContext.Provider value={{ user }}>
            { loading ? <LoadingComp/> : children }
        </AuthContext.Provider>
    );
};