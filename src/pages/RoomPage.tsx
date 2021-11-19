import { IonContent, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { LiveKitRoom, sortParticipants } from "livekit-react";

import { useEffect, useState } from "react";
import Connect from "../components/Connect";
import Stage from "../components/Stage";
import { RoomStore } from "../model/RoomStore";
import "../styles/Home.css";

const RoomPage: React.FC = () => {
  const [isConnected, setConnected] = useState<Boolean>(false);

  useEffect(() => {
    return RoomStore.subscribe(() => {
      console.log("Connection state updated: ", RoomStore.isConnected());
      setConnected(RoomStore.isConnected);
    });
  }, []);

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>Open House</IonTitle>
      </IonToolbar>
      <IonContent fullscreen>
        <div className="home-main">
          {isConnected ? (
            <div>
              <LiveKitRoom
                url={RoomStore.getUrl()}
                token={RoomStore.getToken()}
                stageRenderer={Stage}
                sortParticipants={sortParticipants}
              />
            </div>
          ) : (
            <Connect />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default RoomPage;
