
import React from 'react';
import { Link } from 'react-router-dom';
import BasicSidebar from '../components/BasicSidebar';

const SimpleIndex = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <BasicSidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-gray-500">Welcome, Dr. Smith!</p>
        </header>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Today's Appointments</h3>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>
          
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Total Patients</h3>
            <p className="text-3xl font-bold mt-2">125</p>
          </div>
          
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Pending Notes</h3>
            <p className="text-3xl font-bold mt-2">3</p>
          </div>
          
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Messages</h3>
            <p className="text-3xl font-bold mt-2">7</p>
          </div>
        </div>
        
        {/* Recent Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Appointments */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Recent Appointments</h3>
              <Link to="/appointments" className="text-blue-600 hover:underline">View All</Link>
            </div>
            
            <ul className="space-y-3">
              <li className="border-b pb-2">
                <p className="font-medium">Rajesh Kumar</p>
                <p className="text-sm text-gray-500">Today, 9:00 AM - Annual Checkup</p>
              </li>
              <li className="border-b pb-2">
                <p className="font-medium">Priya Venkatesh</p>
                <p className="text-sm text-gray-500">Today, 10:30 AM - Follow-up</p>
              </li>
              <li>
                <p className="font-medium">Karthik Raman</p>
                <p className="text-sm text-gray-500">Today, 2:15 PM - Prescription Refill</p>
              </li>
            </ul>
          </div>
          
          {/* Recent Patients */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Recent Patients</h3>
              <Link to="/patients" className="text-blue-600 hover:underline">View All</Link>
            </div>
            
            <ul className="space-y-3">
              <li className="border-b pb-2">
                <p className="font-medium">Rajesh Kumar</p>
                <p className="text-sm text-gray-500">45y, Male - Last Visit: Today</p>
              </li>
              <li className="border-b pb-2">
                <p className="font-medium">Priya Venkatesh</p>
                <p className="text-sm text-gray-500">38y, Female - Last Visit: Today</p>
              </li>
              <li>
                <p className="font-medium">Karthik Raman</p>
                <p className="text-sm text-gray-500">62y, Male - Last Visit: Yesterday</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleIndex;
