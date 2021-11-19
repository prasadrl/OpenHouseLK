import { IonIcon } from "@ionic/react";
import { micOffOutline, micOutline } from "ionicons/icons";
import { AvatarProps } from "../model/types";

import "../styles/Avatar.css";

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const isMuted = props.isMuted ?? false;
  const isSpeaking = props.isSpeaking ?? false;
  const label = props.label ?? "";
  const avatarStyle = isSpeaking
    ? "avatar-container avatar-speaking-border"
    : "avatar-container";

  return (
    <div className={avatarStyle}>
      <div className="avatar-label">{label}</div>
      <div className="badge-container">
        <IonIcon
          icon={isMuted && !isSpeaking ? micOffOutline : micOutline}
          className="avatar-mic"
        />
      </div>
    </div>
  );
};

export default Avatar;
