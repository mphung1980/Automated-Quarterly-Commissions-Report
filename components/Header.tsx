
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
                 <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ml-3">
                    Domo to GSheet Workflow Visualizer
                </h1>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
