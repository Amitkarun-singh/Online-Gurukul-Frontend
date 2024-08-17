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
        <div {...props} className="min-w-[80rem]">
            {/* header section */}
            <div className="container-xs flex min-w-[80.rem] justify-center px-[3.50rem] md:px-[1.25]">
                {/* logo slider section */}
                <div className="flex w-[90%] items-center justify-center rounded-[14px] bg-white-a700 px-[3.50rem] py-[4.88rem] md:w-full md:flex-col md:p-[1.25rem]">
                    {/* navigation settings section */}
                    <div className="flex w-[42%] flex-col gap-[1.50rem] md:w-full">
                        {/* logo section */}
                        <div className="flex flex-col gap-[1.50rem]">
                            <Img
                                src="images/img_header_main_logo.png"
                                alt="Header Logo"
                                className="h-5.5 w-32 object-contain"
                            />
                            <div className="mx-auto flex w-full md:flex-col">
                                {/* welcome slider section */}
                                <Slider
                                    autoPlay
                                    autoPlayInterval={2000}
                                    responsive={{
                                        0: { items: 1 },
                                        551: { items: 1 },
                                        1051: { items: 2 },
                                    }}
                                    disableDotsControls
                                    activeIndex={sliderState}
                                    onSlideChanged={(e) => {
                                        setSliderState(e?.item);
                                    }}
                                    ref={sliderRef}
                                    items={[...Array(6)].map(() => (
                                       <React.Fragment key={Math.random()}>
                                            <Img
                                                src="images/img_5790719_1.png"
                                                alt="Slider Image"
                                                className="relative z-10 h-84 self-end object-contain md:w-full md:self-auto"
                                            />
                                        </React.Fragment>
                                    ))}
                                />
                            </div>
                        </div>
                        <div className="ml-[9.88rem] flex items-center justify-center md:ml-0">
                            {[...Array(3)].map((_, i) => (
                                <React.Fragment key={i}>
                                    {sliderState >=
                                        i * (sliderRef?.current?.state?.itemsInSlide || 1) &&
                                    sliderState <
                                        (i + 1) * (sliderRef?.current?.state?.itemsInSlide || 1) ? (
                                        <div
                                            onClick={() => {
                                                sliderRef?.current?.slideTo(
                                                    i * sliderRef?.current?.state?.itemsInSlide
                                                );
                                            }}
                                            className="mr-[0.31rem] inline-block h-[0.63rem] w-[0.63rem] cursor-pointer rounded-[50%] border border-solid border-red-300_01 bg-white-a700"
                                        />
                                    ) : (
                                        <div
                                            onClick={() => {
                                                sliderRef?.current?.slideTo(
                                                    i * sliderRef?.current?.state?.itemsInSlide
                                                );
                                            }}
                                            className="mr-[0.31rem] inline-block h-[0.50rem] w-[0.50rem] cursor-pointer rounded-full-[50%] bg-deep_orange-400_7f_01"
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* signup form section */}
                <div className="flex flex-1 items-center justify-end md:self-stretch sm:flex-col">
                    <div className="h-[40.00rem] w-[0.06rem] bg-gradient sm:h-[0.06rem] sm:w-[40.00rem" />

                    {/* signup options section */}
                    <div className="flex w-[92%] flex-col items-end gap-[1.50rem] sm:w-full">
                        <div className="flex flex-col gap-[1.25rem] self-stretch">
                            <div className="flex flex-col items-end gap-[1.25rem]">
                                <Button
                                    color="white_A700"
                                    size="md"
                                    leftIcon={
                                        <div className="flex h-[2.50rem] w-[2.50rem] items-center justify-center rounded-md bg-red-600_02">
                                            <Img
                                                src="images/img_googleplus_1_1.svg"
                                                alt="Google-plus (1) 1"
                                                className="h-[1.50rem] w-[1.50rem] rounded-md p-[0.50rem]"
                                            />
                                        </div>
                                    }
                                    className="min-w-[23.13rem] gap-[0.88rem] rounded-[10px] border border-solid border-gray-300 !text-gray-700_01"
                                >
                                    Sign in with Google
                                </Button>
                                <div className="flex items-center justify-end self-stretch px-[3.50rem] md:px-[1.25rem]">
                                    <div className="h-[0.06rem] w-[1.25rem] bg-gray-700_01" />
                                    <Heading as="h2" className="ml-[0.63rem] self-end !text-[1.00rem]">
                                        Or sign in with your email
                                    </Heading>
                                    <div className="ml-[0.63rem] h-[0.06rem] w-[1.25rem] bg-gray-700_01" />
                                </div>
                            </div>
                        </div>
                    </div>
                        {/* signup form inputs section */}
                        <div className="flex flex-col items-end gap-[1.88rem]">
                            <div className="flex flex-col items-end gap-[1.25] self-stretch">
                                <div className="flex w-[80%] flex-col items-start gap-[0.25rem] md:w-full">
                                    <Heading
                                        size="textmd"
                                        as="h3"
                                        className="mt-[0.25rem] !text-gray-900"
                                    >
                                        Full Name
                                    </Heading>
                                    <Input
                                        color="white_A700"
                                        size="xs"
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
                                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] md:w-full">
                                    <Heading
                                        size="textmd"
                                        as="h4"
                                        className="mt-[0.25rem] !text-gray-900"
                                    >
                                        E-mail
                                    </Heading>
                                    <Input
                                        color="white_A700" 
                                        size="xs"
                                        type="email"
                                        name="email"
                                        placeholder="user@example.com"
                                        prefix={
                                            <Img
                                                src="images/img_message_24_outline.svg"
                                                alt="Message / 24 / Outline"
                                                className="mb-[1.13rem] h-[1.13rem] w-[1.13rem]"
                                            />
                                        }
                                        className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                    />
                                </div>
                                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] md:w-full">
                                    <Heading
                                        size="textmd"
                                        as="h5"
                                        className="mt-[0.25rem] !text-gray-900"
                                    >
                                        Password
                                    </Heading>
                                    <Input
                                        color="white"
                                        size="xs"
                                        type="password"
                                        name="password"
                                        placeholder="*********"
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
                                        className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                    />
                                </div>
                                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] md:w-full">
                                    <Heading
                                        size="textmd"
                                        as="h5"
                                        className="mt-[0.25rem] !text-gray-900"
                                    >
                                        Date of Birth
                                    </Heading>
                                    <Input
                                        color="white"
                                        size="xs"
                                        type="date"
                                        name="dob"
                                        placeholder="DD/MM/YYYY"
                                        prefix={
                                            <Img
                                                src="images/date-27.svg"
                                                alt="Lock,pad Lock,safe,security,protected,lock Alt, / 24 / Outline"
                                                className="h-[1.13rem] w-[1.13rem]"
                                            />
                                        }
                                        className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                    />
                                </div>
                                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] md:w-full">
                                    <Heading
                                        size="textmd"
                                        as="h5"
                                        className="mt-[0.25rem] !text-gray-900"
                                    >
                                        Username
                                    </Heading>
                                    <Input
                                        color="white"
                                        size="xs"
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
                                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] md:w-full">
                                <Heading
                                    size="textmd"
                                    as="h5"
                                    className="mt-[0.25rem] !text-gray-900"
                                >
                                    Role
                                </Heading>
                                    <select
                                        name="role"
                                        id="signup-role"
                                        className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300 px-3 py-2"
                                    >
                                        <option value="" disabled selected hidden>Register as</option>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] md:w-full">
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
                                        className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300 px-3 py-2"
                                    />
                                </div>


                                <Button
                                    size="md"
                                    className="min-w-[23.13rem] bg-[#00BEFF] rounded-[10px] font-medium"
                                >
                                    Sign up
                                </Button>
                            </div>
                            <CheckBox
                                name="terms_checkbox"
                                label="I agreed to the Terms & Conditions"
                                id="TermsCheckbox"
                                className="mr-[2.13rem] gap-[0.63rem] pt-[0.38rem] text-b[1.00rem] font-medium text-gray-700_01 md:mr-0"
                            />
                            </div>

                        {/* already have an account? */}
                        <div className="flex flex-row justify-end self-stretch pl-[3.50rem] p-[4.25rem] md:px-[1.25rem]">
                            Already have an account?
                            <div className="text-red-600">Sign in</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }