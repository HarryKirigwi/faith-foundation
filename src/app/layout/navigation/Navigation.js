'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/pages/about' },
    { name: 'What we do', href: '/pages/whatwedo' },
    { name: 'Projects', href: '/pages/projects' },
    { name: 'Volunteer', href: '/pages/volunteer' },
    { name: 'Faith Feeds International Blog', href: '/pages/blog' },
    { name: 'Contact', href: '#contact' }
  ];

  const isScrolled = scrollY > 50;

  const handleNavClick = (href) => {
    if (href === '#contact') {
      // Smooth scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Regular navigation
      window.location.href = href;
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg border-b border-gray-100' 
        : 'bg-white/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="http://faithcp.rf.gd/wp-content/uploads/2025/06/FFI-LOGO.png" 
                alt="Faith Feeds International Logo" 
                className="h-8 sm:h-10 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-gray-900 font-bold text-lg xl:text-xl">Faith Feeds International</span>
              <div className="text-xs text-gray-600 -mt-1">Transforming Lives</div>
            </div>
            <span className="sm:hidden text-gray-900 font-bold text-lg">FFI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-[#833556] font-medium transition-all duration-300 relative group text-sm xl:text-base py-2 cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#833556] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-[#833556] p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gray-50 border-t border-gray-100 mt-2 rounded-lg mx-2">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-gray-700 hover:text-[#833556] font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white border-l-4 border-transparent hover:border-[#833556]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;