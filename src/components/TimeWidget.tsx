import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Thermometer } from 'lucide-react';
import { getWeatherData } from '@/services/weather';

interface WeatherInfo {
  temperature: number;
  location: string;
}

const TimeWidget = () => {
  const [time, setTime] = useState(new Date());
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Get location and weather data
    const getLocationAndWeather = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if geolocation is supported
        if (!navigator.geolocation) {
          throw new Error('Geolocation is not supported by your browser');
        }

        // Get current position
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            (error) => {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  reject(new Error('Please allow location access to see weather data'));
                  break;
                case error.POSITION_UNAVAILABLE:
                  reject(new Error('Location information is unavailable'));
                  break;
                case error.TIMEOUT:
                  reject(new Error('Location request timed out'));
                  break;
                default:
                  reject(new Error('An unknown error occurred'));
              }
            },
            { timeout: 10000 }
          );
        });

        console.log('Location obtained:', position.coords);

        // Check if API key is set
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!apiKey) {
          throw new Error('OpenWeatherMap API key is not configured');
        }

        const weatherData = await getWeatherData(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log('Weather data received:', weatherData);
        
        setWeatherInfo(weatherData);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unable to get location or weather data';
        console.error('Error in TimeWidget:', errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    getLocationAndWeather();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <span className="text-white font-medium">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {isLoading && (
          <span className="text-blue-400 text-sm">Loading weather data...</span>
        )}
        
        {weatherInfo && !isLoading && (
          <>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">{weatherInfo.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">{weatherInfo.temperature}°C</span>
            </div>
          </>
        )}
        
        {error && !isLoading && (
          <span className="text-red-400 text-sm">{error}</span>
        )}
      </div>
    </div>
  );
};

export default TimeWidget;
