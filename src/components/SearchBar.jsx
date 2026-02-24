import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, disabled }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city..."
                    disabled={disabled}
                    className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 backdrop-blur-md transition-all duration-300 shadow-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5 group-focus-within:text-white transition-colors duration-300" />
                <button
                    type="submit"
                    disabled={disabled || !query.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
