
import React from 'react';
import BasicSidebar from '../components/BasicSidebar';

const Appointments = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <BasicSidebar />

      {/* Main Content - Fixed positioning */}
      <main className="flex-1 p-6 md:p-8 w-full max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Appointments</h2>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => alert("New Appointment clicked")}
          >
            New Appointment
          </button>
        </header>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">Today's Appointments</h3>
          
          <div className="space-y-4">
            <div className="flex">
              <div className="w-24 font-medium">9:00 AM</div>
              <div className="flex-1 bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                <h4 className="font-medium">Rajesh Kumar</h4>
                <p className="text-sm text-gray-600">Annual Checkup • 30 min</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-24 font-medium">10:30 AM</div>
              <div className="flex-1 bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                <h4 className="font-medium">Priya Venkatesh</h4>
                <p className="text-sm text-gray-600">Follow-up • 15 min</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-24 font-medium">11:30 AM</div>
              <div className="flex-1 bg-gray-50 p-4 rounded">
                <p>Available</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-24 font-medium">1:00 PM</div>
              <div className="flex-1 bg-gray-50 p-4 rounded">
                <p>Lunch Break</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-24 font-medium">2:15 PM</div>
              <div className="flex-1 bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                <h4 className="font-medium">Karthik Raman</h4>
                <p className="text-sm text-gray-600">Prescription Refill • 15 min</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
