
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Calendar, Clock, Users, FileText, ArrowRight, Stethoscope } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Dashboard</h2>
            <p className="text-gray-500 mt-1">Welcome back, Dr. Arjun</p>
          </div>
          <div className="text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            Today: {currentDate}
          </div>
        </header>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-white/80">Appointments Today</h3>
                <Calendar className="h-6 w-6 text-white/70" />
              </div>
              <p className="text-4xl font-bold mt-2">5</p>
              <div className="mt-2 text-xs text-white/80">
                <span className="inline-block">+2 from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-white/80">New Patients</h3>
                <Users className="h-6 w-6 text-white/70" />
              </div>
              <p className="text-4xl font-bold mt-2">2</p>
              <div className="mt-2 text-xs text-white/80">
                <span className="inline-block">This week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-white/80">Pending Notes</h3>
                <FileText className="h-6 w-6 text-white/70" />
              </div>
              <p className="text-4xl font-bold mt-2">3</p>
              <div className="mt-2 text-xs text-white/80">
                <span className="inline-block">Require completion</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-white/80">Patient Reviews</h3>
                <Stethoscope className="h-6 w-6 text-white/70" />
              </div>
              <p className="text-4xl font-bold mt-2">12</p>
              <div className="mt-2 text-xs text-white/80">
                <span className="inline-block">This month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Two column layout for appointments and patients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointments */}
          <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-lg">Today's Appointments</h3>
                </div>
                <Link to="/appointments" className="text-sm text-blue-600 flex items-center hover:underline">
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                  <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                    <div className="font-bold text-blue-600">9:00</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Rajesh Kumar</p>
                    <p className="text-sm text-gray-500">Annual Checkup</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Confirmed</Badge>
                </div>
                
                <div className="flex items-center bg-purple-50 p-4 rounded-lg">
                  <div className="bg-purple-100 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                    <div className="font-bold text-purple-600">10:30</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Priya Venkatesh</p>
                    <p className="text-sm text-gray-500">Follow-up</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Confirmed</Badge>
                </div>
                
                <div className="flex items-center bg-amber-50 p-4 rounded-lg">
                  <div className="bg-amber-100 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                    <div className="font-bold text-amber-600">2:15</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Karthik Raman</p>
                    <p className="text-sm text-gray-500">Prescription Refill</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Confirmed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Patients */}
          <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-bold text-lg">Recent Patients</h3>
                </div>
                <Link to="/patients" className="text-sm text-indigo-600 flex items-center hover:underline">
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-indigo-200 text-indigo-700">RK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Rajesh Kumar</p>
                      <p className="text-sm text-gray-500">45y • Male • Seen: Today</p>
                    </div>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full text-sm transition-colors">
                    View
                  </button>
                </div>

                <div className="flex justify-between items-center bg-pink-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-pink-200 text-pink-700">PV</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Priya Venkatesh</p>
                      <p className="text-sm text-gray-500">38y • Female • Seen: Today</p>
                    </div>
                  </div>
                  <button className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded-full text-sm transition-colors">
                    View
                  </button>
                </div>

                <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-emerald-200 text-emerald-700">KR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Karthik Raman</p>
                      <p className="text-sm text-gray-500">62y • Male • Seen: Yesterday</p>
                    </div>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-full text-sm transition-colors">
                    View
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
