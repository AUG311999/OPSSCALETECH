import { useAssets } from '../hooks/use-assets';

export function Footer() {
  const { assets } = useAssets();

  return (
    <footer className="bg-gray-900 text-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div>
            <img src={assets['ops-scale-logo']} alt="Ops Scale" className="h-12 mb-6 brightness-0 invert" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Enterprise training and safety content for organizations 
              with real operational risk.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm tracking-wider text-gray-400 uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Content Production</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Distribution Systems</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Knowledge Standardization</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm tracking-wider text-gray-400 uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#case-studies" className="text-gray-300 hover:text-white transition-colors">Experience</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-wider text-gray-400 uppercase mb-4">
              Contact
            </h4>
            <p className="text-sm text-gray-300">
              contact@opsscale.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Ops Scale. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}