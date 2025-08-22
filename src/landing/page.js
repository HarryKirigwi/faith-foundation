"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { ChevronDown, Heart, Globe, ArrowRight, HandHeart, Users, Target, Award, Play } from "lucide-react";
import { STRIPE_DONATION_LINK } from "@/config/constants";
import { gsap } from "gsap";

const LandingPage = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    'hero-content': true,  // Set hero content to visible by default
    'hero-image': true,    // Set hero image to visible by default
    'stats': false         // Stats section starts hidden (below the fold)
  });

  // Refs for stats animation
  const statsRef = useRef(null);
  const statsAnimated = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting,
            }));
            
            // Handle stats animation
            if (entry.target.id === 'stats') {
              if (entry.isIntersecting && !statsAnimated.current) {
                // Stats section comes into view - start animation
                console.log('Stats section in view - triggering animation');
                setTimeout(() => animateStats(), 500);
              } else if (!entry.isIntersecting && statsAnimated.current) {
                // Stats section goes out of view - reset to zero
                console.log('Stats section out of view - resetting to zero');
                resetStats();
              }
            }
          });
        },
        { threshold: 0.3, rootMargin: '50px' }
      );

      // Observe all elements with IDs
      document.querySelectorAll('[id]').forEach((el) => {
        observer.observe(el);
      });

      // Check if elements are already in view on page load
      const checkInitialVisibility = () => {
        document.querySelectorAll('[id]').forEach((el) => {
          const rect = el.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          if (isInView) {
            setIsVisible((prev) => ({
              ...prev,
              [el.id]: true,
            }));
            
            // Trigger stats animation if stats section is already in view
            if (el.id === 'stats' && isInView && !statsAnimated.current) {
              console.log('Stats section already in view - triggering animation');
              setTimeout(() => animateStats(), 500);
            }
          }
        });
      };

      // Check immediately and after a short delay to ensure proper timing
      checkInitialVisibility();
      setTimeout(checkInitialVisibility, 200);
      setTimeout(checkInitialVisibility, 500);

      return () => observer.disconnect();
    }
  }, []);

  const handleDonateClick = () => {
    window.open(STRIPE_DONATION_LINK, '_blank');
  };

  const handleLearnMoreClick = () => {
    router.push('/pages/blog');
  };

  // Function to reset stats to zero
  const resetStats = () => {
    if (!statsRef.current) return;
    
    // Kill any running GSAP animations
    const statElements = statsRef.current.querySelectorAll('.stat-number');
    gsap.killTweensOf(statElements);
    
    // Reset all stats to zero
    statElements.forEach(element => {
      element.textContent = '0';
    });
    
    // Reset the animation flag to allow re-animation
    statsAnimated.current = false;
    console.log('Stats reset to zero - ready for re-animation');
  };

  // Function to animate stats counting up
  const animateStats = () => {
    if (!statsRef.current || statsAnimated.current) {
      console.log('Animation already running or stats ref not available');
      return;
    }
    
    console.log('Starting stats animation');
    statsAnimated.current = true;
    
    const statElements = statsRef.current.querySelectorAll('.stat-number');
    console.log(`Found ${statElements.length} stat elements`);
    
    statElements.forEach((element, index) => {
      const finalValue = element.getAttribute('data-value');
      const isK = finalValue.includes('K');
      const isPlus = finalValue.includes('+');
      const numericValue = parseInt(finalValue.replace(/[K+]/g, ''));
      
      console.log(`Animating stat ${index + 1}: 0 → ${finalValue}`);
      
      // Clear the element and set initial value to 0
      element.textContent = '0';
      
      // Create a counter object to track the current value
      const counter = { value: 0 };
      
      // Animate counting up
      gsap.to(counter, {
        value: numericValue,
        duration: 2.5,
        delay: index * 0.3, // Slightly longer stagger for better effect
        ease: "power2.out",
        onUpdate: function() {
          const currentValue = Math.floor(counter.value);
          let displayValue = currentValue.toString();
          
          if (isK && currentValue > 0) {
            displayValue = currentValue + 'K';
          }
          if (isPlus) {
            displayValue += '+';
          }
          
          element.textContent = displayValue;
        },
        onComplete: function() {
          // Ensure final value is displayed correctly
          element.textContent = finalValue;
          console.log(`Completed animation for stat ${index + 1}: ${finalValue}`);
        }
      });
    });
  };

  const stats = [
    { number: "50K+", label: "Lives Transformed", icon: Users },
    { number: "120+", label: "Active Projects", icon: Target },
    { number: "45+", label: "Countries Reached", icon: Globe },
    { number: "25+", label: "Years of Impact", icon: Award },
  ];

  return (
    <div className="relative bg-white overflow-x-hidden">
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.4s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .gradient-border {
          background: linear-gradient(45deg, #833556, #a04066, #833556);
          background-size: 300% 300%;
          animation: gradientShift 3s ease infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .mobile-optimized {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
        }
        
        /* Text animation styles */
        .text-animate-container {
          overflow: hidden;
        }
        
        .text-animate-char {
          display: inline-block;
          white-space: pre;
        }
        
        @media (max-width: 768px) {
          .mobile-hero-height {
            min-height: 100vh;
            min-height: 100svh;
          }
        }
      `}</style>

      {/* Hero Section */}
      <main className="relative mobile-hero-height">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full pt-20 lg:pt-28 pb-12">
            
            {/* Left Column - Content */}
            <div 
              id="hero-content"
              className={`space-y-6 lg:space-y-8 ${
                isVisible['hero-content'] ? 'animate-slideInLeft' : 'opacity-100'
              }`}
            >
              {/* Badge */}
              <div 
                className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/90 text-white text-sm font-medium mb-4 backdrop-blur-sm text-animate-container"
              >
                <Globe size={16} className="mr-2" />
                Making a Global Impact
              </div>

              {/* Main Heading */}
              <h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-animate-container"
              >
                Transforming Lives
                <br />
                Through
                <br />
                <span className="text-[#833556]">Faith & Community</span>
              </h1>

              {/* Subtitle */}
              <p 
                className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl text-animate-container mb-6"
              >
                Every child deserves to dream without hunger stealing their focus. We're breaking the cycle of poverty by providing meals, education, and hope to children who need it most.
              </p>
              
              {/* Impact Statement */}
              <div className="bg-gradient-to-r from-[#833556]/10 to-[#a04066]/10 rounded-xl p-4 lg:p-6 mb-6 border border-[#833556]/20">
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-2xl">
                  <span className="font-semibold text-[#833556]">For some children, what we provide is the only meal they'll eat all day.</span> Your support places food on a plate, a pencil in a hand, and hope in a heart.
                </p>
              </div>

              {/* Action Buttons */}
              <div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button className="group relative px-6 py-4 lg:px-8 lg:py-4 bg-[#833556] text-white font-semibold text-base lg:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-2 mobile-optimized overflow-hidden" onClick={handleDonateClick}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#833556] via-[#a04066] to-[#833556] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <Heart size={20} className="group-hover:animate-pulse" />
                    Donate Now
                  </div>
                </button>

                <button 
                  onClick={() => router.push('/pages/volunteer')}
                  className="group relative px-6 py-4 lg:px-8 lg:py-4 bg-transparent border-2 border-gray-300 text-gray-700 font-semibold text-base lg:text-lg rounded-2xl hover:border-[#833556] hover:text-[#833556] transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-2 mobile-optimized overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#833556]/5 to-[#a04066]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    Volunteer Now
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </div>
                </button>
              </div>

              {/* Trust Indicators */}
              <div 
                className="flex items-center space-x-6 pt-6 lg:pt-8"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">Verified Impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award size={16} className="text-[#833556]" />
                  <span className="text-sm text-gray-600">Award Winner</span>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Image Section */}
            <div 
              id="hero-image"
              className={`relative ${
                isVisible['hero-image'] ? 'animate-slideInRight' : 'opacity-100'
              }`}
              style={{
                transform: `translateY(${scrollY * -0.1}px)`,
              }}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <img
                  src="/images/faithfeedskidseating.jpeg"
                  alt="Faith Feeds International Community"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover transition-transform duration-400 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-colors duration-300" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-16 h-16 lg:w-20 lg:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:scale-110 transition-all duration-200">
                    <Play size={24} className="text-[#833556] ml-1" />
                  </button>
                </div>
              </div>

              {/* Enhanced Floating Cards */}
              <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-white/95 backdrop-blur-lg p-4 lg:p-6 rounded-2xl shadow-2xl border border-white/20 animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Active Projects</div>
                    <div className="text-xs text-gray-600">120+ ongoing</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white/95 backdrop-blur-lg p-4 lg:p-6 rounded-2xl shadow-2xl border border-white/20 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <HandHeart size={20} className="text-[#833556]" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">24/7 Support</div>
                    <div className="text-xs text-gray-600">Always here</div>
                  </div>
                </div>
              </div>

              {/* New Impact Card */}
              <div className="absolute top-1/2 -left-8 lg:-left-12 bg-[#833556] text-white p-4 lg:p-6 rounded-2xl shadow-2xl transform -translate-y-1/2 animate-float hidden sm:block" style={{ animationDelay: '2s' }}>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold">50K+</div>
                  <div className="text-sm opacity-90">Lives Changed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 cursor-pointer hover:text-[#833556] transition-colors duration-300"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }
          }}
        >
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-sm mb-2 font-medium">Discover Impact</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#833556]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#a04066]/5 rounded-full blur-3xl" />
        </div>
      </main>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#833556] to-[#a04066] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={statsRef}
            id="stats"
            className={`grid grid-cols-2 lg:grid-cols-4 gap-8 ${
              isVisible['stats'] ? 'animate-slideInUp' : 'opacity-0'
            }`}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-2xl mb-4 group-hover:bg-white/30 transition-colors duration-300">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div 
                    className="stat-number text-2xl lg:text-4xl font-bold text-white mb-2"
                    data-value={stat.number}
                  >
                    0
                  </div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subtle Background Pattern - Enhanced */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25px 25px, #833556 2px, transparent 0),
              radial-gradient(circle at 75px 75px, #a04066 1px, transparent 0)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>
    </div>
  );
};

export default LandingPage;