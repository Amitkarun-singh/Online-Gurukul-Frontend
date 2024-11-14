import React, { useState, useEffect } from 'react'
import { Img } from '../Img';
import { Heading } from "../Heading";
import { Input } from "../Input";
import { Button } from "../Button";
import axios from 'axios';
import AllVideo from '../AllVideo/index';
import { useDispatch } from 'react-redux';
import {addLectureId, addVideoId, removeLectureId } from '../../Redux/Slices/videoSlice';

const Playlist = ({lecture, isActive, moduleId,user}) => {

    const [isVisible, setIsVisible] = useState(false);
    const [videos, setVideos] = useState([]);
    const dispatch = useDispatch();
    const [videoData, setVideoData] = useState({
        title: '',
        videoFile: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isVideoFormVisible, setIsVideoFormVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData({ ...videoData, [name]: value });
    };

    const handleFileChange = (e) => {
        setVideoData({ ...videoData, videoFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const videoDataToSend = new FormData();
        videoDataToSend.append("title", videoData.title);
        videoDataToSend.append("videoFile", videoData.videoFile)
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/v1/video/${lecture._id}`, videoDataToSend);
            if (response.data.success) {
                console.log(response);
            }
            setIsVideoFormVisible(false);
            handleCardClick();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('error at time of adding video in lecture:', error.response?.data?.message || error.message);
            console.log(error.response);
        }finally {
            setIsLoading(false); 
        }
    };

    const clickHandler = () => {
        setIsVideoFormVisible(!isVideoFormVisible);
    };

    const clickOutSideHandler = () => {
        setIsVideoFormVisible(false);
    }

    useEffect(() => {
        if (lecture.id === 1) {
            setIsVisible(true);
        }
    }, [lecture.id]);

    useEffect(() => {
        if (isVisible && videos.length > 0) {
            dispatch(addLectureId(lecture._id));
            dispatch(addVideoId(videos[0]._id));
        }
    }, [isVisible, videos, dispatch, lecture._id]);

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

    const deleteHandler = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this lecture?");
        if (!isConfirmed) {
            return;
        }
        try {
            const response = await axios.delete(`/api/v1/lecture/${moduleId}/${lecture._id}`);
            console.log(response);
            dispatch(removeLectureId(lecture._id));
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div>
            <div onClick={handleCardClick} className={`cursor-pointer flex justify-between w-full p-4 border-b-2 hover:bg-blue-300_01 ${isActive ? 'bg-blue-300_01' : ''}`}>
                <div className='flex justify-center items-center gap-12'>
                    <div className="flex items-start flex-col gap-1">
                        <h6 className="text-gray-900 text-base medium:text-lg leading-6 medium:leading-[26px] font-bold">
                        {lecture.lecturename}
                        </h6>
                        <p className="text-gray-900 text-xs medium:text-sm leading-[18px] medium:leading-[22px] font-medium text-left">
                        {new Date(lecture.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className={` hover:bg-red-200 w-8 h-8 flex justify-center items-center rounded-full ${user.role === 'teacher' ? 'block' : 'hidden'}`} onClick=        {deleteHandler}>
                        <Img src="/Images/delete-button.svg" alt="delete image" className="w-5 h-5 rounded-full" />
                    </div>
                </div>
                <div>
                    <Img src="/Images/down-arrow.svg" alt="Search" className={`text-gray-900 text-base font-semibold h-[1rem] w-[1rem] ml-auto transition duration-500 ease-in-out ${isVisible ? "rotate-180" : ""}`}/>
                </div>
            </div>
            {
                isVisible && (
                    <div>
                        <div className="flex flex-col gap-2 w-full mt-2">
                            {
                                videos.map((video) => (
                                    <div key={video._id} className="flex items-start gap-2 cursor-pointer w-full">
                                        <div key={video._id} className='w-full'>
                                            <AllVideo key={video._id} video={video} lectureId={lecture._id} user={user}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={`${user.role === 'teacher' ? 'block' : 'hidden'}`}>
                            <Img src="/Images/add-button.svg" alt="Add button" className={`text-gray-900 text-base font-semibold h-[1rem] w-[1rem] mx-auto cursor-pointer`} onClick = {clickHandler}/>
                        </div>
                    </div>
                )
            }
            {/* Add video */}
            {
                isVideoFormVisible && (
                    <div className='fixed inset-0 flex items-center justify-center'>
                        <div className="bg-white-a700 flex flex-col items-center gap-[1.25rem] p-6 rounded-lg">
                            <div className="flex flex-col items-end gap-[0.25rem]">
                                <Heading size="textlg" as="h2" className="!text-blue-400_01">
                                    Add Video
                                </Heading>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col items-end gap-[1.88rem]">
                                <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                                    <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                        <Heading size="textmd" as="h3" className="mt-[0.25rem] !text-gray-900">
                                            Enter Video Title
                                        </Heading>
                                        <Input
                                            color="white_A700"
                                            size="sm"
                                            type="text"
                                            name="title"
                                            placeholder="Video Title"
                                            onChange={handleChange}
                                            prefix={
                                                <Img
                                                    src="/Images/img_message_24_outline.svg"
                                                    alt="Message / 24 / Outline"
                                                    className="mb-[0.13rem] h-[1.13rem] w-[1.13rem]"
                                                />
                                            }
                                            className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                        <Heading
                                            size="textmd"
                                            as="h5"
                                            className="mt-[0.25rem] !text-gray-900"
                                        >
                                            Upload Video here
                                        </Heading>
                                        <input
                                            id="video"
                                            type="file"
                                            name="videoFile"
                                            accept="video/*"
                                            onChange={handleFileChange}
                                            className="gap-[0.88rem]  self-stretch justify-item item-center rounded-[10px] border border-solid border-gray-300 px-3 py-2"
                                        />
                                    </div>
                                    <div className='flex gap-5'>
                                        <Button
                                            size="md"
                                            type="submit"
                                            className="bg-[#00BEFF] rounded-[10px] font-medium"
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            onClick={clickOutSideHandler}
                                            size="md"
                                            type="submit"
                                            className="bg-white-a700 text-[#00BEFF] rounded-[10px] font-medium border border-solid border-[#00BEFF]"
                                        >
                                            cancel
                                        </Button>
                                    </div>
                                    {isLoading && (
                                        <div className="loading-spinner">
                                            <p>Uploading video, please wait...</p>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Playlist
