"use client"
import { firebase_database } from "@/app/lib/firebase/config";
import { useEffect, useState } from "react";
import { get, onChildAdded, onChildChanged, ref } from 'firebase/database';
import { IUser } from "@/app/lib/models/user.model";

export default function OnlineComp() {
    const [presences, setPresences] = useState<Record<string, IUser>>();
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);

    const presencesRef = ref(firebase_database, 'users');

    useEffect(() => {
        get(presencesRef).then((snapshot) => {
            if (snapshot.exists()) {
                setPresences(snapshot.val() as Record<string, IUser>);
            }
            setInitialFetchDone(true);
        });
        
        const addedUnsubscribe = onChildAdded(presencesRef, (snapshot) => {
            if (snapshot.exists()) {
                const addedPresence = snapshot.val() as IUser;
                setPresences((prevPresences) => ({
                    ...prevPresences,
                    [snapshot.key as string]: addedPresence,
                }));
            }
        });

        const changedUnsubscribe = onChildChanged(presencesRef, (snapshot) => {
            if (snapshot.exists()) {
                const updatedPresence = snapshot.val() as IUser;
                setPresences((prevPresences) => ({
                    ...prevPresences,
                    [snapshot.key as string]: updatedPresence,
                }));
            }
        });

        return () => {
            changedUnsubscribe();
            addedUnsubscribe();
        };
    }, []);

    useEffect(() => {
        if (initialFetchDone && presences) {
            updateOnlineUsers();
        }
    }, [presences, initialFetchDone]);

    const updateOnlineUsers = () => {
        if (presences) {
            const filteredPresences = Object.values(presences).filter(
                (user) => user.presence.presence !== "offline"
            );
            setOnlineUsers(filteredPresences);
        }
    };

    return (
        <div>
            <h2>Online Users</h2>
            <ul>
                { onlineUsers.map((user) => (
                    <li key={user.uid}>
                        {user.displayName}
                    </li>
                ))}
            </ul>
        </div>
    );
};
