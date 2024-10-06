import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus } from 'lucide-react';
// import { Heading } from '../components/Heading';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
// import { Img } from '../components/Img';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from '../components/ConfirmationModal';

export default function ClassManagement({ user }) {
  const [modules, setModules] = useState([]);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const [classroomData, setClassroomData] = useState(null);
  const [participants, setParticipants] = useState([]); // State for participants
  const [view, setView] = useState('modules'); // State to track current view
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'remove'
  const [email, setEmail] = useState(''); // State for email Input
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationAction, setConfirmationAction] = useState(null);

  const params = useParams();
  const classRoomId = params.classRoomId;
  const modalRef = useRef(null);

  const fetchClassroomData = async () => {
    if (!classRoomId) {
      console.error('classRoomId is null');
      return;
    }

    try {
      const response = await axios.get(`/api/v1/classrooms/${classRoomId}`);
      const data = response.data.data;
      setClassroomData(data); // Store classroom data in state
      setModules(data.modules || []); // Initialize modules from fetched data
      console.log('Classroom Data:', data); // For debugging purposes
    } catch (error) {
      console.error('Error fetching classroom data:', error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`/api/v1/classrooms/${classRoomId}`);
      const data = response.data.data;

      // Combine owner and members into a single list
      const allParticipants = [
        ...data.classroomOwnerId.map(owner => ({ ...owner, role: 'teacher' })), // Treat owner as teacher
        ...data.classroomMembersID.map(member => ({
          ...member,
          role: member.role === 'teacher' ? 'teacher' : 'student'
        }))
      ];

      setParticipants(allParticipants);
      setView('participants'); // Switch to participants view

      console.log('Participants Data:', allParticipants); // Log participants
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get(`/api/v1/modules/${classRoomId}`);
      setModules(response.data.data); // Ensure this matches the key used in the backend
      setView('modules'); // Switch to modules view
      console.log('Modules->', modules); // Log modules
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  const handleAddModule = async () => {
    if (newModuleName.trim() !== '') {
      try {
        // Check if module already exists
        const existingModule = modules.find((module) => module.moduleName === newModuleName.trim());
        if (existingModule) {
          console.error('Module with the same name already exists');
          return;
        }
  
        const response = await axios.post(`/api/v1/modules/${classRoomId}`, {
          moduleName: newModuleName.trim(),
        });
        setModules([...modules, response.data.data]);
        setNewModuleName('');
        setIsAddingModule(false);
      } catch (error) {
        console.error('Error adding module:', error);
        console.error('Server response:', error.response.data); 
      }
    } else {
      setIsAddingModule(false); 
    }
  };

  const handleDeleteModule = async (index, moduleId) => {
    try {
      await axios.delete(`/api/v1/modules/${classRoomId}/${moduleId}`);
      const newModules = modules.filter((_, i) => i !== index);
      setModules(newModules);
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  const handleAddParticipant = async () => {
    try {
      const response = await axios.post(`/api/v1/classrooms/${classRoomId}/member`, { email });
      console.log('Participant added:', response.data);
      fetchParticipants(); // Refresh participants after addition
      setIsModalOpen(false);
      setEmail('');
    } catch (error) {
      console.error('Error adding participant:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
  };

  const handleRemoveParticipant = async () => {
    try {
      const response = await axios.delete(`/api/v1/classrooms/${classRoomId}/member`, {
        data: { email }
      });
      console.log('Participant removed:', response.data);
      fetchParticipants(); // Refresh participants after removal
      setIsModalOpen(false);
      setEmail('');
    } catch (error) {
      console.error('Error removing participant:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
  };

  useEffect(() => {
    if (classRoomId) {
      fetchClassroomData(); // Fetch classroom data when classRoomId is available
      fetchModules(); // Fetch modules when classRoomId is available
    }
  }, [classRoomId]); 
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const openConfirmationModal = (message, action) => {
    setConfirmationMessage(message);
    setConfirmationAction(() => action);
    setIsConfirmationOpen(true);
  };

  const handleConfirm = () => {
    if (confirmationAction) {
      confirmationAction();
    }
    setIsConfirmationOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

  if (!classRoomId) {
    return <div>Loading...</div>; // Display loading while fetching data
  }

  // Safely access classroomName and teacherName
  const classroomName = classroomData?.classroomName || 'Class Name Not Available';
  const teacherName = classroomData?.classroomOwnerId?.[0]?.fullName || 'Teacher Name Not Available';

  const handleDeleteClassroom = async () => {
    if (!classRoomId) {
      console.error('classRoomId is null');
      return;
    }

    try {
      await axios.delete(`/api/v1/classrooms/${classRoomId}`);
      // Redirect or update state as needed after successful deletion
      console.log('Classroom deleted successfully');
    } catch (error) {
      console.error('Error deleting classroom:', error);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white-a700 bg-opacity-10 rounded-lg overflow-hidden backdrop-blur-lg border border-white border-opacity-20 shadow-lg shadow-outer-neumorphism">
      <div className={`p-16 ${isModalOpen ? 'blur-sm' : ''}`}>
        <h1 className="text-2xl font-bold mb-4 text-black">Welcome</h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 space-y-2">
              <div className="w-full px-3 py-2 text-black border border-gray-300 rounded-md bg-white bg-opacity-40 backdrop-blur-lg shadow-inner-neumorphism focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
                {classroomName}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center">
                    <div className="w-[60%] px-3 py-2 border border-gray-300 rounded-md bg-white bg-opacity-40 backdrop-blur-lg shadow-inner-neumorphism focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
                      {teacherName}
                    </div>
                    <div className="w-[30%] px-3 py-2 text-center border border-gray-300 rounded-md bg-white bg-opacity-40 backdrop-blur-lg shadow-inner-neumorphism focus:outline-none focus:ring-2 focus:ring-[#1E40AF] ml-2">
                      {classroomData?.classroomCode || 'Code Not Available'}
                    </div>
                    <div className={`w-[10%] flex justify-center items-center ${user.role === 'teacher' ? 'block' : 'hidden'}`}>
                      <div className="relative">
                        <Button
                          onClick={toggleDropdown}
                          className="px-3 py-2 border border-gray-300 rounded-md bg-white bg-opacity-40 backdrop-blur-lg shadow-inner-neumorphism focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                        >
                          <Plus className="h-5 w-5 text-black" />
                        </Button>

                        {isDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white-a700 bg-opacity-80 border border-gray-300 rounded-md shadow-lg z-10">
                            <Button
                              onClick={() => openModal('add')}
                              className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 focus:outline-none"
                            >
                              Add Participant
                            </Button>
                            <Button
                              onClick={() => openModal('remove')}
                              className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 focus:outline-none"
                            >
                              Remove Participant
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shadow-outer-neumorphism">
              <span className="text-2xl font-bold text-black">{teacherName.charAt(0)}</span>
            </div>
          </div>

          <div className="flex justify-between overflow-x-auto py-2">
            <div className="flex space-x-2">
              <Button
                onClick={fetchParticipants}
                className="px-4 py-2 bg-white bg-opacity-40 text-black border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] backdrop-blur-lg shadow-outer-neumorphism"
              >
                All Participants
              </Button>
              <Button
                onClick={fetchModules}
                className="px-4 py-2 bg-white bg-opacity-40 text-black border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] backdrop-blur-lg shadow-outer-neumorphism"
              >
                All Modules
              </Button>
              <Button
                className="px-4 py-2 bg-white bg-opacity-40 text-black border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] backdrop-blur-lg shadow-outer-neumorphism"
              >
                {user.role === 'teacher' ? 'Create Test' : 'Give Test'}
              </Button>
              <Button
                className="px-4 py-2 bg-white bg-opacity-40 text-black border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] backdrop-blur-lg shadow-outer-neumorphism"
              >
                {user.role === 'teacher' ? 'Create Meet' : 'Join Meet'}
              </Button>
              <Button
                onClick={() => setIsAddingModule(!isAddingModule)}
                className={`px-4 py-2 bg-[#1E40AF] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] backdrop-blur-lg shadow-outer-neumorphism ${user.role === 'teacher' ? 'block' : 'hidden'}`}
              >
                {isAddingModule ? 'Cancel' : 'Add Module'}
              </Button>
            </div>
            <Button
              onClick={() => openConfirmationModal('Are you sure you want to delete this classroom?', handleDeleteClassroom)}
              className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-lg shadow-outer-neumorphism ${user.role === 'teacher' ? 'block' : 'hidden'}`}
            >
              Delete Classroom
            </Button>
          </div>
          {isAddingModule && (
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter module name"
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white bg-opacity-40 backdrop-blur-lg shadow-inner-neumorphism focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
              <Button
                onClick={handleAddModule}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-lg shadow-outer-neumorphism"
              >
                Add
              </Button>
            </div>
          )}

          {view === 'modules' ? (
            <div className="space-y-2">
              {modules.map((module, index) => (
                <div key={index} className="bg-white bg-opacity-40 border border-gray-200 rounded-lg shadow-inner-neumorphism backdrop-blur-lg">
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-black">{module.moduleName}</span>
                    <Button
                      onClick={() => openConfirmationModal('Are you sure you want to delete this module?', () => handleDeleteModule(index, module._id))}
                      className={`p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 ${user.role === 'teacher' ? 'block' : 'hidden'}`}
                    >
                      <Trash2 className={`h-4 w-4 text-red-500 ${user.role === 'teacher' ? 'block' : 'hidden'}`} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {view === 'participants' && (
                <div className="space-y-2">
                  {/* Display the owner first */}
                  {participants
                    .filter(participant => participant.role === 'owner')
                    .map((participant) => (
                      <div key={participant._id} className="bg-yellow-100 border border-yellow-300 rounded-lg shadow-inner-neumorphism backdrop-blur-lg p-4">
                        <span className="text-black font-bold">{participant.fullName} (Owner)</span>
                      </div>
                    ))}

                  {/*  Display teachers  */}
                  <h3 className="text-black font-semibold">Teachers:</h3>
                  {participants
                    .filter(participant => participant.role === 'teacher' && participant.role !== 'owner')
                    .map((participant) => (
                      <div key={participant._id} className="bg-white bg-opacity-40 border border-gray-200 rounded-lg shadow-inner-neumorphism backdrop-blur-lg p-4">
                        <span className="text-black">
                          {participant.fullName}
                          {participant.role === 'owner' && ' (Owner)'}
                        </span>
                      </div>
                    ))}

                  {/* Display students */}
                  <h3 className="text-black font-semibold">Students:</h3>
                  {participants
                    .filter(participant => participant.role === 'student')
                    .map((participant) => (
                      <div key={participant._id} className="bg-white bg-opacity-40 border border-gray-200 rounded-lg shadow-inner-neumorphism backdrop-blur-lg p-4">
                        <span className="text-black">{participant.fullName}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for adding/removing participants */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div ref={modalRef} className="relative bg-white-a700 p-6 rounded-lg shadow-lg backdrop-blur-none shadow-outer-neumorphism w-96">
            <h2 className="text-xl font-bold mb-4">
              {modalType === 'add' ? 'Add Participant' : 'Remove Participant'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                modalType === 'add' ? handleAddParticipant() : handleRemoveParticipant();
              }}
            >
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md bg-white bg-opacity-40 backdrop-blur-lg shadow-inner-neumorphism focus:outline-none"
                required
              />
              <Button
                type="submit"
                className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-lg shadow-outer-neumorphism"
              >
                {modalType === 'add' ? 'Add' : 'Remove'}
              </Button>
            </form>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none backdrop-blur-lg shadow-outer-neumorphism"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationOpen && (
        <ConfirmationModal
          message={confirmationMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}