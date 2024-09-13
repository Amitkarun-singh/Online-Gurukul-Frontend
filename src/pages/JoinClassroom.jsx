import React, {useState} from 'react'
import { Heading } from '../components/Heading';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Img } from '../components/Img';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JoinClassroom = ({ setJoinModalOpen, closeModal}) => {

    const [classroomData, setClassroomData] = useState({
        classroomCode : ''
    });

    const [classroomCodeError, setClassroomCodeError] = useState('');
    
    const handleEmailChange = (e) => {
        setClassroomData({ ...classroomData, [e.target.name]: e.target.value });
        setClassroomCodeError('');
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/classrooms/join-classroom', classroomData);
            if (response.data.success) {
                toast.success(response.data.message);
                setJoinModalOpen(false)
            }
        } catch (error) {
            if (error.response?.data?.message) {
                if (error.response.data.message.includes('classroom')) {
                    let codeError = error.response.data.message
                    setClassroomCodeError(codeError);
                }else{
                    toast.error(error.response?.data?.message || error.message);
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
                        <div className='flex flex-col gap-[1.88rem]'>
                            <div className='flex flex-col gap-[1]'>
                                <div className='flex flex-col gap-[0.50rem]'>
                                    <div className='flex flex-col items-start justify-center gap-[1.25rem] px-auto'>
                                        <Heading  as="h1" className='!text-black-900_cc text-3xl font-bold font-inter'>
                                            Join classroom
                                        </Heading>
                                    </div>
                                </div>
                                <form onSubmit={handleEmailSubmit} className="flex flex-col items-end gap-[1.88rem]">
                                        <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                                            <div className="flex flex-col items-start gap-[0.50rem] w-full">
                                                <Heading size="textmd" as="h3" className="mt-[0.25rem] !text-gray-900">
                                                    Classroom Code
                                                </Heading>
                                                <Heading size="textmd" as="h3" className="mt-[0.25rem] !text-gray-900">
                                                    Ask your teacher for the class code, then enter it here.
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
                                        <div className="flex flex-row items-center gap-[0.50rem] self-stretch ">
                                            <div className='rounded-full w-2 h-2 bg-black-900_02 inline-block'></div>
                                            <Heading size="textmd" as="h3" className="!text-gray-900">
                                            Use a class code with 7 letters or numbers, and no spaces.
                                            </Heading>
                                        </div>
                                        <Button size="md" type="submit" className="w-full rounded-[10px] font-medium">
                                            Join Classroom
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

export default JoinClassroom
