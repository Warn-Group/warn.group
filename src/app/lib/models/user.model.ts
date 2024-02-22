import { IPresence } from "./presence.model";

type Optional<T> = T | null;

export declare interface IUser {
    displayName: string,
    uid: string,
    metadata : {
        createdAt: number | object
    },
    presence: IPresence,
    
    birthdate: number,
    gender: string,
    photoURL: Optional<string>,
}