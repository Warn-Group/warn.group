import { firebase_auth } from "./config"

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export async function signUp(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(firebase_auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(firebase_auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}