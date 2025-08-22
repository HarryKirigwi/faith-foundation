"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import {
  Heart,
  Users,
  Globe,
  BookOpen,
  Home,
  GraduationCap,
  HandHeart,
  Building,
  Shield,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  Menu,
  X,
  Phone,
  Mail,
  Target,
  ChevronDown,
  MapPin,
  Clock,
} from "lucide-react";
import { STRIPE_DONATION_LINK } from '@/config/constants';
import { gsap } from "gsap";

const WhatWeDoPage = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

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
            if (entry.target.id === 'hero-stats') {
              if (entry.isIntersecting && !statsAnimated.current) {
                // Stats section comes into view - start animation
                console.log('WhatWeDo stats section in view - triggering animation');
                setTimeout(() => animateStats(), 500);
              } else if (!entry.isIntersecting && statsAnimated.current) {
                // Stats section goes out of view - reset to zero
                console.log('WhatWeDo stats section out of view - resetting to zero');
                resetStats();
              }
            }
          });
        },
        { threshold: 0.3, rootMargin: '50px' }
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

  const handleDonateClick = () => {
    window.open(STRIPE_DONATION_LINK, '_blank');
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
    console.log('WhatWeDo stats reset to zero - ready for re-animation');
  };

  // Function to animate stats counting up
  const animateStats = () => {
    if (!statsRef.current || statsAnimated.current) {
      console.log('WhatWeDo animation already running or stats ref not available');
      return;
    }
    
    console.log('Starting WhatWeDo stats animation');
    statsAnimated.current = true;
    
    const statElements = statsRef.current.querySelectorAll('.stat-number');
    console.log(`Found ${statElements.length} stat elements`);
    
    statElements.forEach((element, index) => {
      const finalValue = element.getAttribute('data-value');
      const isPlus = finalValue.includes('+');
      const numericValue = parseInt(finalValue.replace(/[+]/g, ''));
      
      console.log(`Animating WhatWeDo stat ${index + 1}: 0 → ${finalValue}`);
      
      // Clear the element and set initial value to 0
      element.textContent = '0';
      
      // Create a counter object to track the current value
      const counter = { value: 0 };
      
      // Animate counting up
      gsap.to(counter, {
        value: numericValue,
        duration: 2.5,
        delay: index * 0.3,
        ease: "power2.out",
        onUpdate: function() {
          const currentValue = Math.floor(counter.value);
          let displayValue = currentValue.toString();
          
          if (isPlus) {
            displayValue += '+';
          }
          
          element.textContent = displayValue;
        },
        onComplete: function() {
          // Ensure final value is displayed correctly
          element.textContent = finalValue;
          console.log(`Completed WhatWeDo animation for stat ${index + 1}: ${finalValue}`);
        }
      });
    });
  };

  const navItems = [
    "Home",
    "About",
    "What we do",
    "Projects",
    "Volunteer",
    "Faith Feeds International Blog",
    "Contact",
  ];

  const isScrolled = scrollY > 50;

  const services = [
    {
      icon: Globe,
      title: "We Find & Fund",
      description:
        "We are in search of opportunities to help as many youths as possible. We approach and fund all those who are in need, ensuring no child is left behind.",
      features: [
        "Direct financial assistance",
        "Opportunity identification",
        "Community outreach programs",
      ],
    },
    {
      icon: BookOpen,
      title: "We Educate",
      description:
        "Today's youth need a helpful hand and right guidance at every stage. Here's where we take care of them like our own family members.",
      features: [
        "Personalized learning programs",
        "Mentorship opportunities",
        "Life skills development",
      ],
    },
    {
      icon: Heart,
      title: "We Provide Care",
      description:
        "We offer comprehensive care services including shelter homes, schools, and nutritious meals that help needy young people thrive.",
      features: [
        "24/7 shelter homes",
        "Healthcare services",
        "Nutritional support",
      ],
    },
    {
      icon: Lightbulb,
      title: "We Consult",
      description:
        "We run small-scale schools for underprivileged children and youth of daily wage workers, consulting on their educational journey for a better future.",
      features: [
        "Educational consulting",
        "Career guidance",
        "Skills assessment",
      ],
    },
    {
      icon: Building,
      title: "We Build Schools",
      description:
        "We build schools for underprivileged children and run organizations where we employ youngsters so they can live their dreams.",
      features: [
        "School construction",
        "Educational infrastructure",
        "Employment opportunities",
      ],
    },
    {
      icon: Shield,
      title: "We Strengthen",
      description:
        "We believe that education and employment give people inner strength to lead a better life and break the cycle of poverty.",
      features: [
        "Empowerment programs",
        "Skill development",
        "Community building",
      ],
    },
  ];

  const careAreas = [
    {
      title: "New Life for Children, in a New Land",
      description:
        "We have built shelter homes in different regions so children can move out of undeveloped areas to live, study and work in bigger and better cities.",
      image: "/images/faithfeedsmanykids.jpeg",
      stats: "500+ Children Relocated",
    },
    {
      title: "A New Future for Exploited Children",
      description:
        "Children and youngsters who are exploited in their early days need a helping hand and support for their mental health. We take them out of this zone to give them a better life.",
      image: "/images/faithfeedskidsstanding.jpeg",
      stats: "300+ Children Supported",
    },
    {
      title: "Bringing Dreams Within Reach for Children",
      description:
        "The underprivileged children do not have access to required financial help and resources needed to live the life of their dreams. We help them with everything they'll need.",
      image: "/images/faithfeedskidseating.jpeg",
      stats: "1000+ Dreams Fulfilled",
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Enhanced Hero Section */}
      <section 
        id="hero-section"
        className={`relative pt-20 lg:pt-28 mobile-hero-half-height flex items-center ${
          isVisible['hero-section'] ? 'animate-fadeInUp' : 'opacity-0'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/faithfeedskidsstanding.jpeg"
            alt="Children learning together at Faith Feeds International programs"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div 
              id="hero-content"
              className={`max-w-2xl text-center lg:text-left ${
                isVisible['hero-content'] ? 'animate-slideInLeft' : 'opacity-0'
              }`}
            >
              {/* Page Identifier Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/90 text-white text-sm font-medium mb-4 backdrop-blur-sm">
                <HandHeart size={16} className="mr-2" />
                What We Do
              </div>

              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-300 mb-6">
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
                <span>/</span>
                <span className="text-[#833556]">What We Do</span>
              </nav>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Supporting Children &
                <span className="text-[#833556] block mt-2">
                  Youth to Thrive
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6">
                We don't just provide services — we transform lives. From breakfast programs that fuel learning to shelter homes that provide safety, we address the root causes of poverty and give children the foundation they need to succeed.
              </p>
              
              {/* Impact Highlight */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                  <span className="font-semibold text-[#833556]">Our approach is simple:</span> Every child deserves access to education, nutrition, and care. We make this possible through comprehensive programs that address both immediate needs and long-term development.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => router.push('/pages/volunteer')}
                  className="group relative px-8 py-4 bg-[#833556] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <Users size={20} />
                    Volunteer Now
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#833556] to-[#a04066] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button className="group cursor-pointer relative px-8 py-4 bg-white text-[#833556] font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  <Heart size={20} />
                  Donate Now
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>

            {/* Right Column - Stats Cards */}
            <div 
              ref={statsRef}
              id="hero-stats"
              className={`lg:flex lg:justify-end ${
                isVisible['hero-stats'] ? 'animate-slideInRight' : 'opacity-0'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-w-md">
                {/* Impact Stats */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-[#833556] rounded-lg flex items-center justify-center">
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <div 
                        className="stat-number text-2xl font-bold text-white"
                        data-value="5,000+"
                      >
                        0
                      </div>
                      <div className="text-sm text-gray-300">
                        Children Supported
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-[#833556] rounded-lg flex items-center justify-center">
                      <Building size={20} className="text-white" />
                    </div>
                    <div>
                      <div 
                        className="stat-number text-2xl font-bold text-white"
                        data-value="25+"
                      >
                        0
                      </div>
                      <div className="text-sm text-gray-300">Schools Built</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-[#833556] rounded-lg flex items-center justify-center">
                      <Globe size={20} className="text-white" />
                    </div>
                    <div>
                      <div 
                        className="stat-number text-2xl font-bold text-white"
                        data-value="12"
                      >
                        0
                      </div>
                      <div className="text-sm text-gray-300">
                        Countries Reached
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Mission Statement */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-200 leading-relaxed">
                "Our mission is to break the cycle of poverty by providing
                comprehensive support that addresses immediate needs while
                building long-term capabilities for sustainable change."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div 
            id="services-header"
            className={`text-center mb-16 ${
              isVisible['services-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-4">
              <HandHeart size={16} className="mr-2" />
              Our Core Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              How We Make a Difference
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We run shelter homes, schools, and comprehensive support programs
              with helpline offices that can be approached at any time for
              immediate assistance.
            </p>
          </div>

          {/* Services Grid */}
          <div 
            id="services-grid"
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${
              isVisible['services-grid'] ? 'animate-fadeInScale' : 'opacity-0'
            }`}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[#833556]/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={32} className="text-[#833556]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle
                          size={16}
                          className="text-green-500 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Care Areas Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div 
            id="care-areas-header"
            className={`text-center mb-16 ${
              isVisible['care-areas-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-4">
              <Star size={16} className="mr-2" />
              What We Care For
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Transforming Lives Through Targeted Care
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our specialized programs address the unique needs of children and
              youth in various challenging circumstances.
            </p>
          </div>

          {/* Care Areas */}
          <div 
            id="care-areas-grid"
            className={`space-y-16 ${
              isVisible['care-areas-grid'] ? 'animate-fadeInScale' : 'opacity-0'
            }`}
          >
            {careAreas.map((area, index) => (
              <div
                key={area.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-4">
                    {area.stats}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {area.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {area.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => router.push('/pages/volunteer')}
                      className="group cursor-pointer px-6 py-3 bg-[#833556] text-white font-semibold rounded-lg hover:bg-[#a04066] transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2"
                    >
                      <Users size={18} />
                      Volunteer Now
                    </button>
                    <button 
                      onClick={handleDonateClick}
                      className="group cursor-pointer px-6 py-3 bg-transparent border-2 border-[#833556] text-[#833556] font-semibold rounded-lg hover:bg-[#833556] hover:text-white transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2"
                    >
                      <Heart size={18} />
                      Donate Now
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section 
        id="cta-section"
        className={`py-20 bg-[#833556] relative overflow-hidden ${
          isVisible['cta-section'] ? 'animate-fadeInUp' : 'opacity-0'
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Make a Difference in a Child's Life?
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Join our mission to transform lives through faith, community
              support, and sustainable initiatives. Every action counts in
              creating lasting change.
            </p>

            {/* Donation Impact Message */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 mb-8 border border-white/20 max-w-4xl mx-auto">
              <p className="text-base sm:text-lg lg:text-xl text-purple-100 leading-relaxed mb-4">
                <span className="font-semibold text-[#ffd700]">What we do is simple: we turn "impossible" into "I'm possible."</span> We take children who've never known a full stomach and give them breakfast. We take empty hands and fill them with pencils. We take broken dreams and mend them with hope.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-purple-100 leading-relaxed mb-4">
                <span className="font-semibold text-[#ffd700]">Your donation is the bridge between despair and dreams.</span> It's the difference between a child going to bed hungry and going to bed with a full heart. It's the transformation from "I can't" to "I can and I will." Every dollar you give becomes a step toward a brighter future.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-purple-100 leading-relaxed">
                <span className="font-semibold text-[#ffd700]">Be the reason a child believes in miracles.</span> Because sometimes the greatest miracle isn't parting seas or walking on water — it's a child who finally gets to eat, learn, and dream without the weight of hunger crushing their spirit.
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8 text-purple-100">
              <a 
                href="tel:+14055351599"
                className="flex items-center space-x-2 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <Phone size={20} className="text-purple-200" />
                <span>+1 (405) 535-1599</span>
              </a>
              <a 
                href="mailto:faithfeedsInternational@gmail.com"
                className="flex items-center space-x-2 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <Mail size={20} className="text-purple-200" />
                <span>faithfeedsInternational@gmail.com</span>
              </a>
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-purple-200" />
                <span>Oklahoma City, OK</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/pages/volunteer')}
                className="group cursor-pointer relative px-8 py-4 bg-white text-[#833556] font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Users size={20} />
                Volunteer Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>

              <button
                onClick={handleDonateClick}
                className="group cursor-pointer relative px-8 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-xl hover:bg-white hover:text-[#833556] transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Heart size={20} />
                Donate Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDoPage;
