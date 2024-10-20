import React, { useState, useEffect } from 'react';
import { Input } from "../Input";
import { Img } from "../Img";
import { CloseSVG } from "../Input/close";
import { useDispatch, useSelector } from 'react-redux';
import { show } from '../../Redux/Slices/classroomSlice'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../Redux/Slices/authSlice";

const Navbar = ({user}) => {
    const [searchBarValue, setSearchBarValue] = useState("");
    console.log(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchItems = async (query) => {
        try {
            const response = await axios.get(`/api/v1/classrooms/search?searchQuery=${query}`);
            dispatch(show(response.data.data))
        } catch (error) {
            console.error("Error searching items:", error);
        }
    };

    async function fetchClassroomData() {
        try {
            const response = await axios.get('/api/v1/classrooms/');
            const data = await response.data.data;
            dispatch(show(data))
        } catch (error) {
            console.error(error);
            dispatch(logout());
            navigate("/")
        }
    }

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchBarValue(query);
        if (query.length > 0) {
            searchItems(query);
        } else {
            fetchClassroomData();
        }
    };

    const { isCreateModelOpen, isJoinModelOpen } = useSelector((state) => state.classRooms);

    useEffect(() => {
        if (!searchBarValue) {
            fetchClassroomData();
        }
    }, [user,searchBarValue, isCreateModelOpen, isJoinModelOpen]);

    return (
        <div>
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full h-[4.00rem] pl-[1.50rem] bg-white-a700 flex items-center justify-between px-4 z-10 border border-gray-300">
                <div className="flex items-center">
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
                        onChange={handleSearch} // Use the search handler
                        prefix={<Img src="images/img_search_blue_gray_400.svg" alt="Search" className="h-[1.25rem] w-[1.25rem]" />}
                        suffix={
                            searchBarValue?.length > 0 ? (
                                <CloseSVG onClick={() => setSearchBarValue("")} fillColor="#888ea2ff" className='cursor-pointer' />
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
                        <div className="w-10 h-10 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <img
                                src={user?.avatar}
                                alt="Header Logo"
                                className="h-10 w-10 object-fill"
                            />
                            <i className="fas fa-user-circle text-2xl text-gray-700"></i>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export { Navbar }