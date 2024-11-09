import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

const Video = () => {
    const videoId = useSelector((state) => state.videoId.videoId);
    const lectureId = useSelector((state) => state.videoId.lectureId);
    const [video, setVideo] = useState([]);
    const [loading, setloading] = useState(false);

    const FetchVideoData = async () => {
        try {
            setloading(true)
            const response = await axios.get(`/api/v1/video/${lectureId}/${videoId}`);
            console.log(response.data.data.videoFile);
            setVideo(response.data.data);
            setloading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        FetchVideoData();
    }, [videoId, lectureId]);

    return (
        <div className="pb-5 mt-3 ">
            {
                loading ? (
                    <div>Click on Lecture 1 or refresh the page.</div>
                ) : (
                    <div className="row">
                        <div className="col">
                            <div className="relative video-wrap" style={{ height: "625px" }}>
                                <video className=" w-full h-full" controls>
                                    <source className='min-w-full h-full' src={video.videoFile} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Video
