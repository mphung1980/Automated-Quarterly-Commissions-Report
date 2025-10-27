
import React from 'react';

interface WorkflowStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({ icon, title, description, children }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full flex flex-col z-10">
      <div className="flex items-center mb-4">
        <div className="bg-indigo-600 p-3 rounded-full mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="mt-2 flex-grow">
        {children}
      </div>
    </div>
  );
};

export default WorkflowStep;
