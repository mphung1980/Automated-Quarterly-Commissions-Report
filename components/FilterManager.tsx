
import React, { useState } from 'react';
import { Filter, Operator } from '../types';
import { PlusIcon, TrashIcon } from './Icons';

interface FilterManagerProps {
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

const FilterManager: React.FC<FilterManagerProps> = ({ filters, setFilters }) => {
  const [newColumn, setNewColumn] = useState('');
  const [newOperator, setNewOperator] = useState<Operator>(Operator.EQUALS);
  const [newValue, setNewValue] = useState('');

  const addFilter = () => {
    if (newColumn.trim() && newValue.trim()) {
      const newFilter: Filter = {
        id: Date.now(),
        column: newColumn,
        operator: newOperator,
        value: newValue,
      };
      setFilters([...filters, newFilter]);
      setNewColumn('');
      setNewValue('');
      setNewOperator(Operator.EQUALS);
    }
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {filters.map(filter => (
          <div key={filter.id} className="flex items-center justify-between bg-gray-100 p-2 rounded-md text-sm">
            <span className="truncate">
              <span className="font-semibold text-gray-700">{filter.column}</span>
              <span className="text-gray-500 mx-1">{filter.operator}</span>
              <span className="font-mono bg-white px-1 rounded">{filter.value}</span>
            </span>
            <button onClick={() => removeFilter(filter.id)} className="ml-2 text-gray-400 hover:text-red-500 transition">
                <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        {filters.length === 0 && <p className="text-center text-sm text-gray-400 py-2">No filters added.</p>}
      </div>

      <div className="border-t pt-4 space-y-2">
        <input
          type="text"
          value={newColumn}
          onChange={e => setNewColumn(e.target.value)}
          placeholder="Column Name (e.g., Sales)"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
        />
        <select
          value={newOperator}
          onChange={e => setNewOperator(e.target.value as Operator)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
        >
          {Object.values(Operator).map(op => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
        <input
          type="text"
          value={newValue}
          onChange={e => setNewValue(e.target.value)}
          placeholder="Value (e.g., 1000)"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
        />
        <button
            onClick={addFilter}
            className="w-full mt-2 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
        >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Filter
        </button>
      </div>
    </div>
  );
};

export default FilterManager;
