import React from 'react';
import { Download } from 'lucide-react';

interface ResultData {
  id: string;
  type: string;
  date: string;
  data: any;
}

interface ResultsManagerProps {
  result: ResultData;
  onSave: () => void;
  onExport: (format: 'pdf' | 'csv' | 'json') => void;
}

const ResultsManager: React.FC<ResultsManagerProps> = ({ result, onSave, onExport }) => {
  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onSave}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Save Result
        </button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Export as:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => onExport('pdf')}
              className="flex items-center px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              <Download className="h-4 w-4 mr-1" />
              PDF
            </button>
            <button
              onClick={() => onExport('csv')}
              className="flex items-center px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              <Download className="h-4 w-4 mr-1" />
              CSV
            </button>
            <button
              onClick={() => onExport('json')}
              className="flex items-center px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              <Download className="h-4 w-4 mr-1" />
              JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsManager;