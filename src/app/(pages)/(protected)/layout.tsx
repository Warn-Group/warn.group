'use client'

import { firebase_auth } from "@/app/lib/firebase/config";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingComp from "@/components/loading/loading";
import { ROUTE_SIGNIN } from "@/app/lib/routes/routes";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();

    const user = firebase_auth.currentUser;

    useEffect(() => {
        if (!user) {
            router.push(`${ROUTE_SIGNIN}?redirect=${pathname}`);
        }
    }, [user]);

    return (
        <>
            { user ? children : <LoadingComp/> }
        </>
    );
}
