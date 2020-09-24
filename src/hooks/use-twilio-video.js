import React, { createContext, useContext, useReducer, useRef } from "react";
import axios from 'axios';
import { connect, createLocalVideoTrack } from 'twilio-video';

// This is the version at the end of 'Show Video in Gatsby from Remote Participants with React Hooks'

const TWILIO_TOKEN_URL = 'https://manatee-vulture-7038.twil.io/create-room-token';

const DEFAULT_STATE = {
  identity: false,
  roomName: false,
  token: false,
  room: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "join":
      return { 
        ...state, 
        token: action.token,
        identity: action.identity, 
        roomName: action.roomName,
         
      };
    case 'set-active-room':
      return { ...state, room: action.room }
    default:
      return DEFAULT_STATE;
  }
};

const TwilioVideoContext = createContext();

const TwilioVideoProvider = ({ children }) => (
  <TwilioVideoContext.Provider value={useReducer(reducer, DEFAULT_STATE)}>
    {children}
  </TwilioVideoContext.Provider>
);

// keeps the context when page changes. Layout would lose it on mount/unmount
export const wrapRootElement = ({ element }) => (
  <TwilioVideoProvider>{element}</TwilioVideoProvider>
);





const handleRemoteParticipant = container => participant => {
  const id = participant.sid;

  const addTrack = track => {
    const container = document.getElementById(id);

    // Create an HTML element to show the track (e.g. <audio> or <video>)
    const media = track.attach(); 

    container.appendChild(media); 
  };

  const el = document.createElement('div');
  el.id = id;
  el.className = 'remote-participant';

  const name = document.createElement('h4');
  name.innerText = participant.identity;
  el.appendChild(name);

  // Attach the new element to the DOM.
  container.appendChild(el); 

  // Attach existing participant audio and video tracks to the DOM.
  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      addTrack(publication.track);
    }
  });

  // If new tracks get added later, add those, too
  participant.on('trackSubscribed', addTrack);
}









const useTwilioVideo = () => {
  const [state, dispatch] = useContext(TwilioVideoContext);
  const videoRef = useRef();
  const { room, token, roomName } = state; 
  const getRoomToken = async ({ identity, roomName }) => {
    const result = await axios.post(TWILIO_TOKEN_URL, {
      identity, 
      room: roomName, 
    });
    dispatch({ type: 'join', token: result.data, identity, roomName });
  };




  const connectToRoom = async () => {
    if (!state.token) {
      return;
    }

    // Connect to the appropriate Twilio video chat room
    const room = await connect(
      state.token,
      { name: state.roomName, audio: true, video: { width: 640 }, logLevel: 'info', }
    ).catch(error => {
      console.error(`Unable to join the room: ${error.message}`);
    });
  
    // Add your own video and audio tracks so you can see yourself
    const localTrack = await createLocalVideoTrack().catch(error => {
      console.error(`Unable to create local tracks: ${error.message}`);
    });
    // old: const localTrack = [...room.localParticipant.videoTracks.values()][0].track;
    // Attach the local video if it’s not already visible
    if (!videoRef.current.hasChildNodes()) {
      const localEl = localTrack.attach(); 
      localEl.className = 'local-video';

      videoRef.current.appendChild(localEl); 
    }


    const handleParticipant = handleRemoteParticipant(videoRef.current);
    // Handle any participants who are *already* connected to this room
    room.participants.forEach(handleParticipant); 
    // Handle participants who join *after* you’ve connected to the room
    room.on('participantConnected', handleParticipant); 

    dispatch({ type: 'set-active-room', room })
  };
  const startVideo = () => connectToRoom(); 
  return { state, getRoomToken, startVideo, roomName, room, token, videoRef };
};

export default useTwilioVideo;