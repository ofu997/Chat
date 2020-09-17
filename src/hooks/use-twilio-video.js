import React, { createContext, useContext, useReducer } from "react";
import axios from 'axios';

const TWILIO_TOKEN_URL = 'https://manatee-vulture-7038.twil.io/create-room-token';
const DEFAULT_STATE = {
  identity: false,
  roomName: false,
  token: false,
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
    default:
      return DEFAULT_STATE;
  }
};

const TwilioVideoContext = createContext();

// part 4
const TwilioVideoProvider = ({ children }) => (
  <TwilioVideoContext.Provider value={useReducer(reducer, DEFAULT_STATE)}>
    {children}
  </TwilioVideoContext.Provider>
);

// keeps the context when page changes. Layout would lose it on mount/unmount
export const wrapRootElement = ({ element }) => (
  <TwilioVideoProvider>{element}</TwilioVideoProvider>
);

const useTwilioVideo = () => {
  const [state, dispatch] = useContext(TwilioVideoContext);

  const getRoomToken = async ({ identity, roomName }) => {
    const result = await axios.post(TWILIO_TOKEN_URL, {
      identity, 
      room: roomName, 
    });
    dispatch({ type: 'join', token: result.data, identity, roomName });
  };

  return { state, getRoomToken };
};

export default useTwilioVideo;