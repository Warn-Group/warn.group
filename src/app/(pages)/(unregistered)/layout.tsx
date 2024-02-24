'use client'

import { firebase_auth } from "@/app/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTE_ROOT } from "@/app/lib/routes/routes";
import LoadingComp from "@/components/loading/loading";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    const user = firebase_auth.currentUser;

    useEffect(() => {
        if (user) {
            router.push(ROUTE_ROOT);
        }
    }, [user]);

    return (
        <>
            { !user ? children : <LoadingComp/> }
        </>
    );
}
