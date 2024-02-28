import OnlineComp from "@/components/online/online";
import ChatComp from "@/components/chat/chat";

import "@/app/(pages)/(protected)/chat/chat.scss";

export default function Chat() {
    return (
        <>
            <div className="chat-root-container">
                <div className="chat-container">
                    <ChatComp chatid="global"/>
                </div>
                <div className="chat-online-container-root">
                    <OnlineComp/>
                </div>
            </div>
        </>
    );
};
