import React, { useState, useEffect } from 'react'
import { Img } from '../Img';
import axios from 'axios';
import AllVideo from '../AllVideo/index'

const Playlist = ({lecture, isActive}) => {

    const [isVisible, setIsVisible] = useState(false);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if(lecture.id === 1){
            setIsVisible(true);
        }
    }, [])

    const handleCardClick = async () => {
        try {
            console.log(lecture._id);
            
            setIsVisible(!isVisible);
            const response = await axios.get(`/api/v1/video/${lecture._id}`);
            console.log(response.data.data);
            setVideos(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div>
            <div onClick={handleCardClick} className={`cursor-pointer flex justify-between w-full p-4 border-b-2 hover:bg-blue-300_01 ${isActive ? 'bg-blue-300_01' : ''}`}>
                <div>
                    <div className="flex items-start flex-col gap-1">
                        <h6 className="text-gray-900 text-base medium:text-lg leading-6 medium:leading-[26px] font-bold">
                        {lecture.lecturename}
                        </h6>
                        <p className="text-gray-900 text-xs medium:text-sm leading-[18px] medium:leading-[22px] font-medium text-left">
                        {lecture.createdAt}
                        </p>
                    </div>
                </div>
                <div>
                    <Img src="Images/down-arrow.svg" alt="Search" className={`text-gray-900 text-base font-semibold h-[1rem] w-[1rem] ml-auto transition duration-500 ease-in-out ${isVisible ? "rotate-180" : ""}`}/>
                </div>
            </div>
            {
                isVisible && (
                    <div className="flex flex-col gap-2 w-full mt-2">
                        {
                            videos.map((video) => (
                                <div key={video._id} className="flex items-start gap-2 cursor-pointer w-full">
                                    <div key={video._id} className='w-full'>
                                        <AllVideo key={video._id} video={video} lectureId={lecture._id}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Playlist
