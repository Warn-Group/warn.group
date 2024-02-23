'use client'
import { ServerSideComponentProp } from "@/app/lib/serverprops";
import ChatComp from "@/components/chat/chat";
import OnlineComp from "@/components/online/online";

import "@/app/(pages)/(protected)/chat/chat.scss";
import { useEffect, useState } from "react";
import { firebase_auth } from "@/app/lib/firebase/config";

export default function ChatId(props: ServerSideComponentProp<{ chatid: string }>) {
    const target = props.params.chatid
    const [chatId, setChatId] = useState<string>()

    const user = firebase_auth.currentUser;

    useEffect(() => {
        if (user) {
            setChatId(user.uid > target ? `${user.uid}-${target}` : `${target}-${user.uid}`)
        }
    }, [user]);

    return (
        <>
            <div className="chat-root-container">
                <div className="chat-container">
                    { chatId &&
                        <ChatComp chatid={chatId}/>
                    }
                </div>
                <div className="chat-online-container-root">
                    <OnlineComp/>
                </div>
            </div>
        </>
    );
}
