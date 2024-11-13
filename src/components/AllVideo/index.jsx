import React from 'react'
import { Img } from '../Img'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {addLectureId, addVideoId, removeVideoId } from '../../Redux/Slices/videoSlice';

const AllVideo = ({video, lectureId, user}) => {

  const [playing, setPlaying] = useState(false);
  const dispatch = useDispatch();

  const handleCardClick = async () => {
    try {
        setPlaying(!playing)
        console.log(lectureId);
        console.log(video._id);
        dispatch(addLectureId(lectureId));
        dispatch(addVideoId(video._id));
    } catch (error) {
        console.error(error);
    }
  };

  const deleteHandler = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this video?");
    if (!isConfirmed) {
        return; 
    }

    try {
        const response = await axios.delete(`/api/v1/video/${lectureId}/${video._id}`);
        console.log(response);
        dispatch(removeVideoId(video._id));
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div onClick={handleCardClick} className='flex items-center p-4 gap-2 w-full hover:bg-blue-100_01'>
      <div className="flex items-center justify-center w-5 h-5 text-white rounded-full">
        {
          playing ? (
            <Img src="/Images/video-pause.svg" alt="pause image" className="w-5 h-5 rounded-full" />
          ) : (
            <Img src="/Images/play.svg" alt="play image" className="w-5 h-5 rounded-full" />
          )
        }
      </div>
      <div className="flex flex-col gap-1">
          <h6 className="text-gray-900 text-sm medium:text-base leading-6 medium:leading-[26px] font-bold hover:text-blue-400_01">
              {video.title}
          </h6>
      </div>
      <div className={`ml-auto hover:bg-red-200 w-8 h-8 flex justify-center items-center rounded-full ${user.role === 'teacher' ? 'block' : 'hidden'}`} onClick={deleteHandler}>
        <Img src="/Images/delete-button.svg" alt="delete image" className="w-5 h-5 rounded-full" />
      </div>
    </div>
  )
}

export default AllVideo
