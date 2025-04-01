
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState(0);
  
  const notes = [
    {
      id: 1,
      patient: "Rajesh Kumar",
      title: "Annual Checkup",
      time: "Today • 9:00 AM",
      complaint: "Patient presents for annual physical exam. Reports occasional headaches.",
      assessment: "1. Hypertension - controlled. Continue lisinopril.\n2. Type 2 Diabetes - controlled. Continue metformin.\n3. Headaches - likely tension-type. Recommended stress management.\n\nFollow up in 6 months or as needed."
    },
    {
      id: 2,
      patient: "Priya Venkatesh",
      title: "Follow-up",
      time: "Today • 10:30 AM",
      complaint: "",
      assessment: ""
    },
    {
      id: 3,
      patient: "Karthik Raman",
      title: "Prescription",
      time: "Today • 2:15 PM",
      complaint: "",
      assessment: ""
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Medical Notes</h2>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => alert("New Note clicked")}
          >
            New Note
          </button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Notes sidebar */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Search notes..." 
                className="w-full p-2 border border-gray-300 rounded"
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    alert(`Searching notes for: ${e.currentTarget.value}`);
                  }
                }}
              />
            </div>
            
            <div className="space-y-2">
              {notes.map((note, index) => (
                <div 
                  key={note.id}
                  className={`p-3 rounded cursor-pointer ${selectedNote === index ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedNote(index)}
                >
                  <h4 className="font-medium">{note.patient} - {note.title}</h4>
                  <p className="text-sm text-gray-500">{note.time}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Note editor */}
          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-bold">{notes[selectedNote].patient}</h3>
              <p className="text-sm text-gray-600">
                45y • Male • {notes[selectedNote].title}
              </p>
              <p className="text-sm text-gray-600">{notes[selectedNote].time}</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Chief Complaint</h4>
                <textarea 
                  placeholder="Enter chief complaint..." 
                  className="w-full p-3 border border-gray-300 rounded min-h-24"
                  value={notes[selectedNote].complaint}
                  readOnly
                />
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Assessment & Plan</h4>
                <textarea 
                  placeholder="Enter assessment and plan..." 
                  className="w-full p-3 border border-gray-300 rounded min-h-36"
                  value={notes[selectedNote].assessment}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notes;
