import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

interface SearchResult {
  title: string;
  description: string;
  path: string;
  type: 'calculator' | 'blog' | 'guide';
}

const calculators = [
  // Construction
  { title: 'Concrete Calculator', description: 'Calculate concrete volume for construction projects', path: '/calculators/construction/concrete', type: 'calculator' as const },
  { title: 'Brick Calculator', description: 'Calculate number of bricks needed for walls', path: '/calculators/construction/brick', type: 'calculator' as const },
  { title: 'Paint Calculator', description: 'Calculate paint coverage needed', path: '/calculators/construction/paint', type: 'calculator' as const },
  { title: 'Material Cost Calculator', description: 'Calculate construction material costs', path: '/calculators/construction/cost', type: 'calculator' as const },
  { title: 'Roofing Calculator', description: 'Calculate roofing materials needed', path: '/calculators/construction/roofing', type: 'calculator' as const },
  { title: 'Paver Calculator', description: 'Calculate paver materials needed', path: '/calculators/construction/paver', type: 'calculator' as const },
  
  // Finance
  { title: 'ROI Calculator', description: 'Calculate return on investment', path: '/calculators/finance/roi', type: 'calculator' as const },
  { title: 'Loan Calculator', description: 'Calculate loan payments and interest', path: '/calculators/finance/loan', type: 'calculator' as const },
  { title: 'Mortgage Calculator', description: 'Calculate mortgage affordability', path: '/calculators/finance/mortgage', type: 'calculator' as const },
  { title: 'Retirement Calculator', description: 'Plan your retirement savings', path: '/calculators/finance/retirement', type: 'calculator' as const },
  
  // Health
  { title: 'BMI Calculator', description: 'Calculate Body Mass Index', path: '/calculators/health/bmi', type: 'calculator' as const },
  { title: 'Calorie Calculator', description: 'Calculate daily calorie needs', path: '/calculators/health/calories', type: 'calculator' as const },
  { title: 'Body Fat Calculator', description: 'Calculate body fat percentage', path: '/calculators/health/body-fat', type: 'calculator' as const },
  { title: 'Macro Calculator', description: 'Calculate macro nutrient needs', path: '/calculators/health/macros', type: 'calculator' as const },
  
  // Environmental
  { title: 'Carbon Footprint Calculator', description: 'Calculate your carbon emissions', path: '/calculators/environmental/carbon-footprint', type: 'calculator' as const },
  { title: 'Water Usage Calculator', description: 'Calculate water consumption', path: '/calculators/environmental/water-usage', type: 'calculator' as const },
  
  // Energy
  { title: 'Solar Calculator', description: 'Calculate solar panel savings', path: '/calculators/energy/solar', type: 'calculator' as const },
  { title: 'Home Energy Calculator', description: 'Calculate home energy usage', path: '/calculators/energy/home', type: 'calculator' as const },
  { title: 'EV Savings Calculator', description: 'Compare EV vs gas vehicle costs', path: '/calculators/energy/ev', type: 'calculator' as const }
];

const guides = [
  { title: 'Construction Calculator Guide', description: 'Learn how to use construction calculators', path: '/guide#construction', type: 'guide' as const },
  { title: 'Financial Calculator Guide', description: 'Learn how to use financial calculators', path: '/guide#finance', type: 'guide' as const },
  { title: 'Health Calculator Guide', description: 'Learn how to use health calculators', path: '/guide#health', type: 'guide' as const },
  { title: 'Environmental Calculator Guide', description: 'Learn how to use environmental calculators', path: '/guide#environmental', type: 'guide' as const }
];

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    
    // Search calculators
    const calculatorResults = calculators.filter(calc => 
      calc.title.toLowerCase().includes(searchQuery) ||
      calc.description.toLowerCase().includes(searchQuery)
    );

    // Search guides
    const guideResults = guides.filter(guide =>
      guide.title.toLowerCase().includes(searchQuery) ||
      guide.description.toLowerCase().includes(searchQuery)
    );

    // Search blog posts
    const blogResults = Object.values(blogPosts)
      .filter(post =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.excerpt.toLowerCase().includes(searchQuery) ||
        post.content.toLowerCase().includes(searchQuery)
      )
      .map(post => ({
        title: post.title,
        description: post.excerpt,
        path: `/blog/${post.id}`,
        type: 'blog' as const
      }));

    setResults([...calculatorResults, ...guideResults, ...blogResults]);
  }, [query]);

  const handleResultClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'calculator':
        return '🧮';
      case 'guide':
        return '📖';
      case 'blog':
        return '📝';
      default:
        return '📄';
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-screen max-w-3xl bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4">
            <div className="flex items-center border-b pb-2">
              <SearchIcon className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-gray-700"
                placeholder="Search calculators, guides, and blog posts..."
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {results.length > 0 ? (
              <div className="mt-4 max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result.path)}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{getTypeIcon(result.type)}</span>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{result.title}</h4>
                        <p className="text-sm text-gray-500">{result.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query && (
              <div className="mt-4 text-center text-gray-500">
                No results found for "{query}"
              </div>
            )}

            {!query && (
              <div className="mt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Popular Searches
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setQuery('mortgage')}
                    className="text-left p-2 hover:bg-gray-50 rounded"
                  >
                    Mortgage Calculator
                  </button>
                  <button
                    onClick={() => setQuery('bmi')}
                    className="text-left p-2 hover:bg-gray-50 rounded"
                  >
                    BMI Calculator
                  </button>
                  <button
                    onClick={() => setQuery('solar')}
                    className="text-left p-2 hover:bg-gray-50 rounded"
                  >
                    Solar Savings
                  </button>
                  <button
                    onClick={() => setQuery('concrete')}
                    className="text-left p-2 hover:bg-gray-50 rounded"
                  >
                    Concrete Calculator
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;