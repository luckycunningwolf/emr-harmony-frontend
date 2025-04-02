
import React, { useState } from 'react';
import BasicSidebar from '../components/BasicSidebar';
import { FileText, Plus, Printer } from 'lucide-react';
import { toast } from 'sonner';

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

  const createNewNote = () => {
    const newNote = {
      patient: "New Patient",
      title: "New Note",
      date: "Today",
      content: ""
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(0);
    toast.success("New note created!");
  };

  const printNote = () => {
    const noteContent = notes[selectedNote];
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Medical Note - ${noteContent.patient}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { font-size: 18px; }
            .meta { color: #666; margin-bottom: 20px; }
            .content { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>${noteContent.patient} - ${noteContent.title}</h1>
          <div class="meta">${noteContent.date}</div>
          <div class="content">${noteContent.content}</div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
    
    toast.success("Printing note...");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <BasicSidebar />

      {/* Main Content - Adjusted with more appropriate margins */}
      <main className="flex-1 px-4 py-8 md:ml-64 md:px-8 max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Medical Notes</h2>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
            onClick={createNewNote}
          >
            <Plus className="mr-1 h-4 w-4" />
            New Note
          </button>
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
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">{notes[selectedNote].patient} - {notes[selectedNote].title}</h3>
                <p className="text-sm text-gray-500">{notes[selectedNote].date}</p>
              </div>
              <button 
                className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded border border-gray-300 hover:bg-gray-50"
                onClick={printNote}
              >
                <Printer className="mr-1 h-4 w-4" />
                Print
              </button>
            </div>
            
            <textarea 
              className="w-full h-64 p-3 border border-gray-300 rounded"
              value={notes[selectedNote].content}
              onChange={handleContentChange}
              placeholder="Enter note content..."
            ></textarea>
            
            <div className="mt-4 flex justify-end">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => toast.success("Note saved!")}
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
