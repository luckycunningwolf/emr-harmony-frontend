
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Clock, FileText, Settings } from 'lucide-react';

const BasicSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <aside className="w-64 bg-blue-100 p-4 h-screen">
      <h1 className="text-2xl font-bold mb-6">MediTrack</h1>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/" 
              className={`flex items-center p-2 ${currentPath === '/' ? 'bg-blue-200' : ''}`}
            >
              <Home className="h-5 w-5 mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/patients" 
              className={`flex items-center p-2 ${currentPath === '/patients' ? 'bg-blue-200' : ''}`}
            >
              <Users className="h-5 w-5 mr-2" />
              <span>Patients</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/appointments" 
              className={`flex items-center p-2 ${currentPath === '/appointments' ? 'bg-blue-200' : ''}`}
            >
              <Clock className="h-5 w-5 mr-2" />
              <span>Appointments</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/notes" 
              className={`flex items-center p-2 ${currentPath === '/notes' ? 'bg-blue-200' : ''}`}
            >
              <FileText className="h-5 w-5 mr-2" />
              <span>Notes</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`flex items-center p-2 ${currentPath === '/settings' ? 'bg-blue-200' : ''}`}
            >
              <Settings className="h-5 w-5 mr-2" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="mt-8 pt-4 border-t border-blue-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">
            <span>Dr</span>
          </div>
          <div className="ml-2">
            <p className="text-sm">Dr. Smith</p>
            <p className="text-xs">Doctor</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BasicSidebar;
