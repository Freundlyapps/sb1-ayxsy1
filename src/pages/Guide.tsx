import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calculator, Heart, Leaf, LightbulbIcon, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';

interface Example {
  title: string;
  inputs: { [key: string]: string };
  result: string;
}

interface CalculatorGuide {
  name: string;
  path: string;
  description: string;
  howTo: string[];
  tips: string[];
  examples: Example[];
}

interface GuideCategory {
  id: string;
  icon: any;
  title: string;
  description: string;
  calculators: CalculatorGuide[];
}

const Guide = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const guides: GuideCategory[] = [
    {
      id: 'construction',
      icon: Building2,
      title: 'Construction Calculators',
      description: 'Professional tools for construction and engineering calculations',
      calculators: [
        {
          name: 'Concrete Volume Calculator',
          path: '/calculators/construction/concrete',
          description: 'Calculate concrete volume for your construction projects',
          howTo: [
            'Enter length of the area in meters',
            'Enter width of the area in meters',
            'Enter depth/thickness in meters',
            'Calculate total concrete volume needed'
          ],
          tips: [
            'Always include extra for wastage (typically 10%)',
            'Consider site conditions and access',
            'Verify all measurements twice',
            'Account for reinforcement displacement'
          ],
          examples: [
            {
              title: 'Concrete Slab',
              inputs: {
                'Length': '10 meters',
                'Width': '5 meters',
                'Depth': '0.15 meters'
              },
              result: '7.5 cubic meters'
            }
          ]
        },
        {
          name: 'Brick Calculator',
          path: '/calculators/construction/brick',
          description: 'Calculate number of bricks needed for walls',
          howTo: [
            'Enter wall length in meters',
            'Enter wall height in meters',
            'Select brick size (standard/large)',
            'Calculate total bricks needed'
          ],
          tips: [
            'Add 10% extra for breakage',
            'Consider mortar joints',
            'Account for openings (doors/windows)',
            'Check local brick sizes'
          ],
          examples: [
            {
              title: 'Wall Construction',
              inputs: {
                'Wall Length': '5 meters',
                'Wall Height': '3 meters',
                'Brick Size': 'Standard'
              },
              result: '450 bricks'
            }
          ]
        }
      ]
    },
    {
      id: 'finance',
      icon: Calculator,
      title: 'Financial Calculators',
      description: 'Comprehensive tools for financial planning and analysis',
      calculators: [
        {
          name: 'ROI Calculator',
          path: '/calculators/finance/roi',
          description: 'Calculate return on investment',
          howTo: [
            'Enter initial investment amount',
            'Input final value',
            'Specify time period',
            'Calculate ROI percentage'
          ],
          tips: [
            'Include all costs and fees',
            'Consider inflation rate',
            'Account for taxes',
            'Compare with alternative investments'
          ],
          examples: [
            {
              title: 'Stock Investment',
              inputs: {
                'Initial Investment': '$10,000',
                'Final Value': '$12,500',
                'Time Period': '2 years'
              },
              result: '12.5% annual ROI'
            }
          ]
        },
        {
          name: 'Loan Calculator',
          path: '/calculators/finance/loan',
          description: 'Calculate loan payments and interest',
          howTo: [
            'Enter loan amount',
            'Input interest rate',
            'Specify loan term',
            'Calculate monthly payments'
          ],
          tips: [
            'Consider additional fees',
            'Check for prepayment penalties',
            'Compare different loan terms',
            'Include insurance costs'
          ],
          examples: [
            {
              title: 'Mortgage Calculation',
              inputs: {
                'Loan Amount': '$300,000',
                'Interest Rate': '3.5%',
                'Term': '30 years'
              },
              result: '$1,347 monthly payment'
            }
          ]
        }
      ]
    },
    {
      id: 'health',
      icon: Heart,
      title: 'Health Calculators',
      description: 'Tools for health monitoring and fitness tracking',
      calculators: [
        {
          name: 'BMI Calculator',
          path: '/calculators/health/bmi',
          description: 'Calculate Body Mass Index',
          howTo: [
            'Select unit system (metric/imperial)',
            'Enter height',
            'Enter weight',
            'Calculate BMI value'
          ],
          tips: [
            'Measure height without shoes',
            'Weigh yourself in the morning',
            'Use consistent units',
            'Track changes over time'
          ],
          examples: [
            {
              title: 'Adult BMI',
              inputs: {
                'Height': '175 cm',
                'Weight': '70 kg'
              },
              result: 'BMI: 22.9 (Normal weight)'
            }
          ]
        },
        {
          name: 'Calorie Calculator',
          path: '/calculators/health/calories',
          description: 'Calculate daily calorie needs',
          howTo: [
            'Enter age, gender, and weight',
            'Select activity level',
            'Input height',
            'Calculate daily calories'
          ],
          tips: [
            'Be honest about activity level',
            'Update as lifestyle changes',
            'Consider medical conditions',
            'Consult healthcare provider'
          ],
          examples: [
            {
              title: 'Daily Calories',
              inputs: {
                'Age': '30 years',
                'Weight': '70 kg',
                'Activity': 'Moderate'
              },
              result: '2,500 calories/day'
            }
          ]
        }
      ]
    },
    // Keep existing Environmental, Education, and Energy categories...
    {
      id: 'environmental',
      icon: Leaf,
      title: 'Environmental Impact Calculators',
      description: 'Calculate and analyze environmental metrics',
      calculators: [
        {
          name: 'Carbon Footprint Calculator',
          path: '/calculators/environmental/carbon-footprint',
          description: 'Calculate your annual carbon emissions',
          howTo: [
            'Enter monthly electricity usage',
            'Input natural gas consumption',
            'Add vehicle mileage',
            'Include flight hours',
            'Calculate total emissions'
          ],
          tips: [
            'Use utility bills for accurate data',
            'Include all transportation methods',
            'Consider seasonal variations',
            'Track changes over time'
          ],
          examples: [
            {
              title: 'Household Carbon Footprint',
              inputs: {
                'Monthly Electricity': '900 kWh',
                'Natural Gas': '50 therms',
                'Car Miles': '1,000 miles',
                'Flights': '10 hours'
              },
              result: '12,500 kg CO2/year'
            }
          ]
        }
      ]
    },
    {
      id: 'education',
      icon: GraduationCap,
      title: 'Educational Calculators',
      description: 'Academic and educational calculation tools',
      calculators: [
        {
          name: 'GPA Calculator',
          path: '/calculators/education/gpa',
          description: 'Calculate Grade Point Average',
          howTo: [
            'Enter course names',
            'Input credit hours',
            'Add letter grades or percentages',
            'Calculate cumulative GPA'
          ],
          tips: [
            'Include all courses',
            'Verify credit hours',
            'Double-check grade values',
            'Save calculations for records'
          ],
          examples: [
            {
              title: 'Semester GPA',
              inputs: {
                'Math (3 credits)': 'A',
                'Science (4 credits)': 'B+',
                'English (3 credits)': 'A-'
              },
              result: '3.67 GPA'
            }
          ]
        }
      ]
    },
    {
      id: 'energy',
      icon: LightbulbIcon,
      title: 'Energy Efficiency Calculators',
      description: 'Tools for energy consumption and savings',
      calculators: [
        {
          name: 'Home Energy Calculator',
          path: '/calculators/energy/home',
          description: 'Calculate home energy consumption and costs',
          howTo: [
            'Enter monthly electricity usage',
            'Input heating and cooling costs',
            'Add water heating expenses',
            'Include appliance usage',
            'Calculate total energy costs'
          ],
          tips: [
            'Use actual utility bills',
            'Track seasonal variations',
            'Consider peak usage times',
            'Identify efficiency opportunities'
          ],
          examples: [
            {
              title: 'Monthly Energy Usage',
              inputs: {
                'Electricity': '$120',
                'Heating': '$80',
                'Cooling': '$60',
                'Water Heating': '$40'
              },
              result: '$300 total monthly cost'
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculator Guide</h1>
          <p className="text-xl text-gray-600">Comprehensive guides for all our calculators</p>
        </div>

        <div className="space-y-8">
          {guides.map((category) => {
            const IconComponent = category.icon;
            const isExpanded = expandedCategory === category.id;

            return (
              <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <IconComponent className="h-6 w-6 text-blue-600 mr-3" />
                    <div className="text-left">
                      <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-6 border-t border-gray-100">
                    <div className="space-y-8">
                      {category.calculators.map((calc, index) => (
                        <div key={index} className="space-y-4">
                          <Link
                            to={calc.path}
                            className="text-lg font-semibold text-blue-600 hover:text-blue-700"
                          >
                            {calc.name}
                          </Link>
                          <p className="text-gray-600">{calc.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-2">How to Use:</h4>
                              <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {calc.howTo.map((step, i) => (
                                  <li key={i}>{step}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Tips:</h4>
                              <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {calc.tips.map((tip, i) => (
                                  <li key={i}>{tip}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Example:</h4>
                            {calc.examples.map((example, i) => (
                              <div key={i}>
                                <p className="font-medium">{example.title}</p>
                                <div className="mt-2 space-y-1 text-gray-600">
                                  <p>Inputs:</p>
                                  <ul className="list-disc list-inside">
                                    {Object.entries(example.inputs).map(([key, value]) => (
                                      <li key={key}>{key}: {value}</li>
                                    ))}
                                  </ul>
                                  <p>Result: {example.result}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Guide;