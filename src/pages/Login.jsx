import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { Img } from "../components/Img";
import { Slider } from "../components/Slider";
import { Input } from "../components/Input";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LogIn({ ...props }) {
    const [sliderState, setSliderState] = useState(0);
    const sliderRef = React.useRef(null);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        text: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setUsernameError('');
        setPasswordError('');
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/users/login', loginData);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/register');
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            if (error.response?.data?.message) {
                if (error.response.data.message.includes('username')) {
                    let userError = error.response.data.message
                    setUsernameError(userError);
                    setPasswordError('');
                } else if (error.response.data.message.includes('password')) {
                    let passwordError = error.response.data.message
                    setUsernameError('');
                    setPasswordError(passwordError);
                }else{
                    toast.error(error.response?.data?.message || error.message);
                    setUsernameError('');
                    setPasswordError('');
                }
            }
            
        }
    };

    return (
        <div {...props} className="h-full flex justify-center items-center">
            {/* header section */}
            <div className="container-xs flex min-w-[80.00rem] justify-center px-[3.50rem] md:px-[1.25rem] sm:min-w-[20.00rem] md:min-w-[30.00rem]">
                {/* logo and slider section */}
                <div className="flex w-[90%] items-center justify-center rounded-[14px] bg-white-a700 px-[3.50rem] py-[4.88rem] md:w-full md:flex-col md:p-[1.25rem]">
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
                    {/* main content section */}
                    <div className="flex flex-1 items-center justify-end md:self-stretch sm:flex-col">
                        <div className="h-[27.26rem] w-[0.06rem] bg-gradient sm:hidden" />
                        <div className="flex w-[92%] flex-col gap-[1.50rem] sm:w-full">
                            {/* signin options section */}
                            <div className="flex flex-col items-center gap-[1.25rem]">
                                <div className="flex flex-col items-end gap-[0.25rem]">
                                    <Heading size="textlg" as="h2" className="!text-blue-300_01">
                                        Welcome back!
                                    </Heading>
                                </div>
                                {/* signin form section */}
                                {/* Wrapped the inputs and Sign In button inside a <form> element */}
                                <form onSubmit={handleLoginSubmit} className="flex flex-col items-end gap-[1.88rem]">
                                    {/* email input section */}
                                    <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                                        <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                            <Heading size="textmd" as="h3" className="mt-[0.25rem] !text-gray-900">
                                                Email/Username
                                            </Heading>
                                            <Input
                                                color="white_A700"
                                                size="sm"
                                                type="text"
                                                name="text"
                                                placeholder="user@example.com"
                                                onChange={handleLoginChange} // Handle input change
                                                prefix={
                                                    <Img
                                                        src="images/img_message_24_outline.svg"
                                                        alt="Message / 24 / Outline"
                                                        className="mb-[0.13rem] h-[1.13rem] w-[1.13rem]"
                                                    />
                                                }
                                                className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                            />
                                            {usernameError && <Heading as="p" className="!text-[1.00rem] !text-red-a700">{usernameError}</Heading>}
                                        </div>
                                        {/* password input section */}
                                        <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                            <Heading size="textmd" as="h4" className="mt-[0.25rem] !text-gray-900">
                                                Password
                                            </Heading>
                                            <Input
                                                color="white_A700"
                                                size="sm"
                                                type={showPassword ? ('text') :('password')}
                                                name="password"
                                                placeholder="**************"
                                                onChange={handleLoginChange} // Handle input change
                                                prefix={
                                                    <Img
                                                        src="images/img_lockpad_locksafesecurityprotectedlock_alt_24_outline.svg"
                                                        alt="Lock,pad,lock,safe,security,protected,lock Alt, / 24 / Outline"
                                                        className="h-[1.13rem] w-[1.13rem]"
                                                    />
                                                }
                                                suffix={<Img onClick={() => setShowPassword((prev) => !prev)}
                                                src={showPassword ? "images/img_eye_1_1.svg" : "images/img_eye_1_2.svg"} alt="Eye (1) 1" className="h-[1.13rem] w-[1.13rem] cursor-pointer" />}
                                                className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                            />
                                            {passwordError && <Heading as="p" className="!text-[1.00rem] !text-red-a700">{passwordError}</Heading>}
                                        </div>
                                    </div>
                                    {/* signin button section */}
                                    <Button size="md" type="submit" className="min-w-[23.13rem] rounded-[10px] font-medium">
                                        Sign In
                                    </Button>
                                </form> {/* End of form tag */}
                            </div>
                            {/* forgot password section */}
                            <div className="flex items-center justify-start pl-16 gap-[3.69rem]">
                                <a href="/reset-password" className="self-end">
                                    <Heading as="h5" className="!text-[1.00rem] !font-normal">
                                        Forgot Password?
                                    </Heading>
                                </a>
                            </div>
                            {/* signup prompt section */}
                            <div className="mx-[3.88rem] flex flex-wrap justify-center md:mx-0">
                                <Heading as="h6" className="!text-[1.00rem]">
                                    Don't have an account?
                                </Heading>
                                <a href="/register" className="self-end">
                                    <Heading as="p" className="!text-[1.00rem] !text-[#00BEFF]">
                                        Sign Up
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
