
import React, { useState, useCallback } from 'react';
import { Filter, Operator, Schedule, ScheduleFrequency } from './types';
import { generateWorkflowSummary } from './services/geminiService';
import Header from './components/Header';
import WorkflowStep from './components/WorkflowStep';
import FilterManager from './components/FilterManager';
import ScheduleManager from './components/ScheduleManager';
import { DomoIcon, FilterIcon, GSheetIcon, ScheduleIcon, SparklesIcon, AlertIcon } from './components/Icons';
import SummaryDisplay from './components/SummaryDisplay';

const App: React.FC = () => {
  const [domoCardId, setDomoCardId] = useState<string>('7a4f-c12b-432d');
  const [filters, setFilters] = useState<Filter[]>([
    { id: 1, column: 'Sales', operator: Operator.GREATER_THAN, value: '10000' },
    { id: 2, column: 'Region', operator: Operator.EQUALS, value: 'North America' },
  ]);
  const [googleSheetUrl, setGoogleSheetUrl] = useState<string>('https://docs.google.com/spreadsheets/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ...');
  
  const [schedule, setSchedule] = useState<Schedule>({
    frequency: ScheduleFrequency.DAILY,
    time: '09:00',
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRunWorkflow = useCallback(async () => {
    setIsRunning(true);
    setError('');
    setSummary('');

    if (!domoCardId || !googleSheetUrl || filters.length === 0) {
        setError('Please configure all steps before running the workflow.');
        setIsRunning(false);
        return;
    }

    try {
      const result = await generateWorkflowSummary(domoCardId, filters, googleSheetUrl, schedule);
      setSummary(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate workflow summary. Please check your connection and try again.');
    } finally {
      setIsRunning(false);
    }
  }, [domoCardId, filters, googleSheetUrl, schedule]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            <WorkflowStep
                icon={<DomoIcon className="h-8 w-8 text-white"/>}
                title="1. Source Data"
                description="Specify the Domo Card to pull data from."
            >
                <label htmlFor="domoCard" className="text-sm font-medium text-gray-600 mb-1 block">Domo Card ID</label>
                <input
                id="domoCard"
                type="text"
                value={domoCardId}
                onChange={(e) => setDomoCardId(e.target.value)}
                placeholder="e.g., 7a4f-c12b-432d"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition bg-gray-100"
                />
            </WorkflowStep>

            <WorkflowStep
                icon={<FilterIcon className="h-8 w-8 text-white" />}
                title="2. Filter Criteria"
                description="Define rules to filter the dataset."
            >
                <FilterManager filters={filters} setFilters={setFilters} />
            </WorkflowStep>

            <WorkflowStep
                icon={<GSheetIcon className="h-8 w-8 text-white"/>}
                title="3. Export Destination"
                description="Provide the Google Sheet URL for export."
            >
                <label htmlFor="gsheetUrl" className="text-sm font-medium text-gray-600 mb-1 block">Google Sheet URL</label>
                <input
                id="gsheetUrl"
                type="text"
                value={googleSheetUrl}
                onChange={(e) => setGoogleSheetUrl(e.target.value)}
                placeholder="Enter Google Sheet URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition bg-gray-100"
                />
            </WorkflowStep>

            <WorkflowStep
                icon={<ScheduleIcon className="h-8 w-8 text-white"/>}
                title="4. Schedule"
                description="Set the automation interval for the workflow."
            >
                <ScheduleManager schedule={schedule} setSchedule={setSchedule} />
            </WorkflowStep>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleRunWorkflow}
            disabled={isRunning}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Summary...
              </>
            ) : (
                <>
                    <SparklesIcon className="h-6 w-6 mr-2"/>
                    Generate Workflow Summary
                </>
            )}
          </button>
        </div>

        {error && (
            <div className="mt-8 max-w-2xl mx-auto p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg flex items-center">
                <AlertIcon className="h-5 w-5 mr-3"/>
                <span>{error}</span>
            </div>
        )}

        <SummaryDisplay summary={summary} isLoading={isRunning} />

      </main>
    </div>
  );
};

export default App;
