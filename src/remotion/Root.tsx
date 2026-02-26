import { Composition, registerRoot } from "remotion";
import { BranchesVideo } from "./BranchesVideo";
import { MLLab3DLogo } from "./MLLab3DLogo";
import { MLLabLogoAnimation } from "./MLLabLogoAnimation";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="BranchesVideo"
                component={BranchesVideo}
                durationInFrames={300}
                fps={30}
                width={1080}
                height={1080}
            />
            <Composition
                id="Graphic3D"
                component={MLLab3DLogo}
                durationInFrames={300}
                fps={30}
                width={1080}
                height={1080}
            />
            <Composition
                id="NetworkSVG"
                component={MLLabLogoAnimation}
                durationInFrames={600}
                fps={30}
                width={1080}
                height={1080}
            />
        </>
    );
};

registerRoot(RemotionRoot);
