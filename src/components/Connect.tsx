import { IonButton } from "@ionic/react";
import { RoomStore } from "../model/RoomStore";
import "../styles/Connect.css";

const Connect: React.FC = () => {
  function connectToRoom() {
    console.log("Connecting to room..");
    RoomStore.joinRoom();
  }

  return (
    <div>
      <div className="connect-main">
        <div className="connect-header">Welcome</div>
        <IonButton
          shape="round"
          mode="ios"
          fill="clear"
          color="clear"
          className="join-button"
          onClick={connectToRoom}
        >
          Join
        </IonButton>
      </div>
    </div>
  );
};

export default Connect;
