"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebase_auth, firebase_database } from '../lib/firebase/config';

import LoadingComp from '@/components/loading/loading';
import { onDisconnect, ref, serverTimestamp, update } from 'firebase/database';

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
        const unsubscribe = onAuthStateChanged(firebase_auth, async (user) => {
            if (user) {
                setUser(user);

                setPresence(user);
            } else {
                setUser(undefined);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    });

    return (
        <AuthContext.Provider value={{ user }}>
            { loading ? <LoadingComp/> : children }
        </AuthContext.Provider>
    );
};

async function setPresence(user: User | undefined, presence?: string) {
    if (user) {
        const presenceRef = ref(firebase_database, `users/${user.uid}/presence`);
    
        try {
            await update(presenceRef, {
                presence: presence ?? 'online',
                lastChanged: serverTimestamp()
            });
        } catch(error) {
            console.log("Error updating presence:", error);
        }

        onDisconnect(presenceRef).update({
            presence: 'offline',
            lastChanged: serverTimestamp()
        });
    }
}