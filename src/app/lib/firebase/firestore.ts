import { firebase_firestore } from "./config"

import { setDoc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore"

export async function addData(path: string, data: any) {
    let result = null,
        error = null;

    try {
        result = await setDoc(doc(firebase_firestore, path), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}