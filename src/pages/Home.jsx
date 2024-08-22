import React, { useEffect, useState } from 'react';
import { Input } from "../components/Input";
import { Img } from "../components/Img";
import { CloseSVG } from "../components/Input/close";
import {Card} from '../components/Card/card';
import axios from 'axios';

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchBarValue, setSearchBarValue] = useState("");
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
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div
                className={`fixed top-16 left-0 h-full bg-white-a700 text-white transition-all duration-300 z-20 border border-gray-300 ${
                    sidebarOpen ? 'w-64' : 'w-16'
                }`}
                onMouseEnter={() => setSidebarOpen(true)}
                onMouseLeave={() => setSidebarOpen(false)}
            >
                <div className="flex flex-col items-center mt-4">
                    <nav className="mt-10 space-y-2 w-full">
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-sm hover:bg-blue-200_01 transition-all duration-300"
                        >
                            <img
                                src="../images/home-img-icon.svg"
                                alt="Home Icon"
                                className="w-6 h-6"
                            />
                            <span
                                className={`ml-4 transition-opacity duration-300 ${
                                    sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                                }`}
                            >
                                Home
                            </span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-sm hover:bg-blue-200_01 transition-all duration-300"
                        >
                            <img
                                src="../images/enrolled-img-icon.svg"
                                alt="Enrolled Icon"
                                className="w-6 h-6"
                            />
                            <span
                                className={`ml-4 transition-opacity duration-300 ${
                                    sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                                }`}
                            >
                                Enrolled
                            </span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-sm hover:bg-blue-200_01 transition-all duration-300"
                        >
                            <img
                                src="../images/setting-img-icon.svg"
                                alt="Settings Icon"
                                className="w-6 h-6"
                            />
                            <span
                                className={`ml-4 transition-opacity duration-300 ${
                                    sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                                }`}
                            >
                                Settings
                            </span>
                        </a>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div
                className="flex flex-col flex-grow transition-all duration-300"
            >
                {/* Navbar */}
                <div className="fixed top-0 left-0 w-full h-16 bg-white-a700 flex items-center justify-between px-4 z-10 border-b border-gray-300">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="p-0.5 focus:outline-none">
                            <img
                                src="../images/hamburger-menu.svg"
                                alt="Menu"
                                className="w-6 h-6"
                            />
                        </button>
                        <div className="text-xl font-semibold ml-4">
                            <img
                                src="Images/img_header_main_logo.png"
                                alt="Header Logo"
                                className="h-14 w-auto object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            name="Search Field"
                            placeholder="Search for something"
                            value={searchBarValue}
                            onChange={(e) => setSearchBarValue(e.target.value)}
                            prefix={<Img src="images/img_search_blue_gray_400.svg" alt="Search" className="h-5 w-5" />}
                            suffix={
                                searchBarValue?.length > 0 ? (
                                    <CloseSVG onClick={() => setSearchBarValue("")} fillColor="#888ea2ff" />
                                ) : null
                            }
                            className="flex-grow gap-3 rounded-full text-[#888ea2] border border-gray-300"
                        />
                        <button className="text-gray-700 focus:outline-none">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <img
                                    src="../images/notification-img-icon.svg"
                                    alt="Notification Icon"
                                    className="w-6 h-6"
                                />
                                <i className="fas fa-user-circle text-2xl text-gray-700"></i>
                            </div>
                        </button>
                        <button className="text-gray-700 focus:outline-none">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <img
                                    src="Images/logo_image.png"
                                    alt="Header Logo"
                                    className="h-14 w-auto object-contain"
                                />
                                <i className="fas fa-user-circle text-2xl text-gray-700"></i>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className={'flex-grow p-6 mt-16 overflow-y-auto ' + (sidebarOpen ? 'ml-64' : 'ml-16')}>
                    {
                        loading ? "Loading..." :
                        classRooms.length > 0 ?
                            (
                                <div className={`grid gap-5 ${sidebarOpen ? 'grid-cols-3' : 'grid-cols-4'}`}>
                                    {
                                        classRooms.map((classRoom) => (
                                            <Card key={classRoom._id} classRoom={classRoom} />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="flex justify-center items-center">
                                    <p>No Data Found</p>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;


