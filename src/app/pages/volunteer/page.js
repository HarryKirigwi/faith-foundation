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
  Calendar,
  Clock,
  User,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Shield,
  HandHeart
} from 'lucide-react';
import { gsap } from "gsap";

export default function VolunteerPage() {
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
                console.log('Volunteer stats section in view - triggering animation');
                setTimeout(() => animateStats(), 500);
              } else if (!entry.isIntersecting && statsAnimated.current) {
                // Stats section goes out of view - reset to zero
                console.log('Volunteer stats section out of view - resetting to zero');
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

  const volunteerCategories = [
    { id: 'all', name: 'All Opportunities', icon: Globe },
    { id: 'education', name: 'Education', icon: BookOpen },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'healthcare', name: 'Healthcare', icon: Heart }
  ];

  const volunteerOpportunities = [
    {
      id: 1,
      title: "Breakfast Program Volunteer",
      category: "education",
      description: "Help serve nutritious breakfast to children before school, ensuring they start their day with energy and focus.",
      image: "/images/faithfeedskidseating.jpeg",
      location: "Oklahoma City, OK",
      timeCommitment: "2-3 hours per week",
      duration: "Ongoing"
    },
    {
      id: 2,
      title: "Youth Mentor",
      category: "community",
      description: "Provide guidance and support to at-risk youth through one-on-one mentoring and group activities.",
      image: "/images/faithfeedskidsstanding.jpeg",
      location: "Oklahoma City, OK",
      timeCommitment: "4-6 hours per week",
      duration: "6 months minimum"
    },
    {
      id: 3,
      title: "Community Outreach Coordinator",
      category: "community",
      description: "Help organize and coordinate community events, fundraisers, and awareness campaigns.",
      image: "/images/faithfeedsmanykids.jpeg",
      location: "Oklahoma City, OK",
      timeCommitment: "5-8 hours per week",
      duration: "Flexible"
    }
  ];

  const filteredOpportunities = activeCategory === 'all' 
    ? volunteerOpportunities 
    : volunteerOpportunities.filter(opportunity => opportunity.category === activeCategory);

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
    console.log('Volunteer stats reset to zero - ready for re-animation');
  };

  // Function to animate stats counting up
  const animateStats = () => {
    if (!statsRef.current || statsAnimated.current) {
      console.log('Volunteer animation already running or stats ref not available');
      return;
    }
    
    console.log('Starting volunteer stats animation');
    statsAnimated.current = true;
    
    const statElements = statsRef.current.querySelectorAll('.stat-number');
    console.log(`Found ${statElements.length} stat elements`);
    
    statElements.forEach((element, index) => {
      const finalValue = element.getAttribute('data-value');
      const isK = finalValue.includes('K');
      const isPlus = finalValue.includes('+');
      const isPercent = finalValue.includes('%');
      const numericValue = parseInt(finalValue.replace(/[K+%]/g, ''));
      
      console.log(`Animating volunteer stat ${index + 1}: 0 → ${finalValue}`);
      
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
          console.log(`Completed volunteer animation for stat ${index + 1}: ${finalValue}`);
        }
      });
    });
  };

  const volunteerStats = [
    { number: "500+", label: "Active Volunteers", icon: Users },
    { number: "10K+", label: "Hours Donated", icon: Clock },
    { number: "50+", label: "Programs Supported", icon: Target },
    { number: "95%", label: "Satisfaction Rate", icon: Star }
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">

                          {/* Hero Section */}
      <main className="relative mobile-hero-half-height">
         <div 
           className="absolute inset-0 z-0"
           style={{
             transform: `translateY(${scrollY * 0.5}px)`,
           }}
         >
           <img
             src="/images/faithfeedsmanykids.jpeg"
             alt="Faith Feeds International volunteer opportunities"
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
             <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/90 text-white text-sm font-medium mb-4 backdrop-blur-sm">
               <HandHeart size={16} className="mr-2" />
               Volunteer With Us
             </div>

             <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
               Make a
               <span className="text-[#ffd700] block mt-2 drop-shadow-2xl bg-gradient-to-r from-[#ffd700] to-[#ffed4a] bg-clip-text text-transparent">
                 Difference Today
               </span>
             </h1>

             <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-5xl mx-auto drop-shadow-lg mb-6">
               Your time and compassion can change a child's life forever. Join our volunteers who are making the difference between hunger and hope, between despair and dreams.
             </p>
             
             {/* Volunteer Impact Highlight */}
             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 mb-8 border border-white/20 max-w-4xl mx-auto">
               <p className="text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed drop-shadow-lg">
                 <span className="font-semibold text-[#ffd700]">Every volunteer hour matters:</span> Whether serving meals, tutoring children, or organizing supplies, you're helping break the cycle of poverty and giving children the tools they need to succeed.
               </p>
             </div>

             <div className="mt-8">
               <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-[#833556] text-white font-bold text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mx-auto mobile-optimized overflow-hidden">
                 <Heart size={24} className="relative z-10 group-hover:animate-pulse" />
                 <span className="relative z-10">Start Volunteering</span>
                 <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
               </button>
             </div>
           </div>
         </div>
       </main>

                    {/* Volunteer Stats Section */}
       <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
         {/* Extended Parallax Background from Hero */}
         <div 
           className="absolute inset-0 z-0"
           style={{
             transform: `translateY(${scrollY * 0.3}px)`,
           }}
         >
           <img
             src="/images/faithfeedsmanykids.jpeg"
             alt="Faith Feeds International volunteer opportunities background"
             className="w-full h-full object-cover scale-110"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50"></div>
           <div className="absolute inset-0 bg-[#833556]/30"></div>
         </div>
         
         {/* Content with Backdrop Filter */}
         <div className="relative z-10 backdrop-blur-[10px] bg-white/20">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div 
               id="stats-header"
               className={`text-center mb-12 lg:mb-16 ${
                 isVisible['stats-header'] ? 'animate-fadeInUp' : 'opacity-0'
               }`}
             >
               <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/90 text-white text-sm font-medium mb-4 backdrop-blur-sm">
                 <Users size={16} className="mr-2" />
                 Volunteer Impact
               </div>
                              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                 Our Amazing
                 <span className="text-[#833556] block mt-2 bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">
                   Volunteers
                 </span>
               </h2>
             </div>

             <div 
               ref={statsRef}
               id="stats-grid"
               className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
             >
               {volunteerStats.map((stat, index) => {
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
         </div>
       </section>

      {/* Volunteer Opportunities Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="opportunities-header"
            className={`text-center mb-12 lg:mb-16 ${
              isVisible['opportunities-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/90 text-white text-sm font-medium mb-4 backdrop-blur-sm">
              <Target size={16} className="mr-2" />
              Volunteer Opportunities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find Your
              <span className="text-[#833556] block mt-2 bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">
                Perfect Role
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover volunteer opportunities that match your skills, interests, and schedule. Every role makes a meaningful impact.
            </p>
          </div>

          {/* Category Filters */}
          <div 
            id="category-filters"
            className={`flex flex-wrap justify-center gap-4 mb-12 lg:mb-16 ${
              isVisible['category-filters'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            {volunteerCategories.map((category) => {
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

          {/* Opportunities Grid */}
          <div 
            id="opportunities-grid"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {filteredOpportunities.map((opportunity, index) => (
              <div
                key={opportunity.id}
                id={`opportunity-${opportunity.id}`}
                className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-400 hover:scale-105 transform hover:-translate-y-4 mobile-optimized ${
                  isVisible[`opportunity-${opportunity.id}`] ? 'animate-fadeInScale' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="w-full h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 transition-colors duration-300"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-sm font-medium text-[#833556] bg-[#833556]/10 px-3 py-1 rounded-full">
                      {volunteerCategories.find(cat => cat.id === opportunity.category)?.name}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                      <div className="flex items-center gap-4 text-white text-sm mb-2">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{opportunity.timeCommitment}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{opportunity.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {opportunity.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="relative p-6 lg:p-8 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-[#833556] bg-[#833556]/10 px-3 py-1 rounded-full">
                      {volunteerCategories.find(cat => cat.id === opportunity.category)?.name}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} />
                      <span>{opportunity.location}</span>
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#833556] transition-colors duration-300">
                    {opportunity.title}
                  </h3>

                  <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
                    {opportunity.description}
                  </p>

                  <button className="group w-full px-6 py-3 bg-[#833556] text-white font-semibold rounded-xl hover:bg-[#a04066] transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2 mobile-optimized">
                    <span>Apply Now</span>
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
            <HandHeart size={16} className="mr-2" />
            Join Our Mission
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 lg:mb-8">
            Ready to
            <span className="block mt-2">
              Serve?
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our community of dedicated volunteers and help us create lasting change in the lives of those who need it most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-white text-[#833556] font-bold text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mobile-optimized overflow-hidden">
              <Users size={24} className="relative z-10 group-hover:animate-pulse" />
              <span className="relative z-10">Apply Now</span>
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-transparent border-2 border-white text-white font-bold text-lg lg:text-xl rounded-2xl hover:bg-white hover:text-[#833556] transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mobile-optimized">
              <Phone size={24} className="group-hover:animate-pulse" />
              <span>Call Us</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
