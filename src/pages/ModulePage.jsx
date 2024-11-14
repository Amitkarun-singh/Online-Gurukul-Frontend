import React, { useState } from 'react';
import Module from '../components/Module';
import CreateNotes from './CreateNotes';
import AllAssignment from '../components/AllAssignment';

const ModulePage = ({ sidebarOpen, user }) => {
    const [activeTab, setActiveTab] = useState('notes');

    const tabs = [
        { name: 'notes', label: 'Notes' },
        { name: 'lectures', label: 'Lectures' },
        { name: 'homework', label: 'Homework' },
    ];

    console.log('Current active tab:', activeTab); 
    return (
        <div className={`p-6 mt-16 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
            <nav className={`${activeTab === 'lectures' ? 'w-[79.5%]' : 'w-full'} bg-white-a700 p-1 rounded-lg shadow`}>
                <div className="flex justify-between items-center gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`px-6 py-2 rounded-lg text-gray-900 text-sm transition-all ${
                                activeTab === tab.name
                                    ? 'text-white-a700 bg-gradient-to-b from-blue-200_01 to-blue-400_01 shadow-inner'
                                    : 'hover:text-white-a700 hover:bg-blue-200_01'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            {activeTab === 'notes' && (
                <div className="mt-4">
                    <CreateNotes user={user}/>
                </div>
            )}

            {activeTab === 'lectures' && (
                <div className="mt-4">
                    <Module user={user} />
                </div>
            )}

            {activeTab === 'homework' && (
                <div className="mt-4">
                    <AllAssignment user={user} />
                </div>
            )}
            
        </div>
    );
};

export default ModulePage;
