import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Printer } from 'lucide-react';

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState(0);
  const { toast } = useToast();
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    patient: "",
    title: "",
    time: "",
    complaint: "",
    assessment: ""
  });
  
  // Create a reference to the printable content
  const printableRef = useRef<HTMLDivElement>(null);
  
  const [notes, setNotes] = useState([
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
  ]);

  const handleNewNoteSubmit = () => {
    // Validate the form
    if (!newNote.patient || !newNote.title) {
      toast({
        title: "Error",
        description: "Patient name and title are required",
        variant: "destructive",
      });
      return;
    }

    // Create new note with current timestamp
    const currentTime = new Date();
    const formattedTime = `Today • ${currentTime.getHours()}:${String(currentTime.getMinutes()).padStart(2, '0')} ${currentTime.getHours() >= 12 ? 'PM' : 'AM'}`;
    
    const newNoteWithId = {
      ...newNote,
      id: notes.length + 1,
      time: newNote.time || formattedTime,
    };

    // Add to notes array
    const updatedNotes = [...notes, newNoteWithId];
    setNotes(updatedNotes);
    
    // Select the new note
    setSelectedNote(updatedNotes.length - 1);
    
    // Reset form and close dialog
    setNewNote({
      patient: "",
      title: "",
      time: "",
      complaint: "",
      assessment: ""
    });
    setIsNewNoteOpen(false);
    
    toast({
      title: "Success",
      description: "New note added successfully",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNoteContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
    const { value } = e.target;
    const updatedNotes = [...notes];
    updatedNotes[selectedNote] = {
      ...updatedNotes[selectedNote],
      [field]: value
    };
    setNotes(updatedNotes);
  };
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      toast({
        title: "Error",
        description: "Unable to open print window. Please check your popup settings.",
        variant: "destructive",
      });
      return;
    }
    
    const selectedNoteData = notes[selectedNote];
    const doctorInfo = JSON.parse(localStorage.getItem('doctor') || '{"name": "Dr. Arjun", "specialty": "Physician"}');
    
    // Create the print content with better styling
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Medical Note - ${selectedNoteData.patient}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 1px solid #ddd;
            }
            .doctor-info {
              font-size: 14px;
              margin-bottom: 5px;
            }
            .patient-info {
              margin-bottom: 20px;
            }
            .note-section {
              margin-bottom: 20px;
            }
            .note-section h3 {
              font-size: 16px;
              margin-bottom: 5px;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            .note-content {
              white-space: pre-wrap;
              padding: 10px;
              background-color: #f9f9f9;
              border-radius: 4px;
              min-height: 50px;
            }
            .timestamp {
              font-size: 12px;
              color: #777;
              margin-top: 30px;
              text-align: right;
            }
            .signature {
              margin-top: 60px;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
            @media print {
              body {
                padding: 0;
              }
              button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>MediTrack EMR</h1>
            <div class="doctor-info">
              ${doctorInfo.name} - ${doctorInfo.specialty}
            </div>
          </div>
          
          <div class="patient-info">
            <h2>${selectedNoteData.patient}</h2>
            <p><strong>Visit Type:</strong> ${selectedNoteData.title}</p>
            <p><strong>Date/Time:</strong> ${selectedNoteData.time}</p>
          </div>
          
          <div class="note-section">
            <h3>Chief Complaint</h3>
            <div class="note-content">${selectedNoteData.complaint || "No chief complaint recorded."}</div>
          </div>
          
          <div class="note-section">
            <h3>Assessment & Plan</h3>
            <div class="note-content">${selectedNoteData.assessment || "No assessment recorded."}</div>
          </div>
          
          <div class="signature">
            <p>${doctorInfo.name}</p>
            <p>${doctorInfo.specialty}</p>
          </div>
          
          <div class="timestamp">
            Generated on: ${new Date().toLocaleString()}
          </div>
          
          <button onclick="window.print()" style="margin-top: 20px; padding: 8px 16px; background-color: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Print Document
          </button>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Give a brief moment for resources to load then prompt the print dialog
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
    
    toast({
      title: "Success",
      description: "Print window opened. Please use your browser's print dialog to proceed.",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Medical Notes</h2>
          <div className="flex gap-2">
            <Button 
              onClick={handlePrint}
              variant="outline"
              disabled={!(notes.length > 0)}
            >
              <Printer className="mr-1 h-4 w-4" />
              Print Note
            </Button>
            <Button 
              onClick={() => setIsNewNoteOpen(true)}
            >
              New Note
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Notes sidebar */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4">
              <Input 
                type="text" 
                placeholder="Search notes..." 
                className="w-full"
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    toast({
                      title: "Search",
                      description: `Searching notes for: ${e.currentTarget.value}`,
                    });
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
          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2" ref={printableRef}>
            
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
                <Textarea 
                  placeholder="Enter chief complaint..." 
                  className="w-full min-h-24"
                  value={notes[selectedNote].complaint}
                  onChange={(e) => handleNoteContentChange(e, 'complaint')}
                />
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Assessment & Plan</h4>
                <Textarea 
                  placeholder="Enter assessment and plan..." 
                  className="w-full min-h-36"
                  value={notes[selectedNote].assessment}
                  onChange={(e) => handleNoteContentChange(e, 'assessment')}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* New Note Dialog */}
      <Dialog open={isNewNoteOpen} onOpenChange={setIsNewNoteOpen}>
        
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
            <DialogDescription>
              Create a new medical note for a patient.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient" className="text-right">Patient Name</Label>
              <Input
                id="patient"
                name="patient"
                value={newNote.patient}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Enter patient name"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                name="title" 
                value={newNote.title}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Appointment type (e.g., Follow-up)"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">Time (Optional)</Label>
              <Input
                id="time"
                name="time"
                value={newNote.time}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Leave blank for current time"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewNoteOpen(false)}>Cancel</Button>
            <Button onClick={handleNewNoteSubmit}>Create Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notes;
