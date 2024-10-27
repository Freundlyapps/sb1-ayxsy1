import React from 'react';

const faqs = [
  {
    question: 'How accurate are the calculators?',
    answer: 'Our calculators are designed to provide highly accurate results following industry standards and best practices. We regularly validate and update our calculation methods to ensure precision.'
  },
  {
    question: 'Can I save my calculation results?',
    answer: 'Yes, most of our calculators allow you to save results locally or export them in various formats for future reference.'
  },
  {
    question: 'Are the calculators free to use?',
    answer: 'Yes, all basic calculator functions are free to use. We also offer premium features for professional users requiring advanced functionality.'
  },
  {
    question: 'How often are calculators updated?',
    answer: 'We regularly update our calculators to reflect the latest industry standards, regulations, and user feedback. Updates are typically rolled out monthly.'
  },
  {
    question: 'Can I suggest a new calculator?',
    answer: 'Absolutely! We welcome suggestions from our users. You can submit your ideas through our contact form or email us directly.'
  },
  {
    question: 'Are the calculations suitable for professional use?',
    answer: 'Yes, our calculators are designed for both professional and personal use, following industry standards and best practices.'
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about our calculators</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;