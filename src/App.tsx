import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Calculators from './pages/Calculators';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Guide from './pages/Guide';

// Import calculator components
import ConstructionCalculator from './components/calculators/ConstructionCalculator';
import FinanceCalculator from './components/calculators/FinanceCalculator';
import HealthCalculator from './components/calculators/HealthCalculator';
import EnvironmentalCalculator from './components/calculators/EnvironmentalCalculator';
import EducationCalculator from './components/calculators/EducationCalculator';
import EnergyCalculator from './components/calculators/EnergyCalculator';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/calculators/construction/*" element={<ConstructionCalculator />} />
            <Route path="/calculators/finance/*" element={<FinanceCalculator />} />
            <Route path="/calculators/health/*" element={<HealthCalculator />} />
            <Route path="/calculators/environmental/*" element={<EnvironmentalCalculator />} />
            <Route path="/calculators/education/*" element={<EducationCalculator />} />
            <Route path="/calculators/energy/*" element={<EnergyCalculator />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/guide" element={<Guide />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;