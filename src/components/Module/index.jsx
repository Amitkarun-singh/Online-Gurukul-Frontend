import React, { useEffect, useState } from 'react'
import Playlist from '../Playlist';
import axios from 'axios';
import Video from '../Video';
import Doubt from '../Doubt';

const Moduel = () => {

    const moduleId = '66ef1b88177f3c76e431e07b';
    const [lectures, setLectures] = useState([]);
    const [isloading, setIsLoading] = useState(false);

    async function fetchPlaylistData() {
        try {
            const response = await axios.get(`/api/v1/lecture/${moduleId}`);
            console.log(response.data.data);
            setLectures(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchPlaylistData();
    }, []);

    return (
        <div className='flex flex-row justify-around h-full w-full'>
            <div>
                <Video/>
                <Doubt/>
            </div>
            <div>
                {
                    isloading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className='w-72 max-h-screen bg-white-a700 overflow-y-scroll scrollbar-hide'>
                            {
                                lectures.map((lecture) => (
                                    <div key={lecture._id}>
                                        <Playlist key={lecture._id} lecture={lecture} isActive={lecture._id === 0}/>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Moduel
