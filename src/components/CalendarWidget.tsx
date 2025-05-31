
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  location?: string;
  attendees?: number;
  type: 'meeting' | 'personal' | 'reminder';
}

const CalendarWidget = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Standup',
      time: '09:00 AM',
      duration: '30 min',
      location: 'Conference Room A',
      attendees: 5,
      type: 'meeting'
    },
    {
      id: '2',
      title: 'Home Maintenance Check',
      time: '02:00 PM',
      duration: '1 hour',
      type: 'personal'
    },
    {
      id: '3',
      title: 'Grocery Shopping',
      time: '05:30 PM',
      duration: '45 min',
      location: 'Whole Foods',
      type: 'personal'
    },
    {
      id: '4',
      title: 'System Backup Reminder',
      time: '11:00 PM',
      duration: '5 min',
      type: 'reminder'
    }
  ]);

  const today = new Date();
  const todayStr = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Simulate Google Calendar API call
  useEffect(() => {
    const fetchCalendarEvents = () => {
      console.log('Fetching calendar events...');
      // This would be replaced with actual Google Calendar API call
    };
    
    fetchCalendarEvents();
    const interval = setInterval(fetchCalendarEvents, 900000); // Update every 15 minutes
    return () => clearInterval(interval);
  }, []);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-500/20 border-l-blue-500';
      case 'personal':
        return 'bg-green-500/20 border-l-green-500';
      case 'reminder':
        return 'bg-orange-500/20 border-l-orange-500';
      default:
        return 'bg-gray-500/20 border-l-gray-500';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="w-4 h-4 text-blue-400" />;
      case 'personal':
        return <Calendar className="w-4 h-4 text-green-400" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-orange-400" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">Today's Schedule</h2>
        </div>
      </div>

      {/* Date */}
      <div className="mb-6">
        <div className="text-white/80 text-sm mb-1">Today</div>
        <div className="text-white font-semibold">{todayStr}</div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className={`rounded-xl p-4 border-l-4 ${getEventTypeColor(event.type)} hover:bg-white/10 transition-all duration-200 cursor-pointer`}
            >
              {/* Event header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getEventIcon(event.type)}
                  <h3 className="text-white font-medium text-sm">{event.title}</h3>
                </div>
              </div>

              {/* Event details */}
              <div className="space-y-1">
                <div className="flex items-center text-xs text-white/70 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{event.time}</span>
                  </div>
                  <span>•</span>
                  <span>{event.duration}</span>
                </div>

                {event.location && (
                  <div className="flex items-center text-xs text-white/70 space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                )}

                {event.attendees && (
                  <div className="flex items-center text-xs text-white/70 space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{event.attendees} attendees</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/60">No events scheduled for today</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200 border border-blue-500/30">
          Add New Event
        </button>
      </div>
    </div>
  );
};

export default CalendarWidget;
