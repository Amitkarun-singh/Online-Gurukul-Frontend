// import React, { useState } from 'react';


// const Home = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);

//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebarOpen);
//     };

//     return (
//         <div className="flex h-screen overflow-hidden">
//             {/* Sidebar */}
//             <div
//                 className={`fixed top-16 left-0 h-[calc(100%-3rem)] bg-[#00BEFF] text-white transition-all duration-300 z-20 ${
//                     sidebarOpen ? 'w-64' : 'w-16'
//                 }`}
//                 onMouseEnter={() => setSidebarOpen(true)}
//                 onMouseLeave={() => setSidebarOpen(false)}
//             >
//                 <div className="flex flex-col items-center mt-4">
//                     <nav className="mt-10 space-y-2 w-full">
//                         <a
//                             href="#"
//                             className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-all duration-300"
//                         >
//                             <img
//                                 src="../images/home-img-icon.svg"
//                                 alt="Home Icon"
//                                 className="w-6 h-6"
//                             />
//                             <span
//                                 className={`ml-4 transition-opacity duration-300 ${
//                                     sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
//                                 }`}
//                             >
//                                 Home
//                             </span>
//                         </a>
//                         <a
//                             href="#"
//                             className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-all duration-300"
//                         >
//                             <img
//                                 src="../images/enrolled-img-icon.svg"
//                                 alt="Enrolled Icon"
//                                 className="w-6 h-6"
//                             />
//                             <span
//                                 className={`ml-4 transition-opacity duration-300 ${
//                                     sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
//                                 }`}
//                             >
//                                 Enrolled
//                             </span>
//                         </a>
//                         <a
//                             href="#"
//                             className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-all duration-300"
//                         >
//                             <img
//                                 src="../images/setting-img-icon.svg"
//                                 alt="Settings Icon"
//                                 className="w-6 h-6"
//                             />
//                             <span
//                                 className={`ml-4 transition-opacity duration-300 ${
//                                     sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
//                                 }`}
//                             >
//                                 Settings
//                             </span>
//                         </a>
//                     </nav>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div
//                 className={`flex flex-col flex-grow transition-all duration-300 ${
//                     sidebarOpen ? 'ml-64' : 'ml-16'
//                 }`}
//             >
//                 {/* Navbar */}
//                 <div className="fixed top-0 left-0 w-full h-16 bg-blue-300_01 bg-opacity-25 flex items-center justify-between px-4 z-10">
//                     <div className="flex items-center">
//                         <button onClick={toggleSidebar} className="p-2 focus:outline-none">
//                             <img
//                                 src={sidebarOpen ? "../images/hamburger-cross-menu.svg" : "../images/hamburger-menu.svg"}
//                                 alt="Menu"
//                                 className="w-6 h-6"
//                             />
//                         </button>
//                         <div className="text-xl font-semibold ml-10">
//                             <img
//                                 src="Images/img_header_main_logo.png"
//                                 alt="Header Logo"
//                                 className="h-[3.38rem] w-[10.25rem] object-contain"
//                             />
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <button className="text-gray-700 focus:outline-none">
//                             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
//                                 <img
//                                     src="../images/notification-img-icon.svg"
//                                     alt="Notification Icon"
//                                     className="w-6 h-6"
//                                 />
//                                 <i className="fas fa-user-circle text-2xl text-gray-700"></i>
//                             </div>
//                         </button>
//                         <button className="text-gray-700 focus:outline-none">
//                             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
//                                 <img
//                                     src="Images/logo_image.png"
//                                     alt="Header Logo"
//                                     className="h-[3.38rem] w-[10.25rem] object-contain"
//                                 />
//                                 <i className="fas fa-user-circle text-2xl text-gray-700"></i>
//                             </div>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div className="flex-grow bg-white p-6 mt-12">
//                     {/* <div>
//                         <div className="flex items-center justify-center mt-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search courses"
//                                 className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
//                                 Search
//                             </button>
//                         </div>
//                     </div> */}
//                     <h1 className="text-2xl font-semibold">Welcome to Classroom</h1>
//                     <p className="mt-4 text-gray-600">
//                         This is the main content area. You can put any information you need here.
//                         lorem250
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;


import React, { useState } from 'react';

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div
                className={`fixed top-16 left-0 h-[calc(100%-3rem)] bg-[#00BEFF] text-white transition-all duration-300 z-20 ${
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
                <div className="fixed top-0 left-0 w-full h-16 bg-blue-300_01 bg-opacity-25 flex items-center justify-between px-4 z-10">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="p-2 focus:outline-none">
                            <img
                                src={sidebarOpen ? "../images/hamburger-cross-menu.svg" : "../images/hamburger-menu.svg"}
                                alt="Menu"
                                className="w-6 h-6"
                            />
                        </button>
                        <div className="text-xl font-semibold ml-10">
                            <img
                                src="Images/img_header_main_logo.png"
                                alt="Header Logo"
                                className="h-[3.38rem] w-[10.25rem] object-contain"
                            />
                        </div>
                        {/* <div className="flex items-center  space-x-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="relative px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                                Search
                                <span className="absolute inset-0 border border-blue-500 rounded-md pointer-events-none"></span>
                            </button>
                        </div> */}
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
                        <button className="text-gray-700 focus:outline-none">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <img
                                    src="Images/logo_image.png"
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
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            
                                        />
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                                            Search
                                        </button>
                                    </div>
                                    <h1 className="text-2xl font-semibold">Welcome to Classroom</h1>
                                    <p className="mt-4 text-gray-600">
                                        This is the main content area. You can put any information you need here.
                                    </p>
                                    <p className="mt-4 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet,  accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices 
                        eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
                    </p>

                                    
                                </div>
                            </div>
                        </div>
                    );
                }
                    
                    
        


export default Home;
