import React,{useState} from 'react';
import { Input } from "../Input";
import { Img } from "../Img";
import { CloseSVG } from "../Input/close";

const Navbar = () => {
    const [searchBarValue, setSearchBarValue] = useState("");

    console.log();
    

    return (
        <div>
            {/* Navbar */}
            <div className="fixed z-10 w-full h-16 bg-white-a700 flex items-center justify-between px-4 border border-gray-300">
                    {/*logo section*/}
                    <div className="text-xl font-semibold">
                        <Img
                            src="Images/img_header_main_logo.png"
                            alt="Header Logo"
                            className="h-14 w-auto object-contain"
                        />
                    </div>
                    {/*search section*/}
                    <div>
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
                            className="flex-grow gap-3 !rounded-full text-[#888ea2] border border-gray-300"
                        />
                    </div>
                    {/*notification section*/}
                    <div className="flex items-center gap-4">
                        {/* notification */}
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
                                <Img
                                    src="Images/logo_image.png"
                                    alt="Header Logo"
                                    className="h-14 w-auto object-contain"
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
