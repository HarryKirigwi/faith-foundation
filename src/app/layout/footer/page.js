import React from 'react';
import { 
  Heart, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  BookOpen,
  Users,
  HandHeart
} from 'lucide-react';

const FaithFeedsFooter = () => {
  const quickLinks = [
    { name: 'About Us', href: '/pages/about' },
    { name: 'What We Do', href: '/pages/whatwedo' },
    { name: 'Projects', href: '/pages/projects' },
    { name: 'Volunteer', href: '/pages/volunteer' },
    { name: 'Contact', href: '/pages/about#contact' }
  ];

  const supportLinks = [
    { name: 'Donate Now', href: '#donate' },
    { name: 'Monthly Giving', href: '#monthly-giving' },
    { name: 'Corporate Partnerships', href: '#partnerships' },
    { name: 'Fundraising Events', href: '#events' },
    { name: 'Legacy Giving', href: '#legacy' }
  ];

  const resourceLinks = [
    { name: 'Faith Feeds Blog', href: '/pages/blog' },
    { name: 'Impact Stories', href: '#stories' },
    { name: 'Annual Reports', href: '#reports' },
    { name: 'News & Updates', href: '#news' },
    { name: 'Resources', href: '#resources' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#facebook' },
    { name: 'Twitter', icon: Twitter, href: '#twitter' },
    { name: 'Instagram', icon: Instagram, href: '#instagram' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #833556 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Organization Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="http://faithcp.rf.gd/wp-content/uploads/2025/06/FFI-LOGO.png" 
                alt="Faith Feeds International Logo" 
                className="h-10 w-auto"
              />
              <div>
                <span className="text-white font-bold text-lg">Faith Feeds International</span>
                <div className="text-sm text-gray-300 -mt-1">Transforming Lives</div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Connecting people with opportunities for transformation through faith, community support, and sustainable initiatives that create lasting change worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPin size={16} className="text-[#833556] flex-shrink-0" />
                <span>Global Headquarters, International</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone size={16} className="text-[#833556] flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail size={16} className="text-[#833556] flex-shrink-0" />
                <span>info@faithfeedsinternational.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <Globe size={20} className="mr-2 text-[#833556]" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#833556] transition-colors duration-300 text-sm flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <Heart size={20} className="mr-2 text-[#833556]" />
              Support Us
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#833556] transition-colors duration-300 text-sm flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <BookOpen size={20} className="mr-2 text-[#833556]" />
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#833556] transition-colors duration-300 text-sm flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white font-semibold text-xl mb-2 flex items-center">
                <Mail size={24} className="mr-3 text-[#833556]" />
                Stay Connected
              </h3>
              <p className="text-gray-300 text-sm">
                Get updates on our latest projects, success stories, and ways to make a difference.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-[#833556] focus:outline-none focus:ring-2 focus:ring-[#833556]/20 transition-all duration-300"
              />
              <button className="cursor-pointer px-6 py-3 bg-[#833556] text-white font-semibold rounded-lg hover:bg-[#a04066] transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2">
                <Mail size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Impact Stats */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Follow Our Journey</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#833556] transition-all duration-300 hover:scale-110 transform"
                      aria-label={social.name}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#833556] mb-1">50K+</div>
                <div className="text-xs text-gray-300">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#833556] mb-1">100+</div>
                <div className="text-xs text-gray-300">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#833556] mb-1">25</div>
                <div className="text-xs text-gray-300">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span>© 2025 Faith Feeds International. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <a href="#privacy" className="hover:text-[#833556] transition-colors duration-300">Privacy Policy</a>
                <span className="text-gray-600">|</span>
                <a href="#terms" className="hover:text-[#833556] transition-colors duration-300">Terms of Service</a>
                <span className="text-gray-600">|</span>
                <a href="#cookies" className="hover:text-[#833556] transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <HandHeart size={16} className="text-[#833556]" />
              <span>Made with love for global impact</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FaithFeedsFooter;