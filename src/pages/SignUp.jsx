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
            <div className="container flex justify-center px-14 md:px-5 bg-black min-w-[80rem]">
                {/* logo slider section */}
                <div className="flex w-[90%] items-center justify-center rounded-2xl bg-white px-14 py-20 md:w-full md:flex-col md:p-5">
                    {/* navigation settings section */}
                    <div className="flex w-[42%] flex-col gap-6 md:w-full">
                        {/* logo section */}
                        <div className="flex flex-col gap-6">
                            <Img
                                src="images/img_header_logo.png"
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
                        <div className="ml-40 flex items-center justify-center md:ml-0">
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
                                            className="mr-1 inline-block h-2.5 w-2.5 cursor-pointer rounded-full border border-solid border-red-300 bg-white"
                                        />
                                    ) : (
                                        <div
                                            onClick={() => {
                                                sliderRef?.current?.slideTo(
                                                    i * sliderRef?.current?.state?.itemsInSlide
                                                );
                                            }}
                                            className="mr-1 inline-block h-2 w-2 cursor-pointer rounded-full bg-deep_orange-400"
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* signup form section */}
                <div className="flex flex-1 items-center justify-end md:self-stretch sm:flex-col">
                    <div className="h-160 w-0.5 bg-gradient sm:h-0.5 sm:w-160" />

                    {/* signup options section */}
                    <div className="flex w-[92%] flex-col items-end gap-6 sm:w-full">
                        <div className="flex flex-col gap-5 self-stretch">
                            <div className="flex flex-col items-end gap-5">
                                <Button
                                    color="white"
                                    size="md"
                                    leftIcon={
                                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-red-600">
                                            <Img
                                                src="images/img_googleplus_1_1.svg"
                                                alt="Google-plus (1) 1"
                                                className="h-6 w-6 rounded-md p-2"
                                            />
                                        </div>
                                    }
                                    className="min-w-[23.13rem] gap-3.5 rounded-lg border border-solid border-gray-300 text-gray-700"
                                >
                                    Sign in with Google
                                </Button>
                                <div className="flex items-center justify-end self-stretch px-14 md:px-5">
                                    <div className="h-0.5 w-5 bg-gray-700" />
                                    <Heading
                                        as="h2"
                                        className="ml-2.5 self-end text-base"
                                    >
                                        Or sign in with your email
                                    </Heading>
                                    <div className="ml-2.5 h-0.5 w-5 bg-gray-700" />
                                </div>
                            </div>
                        </div>

                        {/* signup form inputs section */}
                        <div className="flex flex-col items-end gap-7.5">
                            <div className="flex flex-col items-end gap-5 self-stretch">
                                <div className="flex w-[80%] flex-col items-start gap-2 md:w-full">
                                    <Heading
                                        size="textmd"
                                        as="h3"
                                        className="mt-1 text-gray-900"
                                    >
                                        Full name
                                    </Heading>
                                    <Input
                                        color="white"
                                        size="xs"
                                        type="text"
                                        name="Fullname Input"
                                        placeholder="Enter name"
                                        prefix={
                                            <Img
                                                src="images/img_account_24_outline.svg"
                                                alt="Account / 24 / Outline"
                                                className="h-4.5 w-4.5"
                                            />
                                        }
                                        className="gap-3.5 self-stretch rounded-br-lg rounded-tr-lg border border-solid border-gray-300"
                                    />
                                </div>
                                <div className="flex w-[80%] flex-col items-start gap-2 md:w-full">
                                    <Heading
                                        size="textmd"
                                        as="h4"
                                        className="mt-1 text-gray-900"
                                    >
                                        Email
                                    </Heading>
                                    <Input
                                        color="white"
                                        size="xs"
                                        type="email"
                                        name="Email Input"
                                        placeholder="user@example.com"
                                        prefix={
                                            <Img
                                                src="images/img_message_24_outline.svg"
                                                alt="Message / 24 / Outline"
                                                className="mb-0.5 h-4.5 w-4.5"
                                            />
                                        }
                                        className="gap-3.5 self-stretch rounded-br-lg rounded-tr-lg border border-solid border-gray-300"
                                    />
                                </div>
                                <div className="flex w-[80%] flex-col items-start gap-2 md:w-full">
                                    <Heading
                                        size="textmd"
                                        as="h5"
                                        className="mt-1 text-gray-900"
                                    >
                                        Password
                                    </Heading>
                                    <Input
                                        color="white"
                                        size="xs"
                                        type="password"
                                        name="Password Input"
                                        placeholder="**************"
                                        prefix={
                                            <Img
                                                src="images/img_lockpad_locksafesecurityprotectedlock_alt_24_outline.svg"
                                                alt="Lock,pad Lock,safe,security,protected,lock Alt, / 24 / Outline"
                                                className="h-4.5 w-4.5"
                                            />
                                        }
                                        suffix={
                                            <Img
                                                src="images/img_eye_1_1.svg"
                                                alt="Eye (1) 1"
                                                className="h-4.5 w-4.5"
                                            />
                                        }
                                        className="gap-3.5 self-stretch rounded-br-lg rounded-tr-lg border border-solid border-gray-300"
                                    />
                                </div>
                                <Button
                                    size="md"
                                    className="min-w-[23.13rem] rounded-lg font-medium"
                                >
                                    Sign up
                                </Button>
                            </div>
                            <CheckBox
                                name="terms_checkbox"
                                label="I agreed to the Terms & Conditions"
                                id="TermsCheckbox"
                                className="mr-8.5 gap-2.5 pt-1.5 text-base font-semibold text-gray-900"
                            />
                        </div>

                        {/* already have an account? */}
                        <div className="flex flex-row gap-2.5 text-base font-semibold text-gray-900">
                            Already have an account?
                            <span className="text-red-600">Sign in</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}