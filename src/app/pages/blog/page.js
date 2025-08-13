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
  BookOpen,
  User,
  Calendar,
  Clock,
  Search,
  Filter,
  Tag
} from 'lucide-react';
import { gsap } from "gsap";

export default function BlogPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
                console.log('Blog stats section in view - triggering animation');
                setTimeout(() => animateStats(), 500);
              } else if (!entry.isIntersecting && statsAnimated.current) {
                // Stats section goes out of view - reset to zero
                console.log('Blog stats section out of view - resetting to zero');
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

  const blogCategories = [
    { id: 'all', name: 'All Posts', icon: Globe },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'education', name: 'Education', icon: BookOpen },
    { id: 'impact', name: 'Impact Stories', icon: Heart },
    { id: 'volunteer', name: 'Volunteer', icon: Target }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Power of Community: How Faith Feeds International is Transforming Lives",
      category: "community",
      excerpt: "Discover how our community-driven approach is creating lasting change in vulnerable neighborhoods through faith, compassion, and collective action.",
      image: "/images/communityabout.png",
      author: "Faith Kagunda",
      date: "March 15, 2024",
      readTime: "5 min read",
      tags: ["Community", "Transformation", "Faith"],
      featured: true
    },
    {
      id: 2,
      title: "Breakfast Before School: Nourishing Minds and Bodies",
      category: "education",
      excerpt: "Learn about our innovative program that ensures every child starts their school day with a nutritious meal, improving attendance and academic performance.",
      image: "/images/faithfeedskidseating.jpeg",
      author: "Emily Wanjiku",
      date: "March 10, 2024",
      readTime: "4 min read",
      tags: ["Education", "Nutrition", "Children"]
    },
    {
      id: 3,
      title: "Volunteer Spotlight: Meet Our Dedicated Community Leaders",
      category: "volunteer",
      excerpt: "Meet the incredible volunteers who dedicate their time and energy to making a difference in the lives of children and families in need.",
      image: "/images/faithfeedsmanykids.jpeg",
      author: "Brian Mutembei",
      date: "March 8, 2024",
      readTime: "6 min read",
      tags: ["Volunteers", "Leadership", "Community"]
    },
    {
      id: 4,
      title: "From Struggle to Success: A Youth Empowerment Story",
      category: "impact",
      excerpt: "Follow the inspiring journey of a young person who transformed their life through our youth empowerment programs and mentorship initiatives.",
      image: "/images/faithfeedskidsstanding.jpeg",
      author: "Faith Kagunda",
      date: "March 5, 2024",
      readTime: "7 min read",
      tags: ["Youth", "Success", "Empowerment"],
      featured: true
    },
    {
      id: 5,
      title: "Building Stronger Families: Our Family Support Network",
      category: "community",
      excerpt: "Explore how our comprehensive family support programs are strengthening communities and breaking cycles of poverty through education and resources.",
      image: "/images/faithfeedskidsstanding.jpeg",
      author: "Emily Wanjiku",
      date: "March 1, 2024",
      readTime: "5 min read",
      tags: ["Family", "Support", "Community"]
    },
    {
      id: 6,
      title: "The Impact of Faith-Based Charity: Stories of Hope and Healing",
      category: "impact",
      excerpt: "Discover how faith-based initiatives are creating meaningful change and providing hope to those who need it most in our communities.",
      image: "/images/faithfeedskidseating.jpeg",
      author: "Brian Mutembei",
      date: "February 28, 2024",
      readTime: "6 min read",
      tags: ["Faith", "Hope", "Healing"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
    console.log('Blog stats reset to zero - ready for re-animation');
  };

  // Function to animate stats counting up
  const animateStats = () => {
    if (!statsRef.current || statsAnimated.current) {
      console.log('Blog animation already running or stats ref not available');
      return;
    }
    
    console.log('Starting blog stats animation');
    statsAnimated.current = true;
    
    const statElements = statsRef.current.querySelectorAll('.stat-number');
    console.log(`Found ${statElements.length} stat elements`);
    
    statElements.forEach((element, index) => {
      const finalValue = element.getAttribute('data-value');
      const isK = finalValue.includes('K');
      const isPlus = finalValue.includes('+');
      const isPercent = finalValue.includes('%');
      const numericValue = parseInt(finalValue.replace(/[K+%]/g, ''));
      
      console.log(`Animating blog stat ${index + 1}: 0 → ${finalValue}`);
      
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
          console.log(`Completed blog animation for stat ${index + 1}: ${finalValue}`);
        }
      });
    });
  };

  const blogStats = [
    { number: "50+", label: "Articles Published", icon: BookOpen },
    { number: "10K+", label: "Monthly Readers", icon: Users },
    { number: "25+", label: "Contributing Authors", icon: User },
    { number: "95%", label: "Engagement Rate", icon: Star }
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
            src="/images/communityabout.png"
            alt="Faith Feeds International blog and stories"
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
              <BookOpen size={16} className="mr-2" />
              Our Blog
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
              Stories of
              <span className="text-[#ffd700] block mt-2 drop-shadow-2xl bg-gradient-to-r from-[#ffd700] to-[#ffed4a] bg-clip-text text-transparent">
                Hope & Impact
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto drop-shadow-lg mb-8">
              Discover inspiring stories, community updates, and insights from our mission to transform lives through faith and action.
            </p>

            <div className="mt-8">
              <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-[#833556] text-white font-bold text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mx-auto mobile-optimized overflow-hidden">
                <Heart size={24} className="relative z-10 group-hover:animate-pulse" />
                <span className="relative z-10">Subscribe to Our Blog</span>
                <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Blog Stats Section */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="stats-header"
            className={`text-center mb-12 lg:mb-16 ${
              isVisible['stats-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/90 text-white text-sm font-medium mb-4 backdrop-blur-sm">
              <BookOpen size={16} className="mr-2" />
              Blog Statistics
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Our Growing
              <span className="text-[#833556] block mt-2 bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">
                Community
              </span>
            </h2>
          </div>

          <div 
            ref={statsRef}
            id="stats-grid"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {blogStats.map((stat, index) => {
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

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              id="featured-header"
              className={`text-center mb-12 lg:mb-16 ${
                isVisible['featured-header'] ? 'animate-fadeInUp' : 'opacity-0'
              }`}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/90 text-white text-sm font-medium mb-4 backdrop-blur-sm">
                <Star size={16} className="mr-2" />
                Featured Stories
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Must-Read
                <span className="text-[#833556] block mt-2 bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">
                  Articles
                </span>
              </h2>
            </div>

            <div 
              id="featured-grid"
              className="grid lg:grid-cols-2 gap-8 lg:gap-12"
            >
              {featuredPosts.map((post, index) => (
                <div
                  key={post.id}
                  id={`featured-${post.id}`}
                  className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-400 hover:scale-105 transform hover:-translate-y-4 mobile-optimized ${
                    isVisible[`featured-${post.id}`] ? 'animate-fadeInScale' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 transition-colors duration-300"></div>
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ffd700] text-gray-900">
                        Featured
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                        <div className="flex items-center gap-4 text-white text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {post.title}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative p-6 lg:p-8 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-[#833556] bg-[#833556]/10 px-3 py-1 rounded-full">
                        {blogCategories.find(cat => cat.id === post.category)?.name}
                      </span>
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="group w-full px-6 py-3 bg-[#833556] text-white font-semibold rounded-xl hover:bg-[#a04066] transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2 mobile-optimized">
                      <span>Read Full Article</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="blog-header"
            className={`text-center mb-12 lg:mb-16 ${
              isVisible['blog-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/90 text-white text-sm font-medium mb-4 backdrop-blur-sm">
              <BookOpen size={16} className="mr-2" />
              Latest Articles
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Explore Our
              <span className="text-[#833556] block mt-2 bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">
                Blog
              </span>
            </h2>
          </div>

          {/* Search and Filter */}
          <div 
            id="search-filter"
            className={`flex flex-col lg:flex-row gap-4 mb-12 lg:mb-16 ${
              isVisible['search-filter'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#833556] focus:border-transparent transition-all duration-300 text-gray-900 placeholder:text-gray-500 hover:border-[#833556]/50"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              {blogCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`group relative px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center gap-3 mobile-optimized ${
                      activeCategory === category.id
                        ? 'bg-[#833556] text-white shadow-2xl'
                        : 'bg-white text-gray-700 hover:bg-[#833556] hover:text-white shadow-lg hover:shadow-xl border-2 border-gray-200'
                    }`}
                  >
                    <Icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div 
            id="blog-grid"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {regularPosts.map((post, index) => (
              <div
                key={post.id}
                id={`post-${post.id}`}
                className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-400 hover:scale-105 transform hover:-translate-y-4 mobile-optimized ${
                  isVisible[`post-${post.id}`] ? 'animate-fadeInScale' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 transition-colors duration-300"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-sm font-medium text-[#833556] bg-[#833556]/10 px-3 py-1 rounded-full">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                      <div className="flex items-center gap-4 text-white text-sm mb-2">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="relative p-6 lg:p-8 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <button className="group w-full px-6 py-3 bg-[#833556] text-white font-semibold rounded-xl hover:bg-[#a04066] transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2 mobile-optimized">
                    <span>Read More</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Posts Message */}
          {regularPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No articles found. Please try a different search term or category.
              </div>
            </div>
          )}
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
            <BookOpen size={16} className="mr-2" />
            Stay Connected
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 lg:mb-8">
            Join Our
            <span className="block mt-2">
              Community
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Subscribe to our blog to receive the latest stories, updates, and insights from our mission.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-white text-[#833556] font-bold text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mobile-optimized overflow-hidden">
              <BookOpen size={24} className="relative z-10 group-hover:animate-pulse" />
              <span className="relative z-10">Subscribe to Blog</span>
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-transparent border-2 border-white text-white font-bold text-lg lg:text-xl rounded-2xl hover:bg-white hover:text-[#833556] transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mobile-optimized">
              <Heart size={24} className="group-hover:animate-pulse" />
              <span>Share Stories</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
