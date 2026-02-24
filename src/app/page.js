'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Github } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import UnitSwitcher from '@/components/UnitSwitcher';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import IndianCities from '@/components/IndianCities';
import { fetchWeatherData } from '@/services/weatherService';

export default function Home() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [units, setUnits] = useState('m'); // m, f, s

    // Fetch weather when city or units change
    useEffect(() => {
        if (!city) return;

        const getWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchWeatherData(city, units);
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
                setWeatherData(null);
            } finally {
                setLoading(false);
            }
        };

        getWeather();
    }, [city, units]);

    const handleSearch = (query) => {
        setCity(query);
    };

    const handleUnitChange = (newUnit) => {
        setUnits(newUnit);
    };

    const handleRetry = () => {
        if (city) {
            // Trigger re-fetch
            const currentCity = city;
            setCity(''); // Reset to force effect? Or just call fetch directly.
            // Better to just call valid function or rely on state.
            // Force update by setting city to same value doesn't trigger effect if strict.
            // Let's just clear error and call fetch.
            // Actually, simple way:
            setCity(currentCity);
            // But if state didn't change, effect won't run.
            // Let's extract fetch logic or just toggle a reload flag.
            // For now, toggle unit temporarily or just reset city then set it back?
            // Simplest: just call the async function directly if I extracted it, but it's inside useEffect.
            // I'll make useEffect allow re-runs or just toggle a trigger.
            // Hack:
            setCity(prev => prev + ' '); // Change string slightly? No.
            setLoading(true); // Manually set loading to show activity
            fetchWeatherData(city, units)
                .then(data => {
                    setWeatherData(data);
                    setLoading(false);
                    setError(null);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    };

    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col items-center p-4 md:p-8 transition-colors duration-700">
            {/* Dynamic Background with Gradients */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 animate-gradient-x"></div>

            {/* Floating Orbs (Decorative) */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

            <div className="z-10 w-full max-w-5xl flex flex-col items-center">
                {/* Header */}
                <header className="w-full flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
                    <div className="flex items-center gap-2">
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
                            <Cloud className="w-8 h-8 text-blue-200" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Weather App</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <UnitSwitcher currentUnit={units} onUnitChange={handleUnitChange} />
                        <a href="https://github.com/pallaviwaychole25/Weather-App" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white/70 hover:text-white">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </header>

                {/* Search Section */}
                <div className="w-full flex flex-col items-center mb-8">
                    <SearchBar onSearch={handleSearch} disabled={loading} />

                    {!weatherData && !loading && !error && (
                        <IndianCities onSelectCity={handleSearch} />
                    )}
                </div>

                {/* Content Section */}
                <div className="w-full flex justify-center min-h-[400px]">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorMessage message={error} onRetry={handleRetry} />
                    ) : weatherData ? (
                        <WeatherCard data={weatherData} units={units} />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center text-white/50 animate-in fade-in duration-700">
                            <Cloud className="w-24 h-24 mb-4 opacity-50" />
                            <p className="text-xl font-light">Enter a city name to get the current weather.</p>
                        </div>
                    )}
                </div>
            </div>

            <footer className="absolute bottom-4 text-white/30 text-sm z-10">
                Powered by Weatherstack API
            </footer>
        </main>
    );
}
