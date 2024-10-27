import React, { useState } from 'react';

interface GPACalculatorProps {
  onCalculate: (gpa: number) => void;
}

const GPACalculator: React.FC<GPACalculatorProps> = ({ onCalculate }) => {
  const [courses, setCourses] = useState([
    { grade: '', credits: '', name: 'Course 1' }
  ]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { grade: '', credits: '', name: `Course ${courses.length + 1}` }
    ]);
  };

  const updateCourse = (index: number, field: 'grade' | 'credits' | 'name', value: string) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach(course => {
      const credits = parseFloat(course.credits);
      const grade = parseFloat(course.grade);

      if (!isNaN(credits) && !isNaN(grade)) {
        totalCredits += credits;
        totalPoints += (grade * credits);
      }
    });

    const gpa = totalPoints / totalCredits;
    onCalculate(gpa);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">GPA Calculator</h2>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={course.name}
              onChange={(e) => updateCourse(index, 'name', e.target.value)}
              className="p-2 border rounded"
              placeholder="Course Name"
            />
            <input
              type="number"
              value={course.grade}
              onChange={(e) => updateCourse(index, 'grade', e.target.value)}
              className="p-2 border rounded"
              placeholder="Grade Points (0-4)"
              min="0"
              max="4"
              step="0.1"
            />
            <input
              type="number"
              value={course.credits}
              onChange={(e) => updateCourse(index, 'credits', e.target.value)}
              className="p-2 border rounded"
              placeholder="Credit Hours"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 space-x-4">
        <button
          onClick={addCourse}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Add Course
        </button>
        <button
          onClick={calculateGPA}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate GPA
        </button>
      </div>
    </div>
  );
};

export default GPACalculator;