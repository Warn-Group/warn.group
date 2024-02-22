import { Timestamp } from "firebase/firestore";

export declare interface IDefaultMessage {
    content: string,
    sentAt: Timestamp,
    sentBy: string,
    type: number
}

export declare interface IMessages {
    createdAt: Timestamp,
    messages: IDefaultMessage[]
}