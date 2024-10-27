import React, { useState } from 'react';

interface ReadingTimeCalculatorProps {
  onCalculate: (minutes: number) => void;
}

const ReadingTimeCalculator: React.FC<ReadingTimeCalculatorProps> = ({ onCalculate }) => {
  const [text, setText] = useState('');
  const [readingSpeed, setReadingSpeed] = useState('200');

  const calculateReadingTime = () => {
    const wordCount = text.trim().split(/\s+/).length;
    const wordsPerMinute = parseInt(readingSpeed);
    const minutes = wordCount / wordsPerMinute;
    onCalculate(minutes);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Reading Time Calculator</h2>
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded h-32"
          placeholder="Paste your text here..."
        />
        <div className="flex items-center space-x-4">
          <label className="text-gray-700">Reading Speed (words per minute):</label>
          <select
            value={readingSpeed}
            onChange={(e) => setReadingSpeed(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="150">Slow (150 wpm)</option>
            <option value="200">Average (200 wpm)</option>
            <option value="300">Fast (300 wpm)</option>
            <option value="400">Speed Reader (400 wpm)</option>
          </select>
        </div>
        <button
          onClick={calculateReadingTime}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate Reading Time
        </button>
      </div>
    </div>
  );
};

export default ReadingTimeCalculator;