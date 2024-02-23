"use client"
import { useEffect, useRef, useState } from "react";
import { Timestamp, arrayUnion, doc, onSnapshot, setDoc } from "firebase/firestore";
import { onValue, ref } from "firebase/database";
import { firebase_database, firebase_firestore } from "@/app/lib/firebase/config";
import { useAuthContext } from "@/app/context/auth";

import AvatarComp from "../avatar/avatar";
import { IDefaultMessage, IMessages } from "@/app/lib/models/messages.model";
import { IUser } from "@/app/lib/models/user.model";

import "@/components/chat/chat.scss";
import LoadingComp from "../loading/loading";

export default function ChatComp({ chatid }: { chatid: string }) {
    const [message, setMessage] = useState('')
    const [messagesList, setMessagesList] = useState<IDefaultMessage[]>([])
    const [cachedUsers, setCachedUsers] = useState<Record<string, IUser>>();

    const [loadingMessages, setLoadingMessages] = useState(true);

    const bottomRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);

    const { user } = useAuthContext();

    const messagesRef = doc(firebase_firestore, `messages/${chatid}`)

    const handleForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (user) {
            const newMessage = {
                type: 1,
                sentAt: Timestamp.now(),
                sentBy: user.uid,
                content: message
            } as IDefaultMessage;
            try {
                await setDoc(messagesRef, { messages: arrayUnion(newMessage) }, { merge: true });
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }

        try {
            // @ts-ignore comment
            event.target[0].value = '';
        } catch (_) { }
        setMessage('');
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            if (snapshot.exists()) {
                const updatedData = snapshot.data() as IMessages;
                setMessagesList(updatedData.messages);

                if (!(updatedData.messages?.length > 0)) {
                    return;
                }

                const uniqueUserIds = [...new Set(updatedData.messages.map(message => message.sentBy))];

                var newUsersToFetch = Array.from(uniqueUserIds)
                if (cachedUsers) {
                    newUsersToFetch = Array.from(uniqueUserIds).filter(
                        userId => cachedUsers.hasOwnProperty(userId)
                    );
                }

                newUsersToFetch.forEach(userId => {
                    const userRef = ref(firebase_database, `users/${userId}`);
                    onValue(userRef, (snapshot) => {
                        if (snapshot.exists()) {
                            const user = snapshot.val() as IUser;
                            setCachedUsers(prevCachedUsers => ({ ...prevCachedUsers, [userId]: user }));
                        } else {
                            console.warn(`User data not found for ${userId}`);
                        }
                    }, (error) => {
                        console.error("Error fetching user data:", error);
                    });
                });

            }
        }, (error) => {
            console.error("Error fetching user data:", error);
        });
        return () => unsubscribe();
    }, [chatid]);

    useEffect(() => {
        const margin = 400;

        setLoadingMessages(false);

        bottomRef?.current?.scrollIntoView({behavior: 'smooth'});

        // if (messageRef.current && messageRef.current.scrollHeight - messageRef.current.scrollTop <= messageRef.current.clientHeight + margin) {
        //     bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
        // }
    }, [messagesList]);

    return (
        <div className="chat-component-container">
            <div className="chat-title-container">
                <h2 className="chat-title">{chatid}</h2>
            </div>
            <div className="chat-messages-container" ref={messageRef}>
                { loadingMessages || messagesList?.length < 1 ? <LoadingComp style={{width: '100%', height: '100%'}}/> :
                    <>
                        {messagesList?.length > 0 && messagesList.map((message, index) => (
                            <div key={`message-${index}`} className="chat-message-container">
                                {cachedUsers &&
                                    <AvatarComp user={cachedUsers[message.sentBy]}/>
                                }
                                <div className="chat-message-sub-container">
                                    <div className="chat-message-info-container">
                                        <div className="chat-message-info-displayname">{cachedUsers && cachedUsers[message.sentBy] ? cachedUsers[message.sentBy].displayName : 'Anonymous'}</div>
                                        <div className="chat-message-info-sentat">{message.sentAt.toDate().toLocaleTimeString()} {message.sentAt.toDate().toLocaleDateString()}</div>
                                    </div>
                                    <div className="chat-message-content-container">
                                        <div className="chat-message-content">{message.content}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                }
                <div ref={bottomRef}></div>
            </div>
            <form onSubmit={handleForm} className="chat-input-container">
                <input
                    className="chat-input"
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    type="text"
                    placeholder="Message.."
                    autoComplete="off"
                />
            </form>
        </div>
    );
};
