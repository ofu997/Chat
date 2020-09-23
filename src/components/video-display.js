import React, { useEffect } from "react";
import { navigate } from 'gatsby';
import useTwilioVideo from '../hooks/use-twilio-video';

const VideoDisplay = ({ roomID }) => {
  // make routes password-protected by using state.token
  const { state, startVideo, videoRef } = useTwilioVideo();

  useEffect(()=> {
    if (!state.token) {
      // redirects home, sets state.roomName to roomID
      navigate('/', { state: { roomName: roomID } });
    }

    if (!state.room) {
      startVideo(); 
    }
  }, [state, roomID, startVideo])
  return (
    <>
      <h1> 
        Room: '{roomID}'
      </h1>
      <div className='chat' ref={videoRef} /> 
    </>
  )
};

export default VideoDisplay;