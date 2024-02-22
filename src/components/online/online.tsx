"use client"
import Image from "next/image"
import { firebase_database } from "@/app/lib/firebase/config";
import { useEffect, useState } from "react";
import { get, onChildAdded, onChildChanged, ref } from 'firebase/database';
import { IUser } from "@/app/lib/models/user.model";

import no_profile from "@/app/assets/icons/no_profile_icon.svg"

import "@/components/online/online.scss";

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
        <div className="chat-online-container">
            <div className="chat-online-title-container">
                <h2 className="chat-online-title">Online member{onlineUsers.length > 1 ? 's' : ''} ({onlineUsers.length})</h2>
            </div>
            <ul>
                {onlineUsers.map((user) => (
                    <li key={user.uid}>
                        <div className="chat-online-user-container">
                            <div className="chat-online-user-avatar-container">
                                { user.photoURL ?
                                    <img className="chat-online-user-avatar" src={user.photoURL} alt="profile-picture"/>
                                : 
                                    <Image className="chat-online-user-avatar" src={user.photoURL ? user.photoURL : no_profile} alt="profile-picture"/>
                                }
                                <div className="chat-online-user-avatar-presence"></div>
                            </div>
                            <div className="chat-online-user-info-container">
                                <span className="chat-online-user-info-displayname">{user.displayName}</span>
                                <span className="chat-online-user-info-status">{user.presence.presence}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
