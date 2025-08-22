"use client";
import React, { useState, useEffect } from "react";
import { Heart, Target, Users, Lightbulb, Globe, ArrowRight, ChevronDown, Star, Shield, BookOpen, HandHeart, Play, Award, Clock, MapPin, Phone, Mail } from "lucide-react";
import { STRIPE_DONATION_LINK } from "@/config/constants";
import { useRouter } from 'next/navigation';

const ServicesSection = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

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
          });
        },
        { threshold: 0.1, rootMargin: '100px' }
      );

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
          }
        });
      };

      // Check immediately and after a short delay to ensure proper timing
      checkInitialVisibility();
      setTimeout(checkInitialVisibility, 200);

      return () => observer.disconnect();
    }
  }, []);

  const services = [
    {
      title: "Youth Empowerment Programs",
      description: "Comprehensive programs designed to empower young people with life skills, education, and leadership development opportunities.",
      icon: Users,
      features: ["Life Skills Training", "Leadership Development", "Educational Support", "Mentorship Programs"],
      buttonText: "Support Youth",
      buttonAction: "donate",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Community Outreach Initiatives",
      description: "Local and international community outreach programs that address immediate needs and build sustainable solutions.",
      icon: Globe,
      features: ["Emergency Relief", "Community Building", "Sustainable Development", "Partnership Programs"],
      buttonText: "Donate Now",
      buttonAction: "donate",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Faith-Based Counseling",
      description: "Spiritual and emotional support services that help individuals and families navigate life's challenges with faith and hope.",
      icon: Heart,
      features: ["Individual Counseling", "Family Support", "Spiritual Guidance", "Crisis Intervention"],
      buttonText: "Support Counseling",
      buttonAction: "donate",
      color: "from-pink-500 to-rose-600"
    }
  ];

  const handleButtonClick = (action, title) => {
    switch (action) {
      case 'donate':
        window.open(STRIPE_DONATION_LINK, '_blank');
        break;
      case 'volunteer':
        // Navigate to volunteer page
        router.push('/pages/volunteer');
        break;
      case 'share':
        // Share functionality
        if (navigator.share) {
          navigator.share({
            title: 'Faith Feeds International',
            text: `Check out this amazing program: ${title}`,
            url: window.location.href
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        }
        break;
      default:
        console.log(`${action} clicked for ${title}`);
    }
  };

  const getButtonStyles = (action) => {
    const baseStyles = "group relative px-6 py-3 font-semibold text-sm rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer overflow-hidden mobile-optimized";
    
    switch (action) {
      case 'donate':
        return `${baseStyles} bg-[#833556] text-white shadow-xl hover:shadow-2xl`;
      case 'volunteer':
        return `${baseStyles} bg-transparent border-2 border-[#833556] text-[#833556] hover:bg-[#833556] hover:text-white`;
      case 'share':
        return `${baseStyles} bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 border border-gray-300`;
      default:
        return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200`;
    }
  };

  return (
    <div className="relative">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.4s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transform: translateX(-100%);
          animation: shimmer 2s infinite;
        }
        
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .mobile-optimized {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
        }
        
        @media (max-width: 768px) {
          .mobile-card-spacing {
            padding: 1.5rem;
          }
        }
      `}</style>

      <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute top-20 left-10 w-32 h-32 bg-[#833556]/10 rounded-full blur-2xl animate-float"
              style={{ animationDelay: '0s' }}
            />
            <div 
              className="absolute top-40 right-20 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl animate-float"
              style={{ animationDelay: '1s' }}
            />
            <div 
              className="absolute bottom-40 left-1/4 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl animate-float"
              style={{ animationDelay: '2s' }}
            />
          </div>

          {/* Section Header */}
          <div 
            id="services-header"
            className={`text-center mb-16 lg:mb-20 ${
              isVisible['services-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/90 text-white text-sm font-medium mb-4 backdrop-blur-sm">
              <Star size={16} className="mr-2" />
              Our Impact Areas
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transforming Communities
              <span className="block text-[#833556] bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent mt-2">
                Around the World
              </span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover how we're making a difference in communities worldwide through our comprehensive programs and initiatives that create lasting, meaningful change.
            </p>
            
            {/* Animated Underline */}
            <div className="relative mx-auto w-32 h-1 bg-gradient-to-r from-[#833556] to-[#a04066] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer-effect" />
            </div>
          </div>

          {/* Services Grid */}
          <div 
            id="services-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20"
          >
            {services.map((service, index) => (
              <div
                key={service.title}
                id={`service-${index}`}
                className={`group relative bg-white mobile-card-spacing p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-4 border border-gray-100 overflow-hidden mobile-optimized ${
                  isVisible[`service-${index}`] 
                    ? index % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'
                    : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-400`} />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-[#833556]/20 via-transparent to-[#833556]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon Container with Enhanced Animation */}
                <div className="relative mb-6 lg:mb-8">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-[#833556]/10 to-[#833556]/20 group-hover:from-[#833556] group-hover:to-[#a04066] transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                    <service.icon 
                      size={typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 32} 
                      className="text-[#833556] group-hover:text-white transition-all duration-300 transform group-hover:scale-110" 
                    />
                    
                    {/* Floating Ring Animation */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#833556]/20 group-hover:border-[#833556]/40 transition-colors duration-300 animate-ping group-hover:animate-pulse" />
                  </div>
                  
                  {/* Stats Badge */}
                  <div className="absolute -top-2 -right-2 bg-white shadow-lg rounded-full px-3 py-1 text-xs font-semibold text-[#833556] border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {service.features.length} Features
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>

                                  {/* Donation Impact Message for Service Cards */}
                <div className="bg-gradient-to-r from-[#833556]/5 to-[#a04066]/5 rounded-xl p-4 mb-6 border border-[#833556]/10">
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-[#833556]">Transform lives with your generosity:</span> Every donation becomes a child's breakfast, a student's notebook, or a family's hope. Your gift creates ripples of change that last a lifetime.
                  </p>
                </div>

                  {/* Action Button with Enhanced Effects */}
                  <button
                    onClick={() => handleButtonClick(service.buttonAction, service.title)}
                    className={`${getButtonStyles(service.buttonAction)} w-full sm:w-auto`}
                  >
                    {/* Button shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                    
                    <span className="relative z-10">{service.buttonText}</span>
                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#833556]/10 via-transparent to-[#833556]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-xl" />
              </div>
            ))}
          </div>

          {/* Enhanced Call to Action */}
          <div 
            id="services-cta"
            className={`${
              isVisible['services-cta'] ? 'animate-fadeInScale' : 'opacity-0'
            }`}
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-[#833556] to-[#a04066] rounded-3xl p-8 lg:p-12 text-center shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full animate-float" />
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm">
                  <Globe size={32} className="text-white" />
                </div>
                
                <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                  Ready to make a difference?
                </h3>
                
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Join our mission to transform lives through faith and community. Every action counts, every donation matters.
                </p>
                
                {/* Donation Impact Message */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 mb-8 border border-white/20 max-w-4xl mx-auto">
                  <p className="text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed mb-4">
                    <span className="font-semibold text-[#ffd700]">In a world where some children count meals by the week, not by the day.</span> Where a notebook is more precious than gold, and a pair of shoes is a luxury beyond reach. This is the reality we're changing, one child at a time.
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed mb-4">
                    <span className="font-semibold text-[#ffd700]">Your generosity is the catalyst for transformation.</span> It's the spark that ignites hope, the foundation that builds futures, and the love that heals hearts. Every contribution, no matter the size, becomes a beacon of light in a child's darkest moments.
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed">
                    <span className="font-semibold text-[#ffd700]">Stand with us in this holy work.</span> Because when you give to Faith Feeds International, you're not just donating — you're declaring that every child matters, every dream is valid, and every life is worth fighting for.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={() => router.push('/pages/volunteer')}
                    className="group relative px-8 py-4 bg-white text-[#833556] font-bold text-lg rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mobile-optimized overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <HandHeart size={20} className="relative z-10 group-hover:animate-pulse" />
                    <span className="relative z-10">Volunteer Now</span>
                    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                  
                  <button 
                    onClick={() => router.push('/pages/blog')}
                    className="group px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 mobile-optimized"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25px 25px, #833556 2px, transparent 0),
              radial-gradient(circle at 75px 75px, #a04066 1px, transparent 0)
            `,
            backgroundSize: '100px 100px'
          }} />
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;