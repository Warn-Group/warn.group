import { Timestamp } from "firebase/firestore";

type Optional<T> = T | null;

export declare interface IUser {
    displayName: string,
    uid: string,
    metadata : {
        createdAt: Timestamp,
        lastLoginAt: Timestamp
    },

    birthdate: Optional<Timestamp>,
    gender: Optional<string>,
    photoURL: Optional<string>,
}