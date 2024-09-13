import React,{useState} from 'react';
import { Input } from "../Input";
import { Img } from "../Img";
import { CloseSVG } from "../Input/close";
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const [searchBarValue, setSearchBarValue] = useState("");
    const { user, loading, error } = useSelector((state) => state.auth);
    console.log();
    

    return (
        <div>
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full h-[4.00rem] pl-[1.50rem] bg-white-a700 flex items-center justify-between px-4 z-10 border border-gray-300">
                    <div className="flex items-center">
                        {/* <button onClick={toggleSidebar} className="p-0.5 focus:outline-none ml-0">
                            <img
                                src="../images/hamburger-menu.svg"
                                alt="Menu"
                                className="w-6 h-6"
                            />
                        </button> */}
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
                            color="white_A700_33"
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
                            <span className="text-sm font-medium">{user?.fullName}</span>
                        </div>
                        <button className="text-gray-700 focus:outline-none">
                            <div className="w-10 h-10 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                                <img
                                    src={user?.avatar}
                                    alt="Header Logo"
                                    className="h-10 w-10 top-0.5 object-contain  absolute"
                                />
                                <i className="fas fa-user-circle text-2xl text-gray-700"></i>
                            </div>
                        </button>
                    </div>
                </div>
        </div>
    )
}

export {Navbar}
