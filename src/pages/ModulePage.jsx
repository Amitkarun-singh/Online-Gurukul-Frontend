// import React, { useEffect, useState } from 'react'
// import Playlist from '../components/Playlist';
// import axios from 'axios';
// import Video from '../components/Video';

// const ModulePage = () => {

//     const moduleId = '66ef1b88177f3c76e431e07b';
//     const [lectures, setLectures] = useState([]);
//     const [isloading, setIsLoading] = useState(false);

//     async function fetchPlaylistData() {
//         try {
//             const response = await axios.get(`/api/v1/lecture/${moduleId}`);
//             console.log(response.data.data);
//             setLectures(response.data.data);
//             setIsLoading(false);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         setIsLoading(true);
//         fetchPlaylistData();
//     }, []);
//     return (
//         <div className='flex  justify-around'>
//             <div>
//                 <Video/>
//             </div>
//             <div>
//                 {
//                     isloading ? (
//                         <div>Loading...</div>
//                     ) : (
//                         <div className='w-72 max-h-screen bg-white-a700 overflow-y-scroll scrollbar-hide'>
//                             {
//                                 lectures.map((lecture) => (
//                                     <div key={lecture._id}>
//                                         <Playlist key={lecture._id} lecture={lecture} isActive={lecture._id === 0}/>
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                     )
//                 }
//             </div>
//         </div>
//     )
// }

// export default ModulePage


import React, { useEffect, useState } from 'react'
import Moduel from '../components/Module'

const ModulePage = () => {
    return (
        <div>
            <Moduel/>
        </div>
    )
}

export default ModulePage
