import React, { useState, useEffect } from 'react';
import { Input } from "../components/Input";
import { Img } from "../components/Img";
import { CloseSVG } from "../components/Input/close";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../features/authSlice';


const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchBarValue, setSearchBarValue] = React.useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);


    useEffect(() => {
        
        dispatch(fetchCurrentUser());
        setCurrentUser(user);
        console.log(user?.fullName);
    }, []);
    
    console.log(currentUser);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div
                className={`fixed top-16 left-0 h-[calc(100%-3rem)] bg-white-a700 text-white transition-all duration-300 z-20 border border-gray-300 ${
                    sidebarOpen ? 'w-64' : 'w-16'
                }`}
                onMouseEnter={() => setSidebarOpen(true)}
                onMouseLeave={() => setSidebarOpen(false)}
            >
                <div className="flex flex-col items-center mt-4">
                    <nav className="mt-10 space-y-2 w-full">
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-all duration-300"
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
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-all duration-300"
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
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-all duration-300"
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
                className={`flex flex-col flex-grow transition-all duration-300 ${
                    sidebarOpen ? 'ml-64' : 'ml-16'
                }`}
            >
                {/* Navbar */}
                <div className="fixed top-0 left-0 w-full h-[4.00rem] pl-[1.50rem] bg-white-a700 flex items-center justify-between px-4 z-10 border border-gray-300">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="p-0.5 focus:outline-none ml-0">
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
                                className="h-[3.38rem] w-[10.25rem] object-contain"
                            />
                        </div>
                    </div>
                    <div>
                        <Input
                            color="gray_100_03"
                            name="Search Field"
                            placeholder={`Search for something`}
                            value={searchBarValue}
                            onChange={(e) => setSearchBarValue(e.target.value)}
                            prefix={<Img src="images/img_search_blue_gray_400.svg" alt="Search" className="h-[1.25rem] w-[1.25rem]" />}
                            suffix={
                                searchBarValue?.length > 0 ? (
                                    <CloseSVG onClick={() => setSearchBarValue("")} fillColor="#888ea2ff" />
                                ) : null
                            }
                            className="flex-grow gap-[0.88rem] !rounded-full text-[#888ea2] border border-gray-300"
                        />
                    </div>
                    <div className="flex items-center gap-4">
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
                        <div className="text-gray-700">
                            <span className="text-sm font-medium">{currentUser?.fullName}</span>
                        </div>
                        <button className="text-gray-700 focus:outline-none">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <img
                                    src={currentUser?.avatar}
                                    alt="Header Logo"
                                    className="h-[3.38rem] w-[10.25rem] object-contain"
                                />
                                <i className="fas fa-user-circle text-2xl text-gray-700"></i>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Content */}
                                
                                <div className="flex-grow bg-white p-6 mt-16 overflow-y-auto">
                                    
                                    <h1 className="text-2xl font-semibold">Welcome to Classroom</h1>
                                    <p className="mt-4 text-gray-600">
                                        This is the main content area. You can put any information you need here.
                                    </p>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    );
                }
                    
                    
        


export default Home;
