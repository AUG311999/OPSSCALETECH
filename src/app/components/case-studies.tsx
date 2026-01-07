import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useAssets } from '../hooks/use-assets';

export function CaseStudies() {
  const { assets } = useAssets();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedStudies, setExpandedStudies] = useState<Set<number>>(new Set());
  
  // Log assets for debugging
  console.log('Case studies assets:', assets);
  
  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedStudies);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedStudies(newExpanded);
  };

  const caseStudies = [
    {
      client: "Amazon",
      industry: "Enterprise Operations & Logistics",
      context: "Delivered video and production services supporting internal operational initiatives within one of the world's most complex logistics operations.",
      delivery: "Provided production services for internal training and communication content. Worked embedded within fast-moving operational teams, navigating enterprise stakeholder workflows and approval processes.",
      impact: "Demonstrated capability to operate at enterprise scale with complex internal coordination requirements and accelerated timelines.",
      capabilities: [
        "Enterprise stakeholder management",
        "High-volume operational environments",
        "Internal coordination at scale"
      ]
    },
    {
      client: "CDC (Centers for Disease Control & Prevention)",
      industry: "Public Health & Safety",
      context: "Produced visual storytelling and media content for healthcare and public safety education, published through official CDC channels.",
      delivery: "Created educational and informational content requiring strict adherence to accuracy, clarity, and public trust standards. Content met federal requirements for tone, messaging, and accessibility.",
      impact: "Proven ability to operate in safety-critical and compliance-driven environments where accuracy and institutional credibility are non-negotiable.",
      capabilities: [
        "Compliance-ready content production",
        "Safety-critical communication",
        "Federal standards adherence"
      ]
    },
    {
      client: "Healthcare System (OB-GYN Fellowship Program)",
      industry: "Medical Education & Recruitment",
      context: "Developed recruitment and training content for a medical fellowship program requiring both human storytelling and institutional authority.",
      delivery: "Produced content that balanced personal narrative with clinical credibility. Delivered assets used across digital recruitment channels and internal training platforms.",
      impact: "Content outperformed previous recruitment efforts and contributed to measurable program enrollment outcomes. Demonstrates ability to create functional content, not just polished visuals.",
      capabilities: [
        "Performance-driven content",
        "Healthcare sector experience",
        "Recruitment effectiveness"
      ]
    },
    {
      client: "Peacock / NBCUniversal",
      industry: "Broadcast & Streaming Media",
      context: "Worked at broadcast and network-grade production standards, meeting expectations for quality control, storytelling, and technical execution.",
      delivery: "Produced content at the quality level required for national broadcast and streaming distribution. Managed workflows aligned with network production standards.",
      impact: "Established track record working at the highest tier of media production. Understands how to make complex information visually clear at enterprise scale.",
      capabilities: [
        "Broadcast-quality production",
        "Network-grade standards",
        "Large-scale distribution"
      ]
    },
    {
      client: "JetBlue Airways",
      industry: "Aviation & Consumer Brands",
      context: "Produced media content aligned with national brand standards for a major airline with established visual identity and customer trust requirements.",
      delivery: "Created content that operated within existing brand guidelines, tone standards, and messaging frameworks. Maintained consistency with organizational voice and visual systems.",
      impact: "Proven ability to integrate into established brand ecosystems without disruption. Understands the importance of consistency and control in customer-facing environments.",
      capabilities: [
        "Brand consistency adherence",
        "Large-scale brand experience",
        "Operational integration"
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <section id="case-studies" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl text-gray-900 mb-3 lg:mb-6">
            Experience operating at scale
          </h2>
          <p className="text-base lg:text-xl text-gray-600">
            Ops Scale has supported media and operational initiatives across a range of enterprise and institutional environments.
          </p>
        </div>

        {/* Case Studies - Desktop Compact Format */}
        <div className="hidden lg:block space-y-6">
          {caseStudies.map((study, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 hover:border-[#56c0ff] transition-colors"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                {/* Logo Section - Compact */}
                <div className="lg:col-span-3 bg-gray-50 flex items-center justify-center p-8 border-r border-gray-200">
                  {/* Amazon Logo */}
                  {study.client === "Amazon" && (
                    <img src={assets['amazon-logo']} alt="Amazon Logo" className="w-full h-auto object-contain px-8" />
                  )}
                  
                  {/* CDC */}
                  {study.client === "CDC (Centers for Disease Control & Prevention)" && (
                    <img src={assets['cdc-logo']} alt="CDC Logo" className="w-full h-auto object-contain px-8" />
                  )}
                  
                  {/* Healthcare */}
                  {study.client === "Healthcare System (OB-GYN Fellowship Program)" && (
                    <img src={assets['healthcare-logo']} alt="Healthcare Logo" className="w-full h-auto object-contain px-8" />
                  )}
                  
                  {/* NBCUniversal */}
                  {study.client === "Peacock / NBCUniversal" && (
                    <img src={assets['peacock-logo']} alt="Peacock Logo" className="w-full h-auto object-contain px-8" />
                  )}
                  
                  {/* JetBlue */}
                  {study.client === "JetBlue Airways" && (
                    <img src={assets['jetblue-logo']} alt="JetBlue Logo" className="w-full h-auto object-contain px-8" />
                  )}
                </div>

                {/* Content - Compact */}
                <div className="lg:col-span-9 p-8">
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div>
                      <h3 className="text-2xl text-gray-900 mb-2">
                        {study.client}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="h-px w-8 bg-[#56c0ff]"></div>
                        <span className="text-xs text-gray-500 tracking-wider uppercase">
                          {study.industry}
                        </span>
                      </div>
                    </div>
                    
                    {/* Key Capabilities - Inline */}
                    <div className="hidden lg:flex flex-wrap gap-2 max-w-md">
                      {study.capabilities.map((capability, idx) => (
                        <div 
                          key={idx}
                          className="px-2 py-1 bg-gray-50 border border-gray-200 text-xs text-gray-700 whitespace-nowrap"
                        >
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Always Visible: Context */}
                  <div className="mb-4">
                    <h4 className="text-xs tracking-wider text-gray-500 uppercase mb-2">
                      Context
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {study.context}
                    </p>
                  </div>

                  {/* Expandable Content */}
                  {expandedStudies.has(index) && (
                    <div className="grid md:grid-cols-2 gap-6 text-sm mb-4">
                      <div>
                        <h4 className="text-xs tracking-wider text-gray-500 uppercase mb-2">
                          Delivery
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {study.delivery}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs tracking-wider text-gray-500 uppercase mb-2">
                          What This Demonstrates
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {study.impact}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Read More / Read Less Button */}
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="text-sm text-[#034c7f] hover:text-[#56c0ff] transition-colors font-medium"
                  >
                    {expandedStudies.has(index) ? 'Read Less' : 'Read More'}
                  </button>

                  {/* Capabilities - Mobile */}
                  <div className="lg:hidden flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                    {study.capabilities.map((capability, idx) => (
                      <div 
                        key={idx}
                        className="px-2 py-1 bg-gray-50 border border-gray-200 text-xs text-gray-700"
                      >
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Current Case Study */}
            <div className="bg-white border border-gray-200">
              {/* Logo Section */}
              <div className="bg-gray-50 flex items-center justify-center p-8 border-b border-gray-200">
                {caseStudies[currentSlide].client === "Amazon" && (
                  <img src={assets['amazon-logo']} alt="Amazon Logo" className="w-1/2 h-auto object-contain" />
                )}
                {caseStudies[currentSlide].client === "CDC (Centers for Disease Control & Prevention)" && (
                  <img src={assets['cdc-logo']} alt="CDC Logo" className="w-1/2 h-auto object-contain" />
                )}
                {caseStudies[currentSlide].client === "Healthcare System (OB-GYN Fellowship Program)" && (
                  <img src={assets['healthcare-logo']} alt="Healthcare Logo" className="w-1/2 h-auto object-contain" />
                )}
                {caseStudies[currentSlide].client === "Peacock / NBCUniversal" && (
                  <img src={assets['peacock-logo']} alt="Peacock Logo" className="w-1/2 h-auto object-contain" />
                )}
                {caseStudies[currentSlide].client === "JetBlue Airways" && (
                  <img src={assets['jetblue-logo']} alt="JetBlue Logo" className="w-1/2 h-auto object-contain" />
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl text-gray-900 mb-2">
                  {caseStudies[currentSlide].client}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-6 bg-[#56c0ff]"></div>
                  <span className="text-xs text-gray-500 tracking-wider uppercase">
                    {caseStudies[currentSlide].industry}
                  </span>
                </div>

                {/* Always Visible: Context */}
                <div className="mb-4">
                  <h4 className="text-xs tracking-wider text-gray-500 uppercase mb-1">
                    Context
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {caseStudies[currentSlide].context}
                  </p>
                </div>

                {/* Expandable Content */}
                {expandedStudies.has(currentSlide) && (
                  <div className="space-y-4 text-sm mb-4">
                    <div>
                      <h4 className="text-xs tracking-wider text-gray-500 uppercase mb-1">
                        Delivery
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {caseStudies[currentSlide].delivery}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs tracking-wider text-gray-500 uppercase mb-1">
                        What This Demonstrates
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {caseStudies[currentSlide].impact}
                      </p>
                    </div>
                  </div>
                )}

                {/* Read More / Read Less Button */}
                <button
                  onClick={() => toggleExpanded(currentSlide)}
                  className="text-sm text-[#034c7f] hover:text-[#56c0ff] transition-colors font-medium mb-4"
                >
                  {expandedStudies.has(currentSlide) ? 'Read Less' : 'Read More'}
                </button>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                  {caseStudies[currentSlide].capabilities.map((capability, idx) => (
                    <div 
                      key={idx}
                      className="px-2 py-1 bg-gray-50 border border-gray-200 text-xs text-gray-700"
                    >
                      {capability}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevSlide}
                className="p-2 border border-gray-200 hover:border-[#56c0ff] hover:bg-[#56c0ff]/10 transition-colors"
                aria-label="Previous case study"
              >
                <ChevronLeft className="w-5 h-5 text-[#034c7f]" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-[#034c7f]' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to case study ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 border border-gray-200 hover:border-[#56c0ff] hover:bg-[#56c0ff]/10 transition-colors"
                aria-label="Next case study"
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