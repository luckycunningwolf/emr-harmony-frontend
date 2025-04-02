
import React, { useState } from 'react';
import BasicSidebar from '../components/BasicSidebar';

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState(0);
  const [notes, setNotes] = useState([
    {
      patient: "Rajesh Kumar",
      title: "Annual Checkup",
      date: "Today",
      content: "Patient presents for annual physical exam. Reports occasional headaches."
    },
    {
      patient: "Priya Venkatesh",
      title: "Follow-up",
      date: "Yesterday",
      content: "Follow-up for medication adjustment. Patient reports improvement in symptoms."
    },
    {
      patient: "Karthik Raman",
      title: "Prescription",
      date: "2 days ago",
      content: "Patient requested refill of hypertension medication."
    }
  ]);

  const handleContentChange = (e) => {
    const updatedNotes = [...notes];
    updatedNotes[selectedNote].content = e.target.value;
    setNotes(updatedNotes);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <BasicSidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="mb-6">
          <h2 className="text-2xl font-bold">Medical Notes</h2>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Notes sidebar */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <input 
              type="text" 
              placeholder="Search notes..." 
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            
            <div className="space-y-2">
              {notes.map((note, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded cursor-pointer ${selectedNote === index ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedNote(index)}
                >
                  <h4 className="font-medium">{note.patient}</h4>
                  <p className="text-sm text-gray-500">{note.title} • {note.date}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Note editor */}
          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
            <h3 className="text-lg font-bold mb-4">{notes[selectedNote].patient} - {notes[selectedNote].title}</h3>
            <p className="text-sm text-gray-500 mb-4">{notes[selectedNote].date}</p>
            
            <textarea 
              className="w-full h-64 p-3 border border-gray-300 rounded"
              value={notes[selectedNote].content}
              onChange={handleContentChange}
            ></textarea>
            
            <div className="mt-4 flex justify-end">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => alert("Note saved!")}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notes;
