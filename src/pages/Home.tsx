import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calculator, Heart, Leaf, LightbulbIcon, GraduationCap } from 'lucide-react';

const categories = [
  {
    icon: Building2,
    title: 'Construction',
    description: 'Calculate volumes, costs, and load-bearing capacities for construction projects.',
    link: '/calculators/construction'
  },
  {
    icon: Calculator,
    title: 'Finance',
    description: 'Plan investments, calculate loans, and analyze financial metrics.',
    link: '/calculators/finance'
  },
  {
    icon: Heart,
    title: 'Health',
    description: 'Track fitness goals, calculate BMI, and monitor health metrics.',
    link: '/calculators/health'
  },
  {
    icon: Leaf,
    title: 'Environmental',
    description: 'Measure carbon footprint and calculate environmental impact.',
    link: '/calculators/environmental'
  },
  {
    icon: LightbulbIcon,
    title: 'Energy',
    description: 'Analyze energy efficiency and calculate potential savings.',
    link: '/calculators/energy'
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Calculate grades, GPA, and other academic metrics.',
    link: '/calculators/education'
  }
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Calculators for Every Industry
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Precise calculations for construction, finance, health, and more
            </p>
            <Link
              to="/calculators/construction"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
            >
              Explore Calculators
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Calculator Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.title}
                  to={category.link}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                  </div>
                  <p className="text-gray-600">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Calculators?</h2>
            <p className="text-gray-600">Professional-grade tools trusted by industry experts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Results</h3>
              <p className="text-gray-600">Precise calculations you can trust for professional use</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <LightbulbIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">Intuitive interface designed for professionals</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry Standard</h3>
              <p className="text-gray-600">Following latest industry guidelines and regulations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;