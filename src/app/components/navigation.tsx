import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useAssets } from '../hooks/use-assets';
import { UploadModal } from './upload-modal';

export function Navigation() {
  const { assets, refreshAssets } = useAssets();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <img src={assets['ops-scale-logo']} alt="Ops Scale" className="h-12" />
            </div>
            
            {/* Mobile Upload Button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowUploadModal(true)}
                className="p-2.5 border border-gray-300 hover:border-[#56c0ff] hover:bg-[#56c0ff]/10 transition-colors rounded"
                title="Upload Assets"
              >
                <Upload className="w-4 h-4 text-[#034c7f]" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-600 hover:text-[#034c7f] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('case-studies')}
                className="text-gray-600 hover:text-[#034c7f] transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2.5 bg-gradient-to-r from-[#034c7f] to-[#56c0ff] text-white hover:opacity-90 transition-opacity"
              >
                Contact
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="p-2.5 border border-gray-300 hover:border-[#56c0ff] hover:bg-[#56c0ff]/10 transition-colors rounded"
                title="Upload Assets"
              >
                <Upload className="w-4 h-4 text-[#034c7f]" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <UploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onComplete={refreshAssets}
      />
    </>
  );
}