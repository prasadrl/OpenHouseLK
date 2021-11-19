import { useEffect, useState } from "react";
import { AudioRenderer, StageProps } from "livekit-react";
import { Participant, AudioTrack, LocalParticipant } from "livekit-client";
import {
  IonButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
} from "@ionic/react";

import { micOffOutline, micOutline } from "ionicons/icons";
import { RoomStore } from "../model/RoomStore";
import Avatar from "./Avatar";
import "../styles/Stage.css";

// renderStage prepares the layout of the stage using subcomponents. Feel free to
// modify as you see fit. It uses the built-in ParticipantView component in this
// example; you may use a custom component instead.
export default function Stage(props: StageProps) {
  const { room, participants, audioTracks, isConnecting, error } =
    props.roomState;

  const [micEnabled, setMicEnabled] = useState(false);

  useEffect(() => {
    if (room != null) {
      console.log("Starting audio...");
      room.startAudio();
    }
  }, [room]);

  if (isConnecting) {
    return <div className="loading-message">Connecting...</div>;
  }
  if (error) {
    return <div className="loading-message">Error: {error.message}</div>;
  }
  if (!room) {
    return <div className="loading-message">Room closed</div>;
  }

  function toggleMicState() {
    if (room !== undefined) {
      let isEnabled = room.localParticipant.isMicrophoneEnabled;
      room.localParticipant.setMicrophoneEnabled(!isEnabled);
      setMicEnabled(!isEnabled);
    }
  }

  return (
    <div className="slideUpAnimation">
      <IonGrid className="stage-container">
        <IonRow>
          <div className="room-title">{room?.name}</div>
        </IonRow>
        <IonRow>
          {participants.map((participant: Participant) => (
            <Avatar
              key={participant.sid}
              label={
                participant instanceof LocalParticipant
                  ? "You"
                  : participant.identity
              }
              isMuted={!participant.isMicrophoneEnabled}
              isSpeaking={participant.isSpeaking}
            />
          ))}
        </IonRow>
      </IonGrid>
      {audioTracks.map((track: AudioTrack) => (
        <AudioRenderer key={track.sid} track={track} isLocal={false} />
      ))}
      <div className="stage-controlview">
        <IonItem lines="none" className="control-footer">
          <IonButton
            slot="start"
            mode="ios"
            fill="clear"
            shape="round"
            color="clear"
            className="leave-button"
            onClick={() => {
              room.disconnect();
              RoomStore.leaveRoom();
            }}
          >
            <IonLabel>Leave</IonLabel>
          </IonButton>
          <IonButton
            slot="end"
            mode="ios"
            fill="clear"
            shape="round"
            color="clear"
            className="mic-button"
            onClick={toggleMicState}
          >
            <IonIcon icon={micEnabled ? micOutline : micOffOutline} />
          </IonButton>
        </IonItem>
      </div>
      <IonNote className="stage-footer">
        room-name:{room?.name}, sid:{room?.sid}, participants:
        {room?.participants.size}
      </IonNote>
    </div>
  );
}
