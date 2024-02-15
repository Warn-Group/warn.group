"use client"
import React from "react"
import Link from "next/link";
import Image from "next/image"
import { signIn } from "@/app/lib/firebase/auth"

import SplineSoftobjectComp from "@/components/spline/softobject/spline";

import google_icon from "@/app/assets/icons/google_icon.svg"
import incognito_icon from "@/app/assets/icons/incognito_icon.svg"

import "@/app/~/auth/auth.scss";

export default function Signin() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return;
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
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="auth-form-small-texts">
                                <Link href="/~/auth/signup" className="auth-form-small-text">Create an account</Link>
                                <div className="auth-form-small-text">Forgot password ?</div>
                            </div>
                            <div className="auth-form-submit-container">
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
