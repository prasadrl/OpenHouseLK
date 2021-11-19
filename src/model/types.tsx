export interface AvatarProps {
  label?: string;
  isMuted?: Boolean;
  isSpeaking?: Boolean;
}

export interface RoomProps {
  url: string;
  token: string;
  onLeaveRoom: () => void;
}

export interface RoomFooterProps {
  onLeaveRoom: () => void;
}
