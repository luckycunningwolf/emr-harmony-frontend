
import React from 'react';
import { Link } from 'react-router-dom';
import BasicSidebar from '../components/BasicSidebar';
import { Calendar, Users, FileText } from 'lucide-react';

const SimpleIndex = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <BasicSidebar />

      <main className="ml-64 p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="mb-4">Today: {currentDate}</p>
        
        {/* Simple Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-200 p-4 rounded">
            <div className="flex justify-between">
              <h3>Appointments Today</h3>
              <Calendar className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">5</p>
          </div>

          <div className="bg-green-200 p-4 rounded">
            <div className="flex justify-between">
              <h3>Total Patients</h3>
              <Users className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">25</p>
          </div>

          <div className="bg-yellow-200 p-4 rounded">
            <div className="flex justify-between">
              <h3>Pending Notes</h3>
              <FileText className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>
        
        {/* Two column layout for basic info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Appointments */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Today's Appointments</h2>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-100 rounded">
                <p className="font-bold">9:00 AM - John Doe</p>
                <p className="text-sm">Annual Checkup</p>
              </li>
              <li className="p-2 bg-gray-100 rounded">
                <p className="font-bold">10:30 AM - Jane Smith</p>
                <p className="text-sm">Follow-up</p>
              </li>
              <li className="p-2 bg-gray-100 rounded">
                <p className="font-bold">2:15 PM - Mike Johnson</p>
                <p className="text-sm">Prescription Refill</p>
              </li>
            </ul>
            <Link to="/appointments" className="text-blue-500 block mt-2">View All</Link>
          </div>
          
          {/* Patients */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Recent Patients</h2>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-100 rounded flex justify-between">
                <div>
                  <p className="font-bold">John Doe</p>
                  <p className="text-sm">45y • Male • Seen: Today</p>
                </div>
                <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
              </li>
              <li className="p-2 bg-gray-100 rounded flex justify-between">
                <div>
                  <p className="font-bold">Jane Smith</p>
                  <p className="text-sm">38y • Female • Seen: Today</p>
                </div>
                <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
              </li>
              <li className="p-2 bg-gray-100 rounded flex justify-between">
                <div>
                  <p className="font-bold">Mike Johnson</p>
                  <p className="text-sm">62y • Male • Seen: Yesterday</p>
                </div>
                <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
              </li>
            </ul>
            <Link to="/patients" className="text-blue-500 block mt-2">View All</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleIndex;
