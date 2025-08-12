'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Target, 
  Users, 
  Lightbulb, 
  Globe, 
  ArrowRight, 
  ChevronDown,
  Star,
  DollarSign,
  CheckCircle,
  MapPin as LocationIcon
} from 'lucide-react';
import { STRIPE_DONATION_LINK } from '@/config/constants';
import { gsap } from "gsap";

export default function ProjectsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  // Refs for stats animation
  const statsRef = useRef(null);
  const statsAnimated = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
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
            if (entry.target.id === 'stats-grid') {
              if (entry.isIntersecting && !statsAnimated.current) {
                // Stats section comes into view - start animation
                console.log('Projects stats section in view - triggering animation');
                setTimeout(() => animateStats(), 500);
              } else if (!entry.isIntersecting && statsAnimated.current) {
                // Stats section goes out of view - reset to zero
                console.log('Projects stats section out of view - resetting to zero');
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
    console.log('Projects stats reset to zero - ready for re-animation');
  };

  // Function to animate stats counting up
  const animateStats = () => {
    if (!statsRef.current || statsAnimated.current) {
      console.log('Projects animation already running or stats ref not available');
      return;
    }
    
    console.log('Starting projects stats animation');
    statsAnimated.current = true;
    
    const statElements = statsRef.current.querySelectorAll('.stat-number');
    console.log(`Found ${statElements.length} stat elements`);
    
    statElements.forEach((element, index) => {
      const finalValue = element.getAttribute('data-value');
      const isK = finalValue.includes('K');
      const isPlus = finalValue.includes('+');
      const isPercent = finalValue.includes('%');
      const isDollar = finalValue.includes('$');
      const numericValue = parseInt(finalValue.replace(/[K+%$]/g, ''));
      
      console.log(`Animating projects stat ${index + 1}: 0 → ${finalValue}`);
      
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
          
          if (isDollar) {
            displayValue = '$' + currentValue;
          }
          if (isK && currentValue > 0) {
            displayValue = currentValue + 'K';
          }
          if (isPercent) {
            displayValue = currentValue + '%';
          }
          if (isPlus) {
            displayValue += '+';
          }
          
          element.textContent = displayValue;
        },
        onComplete: function() {
          // Ensure final value is displayed correctly
          element.textContent = finalValue;
          console.log(`Completed projects animation for stat ${index + 1}: ${finalValue}`);
        }
      });
    });
  };

  const projectCategories = [
    { id: 'all', name: 'All Projects', icon: Globe },
    { id: 'education', name: 'Education', icon: Target },
    { id: 'healthcare', name: 'Healthcare', icon: Heart },
    { id: 'community', name: 'Community', icon: Users }
  ];

  const projects = [
    {
      id: 1,
      title: "Breakfast Before School Program",
      category: "education",
      description: "Ensuring children living in adverse conditions can afford a nutritious meal before going to school.",
      image: "/images/faithfeedskidseating.jpeg",
      location: "Oklahoma City, OK",
      status: "Active",
      impact: "500+ children served daily",
      funding: "$50,000",
      progress: 85
    },
    {
      id: 2,
      title: "Youth Empowerment Center",
      category: "community",
      description: "A comprehensive center providing life skills training and mentorship for at-risk youth.",
      image: "/images/faithfeedskidsstanding.jpeg",
      location: "Oklahoma City, OK",
      status: "Active",
      impact: "200+ youth enrolled",
      funding: "$75,000",
      progress: 90
    },
    {
      id: 3,
      title: "Family Support Network",
      category: "community",
      description: "Building sustainable programs that strengthen families and promote self-reliance.",
      image: "/images/faithfeedsmanykids.jpeg",
      location: "Oklahoma City, OK",
      status: "Active",
      impact: "150+ families supported",
      funding: "$40,000",
      progress: 70
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const impactStats = [
    { number: "1,000+", label: "Lives Impacted", icon: Users },
    { number: "$455K", label: "Total Funding", icon: DollarSign },
    { number: "6", label: "Active Projects", icon: Target },
    { number: "85%", label: "Success Rate", icon: Star }
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">

      {/* Hero Section */}
      <main className="relative mobile-hero-height">
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <img
            src="/images/faithfeedskidsstanding.jpeg"
            alt="Faith Feeds International projects"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div>
          <div className="absolute inset-0 bg-[#833556]/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="hero-content"
            className={`text-center py-16 lg:py-24 ${
              isVisible['hero-content'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-lg text-white text-sm font-medium mb-8 border border-white/30 glass-effect">
              <Target size={16} className="mr-2" />
              Our Projects
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
              Transforming
              <span className="text-[#ffd700] block mt-2 drop-shadow-2xl bg-gradient-to-r from-[#ffd700] to-[#ffed4a] bg-clip-text text-transparent">
                Lives Through Action
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto drop-shadow-lg mb-8">
              Discover our comprehensive projects that address education, healthcare, housing, and community development.
            </p>

            <div className="mt-8">
              <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-[#833556] text-white font-bold text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mx-auto mobile-optimized overflow-hidden">
                <Heart size={24} className="relative z-10 group-hover:animate-pulse" />
                <span className="relative z-10">Support Our Projects</span>
                <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Impact Stats Section */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="stats-header"
            className={`text-center mb-12 lg:mb-16 ${
              isVisible['stats-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6 glass-effect">
              <Target size={16} className="mr-2" />
              Our Impact
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Making a Real
              <span className="text-[#833556] block mt-2 bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">
                Difference
              </span>
            </h2>
          </div>

          <div 
            ref={statsRef}
            id="stats-grid"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  id={`stat-${index}`}
                  className={`text-center group ${
                    isVisible[`stat-${index}`] ? 'animate-fadeInScale' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-[#833556]/10 rounded-2xl mb-4 group-hover:bg-[#833556]/20 transition-colors duration-300">
                    <Icon size={24} className="text-[#833556]" />
                  </div>
                  <div 
                    className="stat-number text-2xl lg:text-4xl font-bold text-gray-900 mb-2"
                    data-value={stat.number}
                  >
                    0
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="projects-header"
            className={`text-center mb-12 lg:mb-16 ${
              isVisible['projects-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6 glass-effect">
              <Target size={16} className="mr-2" />
              Our Projects
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Current
              <span className="text-[#833556] block mt-2 bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">
                Initiatives
              </span>
            </h2>
          </div>

          {/* Category Filters */}
          <div 
            id="category-filters"
            className={`flex flex-wrap justify-center gap-4 mb-12 lg:mb-16 ${
              isVisible['category-filters'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            {projectCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative px-6 py-3 lg:px-8 lg:py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center gap-3 mobile-optimized ${
                    activeCategory === category.id
                      ? 'bg-[#833556] text-white shadow-2xl'
                      : 'bg-white text-gray-700 hover:bg-[#833556] hover:text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div 
            id="projects-grid"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-400 hover:scale-105 transform hover:-translate-y-4 mobile-optimized ${
                  isVisible[`project-${project.id}`] ? 'animate-fadeInScale' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 transition-colors duration-300"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                      <div 
                        className="bg-[#833556] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-white text-sm font-medium mt-1">
                      {project.progress}% Complete
                    </div>
                  </div>
                </div>

                <div className="relative p-6 lg:p-8 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-[#833556] bg-[#833556]/10 px-3 py-1 rounded-full">
                      {projectCategories.find(cat => cat.id === project.category)?.name}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <LocationIcon size={16} />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#833556] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-sm text-gray-500 mb-1">Impact</div>
                      <div className="text-lg font-semibold text-gray-900">{project.impact}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-sm text-gray-500 mb-1">Funding</div>
                      <div className="text-lg font-semibold text-gray-900">{project.funding}</div>
                    </div>
                  </div>

                  <button className="group w-full px-6 py-3 bg-[#833556] text-white font-semibold rounded-xl hover:bg-[#a04066] transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2 mobile-optimized">
                    <span>Learn More</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#833556] to-[#a04066] text-white relative overflow-hidden">
        <div 
          id="cta-section"
          className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${
            isVisible['cta-section'] ? 'animate-fadeInUp' : 'opacity-0'
          }`}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/30">
            <Heart size={16} className="mr-2" />
            Get Involved
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 lg:mb-8">
            Support Our
            <span className="block mt-2">
              Projects
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Every project we undertake is made possible by the generosity of our donors and volunteers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <button onClick={handleDonateClick} className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-white text-[#833556] font-bold text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mobile-optimized overflow-hidden">
              <Heart size={24} className="relative z-10 group-hover:animate-pulse" />
              <span className="relative z-10">Donate Now</span>
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-transparent border-2 border-white text-white font-bold text-lg lg:text-xl rounded-2xl hover:bg-white hover:text-[#833556] transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mobile-optimized">
              <Users size={24} className="group-hover:animate-pulse" />
              <span>Volunteer</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
