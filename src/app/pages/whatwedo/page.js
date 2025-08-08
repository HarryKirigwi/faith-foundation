"use client";
import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const WhatWeDoPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

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
      image: "/images/shelter-home.jpg",
      stats: "500+ Children Relocated",
    },
    {
      title: "A New Future for Exploited Children",
      description:
        "Children and youngsters who are exploited in their early days need a helping hand and support for their mental health. We take them out of this zone to give them a better life.",
      image: "/images/counseling-session.jpg",
      stats: "300+ Children Supported",
    },
    {
      title: "Bringing Dreams Within Reach for Children",
      description:
        "The underprivileged children do not have access to required financial help and resources needed to live the life of their dreams. We help them with everything they'll need.",
      image: "/images/dreams-children.jpg",
      stats: "1000+ Dreams Fulfilled",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <head>
        <title>
          What We Do - Faith Feeds International | Supporting Children & Youth
          Development
        </title>
        <meta
          name="description"
          content="Discover how Faith Feeds International supports children and youth through education, shelter homes, healthcare, and empowerment programs. Learn about our comprehensive approach to child development."
        />
        <meta
          name="keywords"
          content="child support, youth development, education programs, shelter homes, underprivileged children, faith-based charity, volunteer opportunities, donate to children"
        />
        <meta
          property="og:title"
          content="What We Do - Faith Feeds International | Supporting Children & Youth Development"
        />
        <meta
          property="og:description"
          content="We support children and youth to reach their full potential through education, shelter homes, healthcare, and empowerment programs across multiple regions."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href="https://faithfeedsinternational.org/what-we-do"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Faith Feeds International",
            description:
              "Supporting children and youth to reach their full potential through comprehensive care and education programs",
            url: "https://faithfeedsinternational.org",
            logo: "http://faithcp.rf.gd/wp-content/uploads/2025/06/FFI-LOGO.png",
            sameAs: [
              "https://facebook.com/faithfeedsinternational",
              "https://twitter.com/faithfeedsinternational",
            ],
          })}
        </script>
      </head>

      {/* Enhanced Hero Section */}
      <section className="relative pt-16 lg:pt-20 min-h-[85vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/childrens-education.jpg"
            alt="Children learning together at Faith Feeds International programs"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="max-w-2xl">
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
              <p className="text-xl text-gray-200 leading-relaxed mb-8">
                Through comprehensive programs including shelter homes, schools,
                healthcare, and empowerment initiatives, we create lasting
                change in the lives of underprivileged children and youth
                worldwide.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group relative px-8 py-4 bg-[#833556] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer">
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <Users size={20} />
                    Become a Volunteer
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
            <div className="lg:flex lg:justify-end">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-w-md">
                {/* Impact Stats */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-[#833556] rounded-lg flex items-center justify-center">
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        5,000+
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
                      <div className="text-2xl font-bold text-white">25+</div>
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
                      <div className="text-2xl font-bold text-white">12</div>
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
          <div className="text-center mb-16">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="text-center mb-16">
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
          <div className="space-y-16">
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
                    <button className="group cursor-pointer px-6 py-3 bg-[#833556] text-white font-semibold rounded-lg hover:bg-[#a04066] transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2">
                      <Users size={18} />
                      Get Involved
                    </button>
                    <button className="group cursor-pointer px-6 py-3 bg-transparent border-2 border-[#833556] text-[#833556] font-semibold rounded-lg hover:bg-[#833556] hover:text-white transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2">
                      <Heart size={18} />
                      Support This Cause
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
      <section className="py-20 bg-[#833556] relative overflow-hidden">
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

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8 text-purple-100">
              <div className="flex items-center space-x-2">
                <Phone size={20} className="text-purple-200" />
                <span>24/7 Helpline: +1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={20} className="text-purple-200" />
                <span>info@faithfeedsinternational.org</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group cursor-pointer relative px-8 py-4 bg-white text-[#833556] font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <Users size={20} />
                Become a Volunteer
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>

              <button className="group cursor-pointer relative px-8 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-xl hover:bg-white hover:text-[#833556] transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2">
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
