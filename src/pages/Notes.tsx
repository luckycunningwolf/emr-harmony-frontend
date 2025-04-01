
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Medical Notes</h2>
          <Button 
            onClick={() => setIsNewNoteOpen(true)}
          >
            New Note
          </Button>
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
