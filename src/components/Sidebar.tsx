
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Clock, FileText, Home, Settings, LogOut } from 'lucide-react';

// Create a mock function to get doctor info (in a real app this would be from context/state)
const getDoctorInfo = () => {
  // Check if value exists in localStorage
  const savedDoctor = localStorage.getItem('doctor');
  if (savedDoctor) {
    return JSON.parse(savedDoctor);
  }
  // Default values
  return {
    name: 'Dr. Arjun',
    specialty: 'Cardiologist'
  };
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [doctor, setDoctor] = useState(getDoctorInfo());
  
  // Listen for storage events to update doctor info across tabs/pages
  useEffect(() => {
    const handleStorageChange = () => {
      setDoctor(getDoctorInfo());
    };
    
    // Check for updates to doctor info
    const checkDoctorInfo = () => {
      const currentDoctor = getDoctorInfo();
      if (currentDoctor.name !== doctor.name || currentDoctor.specialty !== doctor.specialty) {
        setDoctor(currentDoctor);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Set interval to check for updates (useful when settings page updates info)
    const interval = setInterval(checkDoctorInfo, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [doctor]);
  
  return (
    <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col h-screen fixed shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MediTrack</h1>
        <div className="mt-1 h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
      </div>
      
      <nav className="flex-1">
        <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Main</p>
        <ul className="space-y-1.5">
          <li>
            <Link 
              to="/" 
              className={`flex items-center px-4 py-2.5 rounded-lg group transition-colors ${
                currentPath === '/' 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Home className={`h-5 w-5 mr-3 transition-colors ${
                currentPath === '/' ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
              }`} />
              <span className={`font-medium transition-colors ${
                currentPath === '/' ? '' : 'group-hover:text-blue-600'
              }`}>Dashboard</span>
              {currentPath === '/' && <div className="ml-auto h-2 w-2 rounded-full bg-blue-600"></div>}
            </Link>
          </li>
          <li>
            <Link 
              to="/patients" 
              className={`flex items-center px-4 py-2.5 rounded-lg group transition-colors ${
                currentPath === '/patients' 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Users className={`h-5 w-5 mr-3 transition-colors ${
                currentPath === '/patients' ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
              }`} />
              <span className={`font-medium transition-colors ${
                currentPath === '/patients' ? '' : 'group-hover:text-blue-600'
              }`}>Patients</span>
              {currentPath === '/patients' && <div className="ml-auto h-2 w-2 rounded-full bg-blue-600"></div>}
            </Link>
          </li>
          <li>
            <Link 
              to="/appointments" 
              className={`flex items-center px-4 py-2.5 rounded-lg group transition-colors ${
                currentPath === '/appointments' 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Clock className={`h-5 w-5 mr-3 transition-colors ${
                currentPath === '/appointments' ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
              }`} />
              <span className={`font-medium transition-colors ${
                currentPath === '/appointments' ? '' : 'group-hover:text-blue-600'
              }`}>Appointments</span>
              {currentPath === '/appointments' && <div className="ml-auto h-2 w-2 rounded-full bg-blue-600"></div>}
            </Link>
          </li>
          <li>
            <Link 
              to="/notes" 
              className={`flex items-center px-4 py-2.5 rounded-lg group transition-colors ${
                currentPath === '/notes' 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <FileText className={`h-5 w-5 mr-3 transition-colors ${
                currentPath === '/notes' ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
              }`} />
              <span className={`font-medium transition-colors ${
                currentPath === '/notes' ? '' : 'group-hover:text-blue-600'
              }`}>Notes</span>
              {currentPath === '/notes' && <div className="ml-auto h-2 w-2 rounded-full bg-blue-600"></div>}
            </Link>
          </li>
        </ul>
        
        <p className="text-xs font-medium text-gray-400 mt-8 mb-2 uppercase tracking-wider">Settings</p>
        <ul className="space-y-1.5">
          <li>
            <Link 
              to="/settings" 
              className={`flex items-center px-4 py-2.5 rounded-lg group transition-colors ${
                currentPath === '/settings' 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Settings className={`h-5 w-5 mr-3 transition-colors ${
                currentPath === '/settings' ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
              }`} />
              <span className={`font-medium transition-colors ${
                currentPath === '/settings' ? '' : 'group-hover:text-blue-600'
              }`}>Settings</span>
              {currentPath === '/settings' && <div className="ml-auto h-2 w-2 rounded-full bg-blue-600"></div>}
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
            {doctor.name.split(' ')[1] ? `${doctor.name.split(' ')[0][0]}${doctor.name.split(' ')[1][0]}` : doctor.name[0]}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{doctor.name}</p>
            <p className="text-xs text-gray-500">{doctor.specialty}</p>
          </div>
          <button className="ml-auto p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
