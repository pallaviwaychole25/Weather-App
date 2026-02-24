import React from 'react';

const UnitSwitcher = ({ currentUnit, onUnitChange }) => {
    const units = [
        { id: 'm', label: 'Metric', symbol: '°C' },
        { id: 'f', label: 'Fahrenheit', symbol: '°F' },
        { id: 's', label: 'Scientific', symbol: 'K' },
    ];

    return (
        <div className="flex bg-white/10 backdrop-blur-md rounded-lg p-1 ring-1 ring-white/10">
            {units.map((unit) => (
                <button
                    key={unit.id}
                    onClick={() => onUnitChange(unit.id)}
                    className={`
            flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
            ${currentUnit === unit.id
                            ? 'bg-white text-blue-900 shadow-sm scale-105'
                            : 'text-white/70 hover:text-white hover:bg-white/5'}
          `}
                >
                    <span className="hidden sm:inline mr-1">{unit.label}</span>
                    <span>{unit.symbol}</span>
                </button>
            ))}
        </div>
    );
};

export default UnitSwitcher;
