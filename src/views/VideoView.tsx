import React from 'react'
import {
    useParams
} from "react-router-dom";

import YouTube from 'react-youtube';

import '../styles/VideoView.css'



function VideoView() {

    const { id } = useParams<{ id: string }>();
    const Youtube = YouTube;

    const opts = {
        height: '682',
        width: '1120',
        origin:window.location.origin
    }


    return (
        <div id="video-container">
            <Youtube videoId={id} opts={opts}/>
        </div>
    )
}

export default VideoView
