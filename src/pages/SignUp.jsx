import { Heading } from "../components/Heading";
import { CheckBox } from "../components/CheckBox";
import { Button } from "../components/Button";
import { Img } from "../components/Img";
import { Slider } from "../components/Slider";
import { Input } from "../components/Input";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp({ ...props }) {
    const [sliderState, setSliderState] = React.useState(0);
    const Navigate = useNavigate();
    const sliderRef = React.useRef(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        dob: '',
        role: '',
        avatar: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        console.log("Form Data:", formData);

        try {
            const response = await axios.post('/api/v1/users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                // Handle successful registration (e.g., navigate to another page)
                console.log("User registered successfully");
                Navigate('/login');
            }
            
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
            console.log("User registration failed",error.response?.data?.message || error.message);
            
        }
    };

    return (
        <div {...props} className="min-w-[80.00rem] bg-blue-300_01 bg-opacity-25">
            {/* header section */}
            <div className="container-xs flex min-w-[80.00rem] justify-center px-[3.50rem] md:px-[1.25rem]">
                {/* logo slider section */}
                <div className="flex w-[95%] items-center justify-around gap-[2.00rem] rounded-[14px] bg-white-a700 my-[2.00rem] px-[3.50rem] py-[4.88rem] md:w-full md:flex-col md:p-[1.25rem]">
                    {/* navigation settings section */}
                    <div className="flex w-[42%] flex-col gap-[1.50rem] md:w-full sm:hidden">
                        {/* logo section */}
                        <div className="flex flex-col gap-[1.25rem]">
                            <Img
                                src="Images/img_header_main_logo.png"
                                alt="Header Logo"
                                className="h-[3.38rem] w-[10.25rem] object-contain"
                            />
                            <div className="mx-auto flex w-full md:flex-col">
                            {/* slider section */}
                            <Slider
                                autoPlay
                                autoPlayInterval={2000}
                                responsive={{ 0: { items: 1 }, 551: { items: 1 }, 1051: { items: 2 } }}
                                disableDotControls
                                activeIndex={sliderState}
                                onSlideChanged={(e) => {
                                setSliderState(e.item);
                                }}
                                ref={sliderRef}
                                items={[...Array(6)].map(() => (
                                <React.Fragment key={Math.random()}>
                                    <Img
                                    src="images/img_5790719_1.png"
                                    alt="Slider Image"
                                    className="relative z-[1] h-[18.00rem] self-end object-contain md:w-full md:self-auto"
                                    />
                                </React.Fragment>
                                ))}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="h-[30.00rem] w-[0.06rem] bg-gradient sm:h-[0.06rem] sm:w-[40.00rem]" />
                    {/* signup form section */}
                    <div className="flex flex-1 items-center justify-end md:self-stretch sm:flex-col">
                    

                    {/* signup options section */}
                    <div className="flex w-full flex-col gap-[1.50rem] sm:w-full">
                        <div className="flex flex-col items-center gap-[1.25rem]">
                            <div className="flex flex-col items-end gap-[0.25rem]">
                                    <Heading size="textlg" as="h2" className="!text-blue-300_01">
                                        Enter your details!
                                    </Heading>
                            </div>
                        {/* signup form inputs section */}
                        <form onSubmit={handleSubmit} className="flex flex-col items-end gap-[1.88rem]">
                            <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] w-full">
                                    <Heading
                                        size="textmd"
                                        as="h3"
                                        className="mt-[0.25rem] !text-gray-900"
                                    >
                                        Full Name
                                    </Heading>
                                    <Input
                                        color="white_A700"
                                        size="sm"
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter Your Full Name"
                                        prefix={
                                            <Img
                                                src="images/img_account_24_outline.svg"
                                                alt="Account / 24 / Outline"
                                                className="h-[1.13rem] w-[1.13rem]"
                                            />
                                        }
                                        className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                    />
                                </div>
                                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] w-full">
                                    <Heading
                                        size="textmd"
                                        as="h4"
                                        className="mt-[0.25rem] !text-gray-900"
                                    >
                                        Username
                                    </Heading>
                                    <Input
                                        color="white"
                                        size="sm"
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter Unique Username"
                                        prefix={
                                            <Img
                                                src="images/img_account_24_outline.svg"
                                                alt="Account / 24 / Outline"
                                                className="h-[1.13rem] w-[1.13rem]"
                                            />
                                        }
                                        className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                    />
                                </div>
                                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] w-full">
                                    <Heading
                                        size="textmd"
                                        as="h3"
                                        className="mt-[0.25rem] !text-gray-900"
                                    >
                                        E-mail
                                    </Heading>
                                    <Input
                                        color="white_A700" 
                                        size="sm"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="user@example.com"
                                        prefix={
                                            <Img
                                                src="images/img_message_24_outline.svg"
                                                alt="Message / 24 / Outline"
                                                className="mb-[0.13rem] h-[1.13rem] w-[1.13rem]"
                                            />
                                        }
                                        className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                    />
                                </div>

                                <div className="flex w-full justify-between gap-[1rem]">
                                    <div className="flex w-[48%] flex-col items-start gap-[0.50rem]">
                                        <Heading
                                            size="textmd"
                                            as="h4"
                                            className="mt-[0.25rem] !text-gray-900"
                                        >
                                            Password
                                        </Heading>
                                        <Input
                                            color="white"
                                            size="sm"
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="********"
                                            prefix={
                                                <Img
                                                    src="images/img_lockpad_locksafesecurityprotectedlock_alt_24_outline.svg"
                                                    alt="Lock,pad Lock,safe,security,protected,lock Alt, / 24 / Outline"
                                                    className="h-[1.13rem] w-[1.13rem]"
                                                />
                                            }
                                            suffix={
                                                <Img
                                                    src="images/img_eye_1_1.svg"
                                                    alt="Eye (1) 1"
                                                    className="h-[1.13rem] w-[1.13rem]"
                                                />
                                            }
                                            className="gap-[0.88rem] rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                        />
                                    </div>


                                    <div className="flex w-[48%] flex-col items-start gap-[0.50rem]">
                                        <Heading
                                            size="textmd"
                                            as="h4"
                                            className="mt-[0.25rem] !text-gray-900"
                                        >
                                            Confirm Password
                                        </Heading>
                                        <Input
                                            color="white"
                                            size="sm"
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="********"
                                            prefix={
                                                <Img
                                                    src="images/img_lockpad_locksafesecurityprotectedlock_alt_24_outline.svg"
                                                    alt="Lock,pad Lock,safe,security,protected,lock Alt, / 24 / Outline"
                                                    className="h-[1.13rem] w-[1.13rem]"
                                                />
                                            }
                                            suffix={
                                                <Img
                                                    src="images/img_eye_1_1.svg"
                                                    alt="Eye (1) 1"
                                                    className="h-[1.13rem] w-[1.13rem]"
                                                />
                                            }
                                            className="gap-[0.88rem] rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                        />
                                    </div>
                                </div>

                                <div className="flex w-full justify-between gap-[1rem]">
                                    <div className="flex w-[48%] flex-col items-start gap-[0.50rem]">
                                        <Heading
                                            size="textmd"
                                            as="h4"
                                            className="mt-[0.25rem] !text-gray-900"
                                        >
                                            Date of Birth
                                        </Heading>
                                        <Input
                                            color="white"
                                            size="sm"
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            placeholder="DD/MM/YYYY"
                                            prefix={
                                                <Img
                                                    src="images/date-27.svg"
                                                    alt="Date Icon"
                                                    className="h-[1.13rem] w-[1.13rem]"
                                                />
                                            }
                                            className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                        />
                                    </div>

                                    <div className="flex w-[48%] flex-col items-start gap-[0.50rem]">
                                        <Heading
                                            size="textmd"
                                            as="h4"
                                            className="mt-[0.25rem] !text-gray-900"
                                        >
                                            Role
                                        </Heading>
                                        <select
                                            name="role"
                                            id="signup-role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="gap-[0.88rem] h-[3.13rem] self-stretch rounded-[10px] border border-solid border-gray-300 px-3 py-2"
                                        >
                                            <option value="" disabled selected hidden>Register as</option>
                                            <option value="student">Student</option>
                                            <option value="teacher">Teacher</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] w-full">
                                    <Heading
                                        size="textmd"
                                        as="h5"
                                        className="mt-[0.25rem] !text-gray-900"
                                    >
                                        Profile Photo
                                    </Heading>
                                    <input
                                        id="signup-photo"
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="gap-[0.88rem]  self-stretch justify-item item-center rounded-[10px] border border-solid border-gray-300 px-3 py-2"
                                    />
                                </div>
                                


                                <Button
                                    size="md"
                                    onClick={handleSubmit}
                                    className="min-w-[23.13rem] bg-[#00BEFF] ml-14 rounded-[10px] font-medium"
                                    a href="/login"
                                >
                                    Sign up
                                </Button>
                               </div>
                            </form>
                            
                        </div>

                        {/* already have an account? */}
                        
                            <div className="mx-[0.50rem] flex flex-wrap justify-center md:mx-0">
                               <a href="/login">
                                <Heading as="h6" className="!text-[1.00rem]">
                                    Already have an account?
                                </Heading>
                                </a>
                                <a href="/login" className="self-end">
                                <Heading as="p" className="!text-[1.00rem] !text-[#00BEFF]">
                                    Sign In
                                </Heading>
                                </a>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        );
    }