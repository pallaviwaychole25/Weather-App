import React from 'react';
import {
    Wind,
    Droplets,
    Eye,
    Thermometer,
    Gauge,
    Clock,
    MapPin,
    Compass,
    CloudRain,
    Cloud,
    Sunrise,
    Sunset
} from 'lucide-react';
import WeatherHistory from './WeatherHistory';

const WeatherCard = ({ data, units }) => {
    if (!data) return null;

    const { current, location, history } = data;

    // Format local time
    const formatTime = (timeStr) => {
        return timeStr; // API returns readable time string usually, or we can format it
    };

    const getUnitSymbol = (type) => {
        if (type === 'temp') {
            return units === 'f' ? '°F' : units === 's' ? 'K' : '°C';
        }
        if (type === 'speed') {
            return units === 'f' ? 'mph' : units === 's' ? 'm/s' : 'km/h';
        }
        return '';
    };

    return (
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-700">
            {/* Main Weather Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6 border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <img src={current.weather_icons[0]} alt="background icon" className="w-64 h-64 dark:invert" />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2 mb-1">
                            <MapPin className="w-6 h-6" /> {location.name}
                        </h2>
                        <p className="text-blue-100 text-lg">{location.country}</p>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-blue-200 mt-2 text-sm bg-blue-900/30 px-3 py-1 rounded-full w-fit mx-auto md:mx-0">
                            <Clock className="w-4 h-4" /> Local Time: {location.localtime}
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="flex items-center justify-center">
                            <img src={current.weather_icons[0]} alt={current.weather_descriptions[0]} className="w-20 h-20 mr-4 rounded-xl shadow-lg border border-white/10" />
                            <div className="text-6xl font-bold text-white tracking-tighter">
                                {current.temperature}{getUnitSymbol('temp')}
                            </div>
                        </div>
                        <p className="text-xl text-blue-100 font-medium mt-2 capitalize">{current.weather_descriptions[0]}</p>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DetailItem
                    icon={<Thermometer className="w-5 h-5" />}
                    label="Feels Like"
                    value={`${current.feelslike}${getUnitSymbol('temp')}`}
                />
                <DetailItem
                    icon={<Wind className="w-5 h-5" />}
                    label="Wind"
                    value={`${current.wind_speed} ${getUnitSymbol('speed')}`}
                    subValue={`Dir: ${current.wind_dir}`}
                />
                <DetailItem
                    icon={<Droplets className="w-5 h-5" />}
                    label="Humidity"
                    value={`${current.humidity}%`}
                />
                <DetailItem
                    icon={<Gauge className="w-5 h-5" />}
                    label="Pressure"
                    value={`${current.pressure} mb`}
                />
                <DetailItem
                    icon={<Eye className="w-5 h-5" />}
                    label="Visibility"
                    value={`${current.visibility} km`}
                />
                <DetailItem
                    icon={<Compass className="w-5 h-5" />}
                    label="UV Index"
                    value={current.uv_index}
                />
                <DetailItem
                    icon={<CloudRain className="w-5 h-5" />}
                    label="Precipitation"
                    value={`${current.precip} mm`}
                />
                <DetailItem
                    icon={<Cloud className="w-5 h-5" />}
                    label="Cloud Cover"
                    value={`${current.cloudcover}%`}
                />
            </div>

            {/* Astronomy Section */}
            {data.astronomy && (
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 mt-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        Astronomy
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <Sunrise className="w-5 h-5 text-yellow-400" />
                            <div>
                                <p className="text-xs text-blue-200/60">Sunrise</p>
                                <p className="text-sm font-bold text-white">{data.astronomy.sunrise}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <Sunset className="w-5 h-5 text-orange-400" />
                            <div>
                                <p className="text-xs text-blue-200/60">Sunset</p>
                                <p className="text-sm font-bold text-white">{data.astronomy.sunset}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-5 h-5 rounded-full bg-blue-100/20" /> {/* Simple Moon Icon */}
                            <div>
                                <p className="text-xs text-blue-200/60">Moon Phase</p>
                                <p className="text-sm font-bold text-white">{data.astronomy.moon_phase}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-5 h-5 rounded-full border border-blue-100/40" /> {/* Simple Illum Icon */}
                            <div>
                                <p className="text-xs text-blue-200/60">Illumination</p>
                                <p className="text-sm font-bold text-white">{data.astronomy.moon_illumination}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 5-Day History */}
            <WeatherHistory history={history} units={units} />
        </div>
    );
};

const DetailItem = ({ icon, label, value, subValue }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
        <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-white/10 rounded-lg text-blue-200">
                {icon}
            </div>
            {subValue && <span className="text-xs text-blue-200/70 font-mono">{subValue}</span>}
        </div>
        <div className="mt-2">
            <p className="text-sm text-blue-200/80 mb-1">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    </div>
);

export default WeatherCard;
