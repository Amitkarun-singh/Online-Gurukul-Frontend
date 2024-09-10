import React from 'react';
import { Img } from '../Img';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
    return (
        <div
            className={`fixed top-16 left-0 h-full bg-white-a700 text-white transition-all duration-300 z-20 border border-gray-300 ${
                sidebarOpen ? 'w-64' : 'w-16'
            }`}
            onMouseEnter={() => toggleSidebar(true)}
            onMouseLeave={() => toggleSidebar(false)}
        >
            <button className="absolute -right-4 -top-1" onClick={() => toggleSidebar(!sidebarOpen)}>
                {sidebarOpen ? (
                    <Img src="Images/arrow-circle-left.svg" alt="close arrow" />
                ) : (
                    <Img src="Images/arrow-circle-right.svg" alt="open arrow" />
                )}
            </button>
            <div className="flex flex-col items-center">
                <nav className="space-y-2 w-full">
                    <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-blue-200_01 transition-all duration-300">
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
                </nav>
            </div>
        </div>
    );
};

export { Sidebar };
