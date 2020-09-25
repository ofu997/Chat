import React, { useEffect } from "react";
import { navigate } from 'gatsby';
import useTwilioVideo from '../hooks/use-twilio-video';

const VideoDisplay = ({ roomID }) => {
  // make routes password-protected by using state.token
  const { state, startVideo, leaveRoom, videoRef } = useTwilioVideo();

  useEffect(()=> {
    if (!state.token) {
      // redirects home, sets state.roomName to roomID
      navigate('/', { state: { roomName: roomID } });
    }

    if (!state.room) {
      startVideo(); 
    }

    window.addEventListener('beforeunload', leaveRoom);

    return () => {
      window.removeEventListener('beforeunload', leaveRoom);
    };
  }, [state, roomID, startVideo, leaveRoom]);

  return (
    <>
      <h1> 
        Room: '{roomID}'
        {state.room && 
          <button className='leave-room' onClick={leaveRoom}>
            Leave room
          </button>
        }
      </h1>
      <div className='chat' ref={videoRef} /> 
    </>
  )
};

export default VideoDisplay;