import { Heading } from "../components/Heading";
import { CheckBox } from "../components/CheckBox";
import { Button } from "../components/Button";
import { Img } from "../components/Img";
import { Slider } from "../components/Slider";
import { Input } from "../components/Input";
import React from "react";

export default function LogIn({...props }) {
    const [sliderState, setSliderState] = React.useState(0);
    const sliderRef = React.useRef(null);

    return (
        <div {...props} className="min-w-[80.00rem]">
        {/* header section */}
            <div className="container-xs flex min-w-[80.00rem] justify-center px-[3.50rem] md:px-[1.25rem]">
                {/* logo and slider section */}
                <div className="flex w-[90%] items-center justify-center rounded-[14px] bg-white-A700 px-[3.50rem] py-[4.88rem] md:w-full md:flex-col md:p-[1.25rem]">
                <div className="flex w-[42%] flex-col gap-[1.50rem] md:w-full">
                    {/* logo section */}
                    <div className="flex flex-col gap-[1.50rem]">
                    <Img
                        src="Images/img_header_main_logo.png"
                        alt="Header Logo"
                        className="h-[3.38rem] w-[10.25rem] object-contain"
                    />
                    </div>
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
                            className="relative z-[1] h-[21.00rem] self-end object-contain md:w-full md:self-auto"
                            />
                        </React.Fragment>
                        ))}
                    />
                    </div>
                </div>
                </div>
                {/* page indicator section */}
                <div className="ml-[9.88rem] flex flex-row items-center justify-center md:ml-0">
                {[...Array(3)].map((_, i) => (
                    (sliderState >= i * (sliderRef?.current?.state?.itemsInSlide || 1) &&
                    sliderState < (i + 1) * (sliderRef?.current?.state?.itemsInSlide || 1)) ? (
                    <div
                        onClick={() => {
                        sliderRef.current?.slideTo(i * sliderRef?.current?.state?.itemsInSlide);
                        }}
                        className="mr-[0.31rem] inline-block h-[0.63rem] w-[0.63rem] cursor-pointer rounded-[50%] border border-solid border-red-300_01 bg-white-A700"
                    />
                    ) : (
                    <div
                        onClick={() => {
                        sliderRef.current?.slideTo(i * sliderRef?.current?.state?.itemsInSlide);
                        }}
                        className="mr-[0.31rem] inline-block h-[0.50rem] w-[0.50rem] cursor-pointer rounded-[50%] bg-deep_orange-400_7f_01"
                    />
                    )
                ))}
                </div>
            </div>
            {/* main content section */}
            <div className="flex flex-1 items-center justify-end md:self-stretch sm:flex-col">
                <div className="h-[40.00rem] w-[0.06rem] bg-gradient sm:h-[0.06rem] sm:w-[40.00rem]" />
                {/* signin options section */}
                <div className="flex w-[92%] flex-col gap-[1.50rem] sm:w-full">
                <div className="flex flex-col gap-[1.25rem]">
                    <div className="flex flex-col items-end gap-[1.25rem]">
                    <Button
                        color="white_A700"
                        size="md"
                        leftIcon={
                        <div className="flex h-[2.50rem] w-[2.50rem] items-center justify-center rounded-md bg-red-600_02">
                            <Img
                            src="Images/img_googleplus_1_1.svg"
                            alt="Google-plus (1) 1"
                            className="h-[1.50rem] w-[1.50rem] rounded-md p-[0.50rem]"
                            />
                        </div>
                        }
                        className="min-w-[23.13rem] gap-[0.88rem] rounded-[10px] border border-solid border-gray-300 !text-gray-700_01"
                    >
                        Sign in with google
                    </Button>
                    </div>
                    <div className="flex items-center justify-end self-stretch pl-[3.50rem] pr-[3.63rem] md:px-[1.25rem]">
                    <div className="h-[0.06rem] w-[1.25rem] bg-gray-700_01" />
                    <Heading size="textmd" as="h2" className="!text-[0.63rem] self-end !font-normal">
                        Or sign in with your email
                    </Heading>
                    <div className="h-[0.06rem] w-[1.25rem] bg-gray-700_01" />
                    </div>
                </div>
                </div>
                {/* signin form section */}
                <div className="flex flex-col items-end gap-[1.88rem]">
                {/* email input section */}
                <div className="flex flex-col items-end gap-[1.25rem] self-stretch">
                    <div className="flex w-[80%] flex-col items-start gap-[0.50rem] md:w-full">
                    <Heading size="textmd" as="h3" className="mt-[0.25rem] !text-gray-900">
                        Email
                    </Heading>
                    <Input
                        color="white_A700"
                        size="xs"
                        type="email"
                        name="Email Input"
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
                </div>
                {/* password input section */}
                <div className="flex w-[80%] flex-col items-start gap-[0.50rem] md:w-full">
                    <Heading size="textmd" as="h4" className="mt-[0.25rem] !text-gray-900">
                    Password
                    </Heading>
                    <Input
                    color="white_A700"
                    size="xs"
                    type="password"
                    name="Password Input"
                    placeholder="**************"
                    prefix={
                        <Img
                        src="images/img_lockpad_locksafesecurityprotectedlock_alt_24_outline.svg"
                        alt="Lock,pad,lock,safe,security,protected,lock Alt, / 24 / Outline"
                        className="h-[1.13rem] w-[1.13rem]"
                        />
                    }
                    suffix={<Img src="images/img_eye_1_1.svg" alt="Eye (1) 1" className="h-[1.13rem] w-[1.13rem]" />}
                    className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                    />
                </div>
                </div>
                {/* signin button section */}
                <Button size="md" className="min-w-[23.13rem] rounded-[10px] font-medium">
                Sign In
                </Button>
            </div>
            {/* remember me and forgot password section */}
            <div className="flex items-center justify-end gap-[3.69rem]">
                <CheckBox
                name="Keep Signed Checkbox"
                label="Keep me signed in"
                id="KeepSignedCheckbox"
                className="gap-[0.63rem] py-[0.25rem] text-[1.00rem] text-gray-700_01"
                />
                <a href="#" className="self-end">
                <Heading as="h5" className="!text-[1.00rem] !font-normal">
                    Forgot Password?
                </Heading>
                </a>
            </div>
            {/* signup prompt section */}
            <div className="mx-[3.88rem] flex flex-wrap justify-end md:mx-0">
                <a href="#">
                <Heading as="h6" className="!text-[1.00rem]">
                    Don't have an account?
                </Heading>
                </a>
                <a href="#" className="self-end">
                <Heading as="p" className="!text-[1.00rem] !text-red-300_01">
                    Sign Up
                </Heading>
                </a>
            </div>
        </div>
    );
}