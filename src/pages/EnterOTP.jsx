import React, {useState} from 'react'
import { Heading } from '../components/Heading';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Img } from '../components/Img';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EnterOTP = () => {
    const navigate = useNavigate();
    const [otp, setOTP] = useState({
        otp: '',
    });

    const [otpError, setOTPError] = useState('');

    const handleOTPChange = (e) => {
        setOTP({ ...setOTP, [e.target.name]: e.target.value });
        setOTPError('');
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        try {
            if (otp.length < 6) {
                setOTPError('OTP must be 6 characters long');
                return;
            }
            const response = await axios.post('/api/v1/users/verify-otp', otp);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/change-password');
            }
        } catch (error) {
            console.error('OTP is not correct:', error.response?.data?.message || error.message);
            if (error.response?.data?.message) {
                if (error.response.data.message.includes('OTP')) {
                    let userError = error.response.data.message
                    setOTPError(userError);
                }else{
                    toast.error(error.response?.data?.message || error.message);
                    setOTPError('');
                }
            }
            
        }
    };
    const handleResendOTP = async (e) => {
        try {
            const response = await axios.post('/api/v1/users/resend-otp', {}, {withCredentials: true, });
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error('Resend OTP failed:', error.response?.data?.message || error.message);
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message || error.message);
            }
            
        }
    };

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            {/* reset password content section */}
            <div className='container-xs flex justify-center px-[3.50rem] md:px-[1.25rem]'>
                {/* reset password form section */}
                <div className='w-[44%] rounded-[10px] border border-solid border-blue_gray-100_01 bg-white-a700 px-[1.88rem] py-[2.38rem] md:w-full sm:p-[1.25rem]'>
                    <div className='flex flex-col gap-[1.38em]'>
                        {/* reset password instruction section */}
                        <div className='flex flex-col gap-[1.88rem]'>
                            {/* email input section */}
                            <div className='flex flex-col gap-[1.38rem]'>
                                {/* reset instruction text section */}
                                <a href="/reset-password" className="self-start">
                                    <div>
                                        <Img
                                            src="images/img_backarrow_1_1.svg"
                                            alt="Lock,pad,lock,safe,security,protected,lock Alt, / 24 / Outline"
                                            className="h-[1.13rem] w-[1.13rem]"
                                        />
                                    </div>
                                </a>
                                <div className='flex flex-col gap-[0.50rem]'>
                                    {/* reset header section */}
                                    <div className='flex flex-col items-start justify-center gap-[1.25rem] px-auto'>
                                        <Heading  as="h1" className='!text-black-900_cc text-3xl font-bold font-inter'>
                                            Enter OTP
                                        </Heading>
                                        <Heading as="p" className='!text-gray-600'>
                                            Please check your mail, We sent an OTP code
                                        </Heading>
                                    </div>
                                </div>
                                <form onSubmit={handleOTPSubmit} className="flex flex-col items-end gap-[1.88rem]">
                                        {/* otp input section  */}
                                        <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                                            <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                            <Input
                                                color="white_A700"
                                                size="sm"
                                                type="text"
                                                maxLength={6}
                                                name="otp"
                                                onChange={handleOTPChange}
                                                placeholder="******" 
                                                prefix={
                                                    <Img
                                                        src="images/img_lockpad_locksafesecurityprotectedlock_alt_24_outline.svg"
                                                        alt="Lock,pad,lock,safe,security,protected,lock Alt, / 24 / Outline"
                                                        className="h-[1.13rem] w-[1.13rem]"
                                                    />
                                                }
                                                className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                            />
                                                {otpError && <Heading as="p" className="!text-[1.00rem] !text-red-a700">{otpError}</Heading>}
                                            </div>
                                        </div>
                                        {/* signin button section */}
                                        <Button size="md" type="submit" className="w-full rounded-[10px] font-medium">
                                            Submit
                                        </Button>
                                </form>
                                <div onClick={handleResendOTP} size="md" className="w-full flex justify-center items-center rounded-[10px] font-medium bg-white-a700 px-[2.13rem] text-[1.00rem] text-blue-300_01 border border-gray-500_01 h-[3.13rem] cursor-pointer">
                                    Request OTP Again
                                </div>
                            </div>
                        </div>
                        {/* account creation prompt section */}
                        <div className="mx-[3.88rem] flex flex-wrap justify-center md:mx-0 gap-1">
                            <Heading as="h6" className="!text-[1.00rem]">
                                Remember the Password?
                            </Heading>
                            <a href="/login" className="self-end">
                                <Heading as="p" className="!text-[1.00rem] !text-[#00BEFF]">
                                    Log in
                                </Heading>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnterOTP
