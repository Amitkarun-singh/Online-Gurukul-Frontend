import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import ConfirmationModal from '../ConfirmationModal';
import {Tooltip} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useParams } from 'react-router-dom';

const SpecificAssignment=({user})=> {
  // const userRole = 'student'; 
  // const homeworkId = '67343f461e0eb2e6fb436672';
  // const moduleId = '66f950202e519f72fc033ae0';
  // const currentUserId = '66f9316fdc7df32f1c4bf672';

  const params = useParams();
  const homeworkId = params.homeworkId;
  const moduleId = params.moduleId;
  const currentUserId = user._id;
  const userRole = user.role;

  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissions, setSubmissions] = useState();
  const [studentSubmission, setStudentSubmission] = useState(null);
  const [homework, setHomework] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const getallHomeworkSubmissionApi = async () => {
    try {
      console.log("Fetching submissions for homework ID:", homeworkId);
      const response = await axios.get(`/api/v1/assignment/submissions/${homeworkId}`);
      console.log("Homework data fetched:", response.data.data);

      setHomework(response.data.data);
      setSubmissions(response.data.data.submissions);

      const studentSub = response.data.data.submissions.find(sub => sub.studentId._id === currentUserId);
      if (studentSub) {
        setStudentSubmission(studentSub);
      }
    } catch (error) {
      console.error("Error fetching homework submissions:", error);
    }
  };

  const handleFileChange = (event) => {
    console.log("File selected:", event.target.files[0]);
    setSubmissionFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submissionFile) {
      const formData = new FormData();
      formData.append('submissionFile', submissionFile);

      try {
        console.log("Submitting homework for module ID:", moduleId, "and homework ID:", homeworkId);
        const response = await axios.post(`/api/v1/assignment/submit/${moduleId}/${homeworkId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log("Homework submitted successfully:", response.data.data);
        setStudentSubmission(response.data.data.submissionFile);
        setSubmissionFile(null);
        alert('Homework submitted successfully!');
      } catch (error) {
        console.error("Error submitting homework:", error.response ? error.response.data : error.message);
        alert('Failed to submit homework. See console for details.');
      }
    }
  };

  const handleDeleteSubmission = async () => {
    if (!selectedSubmission) return;

    try {
      console.log("Deleting submission ID:", selectedSubmission._id, "for homework ID:", homeworkId);
      await axios.delete(`/api/v1/assignment/submissions/${homeworkId}/${selectedSubmission._id}`);
      setStudentSubmission(null);
      alert('Submission deleted successfully!');
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission. See console for details.');
    } finally {
      setIsConfirmationOpen(false);
    }
  };

  const openConfirmationModal = (submission) => {
    console.log("Opening confirmation modal for submission:", submission);
    setSelectedSubmission(submission);
    setIsConfirmationOpen(true);
  };

  const viewPdf = (fileUrl) => {
    console.log("Viewing PDF file:", fileUrl);
    const newWindow = window.open(fileUrl, '_blank');
    if (newWindow) newWindow.focus();
  };

  useEffect(() => {
    console.log("Component mounted - loading homework submissions.");
    getallHomeworkSubmissionApi();
    console.log("User Role:", userRole);
    console.log("Current User ID:", currentUserId);
    console.log("Module ID:", moduleId);
  }, []);

  return (
    homework && (
      <div className="min-h-screen mt-16 p-6">
        <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
          <div className="grid gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">Title: {homework.title}</h2>
                <p className="text-lg font-bold mb-4">Description: {homework.description}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Due Date: {new Date(homework.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid gap-4">
              {homework.homeworkFile && (
                <div>
                  <h3 className="text-lg font-semibold underline mb-2">View Resource File:</h3>
                  <button onClick={() => viewPdf(homework.homeworkFile)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md cursor-pointer">
                    View Resource
                  </button>
                </div>
              )}

              {userRole === 'teacher' ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Submissions:</h3>
                  <div className="grid gap-2">
                    {submissions.map((submission, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <span className="font-medium">{submission.studentId.fullName}</span>
                        <span className="text-gray-600">{new Date(submission.submittedAt).toLocaleString()}</span>
                        <button onClick={() => viewPdf(submission.submissionFile)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md cursor-pointer">
                          View File
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-semibold underline mb-2">View Your Submitted File:</h3>
                    {studentSubmission ? (
                      <div className="flex items-center">
                        <button onClick={() => viewPdf(studentSubmission.submissionFile)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md cursor-pointer mr-2">
                          View Submitted File
                        </button>
                        <button
                          onClick={() => openConfirmationModal(studentSubmission)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center gap-2"
                          data-tooltip-id="delete-tooltip" // Link button with tooltip ID
                        >
                          <Trash2 size={18} />
                        </button>

                        {/* Tooltip configured for hover */}
                        <Tooltip
                          id="delete-tooltip"
                          content="Delete Submission"
                          place="bottom" // Tooltip placement
                          effect="solid" // Solid background
                          className="bg-black text-white p-2 rounded-md text-sm shadow-lg" // Styling for the tooltip
                        />
                      </div>
                    ) : (
                      <p className="text-gray-500">No submission yet.</p>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col items-end gap-2">
                    <div className="w-48 p-4 border border-gray-200 rounded-lg">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="text-sm w-full mb-2"
                        disabled={!!studentSubmission}
                      />
                      <button
                        type="submit"
                        className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md ${submissionFile && !studentSubmission ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={!submissionFile || !!studentSubmission}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {isConfirmationOpen && (
          <ConfirmationModal
            message="Are you sure you want to delete your submission?"
            onConfirm={handleDeleteSubmission}
            onCancel={() => setIsConfirmationOpen(false)}
          />
        )}
      </div>
    )
  );
}

export default SpecificAssignment;



