import React from 'react';
import { Building2, Calculator, Heart, Leaf } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About YourCalculator</h1>
          <p className="text-xl text-gray-600">Your trusted source for professional calculations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              At YourCalculator, we're dedicated to providing professionals and businesses with accurate, 
              reliable, and easy-to-use calculation tools. Our mission is to simplify complex 
              calculations across various industries while maintaining the highest standards of 
              precision and reliability.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where professionals can access trusted calculation tools instantly, 
              making informed decisions with confidence. Our commitment to accuracy, user experience, 
              and continuous improvement drives us to be the leading calculator platform across all 
              industries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted Results</h3>
            <p className="text-gray-600">Industry-standard calculations you can rely on</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Professional Tools</h3>
            <p className="text-gray-600">Built by experts for professional use</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">User-Focused</h3>
            <p className="text-gray-600">Designed with our users in mind</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Leaf className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Always Improving</h3>
            <p className="text-gray-600">Continuously updated and enhanced</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Accuracy</h3>
              <p className="text-gray-600">
                Every calculation is verified against industry standards to ensure precise results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Reliability</h3>
              <p className="text-gray-600">
                Our tools are thoroughly tested and maintained for consistent performance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously update our calculators with the latest industry developments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;