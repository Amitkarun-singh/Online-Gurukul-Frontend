import React, { useEffect, useState, lazy, Suspense } from 'react'
import Playlist from '../Playlist';
import axios from 'axios';
import { Img } from '../Img';
import { Input } from '../Input';
import { Button } from '../Button';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addLectureId, removeVideoId, removeLectureId} from '../../Redux/Slices/videoSlice';

const Video = lazy(() => import('../Video'));
const Doubt = lazy(() => import('../Doubt'));

const Module = ({user}) => {

    const params = useParams();
    const moduleId = params.moduleId;
    const [lectures, setLectures] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const dispatch = useDispatch();
    const [lectureData, setLectureData] = useState({
        lecturename: '',
    });

    async function fetchPlaylistData() {
        try {
            dispatch(removeLectureId());
            dispatch(removeVideoId());
            const response = await axios.get(`/api/v1/lecture/${moduleId}`);
            if (!response.data.success) {
                console.error('No data found');
                return;
            }
            console.log('Playlist data' + response.data.data);
            setLectures(response.data.data);
            if (lectures.length > 0) {
                dispatch(addLectureId(lectures[0]._id));
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setLectureData({ ...lectureData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/v1/lecture/${moduleId}`, lectureData)
            if (response.data.success) {
                console.log(response);
            }
            fetchPlaylistData();
            setIsFormVisible(false);
        } catch (error) {
            console.error('Lecture uploaded failed:', error.response?.data?.message || error.message);
        }
    };

    const clickHandler = () => {
        setIsFormVisible(!isFormVisible);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchPlaylistData();
    }, []);

    return (
        <div className='flex h-full w-full'>
            <div className='flex-1 pr-72 border-red-300'>
                <Suspense fallback={<div>Loading Video...</div>}>
                    <Video user={user}/>
                </Suspense>
                <Suspense fallback={<div>Loading Doubt Section...</div>}>
                    <Doubt user={user}/>
                </Suspense>
            </div>

            <div className='fixed mt-16 right-0 top-0 h-full w-72'>
                {isloading ? (
                    <div>Loading...</div>
                ) : lectures.length === 0 ? (
                    <div>
                        <div>No lecture is present</div>
                        <div className={`flex gap-2 mx-auto items-center justify-center py-2 w-full hover:cursor-pointer ${user.role === 'teacher' ? 'block' : 'hidden'}`} onClick = {clickHandler}>
                            Add Lecture 
                            <Img src="/Images/add-button.svg" alt="Add button" className={`text-gray-900 text-base font-semibold h-[1rem] w-[1rem] cursor-pointer`}/>
                        </div>
                        <div>
                            {isFormVisible && (
                                <div className='mb-4'>
                                    <form onSubmit={handleSubmit} className='flex justify-center items-center gap-2 p-2'>
                                    <Input
                                            color="white_A700"
                                            size="sm"
                                            type="text"
                                            name="lecturename"
                                            placeholder="Enter Lecture Title"
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
                                        <Button
                                        size="md"
                                        type="submit"
                                        className="bg-[#00BEFF] rounded-[10px] font-medium px-2">
                                            Create
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={`max-h-screen bg-white-a700 overflow-y-scroll scrollbar-hide pb-16`}>
                        {lectures.map((lecture) => (
                            <div key={lecture._id}>
                                <Playlist key={lecture._id} lecture={lecture} isActive={lecture._id === 0} moduleId={moduleId} user={user}/>
                            </div>
                        ))}
                        <div className={`flex gap-2 mx-auto items-center justify-center py-2 w-full hover:cursor-pointer ${user.role === 'teacher' ? 'block' : 'hidden'}`} onClick = {clickHandler}>
                            Add Lecture 
                            <Img src="/Images/add-button.svg" alt="Add button" className={`text-gray-900 text-base font-semibold h-[1rem] w-[1rem] cursor-pointer`}/>
                        </div>
                        <div>
                            {isFormVisible && (
                                <div className='mb-4'>
                                    <form onSubmit={handleSubmit} className='flex justify-center items-center gap-2 p-2'>
                                    <Input
                                            color="white_A700"
                                            size="sm"
                                            type="text"
                                            name="lecturename"
                                            placeholder="Enter Lecture Title"
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
                                        <Button
                                        size="md"
                                        type="submit"
                                        className="bg-[#00BEFF] rounded-[10px] font-medium px-2">
                                            Create
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Module
