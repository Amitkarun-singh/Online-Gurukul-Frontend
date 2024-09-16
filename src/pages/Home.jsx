// import React, { useEffect, useState, useRef } from 'react';
// import { Img } from "../components/Img";
// import { Navbar } from '../components/Navbar';
// import { Sidebar } from '../components/Sidebar';
// import { useSelector } from 'react-redux';
// import { Card } from '../components/Card/card';
// import { Heading } from '../components/Heading';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CreateClassroom from './CreateClassroom';
// import JoinClassroom from './JoinClassroom';

// const Home = () => {
//   const [isBoxOpen, setBoxOpen] = useState(false);
//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isJoinModalOpen, setJoinModalOpen] = useState(false);
//   const modalRef = useRef(null);
//   const boxRef = useRef(null);

//   const modalHandler = () => {
//     setBoxOpen(true);
//   };

//   const createHandler = () => {
//     setCreateModalOpen(true);
//     setBoxOpen(false);
//   };

//   const joinHandler = () => {
//     setJoinModalOpen(true);
//     setBoxOpen(false);
//   };

//   const closeModal = () => {
//     setCreateModalOpen(false);
//     setJoinModalOpen(false);
//     setBoxOpen(false);
//   };

//   const closeBox = () => {
//     setBoxOpen(false);
//   };

//   // Close modal or box when clicking outside
//   const handleClickOutside = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       closeModal();
//     }
//     if (boxRef.current && !boxRef.current.contains(e.target)) {
//       closeBox();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user, loading, error } = useSelector((state) => state.auth);

//   const [classRooms, setClassRooms] = useState([]);
//   const [isloading, setLoading] = useState(false);

//   async function fetchClassroomData() {
//     setLoading(true);
//     try {
//       const response = await axios.get('/api/v1/classrooms/');
//       const data = await response.data.data;
//       setClassRooms(data);
//     } catch (error) {
//       console.error(error);
//       setClassRooms([]);
//     }
//     setLoading(false);
//   }

//   useEffect(() => {
//     fetchClassroomData();
//   }, [user, isJoinModalOpen, isCreateModalOpen]);

//   const toggleSidebar = (isOpen) => {
//     setSidebarOpen(isOpen);
//   };

//   const navigate = useNavigate(); // Initialize navigate

//   const fetchClassRoomDetails = async (classRoomId) => {
//     try {
//       const response = await axios.get(`/api/v1/classrooms/${classRoomId}`);
//       const classRoomDetails = response.data.data;
//       navigate(`/class-management/${classRoomDetails._id}`); // Navigate to ClassManagement with the fetched classroom id
//     } catch (error) {
//       console.error('Error fetching classroom details:', error);
//     }
//   };

//   const handleCardClick = (classRoomId) => {
//     fetchClassRoomDetails(classRoomId);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="flex flex-col h-full overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <div className={`flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
//         {/* Content */}
//         <div className="flex-grow p-6 mt-16 overflow-y-auto">
//           {isloading ? (
//             "Loading..."
//           ) : classRooms.length > 0 ? (
//             <div className={`grid gap-5 ${sidebarOpen ? 'grid-cols-3' : 'grid-cols-4'}`}>
//               {classRooms.map((classRoom) => (
//                 <Card key={classRoom._id} classRoom={classRoom} onClick={() => handleCardClick(classRoom._id)} />
//               ))}
//             </div>
//           ) : (
//             <div className="flex justify-center items-center">
//               <p>No Data Found</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create button */}
//       <div className='fixed bottom-5 right-5 bg-white-a700 w-14 h-16 rounded-xl shadow-2xl flex justify-center items-center cursor-pointer'
//         onClick={modalHandler}
//       >
//         <Img
//           src="images/create_classroom.svg"
//           alt="Lock,pad,lock,safe,security,protected,lock Alt, / 24 / Outline"
//           className="h-[4rem] w-[4rem] shadow-xl rounded-xl"
//         />
//       </div>

//       {/* Create or join option */}
//       {
//         isBoxOpen && (
//           <div className={`fixed bottom-11 right-11 bg-white-a700 mb-2 p-[0.50rem] rounded-lg shadow-2xl h-20 flex flex-col justify-center gap-2 ease-in-out duration-500`}
//             onClick={handleClickOutside}
//           >
//             <div ref={boxRef}>
//               <Heading size="textmd" as="h3" className="!text-gray-900 hover:bg-gray-500 p-1">
//                 <div onClick={joinHandler} className='cursor-pointer'>
//                   Join Classroom
//                 </div>
//               </Heading>
//               <Heading size="textmd" as="h3" className="!text-gray-900 hover:bg-gray-500 p-1">
//                 <div onClick={createHandler} className='cursor-pointer'>
//                   Create Classroom
//                 </div>
//               </Heading>
//             </div>
//           </div>
//         )
//       }

//       {/*Create Modal */}
//       {isCreateModalOpen && (
//         <div
//           className={`fixed inset-0 bg-opacity-30 flex justify-center items-center ${isCreateModalOpen ? 'backdrop-blur-sm' : ''}`}
//           onClick={handleClickOutside}
//         >
//           <div ref={modalRef} className="relative bg-white rounded-lg shadow-lg w-[40%]">
//             <CreateClassroom isModalOpen={isCreateModalOpen} setModalOpen={setCreateModalOpen} closeModal={closeModal} />
//           </div>
//         </div>
//       )}

//       {/* Join Modal */}
//       {isJoinModalOpen && (
//         <div
//           className={`fixed inset-0 bg-opacity-30 flex justify-center items-center ${isJoinModalOpen ? 'backdrop-blur-sm' : ''}`}
//           onClick={handleClickOutside}
//         >
//           <div ref={modalRef} className="relative bg-white rounded-lg shadow-lg w-[40%]">
//             <JoinClassroom isModalOpen={isJoinModalOpen} setModalOpen={setJoinModalOpen} closeModal={closeModal} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState, useRef } from 'react';
// import { Img } from "../components/Img";
// import { Navbar } from '../components/Navbar';
// import { Sidebar } from '../components/Sidebar';
// import { useSelector } from 'react-redux';
// import { Card } from '../components/Card/card';
// import { Heading } from '../components/Heading';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CreateClassroom from './CreateClassroom';
// import JoinClassroom from './JoinClassroom';
// import { useDispatch } from 'react-redux';
// import { Id } from '../redux/actions/classroomActions';

// const Home = () => {
//   const [isBoxOpen, setBoxOpen] = useState(false);
//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isJoinModalOpen, setJoinModalOpen] = useState(false);
//   const dispatch = useDispatch();
//   const modalRef = useRef(null);
//   const boxRef = useRef(null);

//   const modalHandler = () => setBoxOpen(true);
//   const createHandler = () => {
//     setCreateModalOpen(true);
//     setBoxOpen(false);
//   };
//   const joinHandler = () => {
//     setJoinModalOpen(true);
//     setBoxOpen(false);
//   };
//   const closeModal = () => {
//     setCreateModalOpen(false);
//     setJoinModalOpen(false);
//     setBoxOpen(false);
//   };
//   const closeBox = () => setBoxOpen(false);

//   const handleClickOutside = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) closeModal();
//     if (boxRef.current && !boxRef.current.contains(e.target)) closeBox();
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user, loading, error } = useSelector((state) => state.auth);

//   const [classRooms, setClassRooms] = useState([]);
//   const [isloading, setLoading] = useState(false);

//   const fetchClassroomData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('/api/v1/classrooms/');
//       setClassRooms(response.data.data);
//     } catch (error) {
//       console.error(error);
//       setClassRooms([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchClassroomData();
//   }, [user, isJoinModalOpen, isCreateModalOpen]);

//   const toggleSidebar = (isOpen) => setSidebarOpen(isOpen);
//   const navigate = useNavigate();

// //   const fetchClassRoomDetails = async (classRoomId) => {
// //     try {
// //       const response = await axios.get(`/api/v1/classrooms/${classRoomId}`);
// //       navigate(`/class-management/${response.data.data._id}`);
// //     } catch (error) {
// //       console.error('Error fetching classroom details:', error);
// //     }
// //   };
  
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="flex flex-col h-full overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       <Navbar />
//       <div className={`flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
//         <div className="flex-grow p-6 mt-16 overflow-y-auto">
//           {isloading ? (
//             "Loading..."
//           ) : classRooms.length > 0 ? (
//             <div className={`grid gap-5 ${sidebarOpen ? 'grid-cols-3' : 'grid-cols-4'}`}>
//               {classRooms.map((classRoom) => (
//                 <Card key={classRoom._id} classRoom={classRoom} />
//               ))}
//             </div>
//           ) : (
//             <div className="flex justify-center items-center">
//               <p>No Data Found</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className='fixed bottom-5 right-5 bg-white-a700 w-14 h-16 rounded-xl shadow-2xl flex justify-center items-center cursor-pointer'
//         onClick={modalHandler}
//       >
//         <Img
//           src="images/create_classroom.svg"
//           alt="Create Classroom"
//           className="h-[4rem] w-[4rem] shadow-xl rounded-xl"
//         />
//       </div>

//       {isBoxOpen && (
//         <div className="fixed bottom-11 right-11 bg-white-a700 mb-2 p-[0.50rem] rounded-lg shadow-2xl h-20 flex flex-col justify-center gap-2"
//           ref={boxRef}>
//           <Heading size="textmd" as="h3" className="!text-gray-900 hover:bg-gray-500 p-1">
//             <div onClick={joinHandler} className='cursor-pointer'>Join Classroom</div>
//           </Heading>
//           <Heading size="textmd" as="h3" className="!text-gray-900 hover:bg-gray-500 p-1">
//             <div onClick={createHandler} className='cursor-pointer'>Create Classroom</div>
//           </Heading>
//         </div>
//       )}

//       {isCreateModalOpen && (
//         <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center backdrop-blur-sm"
//           ref={modalRef}>
//           <div className="relative bg-white rounded-lg shadow-lg w-[40%]">
//             <CreateClassroom isModalOpen={isCreateModalOpen} setModalOpen={setCreateModalOpen} closeModal={closeModal} />
//           </div>
//         </div>
//       )}

//       {isJoinModalOpen && (
//         <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center backdrop-blur-sm"
//           ref={modalRef}>
//           <div className="relative bg-white rounded-lg shadow-lg w-[40%]">
//             <JoinClassroom isModalOpen={isJoinModalOpen} setModalOpen={setJoinModalOpen} closeModal={closeModal} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState, useRef } from 'react';
import { Img } from "../components/Img";
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../components/Card/card';
import { Heading } from '../components/Heading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateClassroom from './CreateClassroom';
import JoinClassroom from './JoinClassroom';


const Home = () => {
  const [isBoxOpen, setBoxOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const boxRef = useRef(null);

  const modalHandler = () => setBoxOpen(true);
  const createHandler = () => {
    setCreateModalOpen(true);
    setBoxOpen(false);
  };
  const joinHandler = () => {
    setJoinModalOpen(true);
    setBoxOpen(false);
  };
  const closeModal = () => {
    setCreateModalOpen(false);
    setJoinModalOpen(false);
    setBoxOpen(false);
  };
  const closeBox = () => setBoxOpen(false);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) closeModal();
    if (boxRef.current && !boxRef.current.contains(e.target)) closeBox();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, error } = useSelector((state) => state.auth);

  const [classRooms, setClassRooms] = useState([]);
  const [isloading, setLoading] = useState(false);

  const fetchClassroomData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/v1/classrooms/');
      setClassRooms(response.data.data);
    } catch (error) {
      console.error(error);
      setClassRooms([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClassroomData();
  }, [user, isJoinModalOpen, isCreateModalOpen]);

  const toggleSidebar = (isOpen) => setSidebarOpen(isOpen);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar />
      <div className={`flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="flex-grow p-6 mt-16 overflow-y-auto">
          {isloading ? (
            "Loading..."
          ) : classRooms.length > 0 ? (
            <div className={`grid gap-5 ${sidebarOpen ? 'grid-cols-3' : 'grid-cols-4'}`}>
              {classRooms.map((classRoom) => (
                <Card key={classRoom._id} classRoom={classRoom} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <p>No Data Found</p>
            </div>
          )}
        </div>
      </div>

      <div className='fixed bottom-5 right-5 bg-white-a700 w-14 h-16 rounded-xl shadow-2xl flex justify-center items-center cursor-pointer'
        onClick={modalHandler}
      >
        <Img
          src="images/create_classroom.svg"
          alt="Create Classroom"
          className="h-[4rem] w-[4rem] shadow-xl rounded-xl"
        />
      </div>

      {isBoxOpen && (
        <div className="fixed bottom-11 right-11 bg-white-a700 mb-2 p-[0.50rem] rounded-lg shadow-2xl h-20 flex flex-col justify-center gap-2"
          ref={boxRef}>
          <Heading size="textmd" as="h3" className="!text-gray-900 hover:bg-gray-500 p-1">
            <div onClick={joinHandler} className='cursor-pointer'>Join Classroom</div>
          </Heading>
          <Heading size="textmd" as="h3" className="!text-gray-900 hover:bg-gray-500 p-1">
            <div onClick={createHandler} className='cursor-pointer'>Create Classroom</div>
          </Heading>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center backdrop-blur-sm"
          ref={modalRef}>
          <div className="relative bg-white rounded-lg shadow-lg w-[40%]">
            <CreateClassroom isModalOpen={isCreateModalOpen} setModalOpen={setCreateModalOpen} closeModal={closeModal} />
          </div>
        </div>
      )}

      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center backdrop-blur-sm"
          ref={modalRef}>
          <div className="relative bg-white rounded-lg shadow-lg w-[40%]">
            <JoinClassroom isModalOpen={isJoinModalOpen} setModalOpen={setJoinModalOpen} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;