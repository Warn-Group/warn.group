import { firebase_auth } from "./config"

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously, signInWithPopup, AuthProvider, GoogleAuthProvider, signOut as logOut } from "firebase/auth";

export async function signOut() {
    let result = null,
        error = null;
    try {
        result = await logOut(firebase_auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

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

export async function signAnonymously() {
    let result = null,
        error = null;
    try {
        result = await signInAnonymously(firebase_auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    provider.addScope('profile');
    provider.addScope('email');

    return signInWithProvider(provider);
}

async function signInWithProvider(provider: AuthProvider) {
    let result = null,
        error = null;
    try {
        result = await signInWithPopup(firebase_auth, provider);
    } catch (e) {
        error = e;
    }

    return { result, error };
}