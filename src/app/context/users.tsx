"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebase_auth } from '../lib/firebase/config';

import LoadingComp from '@/components/loading/loading';

interface AuthContextValue {
    user?: User | undefined;
}

export const AuthContext = createContext<AuthContextValue>({});

export const useAuthContext = (): AuthContextValue => { return useContext(AuthContext) };

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children } : AuthContextProviderProps) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

    return (
        <AuthContext.Provider value={{ user }}>
            { loading ? <LoadingComp/> : children }
        </AuthContext.Provider>
    );
};