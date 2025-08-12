'use client'
import React, { useState, useEffect } from 'react';
import { Heart, Target, Users, Lightbulb, Globe, ArrowRight, Menu, X, Shield, BookOpen, HandHeart, ChevronDown, Play, Star, Phone, Clock, MapPin } from 'lucide-react';
import { STRIPE_DONATION_LINK } from '@/config/constants';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

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

  const handleDonateClick = () => {
    window.open(STRIPE_DONATION_LINK, '_blank');
  };

  const handleLearnMoreClick = () => {
    router.push('/pages/blog');
  };

  const navItems = [
    'Home',
    'About',
    'What we do',
    'Projects',
    'Volunteer',
    'Faith Feeds International Blog',
    'Contact'
  ];

  const testimonials = [
    {
      name: "Michael Onyango Odwallo",
      role: "Community Member",
      content: "FFI is an amazing space for connecting with people of all walks to inspire others to live quality lives that are proportional to or beyond their potential.",
      initial: "M"
    },
    {
      name: "Emily Wanjiku",
      role: "Volunteer",
      content: "Faith Feeds International gave me the opportunity to volunteer and truly make a difference. Seeing the smiles on children's faces after receiving meals and school supplies was life-changing.",
      initial: "E"
    },
    {
      name: "Brian Mutembei",
      role: "Program Beneficiary",
      content: "Thanks to their youth programs, I found purpose and support during a tough season of my life. They don't just talk about change — they walk the journey with you.",
      initial: "B"
    }
  ];

  const causes = [
    {
      title: "Breakfast Before School",
      description: "The program ensured that children living in adverse conditions could still afford to have a meal before going to school.",
      image: "/images/faithfeedskidseating.jpeg"
    },
    {
      title: "Empowering Families",
      description: "Building sustainable programs that strengthen families and promote self-reliance.",
      image: "/images/faithfeedsmanykids.jpeg"
    },
    {
      title: "Children's Education",
      description: "Giving children the tools to succeed through education and mentorship.",
      image: "/images/faithfeedskidsstanding.jpeg"
    }
  ];

  const targetAudience = [
    {
      number: "1",
      title: "Youth & Students",
      description: "General youth, including high school and college students, grappling with substance abuse and poor quality of life."
    },
    {
      number: "2",
      title: "Families & Community",
      description: "Families and members of the community affected by substance abuse and quality of life challenges."
    },
    {
      number: "3",
      title: "Teenage Mothers",
      description: "Teenage mothers, especially those that dropped out of school and need support to rebuild their lives."
    },
    {
      number: "4",
      title: "Disadvantaged Youth",
      description: "Youths from poor and challenged backgrounds who need empowerment and opportunity."
    }
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">

      {/* Hero Section with Background Image */}
      <main className="relative mobile-hero-half-height">
        {/* Background Image - Solid (No Parallax) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/aboutbackground.jpg"
            alt="Faith Feeds International community background"
            className="w-full h-full object-cover"
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div>
          <div className="absolute inset-0 bg-[#833556]/20"></div>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#ffd700]/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-[#833556]/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="hero-content"
            className={`text-center py-16 lg:py-24 ${
              isVisible['hero-content'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-lg text-[#833556] text-sm font-medium mb-8 border border-white/30 glass-effect drop-shadow-lg">
              <BookOpen size={16} className="mr-2" />
              About Our Mission
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
              About
              <span className="text-[#ffd700] block mt-2 drop-shadow-2xl bg-gradient-to-r from-[#ffd700] to-[#ffed4a] bg-clip-text text-transparent">
                Faith Feeds International
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto drop-shadow-lg mb-8">
              A faith-led initiative dedicated to restoring dignity through uplifting vulnerable communities 
              while empowering youth to lead change through service and leadership.
            </p>

            {/* Enhanced CTA Button */}
            <div className="mt-8">
              <button 
                onClick={handleLearnMoreClick}
                className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-[#833556] text-white font-bold text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mx-auto mobile-optimized overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#833556] via-[#a04066] to-[#833556] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                <Heart size={24} className="relative z-10 group-hover:animate-pulse" />
                <span className="relative z-10">Learn More About Us</span>
                <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
              <div className="flex flex-col items-center">
                <span className="text-sm mb-2 font-medium">Discover Our Story</span>
                <ChevronDown size={24} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Main About Content */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #833556 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div 
              id="about-content"
              className={`space-y-8 ${
                isVisible['about-content'] ? 'animate-slideInLeft' : 'opacity-0'
              }`}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium glass-effect">
                <Globe size={16} className="mr-2" />
                Our Story
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Building Hope Through
                <span className="text-[#833556] block mt-2 bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">
                  Faith & Action
                </span>
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg lg:text-xl">
                  <strong className="text-[#833556]">Faith Feeds International</strong> is a faith-led initiative dedicated to restoring 
                  dignity through uplifting the vulnerable communities while empowering the youth to lead 
                  change through service and leadership. Together, we walk in faith to build a future full 
                  of hope, compassion, and opportunity.
                </p>
                <p className="text-lg lg:text-xl">
                  We strongly believe that establishing an Empowerment Center dedicated to addressing modern 
                  life challenges, physical health, mental health, poverty, drugs and substance abuse, 
                  underperformance, and poor quality of life will provide appropriate life skills and 
                  mentorship programs among the youth.
                </p>
                <p className="text-lg lg:text-xl">
                  We believe that the success of this program hinges on the support and partnership of 
                  individuals and organizations who share our vision for a healthier, empowered youth population.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">Active in Community</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-[#833556]" />
                  <span className="text-sm font-medium text-gray-700">Trusted Organization</span>
                </div>
              </div>
            </div>

            <div 
              id="about-image"
              className={`relative ${
                isVisible['about-image'] ? 'animate-slideInRight' : 'opacity-0'
              }`}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <img
                  src="/images/communityabout.png"
                  alt="Faith Feeds International community outreach and youth empowerment programs"
                  className="w-full h-[400px] lg:h-[600px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-colors duration-300"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:scale-110 transition-all duration-200">
                    <Play size={28} className="text-[#833556] ml-1" />
                  </button>
                </div>
              </div>
              
              {/* Enhanced Floating Cards */}
              <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-white/95 backdrop-blur-lg p-4 lg:p-6 rounded-2xl shadow-2xl border border-white/20 animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Active in Community</div>
                    <div className="text-xs text-gray-600">24/7 Support</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white/95 backdrop-blur-lg p-4 lg:p-6 rounded-2xl shadow-2xl border border-white/20 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <HandHeart size={20} className="text-[#833556]" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Youth Empowerment</div>
                    <div className="text-xs text-gray-600">Our priority</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="founder-header"
            className={`text-center mb-12 lg:mb-20 ${
              isVisible['founder-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6 glass-effect">
              <Users size={16} className="mr-2" />
              Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-[#833556] bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">Founder</span>
            </h2>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div 
                id="founder-content"
                className={`text-center md:text-left order-2 md:order-1 ${
                  isVisible['founder-content'] ? 'animate-slideInLeft' : 'opacity-0'
                }`}
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">Faith Kagunda</h3>
                    <p className="text-[#833556] font-semibold text-lg lg:text-xl">Founder & Executive Director</p>
                  </div>
                  
                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                    Faith Community Pathways was founded by <strong className="text-[#833556]">Faith Kagunda</strong>, a passionate 
                    believer in community-driven change. With a heart for the marginalized and a vision 
                    to uplift the youth, she leads with faith, compassion, and purpose.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      "Passionate about community-driven change",
                      "Dedicated to uplifting marginalized communities",
                      "Visionary leader in youth empowerment"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 text-gray-600">
                        <div className="w-3 h-3 bg-[#833556] rounded-full flex-shrink-0"></div>
                        <span className="text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div 
                id="founder-image"
                className={`order-1 md:order-2 ${
                  isVisible['founder-image'] ? 'animate-slideInRight' : 'opacity-0'
                }`}
              >
                <div className="relative w-72 h-72 lg:w-96 lg:h-96 mx-auto">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                    <img
                      src="/images/communityfounder.jpg"
                      alt="Faith Kagunda, Founder of Faith Feeds International"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#833556]/30 to-transparent group-hover:from-[#833556]/20 transition-colors duration-300"></div>
                  </div>
                  
                  {/* Decorative Ring */}
                  <div className="absolute -inset-4 border-2 border-[#833556]/20 rounded-3xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Vision to Action Section - Bridging Founder to Mission */}
      <section className="relative overflow-hidden" style={{ height: '60vh', minHeight: '400px' }}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/aboutbackground.jpg"
            alt="Faith Feeds International vision to action background"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#833556]/80 via-[#833556]/60 to-[#833556]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#833556]/50 via-transparent to-[#833556]/60"></div>
        </div>
        
        {/* Content with Full-Width Backdrop Filter */}
        <div className="relative h-full flex items-center justify-center backdrop-blur-[10px] bg-white/10" style={{ zIndex: 10 }}>
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
              From Vision to
              <span className="text-[#ffd700] block mt-2 drop-shadow-2xl">
                Action
              </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed mb-8 drop-shadow-lg">
              Guided by faith and driven by compassion, we transform individual stories of hope into collective impact that uplifts entire communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white font-bold text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mobile-optimized overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Target size={24} className="relative z-10 group-hover:animate-pulse" />
                <span className="relative z-10">Our Mission</span>
                <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="values-header"
            className={`text-center mb-12 lg:mb-20 ${
              isVisible['values-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6 glass-effect">
              <Target size={16} className="mr-2" />
              Our Foundation
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#833556] bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">Values</span>
            </h2>
          </div>
          
          <div 
            id="values-grid"
            className={`grid md:grid-cols-2 gap-8 lg:gap-12 ${
              isVisible['values-grid'] ? 'animate-fadeInScale' : 'opacity-0'
            }`}
          >
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 mobile-optimized">
              <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/10 to-transparent group-hover:from-[#833556]/20 transition-colors duration-300"></div>
              <div className="relative p-8 lg:p-12 bg-white">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#833556] to-[#a04066] rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
                  To restore dignity and empower vulnerable communities through faith-based initiatives, 
                  providing comprehensive support systems that address modern life challenges while 
                  fostering leadership development among youth.
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 mobile-optimized">
              <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/10 to-transparent group-hover:from-[#833556]/20 transition-colors duration-300"></div>
              <div className="relative p-8 lg:p-12 bg-white">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#833556] to-[#a04066] rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
                  A future where every young person has access to the resources, mentorship, and 
                  opportunities needed to overcome challenges and become empowered leaders in their 
                  communities, building a society full of hope, compassion, and opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="audience-header"
            className={`text-center mb-12 lg:mb-20 ${
              isVisible['audience-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6 glass-effect">
              <Users size={16} className="mr-2" />
              Who We Serve
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Target <span className="text-[#833556] bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">Audience</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our primary focus will be on empowering those who need it most:
            </p>
          </div>
          
          <div 
            id="audience-grid"
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
          >
            {targetAudience.map((item, index) => (
              <div
                key={index}
                id={`audience-${index}`}
                className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 mobile-optimized ${
                  isVisible[`audience-${index}`] 
                    ? index % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'
                    : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image - Mobile Only */}
                <div className="absolute inset-0 z-0 md:hidden">
                  <img
                    src="/images/aboutbackground.jpg"
                    alt={`${item.title} background`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/80 via-[#833556]/60 to-[#833556]/40"></div>
                </div>
                
                {/* Content with Backdrop Filter - Mobile Only */}
                <div className="relative z-10 p-6 lg:p-8 md:backdrop-blur-none md:bg-white mobile-card-spacing backdrop-blur-[10px] bg-white/20">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#833556] to-[#a04066] text-white rounded-2xl flex items-center justify-center font-bold text-xl lg:text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {item.number}
                    </div>
                                      <h3 className="text-xl lg:text-2xl font-bold text-white md:text-gray-900">{item.title}</h3>
                </div>
                <p className="text-white/90 md:text-gray-600 text-base lg:text-lg leading-relaxed">
                  {item.description}
                </p>
                </div>
                <div className="absolute inset-0 border-2 border-[#833556]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Causes Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="causes-header"
            className={`text-center mb-12 lg:mb-20 ${
              isVisible['causes-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6 glass-effect">
              <Heart size={16} className="mr-2" />
              Recent Impact
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Recent <span className="text-[#833556] bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">Causes</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
              These are the current events we have had recently in creating awareness for the youth in the community
            </p>
          </div>
          
          <div 
            id="causes-grid"
            className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16"
          >
            {causes.map((cause, index) => (
              <div
                key={index}
                id={`cause-${index}`}
                className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-400 hover:scale-105 transform hover:-translate-y-4 mobile-optimized ${
                  isVisible[`cause-${index}`] ? 'animate-fadeInScale' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 transition-colors duration-300"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {cause.title}
                      </h3>
                    </div>
                  </div>
                </div>
                
                <div className="relative p-6 lg:p-8 bg-white">
                  <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                    {cause.description}
                  </p>
                </div>
                
                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-[#833556]/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
          
          <div 
            id="causes-cta"
            className={`text-center ${
              isVisible['causes-cta'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-[#833556] text-white font-bold text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mx-auto mobile-optimized overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#833556] via-[#a04066] to-[#833556] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
              <BookOpen size={24} className="relative z-10" />
              <span className="relative z-10">EXPLORE MORE STORIES</span>
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="testimonials-header"
            className={`text-center mb-12 lg:mb-20 ${
              isVisible['testimonials-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6 glass-effect">
              <Users size={16} className="mr-2" />
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              What People Are
              <span className="text-[#833556] block mt-2 bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">
                Saying
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#833556] to-[#a04066] mx-auto mb-8 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
              Hear from community members, volunteers, and beneficiaries who have experienced the transformative power of Faith Feeds International.
            </p>
          </div>
          
          <div 
            id="testimonials-grid"
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                id={`testimonial-${index}`}
                className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-400 hover:scale-105 transform hover:-translate-y-2 mobile-optimized ${
                  isVisible[`testimonial-${index}`] ? 'animate-fadeInScale' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image - Mobile Only */}
                <div className="absolute inset-0 z-0 md:hidden">
                  <img
                    src="/images/aboutbackground.jpg"
                    alt={`${testimonial.name} testimonial background`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/80 via-[#833556]/60 to-[#833556]/40"></div>
                </div>
                
                {/* Content with Backdrop Filter - Mobile Only */}
                <div className="relative z-10 p-6 lg:p-8 md:backdrop-blur-none md:bg-white mobile-card-spacing backdrop-blur-[10px] bg-white/20">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#833556]/20 to-[#833556]/10 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-[#833556] font-bold text-xl lg:text-2xl">{testimonial.initial}</span>
                    </div>
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-white md:text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm lg:text-base text-white/80 md:text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex text-[#ffd700] md:text-[#833556] mb-4 text-lg">
                      {Array.from({length: 5}, (_, i) => (
                        <Star key={i} size={20} className="fill-current" />
                      ))}
                    </div>
                    <p className="text-white/90 md:text-gray-600 text-base lg:text-lg leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-[#833556]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
          
          <div 
            id="testimonials-cta"
            className={`text-center mt-12 lg:mt-16 ${
              isVisible['testimonials-cta'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-[#833556]/10 text-[#833556] text-sm lg:text-base font-medium glass-effect">
              <Heart size={16} className="mr-2" />
              Join our community of changemakers
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 lg:py-24 bg-white" id='contact'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="contact-header"
            className={`text-center mb-12 lg:mb-20 ${
              isVisible['contact-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6 glass-effect">
              <Globe size={16} className="mr-2" />
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Contact <span className="text-[#833556] bg-gradient-to-r from-[#833556] to-[#a04066] bg-clip-text text-transparent">Us</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
              Feel free to ask us for any inquiries or for an opportunity to join us in our mission. 
              We highly accept new members as well, so be sure to register with us.
            </p>
          </div>
          
          <div 
            id="contact-content"
            className="grid lg:grid-cols-2 gap-12 lg:gap-20"
          >
            {/* Contact Form */}
            <div 
              id="contact-form"
              className={`space-y-8 ${
                isVisible['contact-form'] ? 'animate-slideInLeft' : 'opacity-0'
              }`}
            >
              <div>
                <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-8">
                  Send Us A Message
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm lg:text-base font-medium text-gray-700 mb-3">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#833556] focus:border-transparent transition-all duration-300 text-gray-900 placeholder:text-gray-500 hover:border-[#833556]/50"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm lg:text-base font-medium text-gray-700 mb-3">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#833556] focus:border-transparent transition-all duration-300 text-gray-900 placeholder:text-gray-500 hover:border-[#833556]/50"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700 mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#833556] focus:border-transparent transition-all duration-300 text-gray-900 placeholder:text-gray-500 hover:border-[#833556]/50"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#833556] focus:border-transparent transition-all duration-300 text-gray-900 placeholder:text-gray-500 hover:border-[#833556]/50"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700 mb-3">
                      Subject
                    </label>
                    <select className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#833556] focus:border-transparent transition-all duration-300 text-gray-900 hover:border-[#833556]/50">
                      <option value="" className="text-gray-500">Select a subject</option>
                      <option value="volunteer" className="text-gray-900">Volunteer Opportunity</option>
                      <option value="partnership" className="text-gray-900">Partnership Inquiry</option>
                      <option value="donation" className="text-gray-900">Donation Information</option>
                      <option value="general" className="text-gray-900">General Inquiry</option>
                      <option value="membership" className="text-gray-900">Membership Registration</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700 mb-3">
                      Message
                    </label>
                    <textarea
                      rows="6"
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#833556] focus:border-transparent transition-all duration-300 resize-none text-gray-900 placeholder:text-gray-500 hover:border-[#833556]/50"
                      placeholder="Tell us about your inquiry or how you'd like to get involved..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="group w-full px-8 py-4 lg:py-5 bg-[#833556] text-white font-bold text-lg lg:text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-3 mobile-optimized overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#833556] via-[#a04066] to-[#833556] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                    <span className="relative z-10">Send Message</span>
                    <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Information */}
            <div 
              id="contact-info"
              className={`space-y-8 ${
                isVisible['contact-info'] ? 'animate-slideInRight' : 'opacity-0'
              }`}
            >
              <div>
                <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-8">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {/* Physical Address */}
                  <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 mobile-optimized">
                    {/* Background Image - Mobile Only */}
                    <div className="absolute inset-0 z-0 md:hidden">
                      <img
                        src="/images/aboutbackground.jpg"
                        alt="Physical address background"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/80 via-[#833556]/60 to-[#833556]/40"></div>
                    </div>
                    
                    {/* Content with Backdrop Filter - Mobile Only */}
                    <div className="relative z-10 p-6 lg:p-8 md:backdrop-blur-none md:bg-white backdrop-blur-[10px] bg-white/20">
                      <div className="flex items-center mb-4">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#833556] to-[#a04066] rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <MapPin className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <h4 className="text-lg lg:text-xl font-bold text-white md:text-gray-900">Physical Address</h4>
                      </div>
                      <p className="text-white/90 md:text-gray-600 text-base lg:text-lg leading-relaxed">
                        3528 SE 94 street Okc
                      </p>
                    </div>
                  </div>
                  
                  {/* Work Hours */}
                  <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 mobile-optimized">
                    {/* Background Image - Mobile Only */}
                    <div className="absolute inset-0 z-0 md:hidden">
                      <img
                        src="/images/aboutbackground.jpg"
                        alt="Work hours background"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/80 via-[#833556]/60 to-[#833556]/40"></div>
                    </div>
                    
                    {/* Content with Backdrop Filter - Mobile Only */}
                    <div className="relative z-10 p-6 lg:p-8 md:backdrop-blur-none md:bg-white backdrop-blur-[10px] bg-white/20">
                      <div className="flex items-center mb-4">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#833556] to-[#a04066] rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <Clock className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <h4 className="text-lg lg:text-xl font-bold text-white md:text-gray-900">Work Hours</h4>
                      </div>
                      <div className="space-y-2 text-white/90 md:text-gray-600">
                        <p className="text-base lg:text-lg">Monday to Friday: 7am - 7pm</p>
                        <p className="text-base lg:text-lg">Weekend: 10am - 5pm</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Call Or WhatsApp */}
                  <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 mobile-optimized">
                    {/* Background Image - Mobile Only */}
                    <div className="absolute inset-0 z-0 md:hidden">
                      <img
                        src="/images/aboutbackground.jpg"
                        alt="Contact phone background"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/80 via-[#833556]/60 to-[#833556]/40"></div>
                    </div>
                    
                    {/* Content with Backdrop Filter - Mobile Only */}
                    <div className="relative z-10 p-6 lg:p-8 md:backdrop-blur-none md:bg-white backdrop-blur-[10px] bg-white/20">
                      <div className="flex items-center mb-4">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#833556] to-[#a04066] rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <Phone className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <h4 className="text-lg lg:text-xl font-bold text-white md:text-gray-900">Call Or WhatsApp</h4>
                      </div>
                      <a 
                        href="tel:+14055351599"
                        className="text-[#ffd700] md:text-[#833556] text-base lg:text-lg font-semibold hover:text-white md:hover:text-[#a04066] transition-colors duration-300"
                      >
                        +1 (405) 535-1599
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 lg:p-8">
                <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-6">Quick Actions</h4>
                <div className="space-y-3">
                  {[
                    { icon: Users, text: "Volunteer Registration" },
                    { icon: Heart, text: "Partnership Inquiry" },
                    { icon: Shield, text: "Donation Information" }
                  ].map((item, index) => (
                    <button key={index} className="w-full text-left text-[#833556] px-4 py-4 bg-white rounded-2xl hover:bg-[#833556] hover:text-white transition-all duration-300 flex items-center gap-3 mobile-optimized group">
                      <item.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#833556] to-[#a04066] text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
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
            Join Our
            <span className="block mt-2">
              Mission
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Together, we can build a future full of hope, compassion, and opportunity. 
            Partner with us to empower the next generation of leaders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-white text-[#833556] font-bold text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mobile-optimized overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Users size={24} className="relative z-10 group-hover:animate-pulse" />
              <span className="relative z-10">Get Involved</span>
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={handleDonateClick}
              className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-transparent border-2 border-white text-white font-bold text-lg lg:text-xl rounded-2xl hover:bg-white hover:text-[#833556] transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 flex items-center justify-center gap-3 mobile-optimized"
            >
              <Heart size={24} className="group-hover:animate-pulse" />
              <span>Donate Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, #833556 2px, transparent 0),
            radial-gradient(circle at 75px 75px, #a04066 1px, transparent 0)
          `,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
    </div>
  );
}