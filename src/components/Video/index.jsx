import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Video = () => {
    const params = useParams();
    const videoId = '66f83583af0d9d0e51d8b408';
    const lectureId = '66ef1bfe177f3c76e431e080';
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
    }, [])

    return (
        <div className="pb-5 mt-3">
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="row">
                        <div className="col">
                            <div className="relative video-wrap" style={{ height: "465px" }}>
                                <video className=" w-full h-full" controls>
                                    <source src={video.videoFile} type="video/mp4"/>
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
