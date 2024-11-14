import { useState, useEffect } from 'react';
import { AiFillFilePdf, AiFillFileWord } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

export default function CreateNotes({user}) {
  const params = useParams();
  const moduleId = params.moduleId;
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    notesFile: null,
  });

  // const moduleId = 'module123';

  // Fetch notes for a specific module
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`/api/v1/notes/${moduleId}`);
      if (!response.data.success) {
        console.error('No notes found');
        return;
      }
      setNotes(response.data.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Handle the addition of new notes
  const handleAddNote = async (e) => {
    e.preventDefault();

  console.log(newNote)

  const noteData = new FormData();
  noteData.append("notesFile", newNote.notesFile)

    try {
      const response = await axios.post(`/api/v1/notes/${moduleId}`,noteData)
      console.log(response.data.data)
      fetchNotes();
    } catch (error) {
      console.error("Error while uploading note:", error.response?.data || error.message);
    } finally {
      setIsModalOpen(false);
    }
};

  // Handle file upload
  const handleFileUpload = (e) => {
    // const notesFile = e.target.files?.[0];
    // if (notesFile) {
    //   setNewNote({ ...newNote, notesFile });
    // }
    setNewNote({...newNote, notesFile:e.target.files[0]})
  };

  // // Handle deletion of a note
  // const handleDeleteNote = (id) => {
  //   // Ensure this logs when the delete function is triggered
  //   console.log("Deleting note with ID:", id);

  //   const isConfirmed = window.confirm("Are you sure you want to delete this note?");
  //   if (!isConfirmed) {
  //       return; 
  //   }
  // };

  // Handle the deletion of a note
  const handleDeleteNote = async (noteId) => {
    console.log(noteId)
    try {
        // Send delete request to the backend
        const response = await axios.delete(`/api/v1/notes/${moduleId}/${noteId}`);
        console.log(response)
        // Update the notes state by filtering out the deleted note
        // const updatedNotes = notes.filter(note => note.id !== id);
        // setNotes(updatedNotes);
        fetchNotes();
        console.log("Note deleted:", noteId);
    } catch (error) {
        console.log("Error while deleting the note:", error);
        alert("Failed to delete the note. Please try again.");
    }
  };

  // Initial fetch of notes when component mounts
  useEffect(() => {
    
    fetchNotes();
  }, []);

  const viewPdf = (fileUrl) => {
    console.log("Viewing PDF file:", fileUrl);
    const newWindow = window.open(fileUrl, '_blank');
    if (newWindow) newWindow.focus();
  };

  return (
    <div className="p-12 w-full max-w-5xl mx-auto bg-white rounded-lg shadow">
      <div className="p-4 bg-gray-50">
        <div className="flex justify-end">
          <button onClick={() => setIsModalOpen(true)} className = {`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${user.role === 'teacher' ? 'block' : 'hidden'}`}>
            ADD NOTES
          </button>
        </div>

        {/* Notes List with Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="border rounded-lg p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
            >
              {/* Thumbnail Icon
              <div className="mr-4 text-gray-500">
                {note.notesFile && note.notesFile.type === 'application/pdf' ? (
                  <AiFillFilePdf size={40} />
                ) : note.notesFile && note.notesFile.type.includes('word') ? (
                  <AiFillFileWord size={40} />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-md">
                    🗂️
                  </div>
                )}
              </div> */}

              {/* Note Details */}
              <div className="flex-1" onClick={() => viewPdf(note.notesFile)}>
                <p>{note.notesFile}</p>
                {note.notesFile && (
                  <p className="text-sm text-blue-600 underline cursor-pointer">
                    View this Document
                  </p>
                )}
              </div>
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  // e.stopPropagation();
                  handleDeleteNote(note._id);
                }}
                className= {`text-red-600 hover:text-red-800 ml-2 ${user.role === 'teacher' ? 'block' : 'hidden'}`}>
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>

        {/* Note Adding Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg border border-gray-200" style={{ backgroundColor: '#f9fafb', opacity: 0.95 }}>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Note</h2>
              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload File</label>
                  <input
                    type="file"
                    name="notesFile"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  {newNote.file && (
                    <p className="text-green-600 mt-1">Uploaded: {newNote.file.name}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
