import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="flex justify-center mb-4">
                <div className="bg-red-500/20 p-3 rounded-full">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
            <p className="text-red-200 mb-6">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 ring-2 ring-red-500/50 hover:ring-red-500"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
