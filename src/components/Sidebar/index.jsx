import React from 'react';
import { Img } from '../Img';
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Slices/authSlice";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function logoutHandler () {
        
        try {
            const response = await axios.post('/api/v1/users/logout');
            console.log(response);
            
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(logout());
                navigate("/")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }


    return (
        <div
            className={`fixed top-16 left-0 h-full bg-white-a700 text-white transition-all duration-300 z-20 border border-gray-300 ${
                sidebarOpen ? 'w-64' : 'w-16'
            }`}
            onMouseEnter={() => toggleSidebar(true)}
            onMouseLeave={() => toggleSidebar(false)}
        >
            <div className="flex flex-col items-center relative">
                <nav className="space-y-2 w-full h-[100vh]">
                    <a href="/" className="flex items-center px-4 py-2 text-sm hover:bg-blue-200_01 transition-all duration-300">
                        <img src="../images/home-img-icon.svg" alt="Home Icon" className="w-6 h-6" />
                        <span className={`ml-4 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                            Home
                        </span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-blue-200_01 transition-all duration-300">
                        <img src="../images/enrolled-img-icon.svg" alt="Enrolled Icon" className="w-6 h-6" />
                        <span className={`ml-4 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                            Enrolled
                        </span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-blue-200_01 transition-all duration-300">
                        <img src="../images/setting-img-icon.svg" alt="Settings Icon" className="w-6 h-6" />
                        <span className={`ml-4 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                            Settings
                        </span>
                    </a>
                    <div onClick={logoutHandler} className="flex items-center px-4 py-2 w-[100%] bottom-[4.5rem] text-sm hover:bg-blue-200_01 transition-all duration-300 absolute cursor-pointer">
                        <img src="../Images/logout.svg" alt="Settings Icon" className="w-6 h-6" />
                        <span className={`ml-4 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                            Logout
                        </span>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export { Sidebar };
