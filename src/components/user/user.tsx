"use client"
import { firebase_database } from "@/app/lib/firebase/config";
import { IUser } from "@/app/lib/models/user.model";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function UserComp({ uid }: { uid: string }) {
    const [fetchedUser, setFetchedUser] = useState<IUser | null>(null);

    const userRef = ref(firebase_database, `users/${uid}`);

    useEffect(() => {
        const unsubscribe = onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const updatedData = snapshot.val() as IUser;
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