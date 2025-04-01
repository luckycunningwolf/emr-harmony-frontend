
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Index = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="text-sm text-gray-600">Today: {currentDate}</div>
        </header>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">Appointments Today</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">New Patients</h3>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">Pending Notes</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>
        
        {/* Two column layout for appointments and patients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointments */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Today's Appointments</h3>
              <Link to="/appointments" className="text-sm text-blue-600">View All</Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center bg-gray-50 p-3 rounded">
                <div className="font-medium w-24">09:00 AM</div>
                <div>
                  <p className="font-medium">Rajesh Kumar</p>
                  <p className="text-sm text-gray-500">Annual Checkup</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded">
                <div className="font-medium w-24">10:30 AM</div>
                <div>
                  <p className="font-medium">Priya Venkatesh</p>
                  <p className="text-sm text-gray-500">Follow-up</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded">
                <div className="font-medium w-24">02:15 PM</div>
                <div>
                  <p className="font-medium">Karthik Raman</p>
                  <p className="text-sm text-gray-500">Prescription Refill</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Patients */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Recent Patients</h3>
              <Link to="/patients" className="text-sm text-blue-600">View All</Link>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                <div>
                  <p className="font-medium">Rajesh Kumar</p>
                  <p className="text-sm text-gray-500">45y • Male • Seen: Today</p>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={() => alert("Viewing records for Rajesh Kumar")}>
                  View
                </button>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                <div>
                  <p className="font-medium">Priya Venkatesh</p>
                  <p className="text-sm text-gray-500">38y • Female • Seen: Today</p>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={() => alert("Viewing records for Priya Venkatesh")}>
                  View
                </button>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                <div>
                  <p className="font-medium">Karthik Raman</p>
                  <p className="text-sm text-gray-500">62y • Male • Seen: Yesterday</p>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={() => alert("Viewing records for Karthik Raman")}>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
