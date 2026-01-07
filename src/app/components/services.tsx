import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      number: "01",
      title: "Operational Media Systems",
      description: "Scalable media systems designed to support onboarding, safety protocols, internal communication, and operational execution across teams and locations.",
      capabilities: [
        "Onboarding and training systems",
        "Safety and compliance media",
        "Internal communication frameworks",
        "Cross-team execution support"
      ]
    },
    {
      number: "02",
      title: "Enterprise Content Production",
      description: "High-end production built to enterprise, government, and broadcast-level standards for operational use, public education, recruitment, and institutional messaging.",
      capabilities: [
        "Broadcast-grade production",
        "Government and institutional standards",
        "Recruitment and education content",
        "Operational documentation"
      ]
    },
    {
      number: "03",
      title: "Distribution & Enablement Platforms",
      description: "Systems for deploying, managing, and scaling content across organizations—including LMS integration, internal portals, and long-term content management.",
      capabilities: [
        "LMS deployment and integration",
        "Internal platform development",
        "Version control and updates",
        "Long-term content governance"
      ]
    },
    {
      number: "04",
      title: "Safety & Compliance Enablement",
      description: "Training and safety content designed for compliance-driven and safety-critical environments where accuracy, clarity, and institutional trust are non-negotiable.",
      capabilities: [
        "Compliance-ready training",
        "Safety protocol documentation",
        "Regulatory adherence",
        "Audit-ready content systems"
      ]
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % services.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + services.length) % services.length);
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl text-gray-900 mb-3 lg:mb-6">
            We don't just create content. We build operational systems.
          </h2>
          <p className="text-base lg:text-xl text-gray-600">
            Training, safety, and communication are outcomes of a larger system—one designed to scale clarity, consistency, and execution across organizations.
          </p>
        </div>

        {/* Services Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="border border-gray-200 p-8 hover:border-[#56c0ff] transition-colors group"
            >
              <div className="text-5xl text-gray-200 group-hover:text-[#56c0ff] transition-colors mb-6">
                {service.number}
              </div>
              
              <h3 className="text-2xl text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.capabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-[#034c7f] mt-2 flex-shrink-0"></div>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Current Slide */}
            <div className="border border-gray-200 p-6">
              <div className="text-4xl text-gray-200 mb-4">
                {services[currentSlide].number}
              </div>
              
              <h3 className="text-xl text-gray-900 mb-3">
                {services[currentSlide].title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {services[currentSlide].description}
              </p>
              
              <ul className="space-y-2">
                {services[currentSlide].capabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#034c7f] mt-1.5 flex-shrink-0"></div>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handlePrevSlide}
                className="p-2 border border-gray-200 hover:border-[#56c0ff] hover:bg-[#56c0ff]/10 transition-colors"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-5 h-5 text-[#034c7f]" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-[#034c7f]' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to service ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                className="p-2 border border-gray-200 hover:border-[#56c0ff] hover:bg-[#56c0ff]/10 transition-colors"
                aria-label="Next service"
              >
                <ChevronRight className="w-5 h-5 text-[#034c7f]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}