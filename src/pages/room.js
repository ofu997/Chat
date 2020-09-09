import React, { useEffect } from "react";
import Layout from "../components/layout";
import { Router } from "@reach/router";
import { navigate } from 'gatsby'; 
import VideoDisplay from "../components/video-display";

// So, we have the component and everything necessary 
// for it imported. The last thing we need to do is
//  to make it the `default` for our Router. We do
//  that by putting it at the end of the component 
// list and, instead of the path parameter, we pass default.
const BounceToHome = () => {
    useEffect(() => {
       navigate('/', { replace: true });
    }, []);
    return null
  }

export default () => (
  <Layout>
    <Router>
      <VideoDisplay path="room/:roomID" />
      <BounceToHome default />
    </Router>
  </Layout>
);