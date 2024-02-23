import UserComp from "@/components/user/user";
import { ServerSideComponentProp } from "@/app/lib/serverprops";

export default function Profile(props: ServerSideComponentProp<{ uid: string }>) {
    const uid = props.params.uid

    return (
        <UserComp uid={uid}/>
    );
}
