import { Timestamp } from "firebase/firestore";

export declare interface IUser {
    displayName: string,
    uid: string,
    metadata : {
        createdAt: Timestamp,
        lastLoginAt: Timestamp
    },

    birthdate?: Timestamp,
    gender?: string,
    photoURL?: string,
}