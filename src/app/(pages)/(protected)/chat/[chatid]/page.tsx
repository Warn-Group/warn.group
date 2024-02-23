import { ServerSideComponentProp } from "@/app/lib/serverprops";

export default function ChatId(props: ServerSideComponentProp<{ chatid: string }>) {
    const chatid = props.params.chatid

    return (
        <div>{chatid}</div>
    );
}
