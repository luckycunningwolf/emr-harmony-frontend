
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Clock, FileText } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-5 flex flex-col h-screen fixed">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-blue-600">MediTrack</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          <li className={currentPath === '/' ? 'bg-blue-50 text-blue-600 rounded' : ''}>
            <Link to="/" className={`flex items-center px-4 py-3 rounded ${currentPath === '/' ? '' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>
              <Calendar className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li className={currentPath === '/patients' ? 'bg-blue-50 text-blue-600 rounded' : ''}>
            <Link to="/patients" className={`flex items-center px-4 py-3 rounded ${currentPath === '/patients' ? '' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>
              <Users className="h-5 w-5 mr-3" />
              Patients
            </Link>
          </li>
          <li className={currentPath === '/appointments' ? 'bg-blue-50 text-blue-600 rounded' : ''}>
            <Link to="/appointments" className={`flex items-center px-4 py-3 rounded ${currentPath === '/appointments' ? '' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>
              <Clock className="h-5 w-5 mr-3" />
              Appointments
            </Link>
          </li>
          <li className={currentPath === '/notes' ? 'bg-blue-50 text-blue-600 rounded' : ''}>
            <Link to="/notes" className={`flex items-center px-4 py-3 rounded ${currentPath === '/notes' ? '' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>
              <FileText className="h-5 w-5 mr-3" />
              Notes
            </Link>
          </li>
        </ul>
      </nav>
      <div className="pt-5 border-t border-gray-200">
        <p className="text-sm text-gray-600">Dr. Arjun</p>
      </div>
    </aside>
  );
};

export default Sidebar;
