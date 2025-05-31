
import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, Wind, Droplets, Thermometer, Eye } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
  }>;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 72,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    forecast: [
      { day: 'Today', high: 75, low: 62, condition: 'sunny' },
      { day: 'Tomorrow', high: 73, low: 58, condition: 'cloudy' },
      { day: 'Wed', high: 68, low: 55, condition: 'rainy' },
      { day: 'Thu', high: 71, low: 59, condition: 'sunny' },
    ]
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-300" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'snowy':
        return <CloudSnow className="w-8 h-8 text-blue-200" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />;
    }
  };

  const getConditionGradient = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'from-yellow-400 via-orange-400 to-red-400';
      case 'cloudy':
        return 'from-gray-400 via-blue-400 to-gray-500';
      case 'rainy':
        return 'from-blue-400 via-blue-500 to-blue-600';
      case 'snowy':
        return 'from-blue-200 via-blue-300 to-blue-400';
      default:
        return 'from-yellow-400 via-orange-400 to-red-400';
    }
  };

  // Simulate weather API call
  useEffect(() => {
    const fetchWeather = () => {
      // This would be replaced with actual API call
      console.log('Fetching weather data...');
      // For demo purposes, we'll use static data
    };
    
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-gradient-to-br ${getConditionGradient(weather.condition)} rounded-2xl p-6 text-white relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div className="relative z-10">
        {/* Main weather info */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              {getWeatherIcon(weather.condition)}
              <h2 className="text-2xl font-bold">Weather</h2>
            </div>
            <p className="text-white/80 capitalize">{weather.condition}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{weather.temperature}°</div>
            <div className="text-white/80 text-sm">Feels like {weather.temperature + 2}°</div>
          </div>
        </div>

        {/* Weather details */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Droplets className="w-4 h-4" />
              <span className="text-sm opacity-80">Humidity</span>
            </div>
            <div className="text-lg font-semibold">{weather.humidity}%</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Wind className="w-4 h-4" />
              <span className="text-sm opacity-80">Wind</span>
            </div>
            <div className="text-lg font-semibold">{weather.windSpeed} mph</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm opacity-80">Visibility</span>
            </div>
            <div className="text-lg font-semibold">{weather.visibility} mi</div>
          </div>
        </div>

        {/* Forecast */}
        <div>
          <h3 className="text-lg font-semibold mb-3">4-Day Forecast</h3>
          <div className="grid grid-cols-4 gap-3">
            {weather.forecast.map((day, index) => (
              <div key={index} className="bg-white/20 rounded-xl p-3 text-center backdrop-blur-sm">
                <div className="text-sm opacity-80 mb-2">{day.day}</div>
                <div className="flex justify-center mb-2">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">{day.high}°</div>
                  <div className="opacity-70">{day.low}°</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
