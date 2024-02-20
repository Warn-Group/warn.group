"use client"
import { useAuthContext } from "@/app/context/auth";
import { firebase_firestore } from "@/app/lib/firebase/config";
import { IUser } from "@/app/lib/models/user.model";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function UserComp({ uid }: { uid: string }) {
    const { user } = useAuthContext();

    const [fetchedUser, setFetchedUser] = useState<IUser | null>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(firebase_firestore, `users/${uid}`), (snapshot) => {
            if (snapshot.exists()) {
                const updatedData = snapshot.data() as IUser;
                setFetchedUser(updatedData);
            } else {
                setFetchedUser(null);
            }
        }, (error) => {
            console.error("Error fetching user data:", error);
        });
        return () => unsubscribe();
    }, [uid]);

    return (
        <>
            {fetchedUser ? (
                <>
                    <div>UID: {fetchedUser.uid}</div>
                    <div>DisplayName: {fetchedUser.displayName}</div>
                </>
            ) : (
                <div>User not found</div>
                )
            }
        </>
    );
}