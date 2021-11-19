import axios from "axios";

type RoomStoreListener = () => void;

export const RoomStore = (() => {
  let _listeners: RoomStoreListener[] = [];
  let _isConnected: Boolean = false;
  let _url = "wss://demo.livekit.cloud";
  let _token = "";

  function subscribe(listener: RoomStoreListener) {
    _listeners.push(listener);
    console.log("Listeners:", _listeners.length);

    const unsubscribe = () => {
      _listeners = _listeners.filter((li) => listener !== li);
      console.log("unsubscribed from store");

      if (_listeners.length === 0) {
        console.log("No store listeners");
      }
    };

    return unsubscribe;
  }

  function getToken() {
    return _token;
  }

  function getUrl() {
    return _url;
  }

  function joinRoom() {
    console.log("Join room...");
    if (_token === "") {
      axios
        .post("https://livekit-server-api.russdsa.repl.co/roomToken", {
          roomName: "russ",
          participantName: "prasad",
        })
        .then((res: any) => {
          console.log("response from livekit: ", res.data);
          if (res.data && res.data.token) {
            _token = res.data.token;
            _isConnected = true;
          }
          notifyListeners();
        });
    } else {
      _isConnected = true;
      notifyListeners();
    }
  }

  function leaveRoom() {
    console.log("Leaving room...");
    _isConnected = false;
    _token = "";
    notifyListeners();
  }

  function isConnected() {
    return _isConnected;
  }

  function notifyListeners() {
    console.log("Notify listeners");
    for (let listener of _listeners) {
      listener();
    }
  }

  return {
    isConnected: isConnected,
    joinRoom: joinRoom,
    leaveRoom: leaveRoom,
    getToken: getToken,
    getUrl: getUrl,
    subscribe: subscribe,
  };
})();
