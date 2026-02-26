"use client";

import { Player } from "@remotion/player";
import { MLLab3DLogo } from "./MLLab3DLogo";

export default function RemotionHeroGraphic() {
    return (
        <div className="w-full h-full flex items-center justify-center relative z-0">
            <Player
                component={MLLab3DLogo}
                durationInFrames={300}
                compositionWidth={500}
                compositionHeight={500}
                fps={30}
                style={{
                    width: 500,
                    height: 500,
                }}
                loop
                autoPlay
                acknowledgeRemotionLicense={true}
            />
        </div>
    );
}
