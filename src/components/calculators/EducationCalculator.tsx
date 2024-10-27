import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import CalculatorNavigation from './CalculatorNavigation';
import GradeCalculator from './education/GradeCalculator';
import GPACalculator from './education/GPACalculator';
import ReadingTimeCalculator from './education/ReadingTimeCalculator';
import ScientificNotationCalculator from './education/ScientificNotationCalculator';

interface CalculationResult {
  grade?: number;
  gpa?: number;
  readingTime?: number;
  notation?: {
    scientific: string;
    decimal: string;
  };
}

const EducationCalculator: React.FC = () => {
  const [result, setResult] = useState<CalculationResult>({});

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Education Calculators</h1>
            </div>
            <p className="text-gray-600">Tools for academic calculations and analysis</p>
          </div>

          <GradeCalculator 
            onCalculate={(grade) => setResult({ ...result, grade })} 
          />
          {result.grade && (
            <div className="mt-4 p-4 bg-blue-50 rounded">
              <p className="text-blue-900">Final Grade: {result.grade.toFixed(2)}%</p>
            </div>
          )}

          <div className="mt-8">
            <GPACalculator 
              onCalculate={(gpa) => setResult({ ...result, gpa })} 
            />
            {result.gpa && (
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <p className="text-blue-900">GPA: {result.gpa.toFixed(2)}</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <ReadingTimeCalculator 
              onCalculate={(readingTime) => setResult({ ...result, readingTime })} 
            />
            {result.readingTime && (
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <p className="text-blue-900">
                  Estimated Reading Time: {Math.ceil(result.readingTime)} minutes
                </p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <ScientificNotationCalculator 
              onCalculate={(notation) => setResult({ ...result, notation })} 
            />
            {result.notation && (
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <p className="text-blue-900">Scientific Notation: {result.notation.scientific}</p>
                <p className="text-blue-900">Decimal Form: {result.notation.decimal}</p>
              </div>
            )}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">How to Use Education Calculators</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Grade Calculator</h3>
                <p className="text-gray-600">Enter assignment scores and their weights to calculate your final grade.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">GPA Calculator</h3>
                <p className="text-gray-600">Input course grades and credit hours to compute your GPA.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Reading Time Calculator</h3>
                <p className="text-gray-600">Paste text and select reading speed to estimate reading duration.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Scientific Notation Calculator</h3>
                <p className="text-gray-600">Convert between decimal numbers and scientific notation.</p>
              </div>
            </div>
          </div>

          <CalculatorNavigation currentCalculator="education" />
        </div>
      </div>
    </div>
  );
};

export default EducationCalculator;