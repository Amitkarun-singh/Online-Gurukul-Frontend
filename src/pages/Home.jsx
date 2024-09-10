import React, { useEffect, useState, useRef} from 'react';
import { Card } from '../components/Card/card';
import { Heading } from '../components/Heading';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Img } from '../components/Img';
import CreateClassroom from './CreateClassroom';
import JoinClassroom from './JoinClassroom';

const Home = () => {

    const [isBoxOpen, setBoxOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false); 
    const [isJoinModalOpen, setJoinModalOpen] = useState(false); 
    const modalRef = useRef(null);
    const boxRef = useRef(null);

    const modalHandler = () => {
        setBoxOpen(true);
    };

    const createHandler = () => {
        setCreateModalOpen(true);
        setBoxOpen(false);
    };

    const joinHandler = () => {
        setJoinModalOpen(true);
        setBoxOpen(false);
    }

    const closeModal = () => {
        setCreateModalOpen(false);
        setJoinModalOpen(false);
        setBoxOpen(false);
    };

    const closeBox = () => {
        setBoxOpen(false);
    };

    // Close modal or box when clicking outside
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
        if (boxRef.current && !boxRef.current.contains(e.target)) {
            closeBox();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [classRooms, setClassRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchClassroomData() {
        setLoading(true);
        try {
            const response = await axios.get('/api/v1/classrooms/');
            const data = await response.data.data;
            setClassRooms(data);
        } catch (error) {
            console.error(error);
            setClassRooms([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchClassroomData();
    }, [isJoinModalOpen, isCreateModalOpen]);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    return (
        <div className={`flex flex-col h-full overflow-hidden`}>
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className={`flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
                {/* Content */}
                <div className="flex-grow p-6 mt-16 overflow-y-auto">
                    {loading ? (
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

            {/* Create button */}
            <div className='fixed bottom-5 right-5 bg-white-a700 w-14 h-16 rounded-xl shadow-2xl flex justify-center items-center cursor-pointer'
            onClick={modalHandler}
            >
                <Img
                    src="images/create_classroom.svg"
                    alt="Lock,pad,lock,safe,security,protected,lock Alt, / 24 / Outline"
                    className="h-[4rem] w-[4rem] shadow-xl rounded-xl"
                />
            </div>

            {/* Create or join option */}
            {
                isBoxOpen && (
                    <div className={`fixed bottom-11 right-11 bg-white-a700 mb-2 p-[0.50rem] rounded-lg shadow-2xl h-20 flex flex-col justify-center gap-2 ease-in-out duration-500`} 
                    onClick={handleClickOutside}
                    >
                        <div ref={boxRef}>
                            <Heading size="textmd" as="h3" className="!text-gray-900 hover:bg-gray-500 p-1">
                                <div onClick={joinHandler} className='cursor-pointer'>
                                    Join Classroom
                                </div>
                            </Heading>
                            <Heading size="textmd" as="h3" className="!text-gray-900 hover:bg-gray-500 p-1">
                                <div onClick={createHandler} className='cursor-pointer'>
                                    Create Classroom
                                </div>
                            </Heading>
                        </div>
                    </div>
                )
            }

            {/*Create Modal */}
            {isCreateModalOpen && (
                <div 
                    className={`fixed inset-0 bg-opacity-30 flex justify-center items-center ${isCreateModalOpen ? 'backdrop-blur-sm' : ''}`}
                    onClick={handleClickOutside}
                >
                    <div ref={modalRef} className="relative bg-white rounded-lg shadow-lg w-[40%]">
                        <CreateClassroom isModalOpen={isCreateModalOpen} setModalOpen={setCreateModalOpen} closeModal={closeModal}/>
                    </div>
                </div>
            )}

            {/* Join Modal */}
            {isJoinModalOpen && (
                <div 
                    className={`fixed inset-0 bg-opacity-30 flex justify-center items-center ${isJoinModalOpen ? 'backdrop-blur-sm' : ''}`}
                    onClick={handleClickOutside}
                >
                    <div ref={modalRef} className="relative bg-white rounded-lg shadow-lg w-[40%]">
                        <JoinClassroom isModalOpen={isJoinModalOpen} setModalOpen={setJoinModalOpen} closeModal={closeModal}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
