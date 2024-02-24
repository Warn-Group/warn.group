"use client"
import Link from "next/link";
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"; // client == navigation | server == router
import { FormEvent, useRef, useState } from "react";
import { signIn } from "@/app/lib/firebase/auth"
import { ROUTE_ROOT, ROUTE_SIGNUP } from "@/app/lib/routes/routes";

import SplineSoftobjectComp from "@/components/spline/softobject/spline";

import google_icon from "@/app/assets/icons/google_icon.svg"
import incognito_icon from "@/app/assets/icons/incognito_icon.svg"

import "@/app/(pages)/(unregistered)/auth/auth.scss";

export default function Signin() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [state_error, setError] = useState<null | any>(null);
    const [state_success, setSuccess] = useState<boolean>(false);

    const refPassword = useRef<HTMLInputElement>(null);

    const redirectTo = searchParams.get("redirect") ?? ROUTE_ROOT

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // prevent page refresh

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { result, error } = await signIn(email, password);
        
        if (refPassword && refPassword.current) {
            refPassword.current.value = '';
        }

        if (error) {
            setError(error);

            setTimeout(() => setError(null), 5 * 1000);

            return;// console.log(error);
        }
        setError(null);
        setSuccess(true);
        return router.push(redirectTo);
    }
    return (
        <div className="auth-root-container">
            <SplineSoftobjectComp/>
            <div className="auth-container">
                <div className="auth-sub-container">
                    <h3 className="auth-title">Sign-in</h3>
                    <form className="auth-form-container" onSubmit={handleForm}>
                        <div className="auth-form-inputs-wrapper">
                            <div className="auth-form-input-container">
                                <input
                                    className="auth-form-input"
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="auth-form-input-container">
                                <input
                                    className="auth-form-input"
                                    required
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    ref={refPassword}
                                />
                            </div>
                            <div className="auth-form-small-texts">
                                <Link href={`${ROUTE_SIGNUP}${searchParams.get("redirect") && "?redirect=" + searchParams.get("redirect")}`} className="auth-form-small-text">Create an account</Link>
                                <div className="auth-form-small-text">Forgot password ?</div>
                            </div>
                            <div className="auth-form-submit-container">
                                {state_error && <p className="auth-form-error">Invalid credentials.</p>}
                                {state_success && <p className="auth-form-success">Login successful.</p>}
                                <button className="auth-form-submit" type="submit">Log in</button>
                            </div>
                        </div>
                    </form>
                    <div className="auth-separator">
                        Or
                    </div>
                    <div className="auth-provider-container">
                        <div className="auth-provider-button">
                            <div className="auth-provider-icon-container">
                                <Image className="auth-provider-icon" src={google_icon} alt="Google icon."/>
                            </div>
                            <span className="auth-provider-text">Continue with Google</span>
                        </div>
                    </div>
                    <div className="auth-provider-container">
                        <div className="auth-provider-button">
                            <div className="auth-provider-icon-container">
                                <Image className="auth-provider-icon auth-incognito-image" src={incognito_icon} alt="Google icon."/>
                            </div>
                            <span className="auth-provider-text">Continue Anonymously</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
