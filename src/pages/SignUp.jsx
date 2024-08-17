import { Heading } from "../components/Heading";
import { CheckBox } from "../components/CheckBox";
import { Button } from "../components/Button";
import { Img } from "../components/Img";
import { Slider } from "../components/Slider";
import { Input } from "../components/Input";
import React from "react";

export default function SignUp({ ...props }) {
    const [sliderState, setSliderState] = React.useState(0);
    const sliderRef = React.useRef(null);

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
                    <div className="h-[36.00rem] w-[0.06rem] bg-gradient sm:h-[0.06rem] sm:w-[40.00rem]" />
                    {/* signup form section */}
                    <div className="flex flex-1 items-center justify-end md:self-stretch sm:flex-col">
                    

                    {/* signup options section */}
                    <div className="flex w-full flex-col gap-[1.50rem] sm:w-full">
                        <div className="flex flex-col items-center gap-[1.25rem]">
                                    <div className="flex flex-col items-end gap-[0.25rem]">
                                        <Button
                                            color="white_A700"
                                            size="md"
                                            leftIcon={
                                            <div className="flex h-[2.50rem] w-[2.50rem] items-center justify-center rounded-md bg-[#00BEFF]">
                                                <Img
                                                src="Images/img_googleplus_1_1.svg"
                                                alt="Google-plus (1) 1"
                                                className="h-[2.50rem] w-[2.25rem] rounded-md p-[0.50rem] !text"
                                                />
                                            </div>
                                            }
                                            className="min-w-[23.13rem] gap-[0.88rem] rounded-[10px] border border-solid border-gray-300 !text-gray-700_01"
                                        >
                                            Sign in with google
                                        </Button>
                                        <div className="flex items-center justify-end self-stretch pl-[3.50rem] pr-[6.63rem] md:px-[1.25rem]">
                                        <div className="h-[0.06rem] w-[1.25rem] bg-gray-700_01" />
                                        <Heading size="textmd" as="h2" className="!text-[0.63rem] self-end !font-normal">
                                            Or sign in with your email
                                        </Heading>
                                        <div className="h-[0.06rem] w-[1.25rem] bg-gray-700_01" />
                                        </div>
                                    </div>
                        {/* signup form inputs section */}
                        <div className="flex flex-col items-end gap-[1.88rem]">
                            <div className="flex flex-col items-start gap-[0.25rem] self-stretch">
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
                                            name="password"
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
                                        name="photo"
                                        className="gap-[0.88rem]  self-stretch justify-item item-center rounded-[10px] border border-solid border-gray-300 px-3 py-2"
                                    />
                                </div>
                                


                                <Button
                                    size="md"
                                    className="min-w-[23.13rem] bg-[#00BEFF] ml-14 rounded-[10px] font-medium"
                                >
                                    Sign up
                                </Button>
                               </div>
                            </div>
                            <div className="flex items-center justify-start gap-[0.50rem]">
                                <CheckBox
                                    name="terms_checkbox"
                                    label=""
                                    as="h6"
                                    id="TermsCheckbox"
                                    className="!text-[1.00rem] !font-normal"
                                />
                                I agreed to the Terms & Conditions
                            </div>
                        </div>

                        {/* already have an account? */}
                        
                        <div className="mx-[3.88rem] flex flex-wrap justify-center md:mx-0">
                                <a href="#">
                                <Heading as="h6" className="!text-[1.00rem]">
                                    Already have an account?
                                </Heading>
                                </a>
                                <a href="#" className="self-end">
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