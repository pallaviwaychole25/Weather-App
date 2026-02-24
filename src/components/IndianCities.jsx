import React from 'react';
import { MapPin } from 'lucide-react';

const INDIAN_CITIES = [
    { name: 'Mumbai', state: 'Maharashtra' },
    { name: 'Delhi', state: 'Delhi' },
    { name: 'Bangalore', state: 'Karnataka' },
    { name: 'Hyderabad', state: 'Telangana' },
    { name: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Kolkata', state: 'West Bengal' },
    { name: 'Pune', state: 'Maharashtra' },
    { name: 'Ahmedabad', state: 'Gujarat' },
    { name: 'Jaipur', state: 'Rajasthan' },
    { name: 'Lucknow', state: 'Uttar Pradesh' },
    // Adding fewer for clean UI, but covering major ones as requested
];

const IndianCities = ({ onSelectCity }) => {
    return (
        <div className="mt-8">
            <h3 className="text-white/80 font-medium mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Quick Select: Major Indian Cities
            </h3>
            <div className="flex flex-wrap gap-2">
                {INDIAN_CITIES.map((city) => (
                    <button
                        key={city.name}
                        onClick={() => onSelectCity(city.name)}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/20 hover:scale-105 text-white/90 text-sm rounded-full backdrop-blur-sm border border-white/10 transition-all duration-200"
                    >
                        {city.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default IndianCities;
