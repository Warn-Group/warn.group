'use client'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth, firebase_database } from '../lib/firebase/config';

import LoadingComp from '@/components/loading/loading';
import { onDisconnect, ref, serverTimestamp, set, update } from 'firebase/database';

interface PresenceContextValue {
    presence?: 'online' | 'idle' | 'offline';
}

export const PresenceContext = createContext<PresenceContextValue>({});

export const usePresenceContext = (): PresenceContextValue => {
    return useContext(PresenceContext);
};

interface PresenceContextProviderProps {
    children: ReactNode;
}

export const PresenceContextProvider = ({ children }: PresenceContextProviderProps) => {
    const [presence, setPresence] = useState<PresenceContextValue['presence']>('offline');
    const [loading, setLoading] = useState(true);

    const db = firebase_database;

    useEffect(() => {
        const unsubscribeAuthState = onAuthStateChanged(firebase_auth, async (user) => {
            if (user) {
                const presenceRef = ref(db, `users/${user.uid}/presence`);

                try {
                    await update(presenceRef, {
                        presence: 'online',
                        lastChanged: serverTimestamp()
                    });

                    setPresence('online');
                    setLoading(false);
                } catch (error) {
                    console.error('Error updating presence:', error);
                }

                onDisconnect(presenceRef).update({
                    presence: 'offline',
                    lastChanged: serverTimestamp()
                });
            } else {
                setPresence('offline');
                setLoading(false);
            }
        });

        return () => unsubscribeAuthState();
    }, []);

    return (
        <PresenceContext.Provider value={{ presence }}>
            {loading ? <LoadingComp /> : children }
        </PresenceContext.Provider>
    );
};