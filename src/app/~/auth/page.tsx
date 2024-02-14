import Link from "next/link";
import React from "react"

export default function Signup() {
    return (
        <div>
            <Link href="/~/auth/signin">Sign In With email</Link>
            {/* <Link href="/~/auth/signin">Sign In With Google</Link> */}
            <Link href="/~/auth/signup">Sign Up</Link>
            {/* <Link href="/~/auth/signin">Sign In Anonymously</Link> */}
        </div>
    );
}
