"use client"
import { useAuthContext } from "@/app/context/auth";

export default function UserComp() {
    const { user } = useAuthContext();

    return (
        <div>
            {user && (
                <div>
                    <div>uid: {user.uid}</div>
                </div>
            )}
        </div>
    );
}