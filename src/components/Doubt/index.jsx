import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Doubt = () => {
    const [activeTab, setActiveTab] = useState('Doubts');
    const [sortOrder, setSortOrder] = useState('Oldest');
    const tabs = ['Doubts'];
    const videoId = '66f83583af0d9d0e51d8b408';
    const [doubts, setDoubts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedDoubt, setExpandedDoubt] = useState(null);

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
    }, []);

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
        <div className="max-w-4xl mx-auto p-4">
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
                <button className="flex items-center text-blue-600" aria-label="Ask your doubt">
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
                                                <div key={index} className="mt-2 p-2 border-t">
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
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button className="text-gray-400" aria-label="More options">
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
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Doubt;
