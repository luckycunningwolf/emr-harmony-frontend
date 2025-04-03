
import React, { useState } from 'react';
import BasicSidebar from '../components/BasicSidebar';
import { toast } from 'sonner';

const Settings = () => {
  const [doctorName, setDoctorName] = useState('Dr. Smith');
  const [specialty, setSpecialty] = useState('General Practitioner');

  const handleSave = () => {
    // Save to localStorage to be accessible by the sidebar
    const doctorInfo = { name: doctorName, specialty };
    localStorage.setItem('doctor', JSON.stringify(doctorInfo));
    
    toast.success(`Settings saved successfully!`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <BasicSidebar />

      {/* Main Content - Fixed positioning */}
      <main className="flex-1 p-6 md:p-8 w-full max-w-6xl mx-auto">
        <header className="mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
        </header>
        
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-xl">
          <h3 className="text-lg font-bold mb-4">Doctor Profile</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
            </div>
            
            <div className="pt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
