import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center bg-gradient-to-br from-white via-[#56c0ff]/30 to-[#034c7f] text-gray-900 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 pt-28 lg:py-24 lg:pt-32">
        <div className="max-w-4xl">
          {/* Main Content */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl tracking-tight mb-6 text-gray-900">
            Scalable media and technology systems for operational growth
          </h1>
          
          <p className="text-xl text-gray-700 mb-4 leading-relaxed max-w-3xl">
            Ops Scale designs and deploys media and platform solutions that help organizations scale training, safety, onboarding, and internal communication across complex operations.
          </p>

          <p className="text-base text-gray-600 mb-10 leading-relaxed max-w-3xl">
            Built for enterprise, government, healthcare, logistics, and regulated environments.
          </p>
          
          <div className="flex flex-row gap-3 sm:gap-4 mb-12">
            <button
              onClick={scrollToContact}
              className="px-4 py-2.5 sm:px-8 sm:py-4 bg-white text-[#034c7f] hover:bg-white/90 transition-colors text-sm sm:text-base"
            >
              Start a Conversation
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('case-studies');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-4 py-2.5 sm:px-8 sm:py-4 border-2 border-[#034c7f] text-[#034c7f] hover:bg-[#034c7f] hover:text-white transition-colors text-sm sm:text-base"
            >
              View Experience
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}