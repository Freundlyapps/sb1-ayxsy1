import React, { useState } from 'react';

interface GradeCalculatorProps {
  onCalculate: (grade: number) => void;
}

const GradeCalculator: React.FC<GradeCalculatorProps> = ({ onCalculate }) => {
  const [assignments, setAssignments] = useState([
    { score: '', weight: '', name: 'Assignment 1' }
  ]);

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { score: '', weight: '', name: `Assignment ${assignments.length + 1}` }
    ]);
  };

  const updateAssignment = (index: number, field: 'score' | 'weight', value: string) => {
    const newAssignments = [...assignments];
    newAssignments[index] = { ...newAssignments[index], [field]: value };
    setAssignments(newAssignments);
  };

  const calculateGrade = () => {
    let totalWeight = 0;
    let weightedScore = 0;

    assignments.forEach(assignment => {
      const score = parseFloat(assignment.score);
      const weight = parseFloat(assignment.weight);
      
      if (!isNaN(score) && !isNaN(weight)) {
        totalWeight += weight;
        weightedScore += (score * weight);
      }
    });

    const finalGrade = weightedScore / totalWeight;
    onCalculate(finalGrade);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Grade Calculator</h2>
      <div className="space-y-4">
        {assignments.map((assignment, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={assignment.name}
              onChange={(e) => {
                const newAssignments = [...assignments];
                newAssignments[index].name = e.target.value;
                setAssignments(newAssignments);
              }}
              className="p-2 border rounded"
              placeholder="Assignment Name"
            />
            <input
              type="number"
              value={assignment.score}
              onChange={(e) => updateAssignment(index, 'score', e.target.value)}
              className="p-2 border rounded"
              placeholder="Score (%)"
            />
            <input
              type="number"
              value={assignment.weight}
              onChange={(e) => updateAssignment(index, 'weight', e.target.value)}
              className="p-2 border rounded"
              placeholder="Weight (%)"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 space-x-4">
        <button
          onClick={addAssignment}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Add Assignment
        </button>
        <button
          onClick={calculateGrade}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate Grade
        </button>
      </div>
    </div>
  );
};

export default GradeCalculator;