import { useState, useEffect } from 'react';
import { Trash2, Edit } from 'lucide-react';
import ConfirmationModal from '../ConfirmationModal';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


  const AllAssignment=({ user })=> {
  const [homeworks, setHomeworks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [newHomework, setNewHomework] = useState({
    title: '',
    dueDate: '',
    description: '',
    homeworkFile: null,
  });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationAction, setConfirmationAction] = useState(null);
  const navigate = useNavigate();

  const params = useParams();
  const moduleId = params.moduleId;

  // Helper function to format date to "yyyy-MM-dd"
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Fetch homework list
  const fetchHomeworks = async () => {
    try {
      const response = await axios.get(`/api/v1/assignment/${moduleId}`);
      setHomeworks(response.data.data);
    } catch (error) {
      console.error('Error fetching homeworks:', error);
      setHomeworks([]);
    }
  };

  useEffect(() => {
    fetchHomeworks();
  }, []);

  // Handle Add Homework
  const handleAddHomework = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newHomework.title);
    formData.append('dueDate', newHomework.dueDate);
    formData.append('description', newHomework.description);
    formData.append('homeworkFile', newHomework.homeworkFile);

    try {
      await axios.post(`/api/v1/assignment/${moduleId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchHomeworks();
      setNewHomework({ title: '', dueDate: '', description: '', homeworkFile: null });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding homework:', error);
    }
  };

  // Handle Update Homework
  const handleUpdateHomework = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', selectedHomework.title);
    formData.append('dueDate', selectedHomework.dueDate);
    formData.append('description', selectedHomework.description);
    formData.append('homeworkFile', selectedHomework.homeworkFile);

    try {
      await axios.patch(`/api/v1/assignment/${moduleId}/${selectedHomework._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchHomeworks();
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Error updating homework:', error);
    }
  };

  const handleFileUpload = (e, homework) => {
    const file = e.target.files?.[0];
    if (file) {
      if (homework) {
        setSelectedHomework({ ...homework, homeworkFile: file });
      } else {
        setNewHomework({ ...newHomework, homeworkFile: file });
      }
    }
  };

  // Open Update Modal with formatted dueDate
  const openUpdateModal = (homework) => {
    setSelectedHomework({
      ...homework,
      dueDate: formatDate(homework.dueDate), // Format the dueDate to "yyyy-MM-dd"
    });
    setIsUpdateModalOpen(true);
  };

  // Open Confirmation Modal
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

  const handleDeleteHomework = async (homeworkId) => {
    try {
      await axios.delete(`/api/v1/assignment/${moduleId}/${homeworkId}`);
      setHomeworks(homeworks.filter(hw => hw.id !== homeworkId));
    } catch (error) {
      console.error('Error deleting homework:', error);
    }
  };

  const handleCardClick = (homeworkId) => {
    console.log("Homework clicked:", homeworkId);
    if (homeworkId) {
      navigate(`/module/${moduleId}/homework/${homeworkId}`);
    } else {
      console.error("homeworkId is undefined");
    }
    console.log("end");
};
  

  return (
    <div className="p-12 w-full max-w-5xl mx-auto bg-white rounded-lg shadow">
      <div className="p-4 bg-gray-50">
        <div className="flex justify-end">
          <button onClick={() => setIsModalOpen(true)} className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${user.role === 'teacher' ? 'block' : 'hidden'}`} >
            ADD HOMEWORK
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {homeworks.map((homework) => (
            <div  key={homework.id} className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow relative">
              <div onClick={() => handleCardClick(homework._id)}>
                <h3 className="font-medium">Title: {homework.title}</h3>
                <p className="text-sm text-gray-600">Due Date: {new Date(homework.dueDate).toLocaleDateString()}</p>
                {homework.homeworkFile && (
                  <p className="text-sm text-green-600">Uploaded: {homework.homeworkFile}</p>
                )}
              </div>
              <button
                onClick={() => openUpdateModal(homework)}
                className={`absolute top-2 right-10 text-blue-500 hover:text-blue-700 ${user.role === 'teacher' ? 'block' : 'hidden'}`}
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() => openConfirmationModal('Are you sure you want to delete this homework?', () => handleDeleteHomework(homework._id))}
                className={`absolute top-2 right-2 text-red-500 hover:text-red-700 ${user.role === 'teacher' ? 'block' : 'hidden'}`}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Homework Modal */}
                    {isModalOpen && (
          <div className="fixed inset-0 bg-white-a700 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white-a700 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add New Homework</h2>
              <form onSubmit={handleAddHomework} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newHomework.title}
                    onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newHomework.description}
                    onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    value={newHomework.dueDate}
                    onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Homework File</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add Homework
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      
                  

        {/* Update Homework Modal */}
        {isUpdateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white-a700 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Update Homework</h2>
              <form onSubmit={handleUpdateHomework} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={selectedHomework.title}
                    onChange={(e) => setSelectedHomework({ ...selectedHomework, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={selectedHomework.description}
                    onChange={(e) => setSelectedHomework({ ...selectedHomework, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    value={selectedHomework.dueDate}
                    onChange={(e) => setSelectedHomework({ ...selectedHomework, dueDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Homework File</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, selectedHomework)}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {isConfirmationOpen && (
        <ConfirmationModal
          message={confirmationMessage}
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      )}
    </div>
  );
}

export default AllAssignment;



// import { useState, useEffect } from 'react';
// import { Trash2 } from 'lucide-react';
// import ConfirmationModal from '../ConfirmationModal';
// import axios from 'axios';

// export default function Component() {
//   const [homeworks, setHomeworks] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedHomework, setSelectedHomework] = useState(null);
//   const [newHomework, setNewHomework] = useState({
//     title: '',
//     dueDate: '',
//     description: '',
//     homeworkFile: null,
//   });
//   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
//   const [confirmationMessage, setConfirmationMessage] = useState('');
//   const [confirmationAction, setConfirmationAction] = useState(null);

//   const moduleId = '66f950202e519f72fc033ae0';

//   const handleAddHomework = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', newHomework.title);
//     formData.append('dueDate', newHomework.dueDate);
//     formData.append('description', newHomework.description);
//     formData.append('homeworkFile', newHomework.homeworkFile);

//     try {
//       await axios.post(`/api/v1/assignment/${moduleId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       fetchHomeworks();
//       setNewHomework({ title: '', dueDate: '', description: '', homeworkFile: null });
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Error adding homework:', error);
//       if (error.response) {
//         console.error('Server response:', error.response.data);
//       }
//     }
//   };

//   const fetchHomeworks = async () => {
//     try {
//       const response = await axios.get(`/api/v1/assignment/${moduleId}`);
//       setHomeworks(response.data.data);
//       console.log(response.data.data);
//     } catch (error) {
//       console.error('Error fetching homeworks:', error);
//       setHomeworks([]);
//     }
//   };

//   useEffect(() => {
//     fetchHomeworks();
//   }, []);

//   const handleFileUpload = (e, role, homeworkId = null) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (role === 'teacher') {
//         setNewHomework({ ...newHomework, homeworkFile: file });
//       } else if (role === 'student' && homeworkId) {
//         setHomeworks(homeworks.map(hw =>
//           hw.id === homeworkId ? { ...hw, studentFile: file } : hw
//         ));
//       }
//     }
//   };

//   const handleDeleteHomework = async (homeworkId) => {
//     try {
//       const response = await axios.delete(`/api/v1/assignment/${moduleId}/${homeworkId}`);
//       if (response.status === 200) {
//         setHomeworks(homeworks.filter(hw => hw.id !== homeworkId));
//       } else {
//         console.error('Failed to delete homework:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting homework:', error);
//     }
//   };

  

//   const openConfirmationModal = (message, action) => {
//     setConfirmationMessage(message);
//     setConfirmationAction(() => action);
//     setIsConfirmationOpen(true);
//   };

//   const handleConfirm = () => {
//     if (confirmationAction) {
//       confirmationAction();
//     }
//     setIsConfirmationOpen(false);
//   };

//   const handleCancel = () => {
//     setIsConfirmationOpen(false);
//   };

//   return (
//     <div className="p-12 w-full max-w-5xl mx-auto bg-white rounded-lg shadow">
//       <div className="p-4 bg-gray-50">
//         <div className="flex justify-end">
//           <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//             ADD HOMEWORK
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//           {homeworks.map((homework) => (
//             <div key={homework.id} className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow relative">
//               <div onClick={() => setSelectedHomework(homework)}>
//                 <h3 className="font-medium">Title: {homework.title}</h3>
//                 <p className="text-sm text-gray-600">Due Date: {new Date(homework.dueDate).toLocaleDateString()}</p>
//                 {homework.homeworkFile && (
//                   <p className="text-sm text-green-600">Uploaded: {homework.homeworkFile}</p>
//                 )}
//               </div>
//               <button
//                 onClick={() => openConfirmationModal('Are you sure you want to delete this homework?', () => handleDeleteHomework(homework._id))}
//                 className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//               >
//                 <Trash2 className="h-5 w-5" />
//               </button>
//             </div>
//           ))}
//         </div>

//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white-a700 p-6 rounded-lg w-full max-w-md">
//               <h2 className="text-xl font-semibold mb-4">Add New Homework</h2>
//               <form onSubmit={handleAddHomework} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Title</label>
//                   <input
//                     type="text"
//                     value={newHomework.title}
//                     onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     value={newHomework.description}
//                     onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Due Date</label>
//                   <input
//                     type="date"
//                     value={newHomework.dueDate}
//                     onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Upload Homework File</label>
//                   <input
//                     type="file"
//                     accept=".pdf"
//                     onChange={(e) => handleFileUpload(e, 'teacher')}
//                     className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Add Homework
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       {isConfirmationOpen && (
//         <ConfirmationModal
//           message={confirmationMessage}
//           onConfirm={handleConfirm}
//           onCancel={handleCancel}
//         />
//       )}
//     </div>
//   );
// }


