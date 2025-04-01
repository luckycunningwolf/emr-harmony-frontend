
import React from 'react';
import Sidebar from '../components/Sidebar';

const Patients = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Patients</h2>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => alert("Add New Patient clicked")}
          >
            Add New Patient
          </button>
        </header>
        
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Search patients..." 
            className="w-full md:w-80 p-2 border border-gray-300 rounded"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                alert(`Searching for patient: ${e.currentTarget.value}`);
              }
            }}
          />
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 md:mb-0">
              <h3 className="font-bold">Rajesh Kumar</h3>
              <p className="text-sm text-gray-500">45y • Male • ID: P1001</p>
            </div>
            <div className="mb-2 md:mb-0 md:ml-4">
              <p className="text-sm">(555) 123-4567</p>
              <p className="text-sm">rajesh.kumar@email.com</p>
            </div>
            <button 
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm self-start"
              onClick={() => alert("Viewing records for Rajesh Kumar")}
            >
              View Records
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 md:mb-0">
              <h3 className="font-bold">Priya Venkatesh</h3>
              <p className="text-sm text-gray-500">38y • Female • ID: P1002</p>
            </div>
            <div className="mb-2 md:mb-0 md:ml-4">
              <p className="text-sm">(555) 987-6543</p>
              <p className="text-sm">priya.venkatesh@email.com</p>
            </div>
            <button 
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm self-start"
              onClick={() => alert("Viewing records for Priya Venkatesh")}
            >
              View Records
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 md:mb-0">
              <h3 className="font-bold">Karthik Raman</h3>
              <p className="text-sm text-gray-500">62y • Male • ID: P1003</p>
            </div>
            <div className="mb-2 md:mb-0 md:ml-4">
              <p className="text-sm">(555) 456-7890</p>
              <p className="text-sm">karthik.raman@email.com</p>
            </div>
            <button 
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm self-start"
              onClick={() => alert("Viewing records for Karthik Raman")}
            >
              View Records
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Patients;
