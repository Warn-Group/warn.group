"use client"
import Image from "next/image"
import { IUser } from "@/app/lib/models/user.model";

import no_profile from "@/app/assets/icons/no_profile_icon.svg"

import "@/components/avatar/avatar.scss";

export default function AvatarComp({ user, presence = false }: { user: IUser, presence: boolean }) {
    return (
        <div className="chat-online-user-avatar-container">
            { user.photoURL ?
                <img className="chat-online-user-avatar" src={user.photoURL} alt="profile-picture"/>
            : 
                <Image className="chat-online-user-avatar" src={user.photoURL ? user.photoURL : no_profile} alt="profile-picture"/>
            }
            { presence &&
                <div className="chat-online-user-avatar-presence"></div>
            }
        </div>
    );
};
