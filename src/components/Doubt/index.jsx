import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../Input';
import { Button } from '../Button';
import { useSelector } from 'react-redux';

const Doubt = ({user}) => {
    const [activeTab, setActiveTab] = useState('Doubts');
    const [sortOrder, setSortOrder] = useState('Oldest');
    const tabs = ['Doubts'];
    const videoId = useSelector((state) => state.videoId.videoId);
    const lectureId = useSelector((state) => state.videoId.lectureId);
    const [doubts, setDoubts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedDoubt, setExpandedDoubt] = useState(null);
    const [doubtData, setdoubtData] = useState({
        doubtDescription: '',
    });
    const [showDeleteButton, setShowDeleteButton] = useState(null);
    const [showReplyDeleteButton, setShowReplyDeleteButton] = useState(null);

    const [replyData, setReplyData] = useState({
        replyDescription: '',
    });
    const [isDoubtFormVisible, setIsDoubtFormVisible] = useState(false);

    const handleChange = (e) => {
        setdoubtData({ ...doubtData, [e.target.name]: e.target.value });
    };

    const replyHandlerChange = (e) => {
        setReplyData({ ...replyData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/v1/doubts/${lectureId}/${videoId}`, doubtData)
            if (response.data.success) {
                console.log(response);
            }
            FetchVideoData();
            setIsDoubtFormVisible(false);
        } catch (error) {
            console.error('Doubt is not added:', error.response?.data?.message || error.message);
        }
    };

    const replyHandlerSubmit = async (e, doubtId) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/v1/doubts/${doubtId}`, replyData)
            if (response.data.success) {
                console.log(response);
            }   
            FetchVideoData();
        } catch (error) {
            console.error('Add reply is failed:', error.response?.data?.message || error.message);
        }
    };

    const clickHandler = () => {
        setIsDoubtFormVisible(!isDoubtFormVisible);
    };

    const cancelHandler = () => {
        setdoubtData({ doubtDescription: '' });
        setIsDoubtFormVisible(false);
    };

    const toggleDeleteButton = (doubtId) => {
        if (showDeleteButton === doubtId) {
            setShowDeleteButton(null);
        } else {
            setShowDeleteButton(doubtId);
        }
        document.addEventListener('click', (e) => {
            if (e.target.closest('button') === null) {
                setShowDeleteButton(null);
            }
        });
    };

    const toggleReplyDeleteButton = (replyId) => {
        if (showReplyDeleteButton === replyId) {
            setShowReplyDeleteButton(null);
        } else {
            setShowReplyDeleteButton(replyId);
        }
        document.addEventListener('click', (e) => {
            if (e.target.closest('button') === null) {
                setShowReplyDeleteButton(null);
            }
        });
    };


    const deleteHandler = async () => {
        try {
            const response = await axios.delete(`/api/v1/doubts/${lectureId}/${showDeleteButton}`);
            if (response.data.success) {
                console.log(response);
            }
            FetchVideoData();
        } catch (error) {
            console.error('Delete doubt is failed:', error.response?.data?.message || error.message);
        } finally {
            setShowDeleteButton(null);
        }
    };

    const replyDeleteHandler = async () => {
        try {
            console.log(showReplyDeleteButton);
            console.log(expandedDoubt);
            
            
            const response = await axios.delete(`/api/v1/doubts/${lectureId}/${expandedDoubt}/${showReplyDeleteButton}`);
            if (response.data.success) {
                console.log(response);
            }
            FetchVideoData();
        } catch (error) {
            console.error('Delete reply is failed:', error.response?.data?.message || error.message);
        } finally {
            setShowReplyDeleteButton(null);
        }
    };

    const FetchVideoData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/v1/doubts/${videoId}`);
            console.log(response.data.data);
            setDoubts(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        FetchVideoData();
    }, [videoId]);

    // Sort doubts based on sortOrder
    const sortedDoubts = [...doubts].sort((a, b) => {
        return sortOrder === 'Oldest'
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);
    });

    const toggleReplies = (doubtId) => {
        if (expandedDoubt === doubtId) {
            setExpandedDoubt(null);
        } else {
            setExpandedDoubt(doubtId);
        }
    };

    return (
        <div className="mx-auto p-4">
            <nav className="flex border-b mb-4" role="tablist">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-gray-800 font-semibold' : 'text-gray-500'}`}
                        onClick={() => setActiveTab(tab)}
                        role="tab"
                        aria-selected={activeTab === tab}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            <div className="mb-4">
                <button onClick={clickHandler} className="flex items-center text-blue-600" aria-label="Ask your doubt">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Ask your doubt
                </button>
                {
                    isDoubtFormVisible && (
                        <div>
                            <form onSubmit={handleSubmit} className='flex flex-col gap-2 p-2'>
                                <Input
                                    color="white_A700"
                                    size="sm"
                                    type="text"
                                    name="doubtDescription"
                                    placeholder="Ask your doubt"
                                    onChange={handleChange}
                                    className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border border-solid border-gray-300 w-full"
                                />
                                <div className='flex justify-end gap-2'>
                                    <Button
                                        size="md"
                                        type="button"
                                        onClick={cancelHandler}
                                        className="text-[#00BEFF] bg-white-a700 rounded-[10px] font-medium px-[1.55rem]">
                                            Cancel
                                    </Button>
                                    <Button
                                        size="md"
                                        type="submit"
                                        className="bg-[#00BEFF] rounded-[10px] font-medium px-2">
                                            Save
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )
                }
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Doubts</h2>
                <div className="flex items-center">
                    <button
                        className="mr-4 text-gray-600"
                        onClick={() => setSortOrder(sortOrder === 'Oldest' ? 'Newest' : 'Oldest')}
                        aria-label={`Sort by ${sortOrder === 'Oldest' ? 'Newest' : 'Oldest'}`}
                    >
                        {sortOrder} ↓
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    sortedDoubts.map((doubt) => (
                        <div key={doubt.id} className="border rounded-lg p-4">
                            <div className="flex items-start">
                                <img
                                    src={doubt.studentAvatar}
                                    alt=""
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{doubt.studentName}</h3>
                                    <p className="text-gray-700">{doubt.doubtDescription}</p>
                                    <div className="flex items-center mt-2 text-gray-500 text-sm">
                                        <button
                                            className="flex items-center mr-4"
                                            onClick={() => toggleReplies(doubt.id)} // Toggle replies on click
                                            aria-label={`${doubt.replies.length} Replies`}
                                        >
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                                />
                                            </svg>
                                            {doubt.replies.length} Replies
                                        </button>
                                        <span>{new Date(doubt.createdAt).toLocaleString()}</span>
                                    </div>

                                    {/* Show replies if expanded */}
                                    {expandedDoubt === doubt.id && (
                                        <div className="mt-4 space-y-2">
                                            {doubt.replies.map((reply, index) => (
                                                <div key={index} className="mt-2 flex justify-between p-2 border-t">
                                                    <div className="flex items-start">
                                                        <img
                                                            src={reply.replierAvatar}
                                                            alt={reply.replierName}
                                                            className="w-10 h-10 rounded-full mr-4"
                                                        />
                                                        <div>
                                                            <strong>{reply.replierName}</strong>
                                                            <p>{reply.replyDescription}</p>
                                                            <p className="text-sm text-gray-500">
                                                                {new Date(reply.createdAt).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => toggleReplyDeleteButton(reply.id)} className="text-gray-400" aria-label="More options">
                                                        <svg
                                                            className="w-6 h-6"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                        </svg>
                                                    </button>
                                                    {showReplyDeleteButton === reply.id && (user.role === 'teacher' || user._id === reply.replierId) && (
                                                        <div className="absolute right-[24.7rem] mt-7 bg-white-a700 border shadow-lg rounded-lg">
                                                            <button className="block w-full px-4 py-2 text-left" onClick={() => replyDeleteHandler()}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            <div>
                                                <form onSubmit={(e) => replyHandlerSubmit(e, doubt.id)} className='flex flex-col gap-2 p-2'>
                                                    <Input
                                                        color="white_A700"
                                                        size="sm"
                                                        type="text"
                                                        name="replyDescription"
                                                        placeholder="reply here"
                                                        onChange={replyHandlerChange}
                                                        className="gap-[0.88rem] self-stretch rounded-br-[10px] rounded-tr-[10px] border-b border-solid border-gray-300 w-full"
                                                    />
                                                    <div className='flex justify-end gap-2'>
                                                        <Button
                                                            size="md"
                                                            type="submit"
                                                            className="bg-[#00BEFF] rounded-[10px] font-medium px-2">
                                                                Reply
                                                        </Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => toggleDeleteButton(doubt.id)} className="text-gray-400" aria-label="More options">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                                {showDeleteButton === doubt.id && (user.role === 'teacher' || user._id === doubt.studentId) && (
                                    <div className="absolute right-[22.7rem] mt-2 bg-white-a700 border shadow-lg rounded-lg">
                                        <button className="block w-full px-4 py-2 text-left" onClick={() => deleteHandler()}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Doubt;
