import Image from "next/image"
import { IUser } from "@/app/lib/models/user.model";

import no_profile from "@/app/assets/icons/no_profile_icon.svg"

import "@/components/avatar/avatar.scss";
import { CSSProperties } from "react";

const calculatPresenceSize = (radius: number) => {
    const radiusCircle = radius * (3 - 2 * Math.sqrt(2));
    return {
        width: `${radiusCircle * 2}px`,
        height: `${radiusCircle * 2}px`,
        right: `${radiusCircle / 1.5 }px`,
        bottom: `${radiusCircle / 1.5 }px`,
    } as CSSProperties;
};

export default function AvatarComp({ user, presence = false, styleWidth, styleHeight }: { user: IUser, presence?: boolean, styleWidth?: number, styleHeight?: number }) {
    const defaultSquared = 40;

    const defaultWidth = defaultSquared;
    const defaultHeight = defaultSquared;

    return (
        <div
            style={
                {
                    width: `${styleWidth ?? defaultWidth}px`,
                    height: `${styleHeight ?? defaultHeight}px`
                }
            }
            className="chat-online-user-avatar-container"
        >
            {user.photoURL ?
                <Image
                    src={user.photoURL}
                    width={0}
                    height={0}
                    loader={({ src }) => src}
                    unoptimized={true}
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
            {presence &&
                <div
                    style={
                            {
                                ...calculatPresenceSize(styleWidth ? styleWidth / 2 : defaultWidth / 2),
                            }
                    }
                    className="chat-online-user-avatar-presence" />
            }
        </div>
    );
};
