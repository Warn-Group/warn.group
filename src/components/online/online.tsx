"use client"
import { useEffect, useState } from "react";
import { get, onChildAdded, onChildChanged, ref } from 'firebase/database';

import { firebase_database } from "@/app/lib/firebase/config";
import { IUser } from "@/app/lib/models/user.model";
import AvatarComp from "../avatar/avatar";

import "@/components/online/online.scss";
import LoadingComp from "../loading/loading";
import Link from "next/link";
import { ROUTE_CHAT } from "@/app/lib/routes/routes";
import { useAuthContext } from "@/app/context/auth";

export default function OnlineComp() {
    const [presences, setPresences] = useState<Record<string, IUser>>();
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);

    const [loadingOnline, setLoadingOnline] = useState(true);

    const selfUser = useAuthContext();

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
        setLoadingOnline(false);
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
        <div className="chat-online-container">
            <div className="chat-online-title-container">
                <h2 className="chat-online-title">Online member{onlineUsers.length > 1 ? 's' : ''} ({onlineUsers.length})</h2>
            </div>
            <ul>
            { loadingOnline ? <LoadingComp style={{width:'100%', height:'100%'}}/> :
                <>
                    {onlineUsers.map((user, index) => (
                        <li key={`${index}-${user.uid}`}>
                            <Link 
                                href={
                                    user.uid === selfUser.user?.uid 
                                    ? '' 
                                    : `${ROUTE_CHAT}/${user.uid}`
                                } 
                                className="chat-online-user-container"
                                >
                                <AvatarComp user={user} presence={true}/>
                                <div className="chat-online-user-info-container">
                                    <span className="chat-online-user-info-displayname">{user.displayName}</span>
                                    <span className="chat-online-user-info-status">{user.presence.presence}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </>
            }
            </ul>
        </div>
    );
};
