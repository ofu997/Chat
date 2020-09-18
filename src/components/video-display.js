import React from "react";
import { navigate } from 'gatsby';
import useTwilioVideo from '../hooks/use-twilio-video';

const VideoDisplay = props => {
  return <h1> Room: '{props.roomID}'</h1>
};

export default VideoDisplay;