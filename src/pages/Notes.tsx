
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
      content: "Patient presents for annual physical exam. Reports occasional headaches.",
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" },
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" }
      ]
    },
    {
      patient: "Priya Venkatesh",
      title: "Follow-up",
      date: "Yesterday",
      content: "Follow-up for medication adjustment. Patient reports improvement in symptoms.",
      medications: [
        { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime", duration: "90 days" }
      ]
    },
    {
      patient: "Karthik Raman",
      title: "Prescription",
      date: "2 days ago",
      content: "Patient requested refill of hypertension medication.",
      medications: [
        { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "90 days" }
      ]
    }
  ]);

  const handleContentChange = (e) => {
    const updatedNotes = [...notes];
    updatedNotes[selectedNote].content = e.target.value;
    setNotes(updatedNotes);
  };

  const addMedication = () => {
    const updatedNotes = [...notes];
    updatedNotes[selectedNote].medications = [
      ...(updatedNotes[selectedNote].medications || []),
      { name: "", dosage: "", frequency: "", duration: "30 days" }
    ];
    setNotes(updatedNotes);
  };

  const removeMedication = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[selectedNote].medications.splice(index, 1);
    setNotes(updatedNotes);
  };

  const updateMedication = (index, field, value) => {
    const updatedNotes = [...notes];
    updatedNotes[selectedNote].medications[index][field] = value;
    setNotes(updatedNotes);
  };

  const createNewNote = () => {
    const newNote = {
      patient: "New Patient",
      title: "New Note",
      date: "Today",
      content: "",
      medications: []
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(0);
    toast.success("New note created!");
  };

  const printPrescription = () => {
    const noteContent = notes[selectedNote];
    const printWindow = window.open('', '_blank');
    const today = new Date().toLocaleDateString();
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription - ${noteContent.patient}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .header-left h1 { font-size: 24px; margin: 0; }
            .header-left p { margin: 5px 0; color: #555; }
            .header-right { text-align: right; }
            .prescription-title { font-size: 20px; margin: 20px 0 10px; text-align: center; text-transform: uppercase; }
            .patient-info { margin-bottom: 20px; padding: 10px; background-color: #f8f8f8; border-radius: 5px; }
            .medications { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .medications th, .medications td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .medications th { background-color: #f2f2f2; }
            .notes { margin-top: 20px; white-space: pre-wrap; }
            .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 10px; display: flex; justify-content: space-between; }
            .signature { margin-top: 30px; }
            .doctor-info { margin-top: 60px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="header-left">
              <h1>MediTrack EMR</h1>
              <p>123 Medical Plaza, Suite 101</p>
              <p>Mumbai, MH 400001</p>
              <p>Phone: (022) 1234-5678</p>
            </div>
            <div class="header-right">
              <p><strong>Date:</strong> ${today}</p>
              <p><strong>Ref No:</strong> RX-${Math.floor(Math.random() * 10000)}</p>
            </div>
          </div>

          <h2 class="prescription-title">Prescription</h2>
          
          <div class="patient-info">
            <p><strong>Patient:</strong> ${noteContent.patient}</p>
            <p><strong>Visit:</strong> ${noteContent.title}</p>
            <p><strong>Date:</strong> ${noteContent.date}</p>
          </div>

          <h3>Medications:</h3>
          <table class="medications">
            <thead>
              <tr>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              ${noteContent.medications.map(med => `
                <tr>
                  <td>${med.name}</td>
                  <td>${med.dosage}</td>
                  <td>${med.frequency}</td>
                  <td>${med.duration}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="notes">
            <h3>Notes:</h3>
            <p>${noteContent.content}</p>
          </div>

          <div class="signature">
            <p>Doctor's Signature:</p>
            <div style="height: 40px;"></div>
          </div>

          <div class="doctor-info">
            <p>${localStorage.getItem('doctor') ? JSON.parse(localStorage.getItem('doctor')).name : 'Dr. Smith'}</p>
            <p>${localStorage.getItem('doctor') ? JSON.parse(localStorage.getItem('doctor')).specialty : 'General Practitioner'}</p>
            <p>License #: MBBS12345</p>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
    
    toast.success("Printing prescription...");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <BasicSidebar />

      {/* Main Content - Fixed positioning */}
      <main className="flex-1 p-6 md:p-8 w-full max-w-6xl mx-auto">
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
                onClick={printPrescription}
              >
                <Printer className="mr-1 h-4 w-4" />
                Print Prescription
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clinical Notes
                </label>
                <textarea 
                  className="w-full h-32 p-3 border border-gray-300 rounded"
                  value={notes[selectedNote].content}
                  onChange={handleContentChange}
                  placeholder="Enter clinical notes..."
                ></textarea>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Medications
                  </label>
                  <button 
                    className="text-blue-600 text-sm hover:text-blue-800"
                    onClick={addMedication}
                  >
                    + Add Medication
                  </button>
                </div>
                
                {notes[selectedNote].medications && notes[selectedNote].medications.length > 0 ? (
                  <div className="space-y-3">
                    {notes[selectedNote].medications.map((med, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <label className="text-xs text-gray-500">Medication</label>
                          <input 
                            type="text" 
                            className="w-full p-1 border border-gray-300 rounded"
                            value={med.name}
                            onChange={(e) => updateMedication(index, 'name', e.target.value)}
                            placeholder="Medication name"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Dosage</label>
                          <input 
                            type="text" 
                            className="w-full p-1 border border-gray-300 rounded"
                            value={med.dosage}
                            onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                            placeholder="e.g. 10mg"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Frequency</label>
                          <input 
                            type="text" 
                            className="w-full p-1 border border-gray-300 rounded"
                            value={med.frequency}
                            onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                            placeholder="e.g. Twice daily"
                          />
                        </div>
                        <div className="flex items-end">
                          <select 
                            className="w-full p-1 border border-gray-300 rounded mr-2"
                            value={med.duration}
                            onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                          >
                            <option value="7 days">7 days</option>
                            <option value="14 days">14 days</option>
                            <option value="30 days">30 days</option>
                            <option value="90 days">90 days</option>
                          </select>
                          <button 
                            className="text-red-500 hover:text-red-700 p-1"
                            onClick={() => removeMedication(index)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border border-dashed border-gray-300 rounded">
                    <p className="text-gray-500">No medications added yet</p>
                  </div>
                )}
              </div>
            </div>
            
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
