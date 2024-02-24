"use client"
import { useEffect, useState } from "react";
import { get, onChildAdded, onChildChanged, ref } from 'firebase/database';

import { firebase_database } from "@/app/lib/firebase/config";
import { IUser } from "@/app/lib/models/user.model";
import AvatarComp from "../avatar/avatar";
import MiniProfileComp from "../miniprofile/miniprofile";

import { Popover, PopoverTrigger, PopoverContent, Skeleton } from "@nextui-org/react";

import "@/components/online/online.scss";

export default function OnlineComp() {
    const [presences, setPresences] = useState<Record<string, IUser>>();
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);

    const [loadingOnline, setLoadingOnline] = useState(true);

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
            <ul className="chat-online-user-root-container">
            { 
                loadingOnline 
                ? 
                    <>
                        { Array.from({ length: 15 }, () => undefined).map((_, index) => (
                            <div className="chat-online-loading-container">
                                <div>
                                    <Skeleton className="chat-online-loading-avatar"/>
                                </div>  
                                <div className="chat-online-loading-texts">
                                    <Skeleton className="chat-online-loading-text-big"/>
                                    <Skeleton className="chat-online-loading-text-small"/>
                                </div>
                            </div>
                        ))}
                    </>
                : <>
                    {
                        onlineUsers.map((user, index) => (
                            <Popover showArrow placement="left">
                                <PopoverTrigger>
                                    <li key={`${index}-${user.uid}`} className="flex items-center my-2 ml-2">
                                        <AvatarComp user={user} presence={true} styleWidth={50} styleHeight={50}/>
                                        <div className="chat-online-user-info-container">
                                            <span className="chat-online-user-info-displayname">{user.displayName}</span>
                                            <span className="chat-online-user-info-status">{user.presence.presence}</span>
                                        </div>
                                    </li>
                                </PopoverTrigger>
                                <PopoverContent className="p-1">
                                    <MiniProfileComp user={user}/>
                                </PopoverContent>
                            </Popover>
                    ))}
                </>
            }
            </ul>
        </div>
    );
};
