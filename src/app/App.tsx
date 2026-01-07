import { Navigation } from './components/navigation';
import { Hero } from './components/hero';
import { ProofBand } from './components/proof-band';
import { Services } from './components/services';
import { CaseStudies } from './components/case-studies';
import { Contact } from './components/contact';
import { Footer } from './components/footer';
import { AdminSubmissions } from './components/admin-submissions';
import { useState, useEffect } from 'react';

export default function App() {
  // Simple routing based on URL hash with state to trigger re-renders
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');
  
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Admin page
  if (currentPath === '/admin') {
    return <AdminSubmissions />;
  }
  
  // Main website
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ProofBand />
      <Services />
      <CaseStudies />
      <Contact />
      <Footer />
    </div>
  );
}