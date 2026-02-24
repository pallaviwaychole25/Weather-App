import React from 'react';
import { Cloud, Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <div className="relative p-4 bg-white/10 backdrop-blur-md rounded-full ring-1 ring-white/20 shadow-xl">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                    <Cloud className="w-6 h-6 text-blue-200 animate-bounce" />
                </div>
            </div>
            <p className="text-white font-medium animate-pulse">Fetching weather data...</p>
        </div>
    );
};

export default LoadingSpinner;
