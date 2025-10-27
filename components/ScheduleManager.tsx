
import React from 'react';
import { Schedule, ScheduleFrequency } from '../types';

interface ScheduleManagerProps {
  schedule: Schedule;
  setSchedule: React.Dispatch<React.SetStateAction<Schedule>>;
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ScheduleManager: React.FC<ScheduleManagerProps> = ({ schedule, setSchedule }) => {
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFrequency = e.target.value as ScheduleFrequency;
    setSchedule(prev => ({
        ...prev,
        frequency: newFrequency,
        dayOfWeek: newFrequency === ScheduleFrequency.WEEKLY ? (prev.dayOfWeek ?? 1) : undefined,
        dayOfMonth: newFrequency === ScheduleFrequency.MONTHLY ? (prev.dayOfMonth ?? 1) : undefined,
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="frequency" className="text-sm font-medium text-gray-600 mb-1 block">
          Frequency
        </label>
        <select
          id="frequency"
          value={schedule.frequency}
          onChange={handleFrequencyChange}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
        >
          {Object.values(ScheduleFrequency).map(freq => (
            <option key={freq} value={freq}>{freq}</option>
          ))}
        </select>
      </div>

      {schedule.frequency !== ScheduleFrequency.NOT_SCHEDULED && (
        <div className="space-y-4 border-t pt-4">
            {schedule.frequency === ScheduleFrequency.WEEKLY && (
                 <div>
                    <label htmlFor="dayOfWeek" className="text-sm font-medium text-gray-600 mb-1 block">Day of the Week</label>
                    <select
                        id="dayOfWeek"
                        value={schedule.dayOfWeek}
                        onChange={(e) => setSchedule(prev => ({ ...prev, dayOfWeek: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                    >
                       {WEEKDAYS.map((day, index) => (
                           <option key={index} value={index}>{day}</option>
                       ))}
                    </select>
                </div>
            )}
            {schedule.frequency === ScheduleFrequency.MONTHLY && (
                <div>
                    <label htmlFor="dayOfMonth" className="text-sm font-medium text-gray-600 mb-1 block">Day of the Month</label>
                    <input
                        id="dayOfMonth"
                        type="number"
                        min="1"
                        max="31"
                        value={schedule.dayOfMonth ?? 1}
                        onChange={(e) => setSchedule(prev => ({ ...prev, dayOfMonth: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                    />
                </div>
            )}
           <div>
            <label htmlFor="time" className="text-sm font-medium text-gray-600 mb-1 block">Time</label>
            <input
                id="time"
                type="time"
                value={schedule.time}
                onChange={(e) => setSchedule(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
            />
           </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;
