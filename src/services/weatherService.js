import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherstack.com/current';

export const fetchWeatherData = async (city, units = 'm') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: API_KEY,
        query: city,
        units: units
      }
    });

    // Check for API errors
    if (response.data.error) {
      const errorInfo = response.data.error;
      console.error('Weatherstack API error:', errorInfo);

      // Handle specific error codes
      if (errorInfo.code === 615 || errorInfo.type === 'request_failed') {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      }

      if (errorInfo.code === 101 || errorInfo.type === 'missing_access_key') {
        throw new Error('API key is missing. Please configure your API key.');
      }

      if (errorInfo.code === 103 || errorInfo.type === 'invalid_access_key') {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      if (errorInfo.code === 105 || errorInfo.type === 'https_access_restricted') {
        throw new Error('HTTPS access requires a paid plan. The app uses HTTP which should work on the free tier.');
      }

      throw new Error(errorInfo.info || 'Failed to fetch weather data');
    }

    // Generate mock history for demonstration since free tier doesn't support it
    const history = generateMockHistory(response.data.current.temperature, units);
    // Generate mock astronomy
    const astronomy = generateMockAstronomy();
    return { ...response.data, history, astronomy };

  } catch (error) {
    // Log the full error for debugging
    console.error('Weather fetch error:', error);

    // Handle axios-specific errors
    if (error.response) {
      console.error('Server error response:', error.response.data);
      if (error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error.info || 'Server error occurred');
      }
    }
    // Handle network errors
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    // Re-throw custom errors
    if (error.message.includes('City') ||
      error.message.includes('API') ||
      error.message.includes('Network') ||
      error.message.includes('HTTPS')) {
      throw error;
    }
    // Generic error with more details
    throw new Error(`Failed to fetch weather data: ${error.message || 'Unknown error'}`);
  }
};

// Helper to generate a realistic-looking 5-day history
const generateMockHistory = (currentTemp, units) => {
  const history = [];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const icons = [
    'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png',
    'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png',
    'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png',
    'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png'
  ];

  const today = new Date();

  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i); // Go backwards for history

    // Vary temperature slightly (+/- 3 degrees)
    const variance = Math.floor(Math.random() * 7) - 3;
    const temp = currentTemp + variance;

    history.push({
      date: date.toISOString().split('T')[0],
      day: days[date.getDay()],
      temperature: temp,
      precip: (Math.random() * 5).toFixed(1), // Mock precipitation
      cloudcover: Math.floor(Math.random() * 100), // Mock cloud cover
      icon: icons[Math.floor(Math.random() * icons.length)],
      description: temp > (units === 'f' ? 75 : 24) ? 'Sunny' : 'Partly Cloudy'
    });
  }

  return history;
};

// Helper to generate mock astronomy data
const generateMockAstronomy = () => {
  return {
    sunrise: '06:15 AM',
    sunset: '06:45 PM',
    moonrise: '08:30 PM',
    moonset: '07:15 AM',
    moon_phase: 'Waxing Gibbous',
    moon_illumination: '85'
  };
};
