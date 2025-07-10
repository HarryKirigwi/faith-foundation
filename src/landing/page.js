'use client'
import React from 'react';
import { ChevronDown, Heart, Globe, ArrowRight, HandHeart } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <head>
        <title>Faith Feeds International - Transforming Lives Through Faith and Community</title>
        <meta name="description" content="Join Faith Feeds International in our mission to connect people with opportunities for transformation through faith, community support, and sustainable initiatives." />
        <meta name="keywords" content="charity, faith, community, transformation, sustainable initiatives, volunteer, donate" />
        <meta property="og:title" content="Faith Feeds International - Transforming Lives Through Faith and Community" />
        <meta property="og:description" content="Join us in our mission to connect people with opportunities for transformation through faith, community support, and sustainable initiatives." />
        <meta property="og:image" content="http://faithcp.rf.gd/wp-content/uploads/2025/05/happy-multi-ethnic-young-group-600nw-2461211287.webp" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://faithfeedsinternational.org" />
      </head>

      {/* Hero Section */}
      <main className="relative pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-12 lg:py-0">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#833556]/10 text-[#833556] text-sm font-medium">
                <Globe size={16} className="mr-2" />
                Making a Global Impact
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transforming Lives Through
                <span className="text-[#833556] block mt-2">
                  Faith & Community
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                Join us in our mission to connect people with opportunities for transformation through faith, community support, and sustainable initiatives that create lasting change.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group relative px-8 py-4 bg-[#833556] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer">
  <div className="relative z-10 flex items-center justify-center gap-2">
    <Heart size={20} />
    Donate Now
  </div>
  <div className="absolute inset-0 bg-gradient-to-r from-[#833556] to-[#a04066] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
</button>

                <button className="group relative px-8 py-4 bg-transparent border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-xl hover:border-[#833556] hover:text-[#833556] transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer">
                  Learn More
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/images/happy-young-group.webp"
                  alt="Faith Feeds International Community"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Active Projects</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden lg:block">
                <div className="flex items-center space-x-2">
                  <HandHeart size={16} className="text-[#833556]" />
                  <span className="text-sm font-medium text-gray-700">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce lg:hidden">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown size={20} />
        </div>
      </div>

      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #833556 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
  );
};

export default LandingPage;