import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ClassManagement() {
  const [modules, setModules] = useState([]);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const [classroomData, setClassroomData] = useState(null); 
  const [avatarUrl, setAvatarUrl] = useState(''); 
  
  const params = useParams();
  const classRoomId = params.classRoomId; 
  const handleAddModule = () => {
    if (newModuleName.trim() !== '') {
      setModules([...modules, newModuleName.trim()]);
      setNewModuleName('');
      setIsAddingModule(false);
    }
  };

  const handleDeleteModule = (index) => {
    const newModules = modules.filter((_, i) => i !== index);
    setModules(newModules);
  };

  const apiCall = async () => {
    if (!classRoomId) {
      console.error('classRoomId is null');
      return;
    }

    try {
      const response = await axios.get(`/api/v1/classrooms/${classRoomId}`);
      const data = response.data.data;
      setClassroomData(data); // Store classroom data in state
      console.log('Classroom Data:', data); // For debugging purposes
    } catch (error) {
      console.error('Error fetching classroom data:', error);
    }
  };

  useEffect(() => {
    if (classRoomId) {
      apiCall(); // Fetch classroom data when classRoomId is available
    }
  }, [classRoomId]);

  if (!classRoomId) {
    return <div>Loading...</div>; // Display loading while fetching data
  }

  // Safely access classroomName and teacherName
  const classroomName = classroomData?.classroomName || 'Class Name Not Available';
  const teacherName = classroomData?.classroomOwnerId?.[0]?.fullName || 'Teacher Name Not Available';

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Class Management</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Teacher Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold">{teacherName.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="w-full px-3 py-2 text-black-900_01 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {classroomName}
              </div>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {teacherName}
              </div>
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto py-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              All Participants
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Create Test
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Create Meet
            </button>
            <button
              onClick={() => setIsAddingModule(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ADD MODULE
            </button>
          </div>

          {isAddingModule && (
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter module name"
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddModule}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
