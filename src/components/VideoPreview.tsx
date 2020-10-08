import React, { useEffect, useRef, useState } from 'react'
import {getVideoData,VideoData} from '../utils/services';
import '../styles/VideoPreview.css'

import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {
    useHistory
} from "react-router-dom";

interface PropTypes {
    id : string
}

type Nullable<T> = T | null



export default function VideoPreview({id} : PropTypes) {
    const [loadingImg,setloadingImg] = useState(false);
    const [video,setVideo] = useState<Nullable<VideoData>>(null)
    const imgRef = useRef<Nullable<HTMLImageElement>>(null);

    const history = useHistory();

    const classes = useStyles()

    useEffect(()=>{
        const func = async () => {
            let video = await getVideoData(id);
            setloadingImg(true)
            setVideo(video)
        }
        func()
    },[id])

    const clickVideo = () => {
        history.push(`/video/${id}`)
    }

    useEffect(()=>{
        let img = imgRef.current;
        const onLoad = () => {
            setloadingImg(false)
        }
        if( img) {
            img.addEventListener('load',onLoad)
        }
        return () => {
            if(img)
                img.removeEventListener('load',onLoad)
        }
    },[video])

    return (
        <div className={classes.root}>
            {
                video === null ?
                    <LinearProgress />
                :
                    <div className="video-preview">
                        <div className="thumbnail">
                            {
                                loadingImg &&
                                <div className="circular-progress-container">
                                    <CircularProgress size={75}/>
                                </div>
                            }
                            <img
                                ref={imgRef}
                                className={ imgRef.current ? '' : 'd-none'    }
                                src={video.thumbnailUrl}
                                alt="video thumbnail"
                            />
                        </div>
                        <div className="video-details">
                            <h2> {video.title} </h2>
                            <h3 className={classes["channel-title"]} > {video.channelTitle} </h3>
                            <div className={classes["info-with-icon"]}>
                                <span> { video.viewCount } </span>
                                <VisibilityIcon color="primary"/>
                            </div>
                            <div className={classes["info-with-icon"]}>
                                <span> { video.likeCount } </span>
                                <ThumbUpAltIcon color="primary"/>
                            </div>
                            <div className={classes["info-with-icon"]}>
                                <span> { video.dislikeCount } </span>
                                <ThumbDownAltIcon color="primary"/>
                            </div>
                            <div className={classes["info-with-icon"]}>
                                <span> { ratio(video) } </span>
                                <ThumbsUpDownIcon color="primary"/>
                            </div>
                            <br/>
                            <Button
                                className={classes["go-button"]}
                                onClick={clickVideo}
                                variant="contained"
                                color="primary"
                            >
                                GO!
                            </Button>
                        </div>
                    </div>


            }
        </div>
    )
}


function ratio({likeCount,dislikeCount} : VideoData ) {
    return (likeCount / (dislikeCount + likeCount)).toFixed(4)
}


const useStyles = makeStyles({
    root: {
        margin: '1rem 0',
        padding: '1rem',
        '& h2' : {
            margin: '0 0 0.5rem'
        }
    },
    'info-with-icon': {
        display:'inline-flex',
        marginRight:'0.6rem',
        flexDirection:'row',
        alignItems:'center',
        '& svg' : {
            marginLeft:'0.4rem'
        }
    },
    'go-button': {
        marginTop:'0.6rem'
    },
    'channel-title' : {
        color:'#555',
        fontSize:'0.9rem'
    }
});