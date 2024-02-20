import { firebase_firestore } from "./config"

import { setDoc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore"

export async function addData(coll: string, docu: string, data: any) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(firebase_firestore, coll, docu), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}