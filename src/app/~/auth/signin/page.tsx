"use client"
import React from "react"
import { signIn } from "@/app/lib/firebase/auth"

import "@/app/~/auth/auth.scss";
import SplineSoftobjectComp from "@/components/spline/softobject/spline";
import Link from "next/link";

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
                                <img className="auth-provider-icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon."/>
                            </div>
                            <span className="auth-provider-text">Continue with Google</span>
                        </div>
                    </div>
                    <div className="auth-provider-container">
                        <div className="auth-provider-button">
                            <div className="auth-provider-icon-container">
                                <img className="auth-provider-icon" src="https://lh3.googleusercontent.com/ijcidTpqWgtkjN0azDJbXnh5I2b83D65HHi2N7SqGXCXYM4-MYEcCCibdKBGNKTiug" alt="Google icon."/>
                            </div>
                            <span className="auth-provider-text">Continue Anonymously</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
