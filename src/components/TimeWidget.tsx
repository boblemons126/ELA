
import React from 'react';
import { Clock } from 'lucide-react';

interface TimeWidgetProps {
  currentTime: Date;
}

const TimeWidget: React.FC<TimeWidgetProps> = ({ currentTime }) => {
  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
      <div className="flex items-center space-x-3">
        <Clock className="w-5 h-5 text-blue-400" />
        <div>
          <div className="text-2xl font-bold text-white">{timeString}</div>
          <div className="text-sm text-blue-200">{dateString}</div>
        </div>
      </div>
    </div>
  );
};

export default TimeWidget;
