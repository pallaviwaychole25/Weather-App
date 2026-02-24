import React from 'react';
import { Calendar } from 'lucide-react';

const WeatherHistory = ({ history, units }) => {
    if (!history || history.length === 0) return null;

    const getUnitSymbol = () => {
        return units === 'f' ? '°F' : units === 's' ? 'K' : '°C';
    };

    return (
        <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-200" />
                5-Day History
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {history.map((day, index) => (
                    <div
                        key={day.date}
                        className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <p className="text-blue-100 font-medium mb-1">{day.day}</p>
                        <p className="text-xs text-blue-200/60 mb-3">{new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>

                        <img
                            src={day.icon}
                            alt={day.description}
                            className="w-12 h-12 mb-3 filter drop-shadow-md"
                        />

                        <div className="text-2xl font-bold text-white">
                            {day.temperature}{getUnitSymbol()}
                        </div>
                        <p className="text-xs text-blue-200/80 mt-1 capitalize">{day.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherHistory;
