import React from 'react'
import { Img } from '../Img'
import { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const AllVideo = ({video, lectureId}) => {
  // const navigate = useNavigate();

  const [playing, setPlaying] = useState(false);
  const [videos, setVideos] = useState([]);

  const handleCardClick = async () => {
    try {
        setPlaying(!playing)
        console.log(lectureId);
        console.log(video._id);
        

        // navigate(`/module/${lectureId}/${video._id}`);
        // console.log(lectureId);
        // console.log(video._id);
        // const response = await axios.get(`/api/v1/video/${lectureId}/${video._id}`);
        // console.log(response.data.data);
        // setVideos(response.data.data);
    } catch (error) {
        // console.error(error);
    }
};

  return (
    <div onClick={handleCardClick} className='flex items-center p-4 gap-2 w-full hover:bg-blue-100_01'>
      <div className="flex items-center justify-center w-5 h-5 text-white rounded-full">
        {
          playing ? (
            <Img src="./Images/video-pause.svg" alt="pause image" className="w-5 h-5 rounded-full" />
          ) : (
            <Img src="./Images/play.svg" alt="play image" className="w-5 h-5 rounded-full" />
          )
        }
      </div>
      <div className="flex flex-col gap-1">
          <h6 className="text-gray-900 text-sm medium:text-base leading-6 medium:leading-[26px] font-bold hover:text-blue-400_01">
              {video.title}
          </h6>
      </div>
    </div>
  )
}

export default AllVideo
