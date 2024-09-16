import React, {useState} from 'react'
import { Heading } from '../components/Heading';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Img } from '../components/Img';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateClassroom = ({setCreateModalOpen, closeModal}) => {

    const [classroomData, setClassroomData] = useState({
        classroomName : '',
        classroomDesc : '',
        classroomCode : ''
    });

    const [classroomNameError, setClassroomNameError] = useState('');
    const [classroomDescError, setClassroomDescError] = useState('');
    const [classroomCodeError, setClassroomCodeError] = useState('');
    
    const handleEmailChange = (e) => {
        setClassroomData({ ...classroomData, [e.target.name]: e.target.value });
        setClassroomNameError('');
        setClassroomDescError('');
        setClassroomCodeError('');
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/classrooms/', classroomData);
            if (response.data.success) {
                closeModal();
                toast.success(response.data.message);
                setCreateModalOpen(false);
            }
        } catch (error) {
            console.error('OTP is not Generated:', error.response?.data?.message || error.message);
            if (error.response?.data?.message) {
                if (error.response.data.message.includes('name')) {
                    let nameError = error.response.data.message
                    setClassroomNameError(nameError);
                }else if (error.response.data.message.includes('description')) {
                    let nameError = error.response.data.message
                    setClassroomDescError(nameError);
                }else if (error.response.data.message.includes('code')) {
                    let nameError = error.response.data.message
                    setClassroomCodeError(nameError);
                }else{
                    toast.error(error.response?.data?.message || error.message);
                    setClassroomNameError('');
                    setClassroomDescError('');
                    setClassroomCodeError('');
                }
            }
            
        }
    };

    return (
        <div className={`w-full flex justify-center items-center shadow-2xl`}>
            <div className='container-xs flex justify-center'>
                <div className='w-[100%] rounded-[10px] border border-solid border-blue_gray-100_01 bg-white-a700 px-[1.88rem] py-[2.38rem] md:w-full sm:p-[1.25rem]'>
                    <div className='flex flex-col gap-[1rem]'>
                        <div className='cursor-pointer' onClick={closeModal}>
                            <Img
                                src="images/img_backarrow_1_1.svg"
                                alt="Lock,pad,lock,safe,security,protected,lock Alt, / 24 / Outline"
                                className="h-[1.13rem] w-[1.13rem]"
                            />
                        </div>
                        {/* reset password instruction section */}
                        <div className='flex flex-col gap-[1.88rem]'>
                            {/* email input section */}
                            <div className='flex flex-col gap-[1]'>
                                {/* reset instruction text section */}
                                <div className='flex flex-col gap-[0.50rem]'>
                                    {/* reset header section */}
                                    <div className='flex flex-col items-start justify-center gap-[1.25rem] px-auto'>
                                        <Heading  as="h1" className='!text-black-900_cc text-3xl font-bold font-inter'>
                                            Create classroom
                                        </Heading>
                                    </div>
                                </div>
                                <form onSubmit={handleEmailSubmit} className="flex flex-col items-end gap-[1.88rem]">
                                        {/* email input section */}
                                        <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                                            <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                                <Heading size="textmd" as="h3" className="mt-[0.25rem] !text-gray-900">
                                                    Classroom Name
                                                </Heading>
                                                <Input
                                                    color="white_A700"
                                                    size="sm"
                                                    type="text"
                                                    name="classroomName"
                                                    placeholder="classroom name"
                                                    onChange={handleEmailChange}
                                                    prefix={
                                                        <Img
                                                            src="images/classroom_name.svg"
                                                            alt="Message / 24 / Outline"
                                                            className="mb-[0.13rem] h-[1.13rem] w-[1.13rem]"
                                                        />
                                                    }
                                                    className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                                />
                                                {classroomNameError && <Heading as="p" className="!text-[1.00rem] !text-red-a700">{classroomNameError}</Heading>}
                                            </div>
                                            <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                                <Heading size="textmd" as="h3" className="mt-[0.25rem] !text-gray-900">
                                                    Classroom Description
                                                </Heading>
                                                <Input
                                                    color="white_A700"
                                                    size="sm"
                                                    type="text"
                                                    name="classroomDesc"
                                                    placeholder="classroom description"
                                                    onChange={handleEmailChange}
                                                    prefix={
                                                        <Img
                                                            src="images/classroom_Description.svg"
                                                            alt="Message / 24 / Outline"
                                                            className="mb-[0.13rem] h-[1.13rem] w-[1.13rem]"
                                                        />
                                                    }
                                                    className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                                />
                                                {classroomDescError && <Heading as="p" className="!text-[1.00rem] !text-red-a700">{classroomDescError}</Heading>}
                                            </div>
                                            <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                                <Heading size="textmd" as="h3" className="mt-[0.25rem] !text-gray-900">
                                                    Classroom Code
                                                </Heading>
                                                <Input
                                                    color="white_A700"
                                                    size="sm"
                                                    type="text"
                                                    name="classroomCode"
                                                    placeholder="classroom code"
                                                    onChange={handleEmailChange}
                                                    prefix={
                                                        <Img
                                                            src="images/classroom_code.svg"
                                                            alt="Message / 24 / Outline"
                                                            className="mb-[0.13rem] h-[1.13rem] w-[1.13rem]"
                                                        />
                                                    }
                                                    className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300"
                                                />
                                                {classroomCodeError && <Heading as="p" className="!text-[1.00rem] !text-red-a700">{classroomCodeError}</Heading>}
                                            </div>
                                        </div>
                                        {/* signin button section */}
                                        <Button size="md" type="submit" className="w-full rounded-[10px] font-medium">
                                            Create Classroom
                                        </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateClassroom
