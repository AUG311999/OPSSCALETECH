export function ProofBand() {
  const proofPoints = [
    "Experience supporting initiatives within Fortune 100, healthcare, aviation, and government-adjacent environments",
    "Content produced for organizations serving millions of people",
    "Work delivered across regulated, compliance-driven, and high-stakes operational contexts",
    "Broadcast- and enterprise-grade production standards"
  ];

  return (
    <section className="py-12 lg:py-16 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {proofPoints.map((point, index) => (
            <div 
              key={index}
              className="flex items-start gap-3"
            >
              <div className="w-1 h-1 bg-[#56c0ff] mt-2 flex-shrink-0"></div>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
