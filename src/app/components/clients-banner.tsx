import { useAssets } from '../hooks/use-assets';

export function ClientsBanner() {
  const { assets } = useAssets();

  return (
    <section className="py-12 lg:py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm tracking-wider text-gray-500 uppercase">
            Experience Across Enterprise, Government, and Broadcast Environments
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {/* Amazon */}
          <div className="flex items-center justify-center">
            <img src={assets['amazon-logo']} alt="Amazon" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          
          {/* CDC */}
          <div className="flex items-center justify-center">
            <img src={assets['cdc-logo']} alt="CDC" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          
          {/* JetBlue */}
          <div className="flex items-center justify-center">
            <img src={assets['jetblue-logo']} alt="JetBlue Airways" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          
          {/* NBCUniversal / Peacock */}
          <div className="flex items-center justify-center">
            <img src={assets['peacock-logo']} alt="Peacock / NBCUniversal" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
}