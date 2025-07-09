'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Target, Users, Lightbulb, Globe, ArrowRight, Menu, X, Shield, BookOpen, HandHeart, ChevronDown } from 'lucide-react';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    'Home',
    'About',
    'What we do',
    'Projects',
    'Volunteer',
    'Faith Feeds International Blog',
    'Contact'
  ];

  const isScrolled = scrollY > 50;

  return (
    <div className="relative min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <head>
        <title>About Us - Faith Feeds International | Empowering Youth Through Faith</title>
        <meta name="description" content="Faith Feeds International is a faith-led initiative dedicated to restoring dignity through uplifting vulnerable communities and empowering youth to lead change through service and leadership." />
        <meta name="keywords" content="faith-based organization, youth empowerment, community development, substance abuse prevention, mental health support, leadership development" />
        <meta property="og:title" content="About Faith Feeds International - Empowering Youth Through Faith" />
        <meta property="og:description" content="Learn about our mission to restore dignity and empower youth through faith-based community initiatives and empowerment programs." />
        <meta property="og:image" content="/images/communityabout.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://faithfeedsinternational.org/about" />
      </head>

      {/* Navigation */}
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
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-700 hover:text-[#833556] font-medium transition-all duration-300 relative group text-sm xl:text-base py-2"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#833556] group-hover:w-full transition-all duration-300" />
                </a>
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
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-gray-50 border-t border-gray-100 mt-2 rounded-lg mx-2">
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-gray-700 hover:text-[#833556] font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white border-l-4 border-transparent hover:border-[#833556]"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 lg:py-24">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-8">
              <BookOpen size={16} className="mr-2" />
              About Our Mission
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              About
              <span className="text-[#833556] block mt-2">
                Faith Feeds International
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              A faith-led initiative dedicated to restoring dignity through uplifting vulnerable communities 
              while empowering youth to lead change through service and leadership.
            </p>
          </div>
        </div>
      </main>

      {/* Main About Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium">
                <Globe size={16} className="mr-2" />
                Our Story
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Building Hope Through
                <span className="text-[#833556] block mt-2">
                  Faith & Action
                </span>
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  <strong>Faith Feeds International</strong> is a faith-led initiative dedicated to restoring 
                  dignity through uplifting the vulnerable communities while empowering the youth to lead 
                  change through service and leadership. Together, we walk in faith to build a future full 
                  of hope, compassion, and opportunity.
                </p>
                <p className="text-lg">
                  We strongly believe that establishing an Empowerment Center dedicated to addressing modern 
                  life challenges, physical health, mental health, poverty, drugs and substance abuse, 
                  underperformance, and poor quality of life will provide appropriate life skills and 
                  mentorship programs among the youth.
                </p>
                <p className="text-lg">
                  We believe that the success of this program hinges on the support and partnership of 
                  individuals and organizations who share our vision for a healthier, empowered youth population.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/communityabout.png"
                  alt="Faith Feeds International community outreach and youth empowerment programs"
                  width={600}
                  height={400}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Active in Community</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden lg:block">
                <div className="flex items-center space-x-2">
                  <HandHeart size={16} className="text-[#833556]" />
                  <span className="text-sm font-medium text-gray-700">Youth Empowerment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6">
              <Users size={16} className="mr-2" />
              Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Meet Our
              <span className="text-[#833556] block mt-2">
                Founder
              </span>
            </h2>
            <div className="w-24 h-1 bg-[#833556] mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left order-2 md:order-1">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Faith Kagunda</h3>
                    <p className="text-[#833556] font-semibold text-lg">Founder & Executive Director</p>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Faith Community Pathways was founded by <strong>Faith Kagunda</strong>, a passionate 
                    believer in community-driven change. With a heart for the marginalized and a vision 
                    to uplift the youth, she leads with faith, compassion, and purpose.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="w-2 h-2 bg-[#833556] rounded-full"></div>
                      <span>Passionate about community-driven change</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="w-2 h-2 bg-[#833556] rounded-full"></div>
                      <span>Dedicated to uplifting marginalized communities</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="w-2 h-2 bg-[#833556] rounded-full"></div>
                      <span>Visionary leader in youth empowerment</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src="/images/communityfounder.jpg"
                      alt="Faith Kagunda, Founder of Faith Feeds International"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#833556]/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6">
              <Target size={16} className="mr-2" />
              Our Foundation
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our
              <span className="text-[#833556] block mt-2">
                Values
              </span>
            </h2>
            <div className="w-24 h-1 bg-[#833556] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/10 to-transparent"></div>
              <div className="relative p-8 lg:p-10 bg-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#833556] rounded-xl flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To restore dignity and empower vulnerable communities through faith-based initiatives, 
                  providing comprehensive support systems that address modern life challenges while 
                  fostering leadership development among youth.
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/10 to-transparent"></div>
              <div className="relative p-8 lg:p-10 bg-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#833556] rounded-xl flex items-center justify-center mr-4">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
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
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6">
              <Users size={16} className="mr-2" />
              Who We Serve
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Target
              <span className="text-[#833556] block mt-2">
                Audience
              </span>
            </h2>
            <div className="w-24 h-1 bg-[#833556] mx-auto mb-8"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Our primary focus will be on empowering those who need it most:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/5 to-transparent"></div>
              <div className="relative p-8 bg-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#833556] text-white rounded-xl flex items-center justify-center font-bold text-xl mr-4">1</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Youth & Students</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  General youth, including high school and college students, grappling with substance 
                  abuse and poor quality of life.
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/5 to-transparent"></div>
              <div className="relative p-8 bg-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#833556] text-white rounded-xl flex items-center justify-center font-bold text-xl mr-4">2</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Families & Community</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Families and members of the community affected by substance abuse and quality of life challenges.
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/5 to-transparent"></div>
              <div className="relative p-8 bg-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#833556] text-white rounded-xl flex items-center justify-center font-bold text-xl mr-4">3</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Teenage Mothers</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Teenage mothers, especially those that dropped out of school and need support 
                  to rebuild their lives.
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/5 to-transparent"></div>
              <div className="relative p-8 bg-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#833556] text-white rounded-xl flex items-center justify-center font-bold text-xl mr-4">4</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Disadvantaged Youth</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Youths from poor and challenged backgrounds who need empowerment and opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Recent Causes Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium mb-6">
              <Heart size={16} className="mr-2" />
              Recent Impact
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Recent
              <span className="text-[#833556] block mt-2">
                Causes
              </span>
            </h2>
            <div className="w-24 h-1 bg-[#833556] mx-auto mb-8"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              These are the current events we have had recently in creating awareness for the youth in the community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Breakfast Before School */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/breakfast-before-school.jpg"
                  alt="Children receiving breakfast before school program"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="relative p-6 bg-white">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  Breakfast Before School
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  The program ensured that children living in adverse conditions could still afford to have a meal before going to school.
                </p>
              </div>
            </div>
            
            {/* Empowering Families */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/empowering-families.jpg"
                  alt="Families participating in empowerment programs"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="relative p-6 bg-white">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  Empowering Families
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Building sustainable programs that strengthen families and promote self-reliance.
                </p>
              </div>
            </div>
            
            {/* Children's Education */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/childrens-education.jpg"
                  alt="Children participating in educational programs and mentorship"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="relative p-6 bg-white">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  Children's Education
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Giving children the tools to succeed through education and mentorship.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="group relative px-8 py-4 bg-[#833556] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto">
              <BookOpen size={20} />
              EXPLORE MORE STORIES
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-[#833556] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#833556] to-[#a04066]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8">
            <Heart size={16} className="mr-2" />
            Get Involved
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Join Our
            <span className="block mt-2">
              Mission
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            Together, we can build a future full of hope, compassion, and opportunity. 
            Partner with us to empower the next generation of leaders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-white text-[#833556] font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <Users size={20} />
              Get Involved
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group relative px-8 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-xl hover:bg-white hover:text-[#833556] transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <Heart size={20} />
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #833556 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
  );
}