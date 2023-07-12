import React from 'react';
import './spinner.css';

const Spinner = () => {
    const style = {
        animation: 'spinner 1.5s linear infinite',
        borderTopColor: '#3498db'
    };

    return (
        <div style={style} className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
    );
};

const LoadingScreen = () => (
    <div className="h-screen overflow-hidden flex items-center justify-center" style={{background: '#edf2f7'}}>
        <style>
        {`
            @keyframes spinner {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}
        </style>
        <Spinner />
    </div>
);

export default LoadingScreen;

