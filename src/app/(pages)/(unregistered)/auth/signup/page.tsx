"use client"
import Link from "next/link";
import Image from "next/image"
import { useRouter } from "next/navigation"; // client == navigation | server == router
import { useState } from "react";
import { signUp } from "@/app/lib/firebase/auth"
import { IUser } from "@/app/lib/models/user.model";
import { ref, serverTimestamp, set } from "firebase/database";
import { firebase_database } from "@/app/lib/firebase/config";

import SplineSoftobjectComp from "@/components/spline/softobject/spline";

import google_icon from "@/app/assets/icons/google_icon.svg"
import incognito_icon from "@/app/assets/icons/incognito_icon.svg"

import "@/app/(pages)/(unregistered)/auth/auth.scss";

export default function Signup() {
    const router = useRouter();

    const [step, setStep] = useState<number>(1);

    function backStep() {
        setStep(1);
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')

    const [displayname, setDisplayname] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [gender, setGender] = useState('')

    const [state_step1_error, setStep1Error] = useState<null | any>(null);

    const [state_step2_error, setStep2Error] = useState<null | any>(null);
    const [state_success, setSuccess] = useState<boolean>(false);

    const handleStep1Form = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        setStep1Error(null);

        if (password != confirm_password) {
            setStep1Error("Password missmatch");
            return;
        }
        if (password.length < 8) {
            setStep1Error("Password must be at least 8 characters");
            return;
        }

        return setStep(2);
    }

    const handleStep2Form = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        setStep2Error(null);

        if (displayname.length < 3) {
            setStep2Error("Username must be at least 3 characters long.");
            return;
        }
        if (!RegExp('^[a-zA-ZÀ-ÿ_\-]*$').test(displayname)) {
            setStep2Error("Username must be at least 3 characters long.");
            return;
        }

        const currentYear: number = new Date().getFullYear()
        if (!RegExp('^[0-9]{4}$').test(birthdate) || !(parseInt(birthdate) > currentYear - 100 && parseInt(birthdate) < currentYear - 1)) {
            setStep2Error("Use a valid birthdate.");
            return;
        }

        if (gender === '') {
            setStep2Error("Select a gender.");
            return;
        }

        const { result, error } = await signUp(email, password);

        if (error) {
            // @ts-ignore
            setStep2Error(error!.message);

            setTimeout(() => setStep2Error(null), 10 * 1000);
            return;
        }

        const data = {
            displayName: displayname,
            birthdate: new Date(parseInt(birthdate, 10), 0).getTime(),
            metadata: {
                createdAt: serverTimestamp(),
            },
            presence: {
                lastChanged: serverTimestamp(),
                presence: 'online',
            },
            gender: gender,
            photoURL: null,
            uid: result?.user.uid
        } as IUser

        const userRef = ref(firebase_database, `users/${result?.user.uid}`)

        await set(userRef, data)

        setStep2Error(null);
        setSuccess(true);
        return router.push('/');
    }
    return (
        <div className="auth-root-container" style={{ justifyContent: "flex-start"}}>
            <SplineSoftobjectComp/>
            <div className="auth-container">
                <div className="auth-sub-container">
                    <h3 className="auth-title">Sign-up</h3>
                    {step === 1 && (
                        <form className="auth-form-container" onSubmit={handleStep1Form}>
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
                                        disabled={!(step === 1)}
                                    />
                                </div>
                                <div className="auth-form-input-container">
                                    <input
                                        className="auth-form-input"
                                        onChange={(e) => {
                                            setStep1Error(null);
                                            setPassword(e.target.value)
                                        }}
                                        required
                                        aria-invalid={!!state_step1_error}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        disabled={!(step === 1)}
                                    />
                                </div>
                                <div className="auth-form-input-container">
                                    <input
                                        className="auth-form-input"
                                        onChange={(e) => {
                                            setStep1Error(null);
                                            setConfirmPassword(e.target.value)
                                        }}
                                        required
                                        aria-invalid={!!state_step1_error}
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        placeholder="Confirm password"
                                        disabled={!(step === 1)}
                                    />
                                </div>
                                <div className="auth-form-small-texts">
                                    <div className="auth-form-small-text">1/2</div>
                                    <Link href="/auth/signin" className="auth-form-small-text">Already member ?</Link>
                                </div>
                                <div className="auth-form-submit-container">
                                    {state_step1_error && <p className="auth-form-error">{state_step1_error}</p>}
                                    {state_success && <p className="auth-form-success">Login successful.</p>}
                                    <button className="auth-form-submit" type="submit">Next Step</button>
                                </div>
                            </div>
                        </form>
                    )}
                    {step === 2 && (
                        <form className="auth-form-container" onSubmit={handleStep2Form}>
                            <div className="auth-form-inputs-wrapper">
                                <div className="auth-form-input-container">
                                    <input
                                        className="auth-form-input"
                                        onChange={(e) => setDisplayname(e.target.value)}
                                        required
                                        type="text"
                                        name="displayname"
                                        id="displayname"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="auth-form-input-container">
                                    <input
                                        className="auth-form-input"
                                        onChange={(e) => setBirthdate(e.target.value)}
                                        required
                                        type="number"
                                        pattern="\d*"
                                        name="birthdate"
                                        id="birthdate"
                                        placeholder="Year of birth"
                                    />
                                </div>
                                <div className="auth-form-input-container">
                                    <select
                                        className="auth-form-select"
                                        onChange={(e) => setGender(e.target.value)}
                                        value={gender}
                                        required
                                        name="gender"
                                        id="gender">
                                            <option value='' disabled>Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                </div>
                                <div className="auth-form-small-texts">
                                    {/* onClick={backStep} */}
                                    <div className="auth-form-small-text">2/2</div>
                                    <Link href="/auth/signin" className="auth-form-small-text">Already member ?</Link>
                                </div>
                                <div className="auth-form-submit-container">
                                    {state_step2_error && <p className="auth-form-error">{state_step2_error}</p>}
                                    {state_success && <p className="auth-form-success">Login successful.</p>}
                                    <button className="auth-form-submit" type="submit">Create my account</button>
                                </div>
                            </div>
                        </form>
                    )}
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
