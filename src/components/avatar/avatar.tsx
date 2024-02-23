import Image from "next/image"
import { IUser } from "@/app/lib/models/user.model";

import no_profile from "@/app/assets/icons/no_profile_icon.svg"

import "@/components/avatar/avatar.scss";

export default function AvatarComp({ user, presence = false }: { user: IUser, presence?: boolean }) {
    return (
        <div className="chat-online-user-avatar-container">
            { user.photoURL ?
                <Image
                    src={user.photoURL} 
                    width={0} 
                    height={0} 
                    loader={({src}) => src} 
                    className="chat-online-user-avatar" 
                    alt="profile-picture"
                />
            :
                <Image
                    src={no_profile}
                    className="chat-online-user-avatar"
                    alt="profile-picture"
                />
            }
            { presence &&
                <div className="chat-online-user-avatar-presence"/>
            }
        </div>
    );
};
