import React, { useEffect } from "react";
import { navigate } from 'gatsby';
import useTwilioVideo from '../hooks/use-twilio-video';

const VideoDisplay = ({ roomID }) => {
  // make routes password-protected by using state.token
  const { state } = useTwilioVideo();

  useEffect(()=> {
    if (!state.token) {
      // redirects home, sets state.roomName to roomID
      navigate('/', { state: { roomName: roomID } });
    }
  }, [state, roomID])
  return <h1> Room: '{roomID}'</h1>
};

export default VideoDisplay;