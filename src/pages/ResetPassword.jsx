import React, {useState} from 'react'
import { Heading } from '../components/Heading';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Img } from '../components/Img';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {

    const navigate = useNavigate();
    const [emailData, setEmailData] = useState({
        text: '',
    });

    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e) => {
        setEmailData({ ...emailData, [e.target.name]: e.target.value });
        setEmailError('');
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/users/generate-otp', emailData);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/enter-otp');
            }
        } catch (error) {
            console.error('OTP is not Generated:', error.response?.data?.message || error.message);
            if (error.response?.data?.message) {
                if (error.response.data.message.includes('Username')) {
                    let userError = error.response.data.message
                    setEmailError(userError);
                }else{
                    toast.error(error.response?.data?.message || error.message);
                    setEmailError('');
                }
            }
            
        }
    };

    return (
        <div className='h-[100vh] flex justify-center items-center'>
            {/* reset password content section */}
            <div className='container-xs flex justify-center px-[3.50rem] md:px-[1.25rem]'>
                {/* reset password form section */}
                <div className='w-[44%] rounded-[10px] border border-solid border-blue_gray-100_01 bg-white-a700 px-[1.88rem] py-[2.38rem] md:w-full sm:p-[1.25rem]'>
                    <div className='flex flex-col gap-[1.38rem]'>
                        <a href="/login" className="self-start">
                            <div>
                                <Img
                                    src="images/img_backarrow_1_1.svg"
                                    alt="Lock,pad,lock,safe,security,protected,lock Alt, / 24 / Outline"
                                    className="h-[1.13rem] w-[1.13rem]"
                                />
                            </div>
                        </a>
                        {/* reset password instruction section */}
                        <div className='flex flex-col gap-[1.88rem]'>
                            {/* email input section */}
                            <div className='flex flex-col gap-[1.38rem]'>
                                {/* reset instruction text section */}
                                <div className='flex flex-col gap-[0.50rem]'>
                                    {/* reset header section */}
                                    <div className='flex flex-col items-start justify-center gap-[1.25rem] px-auto'>
                                        <Heading  as="h1" className='!text-black-900_cc text-3xl font-bold font-inter'>
                                            Reset Password
                                        </Heading>
                                        <Heading as="p" className='!text-gray-600'>
                                            Enter the email address associated with your account and we&#39;ll send you a OTP to reset your password.
                                        </Heading>
                                    </div>
                                </div>
                                <form onSubmit={handleEmailSubmit} className="flex flex-col items-end gap-[1.88rem]">
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
                                                    onChange={handleEmailChange}
                                                    prefix={
                                                        <Img
                                                            src="images/img_message_24_outline.svg"
                                                            alt="Message / 24 / Outline"
                                                            className="mb-[0.13rem] h-[1.13rem] w-[1.13rem]"
                                                        />
                                                    }
                                                    className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                                />
                                                {emailError && <Heading as="p" className="!text-[1.00rem] !text-red-a700">{emailError}</Heading>}
                                            </div>
                                        </div>
                                        {/* signin button section */}
                                        <Button size="md" type="submit" className="w-full rounded-[10px] font-medium">
                                            Submit
                                        </Button>
                                </form>
                                <a href='/' className='w-full'>
                                    <div size="md" className="w-full flex justify-center items-center rounded-[10px] font-medium bg-white-a700 px-[2.13rem] text-[1.00rem] text-blue-400_01 border border-gray-500_01 h-[3.13rem] cursor-pointer">
                                        Return to sign in
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* account creation prompt section */}
                        <div className="mx-[3.88rem] flex flex-wrap justify-center md:mx-0 gap-1">
                            <Heading as="h6" className="!text-[1.00rem]">
                                Don't have an account?
                            </Heading>
                            <a href="/register" className="self-end">
                                <Heading as="p" className="!text-[1.00rem] !text-blue-400_01">
                                    Sign Up
                                </Heading>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
