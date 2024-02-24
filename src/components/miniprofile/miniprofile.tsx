"use client"
import { IUser } from "@/app/lib/models/user.model";
import { Chip, Input, Tooltip, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { ROUTE_CHAT } from "@/app/lib/routes/routes";
import { useRouter } from "next/navigation";
import AvatarComp from "../avatar/avatar";

import "@/components/miniprofile/miniprofile.scss";
import { useAuthContext } from "@/app/context/auth";

export default function MiniProfileComp({ user }: { user: IUser }) {
    const router = useRouter()
    const [message, setMessage] = useState<string>('');

    const selfUser = useAuthContext();

    function onEnterPress() {
        if (!selfUser) {
            return;
        }

        if (message && user.uid != selfUser.user?.uid) {
            router.push(`${ROUTE_CHAT}/${user.uid}?message=${message}`);
        }
    }

    return (
        <div className="miniprofile-container">
            <div className="miniprofile-user-root-container">
                <div className="miniprofile-user-container">
                    <AvatarComp
                        user={user}
                        presence={true}
                        styleWidth={75}
                        styleHeight={75}
                    />
                    <div className="miniprofile-user-info-container">
                        <h4 className="miniprofile-user-info-displayname">{user.displayName}</h4>
                        <h5 className="miniprofile-user-info-status">{user.presence.presence}</h5>
                    </div>
                </div>
            </div>
            <div className="miniprofile-infos-createdat">
                <div>Account created:
                    {
                        ` ${new Date(Number(user.metadata.createdAt)).toLocaleDateString()}`
                    }
                </div>
            </div>
            <div className="miniprofile-input-container">
                {
                    user.uid != selfUser.user?.uid ?
                    <Tooltip
                        showArrow={true}
                        content="This feature is coming soon !"
                        color="foreground"
                        closeDelay={2500}
                        >
                        <Input
                            size="sm"
                            type="text"
                            variant="flat"
                            label="Message"
                            radius="sm"
                            value={message}
                            onValueChange={setMessage}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    //onEnterPress();
                                }
                            }}
                        />
                    </Tooltip>
                    :
                    <div className="miniprofile-chip-container">
                        <Chip color="default" variant="shadow">Hey this is you !</Chip>
                    </div>
                }
            </div>
        </div>
    );
};
