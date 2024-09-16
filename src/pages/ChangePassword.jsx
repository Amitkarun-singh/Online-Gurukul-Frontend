import React, {useState} from 'react'
import { Heading } from '../components/Heading';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Img } from '../components/Img';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const [newPasswordData, setNewPasswordData] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });

    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

    const handleNewPasswordChange = (e) => {
        setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value });
        setNewPasswordError('');
        setConfirmNewPasswordError('');
    };

    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/users/reset-password', newPasswordData);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/');
            }
        } catch (error) {
            console.error('OTP is not Generated:', error.response?.data?.message || error.message);
            if (error.response?.data?.message) {
                if (error.response.data.message.includes('New password')) {
                    let userError = error.response.data.message
                    setNewPasswordError(userError);
                } else if(error.response.data.message.includes('Confirm new password')){
                    let userError = error.response.data.message
                    setConfirmNewPasswordError(userError);
                }else{
                    toast.error(error.response?.data?.message || error.message);
                    setNewPasswordError('');
                    setConfirmNewPasswordError('');
                }
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
                                            New Password
                                        </Heading>
                                        <Heading as="p" className='!text-gray-600'>
                                            Enter your new password
                                        </Heading>
                                    </div>
                                </div>
                                <form onSubmit={handleNewPasswordSubmit} className="flex flex-col items-end gap-[1.88rem]">
                                    <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                                <Heading size="textmd" as="h4" className="mt-[0.25rem] !text-gray-900">
                                                    Password
                                                </Heading>
                                                <Input
                                                    color="white_A700"
                                                    size="sm"
                                                    type={showPassword ? ('text') :('password')}
                                                    name="newPassword"
                                                    onChange={handleNewPasswordChange}
                                                    placeholder="**************" 
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
                                                {newPasswordError && <Heading as="p" className="!text-[1.00rem] !text-red-a700">{newPasswordError}</Heading>}
                                    </div>
                                    <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                                <Heading size="textmd" as="h4" className="mt-[0.25rem] !text-gray-900">
                                                    Confirm Password
                                                </Heading>
                                                <Input
                                                    color="white_A700"
                                                    size="sm"
                                                    type={showConfirmPassword ? ('text') :('password')}
                                                    name="confirmNewPassword"
                                                    placeholder="**************"
                                                    onChange={handleNewPasswordChange} 
                                                    prefix={
                                                        <Img
                                                            src="images/img_lockpad_locksafesecurityprotectedlock_alt_24_outline.svg"
                                                            alt="Lock,pad,lock,safe,security,protected,lock Alt, / 24 / Outline"
                                                            className="h-[1.13rem] w-[1.13rem]"
                                                        />
                                                    }
                                                    suffix={<Img onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                    src={showConfirmPassword ? "images/img_eye_1_1.svg" : "images/img_eye_1_2.svg"} alt="Eye (1) 1" className="h-[1.13rem] w-[1.13rem] cursor-pointer" />}
                                                    className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                                />
                                                {confirmNewPasswordError && <Heading as="p" className="!text-[1.00rem] !text-red-a700">{confirmNewPasswordError}</Heading>}
                                    </div>
                                        {/* signin button section */}
                                        <Button size="md" type="submit" className="w-full rounded-[10px] font-medium">
                                            Update Password
                                        </Button>
                                </form>
                            </div>
                        </div>
                        {/* account creation prompt section */}
                        <div className="mx-[3.88rem] flex flex-wrap justify-center md:mx-0 gap-1">
                            <Heading as="h6" className="!text-[1.00rem]">
                                Remember the Password?
                            </Heading>
                            <a href="/" className="self-end">
                                <Heading as="p" className="!text-[1.00rem] !text-blue-400_01">
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

export default ChangePassword
