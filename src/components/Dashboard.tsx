
import React, { useState, useEffect } from 'react';
import { Calendar, Cloud, Newspaper, Clock, Thermometer, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import WeatherWidget from './WeatherWidget';
import NewsWidget from './NewsWidget';
import CalendarWidget from './CalendarWidget';
import TimeWidget from './TimeWidget';
import ApplicationsList from './ApplicationsList';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const statsData = [
    {
      icon: <Thermometer className="w-5 h-5" />,
      label: 'Calendar Events',
      value: 'Manage',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30',
      linkTo: '/calendar'
    },
    {
      icon: <List className="w-5 h-5" />,
      label: 'Lists & Tasks',
      value: 'Create',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
      linkTo: '/lists'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Events Today',
      value: '4 events',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30'
    },
    {
      icon: <Cloud className="w-5 h-5" />,
      label: 'System Status',
      value: 'All Online',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30'
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <header className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SidebarTrigger className="p-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700" />
                    <div>
                      <h1 className="text-3xl font-bold text-white">Smart Home Dashboard</h1>
                      <p className="text-blue-200">Your connected home command center</p>
                    </div>
                  </div>
                  <TimeWidget currentTime={currentTime} />
                </div>
              </header>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statsData.map((stat, index) => {
                  const Component = stat.linkTo ? Link : 'div';
                  const componentProps = stat.linkTo 
                    ? { to: stat.linkTo, className: `${stat.bgColor} backdrop-blur-md rounded-xl p-4 border ${stat.borderColor} hover:bg-white/20 transition-all duration-200 cursor-pointer block` }
                    : { className: `${stat.bgColor} backdrop-blur-md rounded-xl p-4 border ${stat.borderColor} hover:bg-white/20 transition-all duration-200` };

                  return (
                    <Component key={index} {...componentProps}>
                      <div className="flex items-center space-x-3">
                        <div className={stat.color}>
                          {stat.icon}
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{stat.value}</div>
                          <div className="text-white/60 text-xs">{stat.label}</div>
                        </div>
                      </div>
                    </Component>
                  );
                })}
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {/* Calendar Widget - Takes up 2 columns on larger screens */}
                <div className="lg:col-span-2">
                  <CalendarWidget />
                </div>

                {/* Weather Widget */}
                <div className="lg:col-span-1">
                  <WeatherWidget />
                </div>

                {/* News Widget - Takes up remaining space */}
                <div className="lg:col-span-3 xl:col-span-1">
                  <NewsWidget />
                </div>
              </div>

              {/* Additional Dashboard Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {/* Quick Controls */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Cloud className="w-5 h-5 mr-2" />
                    Quick Controls
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-green-500/20 hover:bg-green-500/30 rounded-xl transition-all duration-200 text-green-100 border border-green-500/30">
                      <div className="text-sm font-medium">Living Room</div>
                      <div className="text-xs opacity-75">Lights On</div>
                    </button>
                    <button className="p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl transition-all duration-200 text-blue-100 border border-blue-500/30">
                      <div className="text-sm font-medium">Thermostat</div>
                      <div className="text-xs opacity-75">72°F</div>
                    </button>
                    <button className="p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl transition-all duration-200 text-purple-100 border border-purple-500/30">
                      <div className="text-sm font-medium">Security</div>
                      <div className="text-xs opacity-75">Armed</div>
                    </button>
                    <button className="p-4 bg-orange-500/20 hover:bg-orange-500/30 rounded-xl transition-all duration-200 text-orange-100 border border-orange-500/30">
                      <div className="text-sm font-medium">Garage</div>
                      <div className="text-xs opacity-75">Closed</div>
                    </button>
                  </div>
                </div>

                {/* Energy Usage */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Energy Usage</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Current</span>
                      <span className="text-white font-semibold">2.4 kW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Today</span>
                      <span className="text-white font-semibold">48.2 kWh</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">This Month</span>
                      <span className="text-white font-semibold">892 kWh</span>
                    </div>
                    <div className="w-full bg-blue-900/50 rounded-full h-2 mt-4">
                      <div className="bg-blue-400 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* System Status */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">WiFi</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-white text-sm">Connected</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Home Assistant</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-white text-sm">Online</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Security System</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-white text-sm">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications List */}
              <div className="mt-8">
                <ApplicationsList />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
