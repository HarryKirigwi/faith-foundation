'use client'
import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head'; // ✅ Import the correct Head

const UnderDevelopmentPage = () => {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      {/* ✅ Use Next.js Head component */}
      <Head>
        <title>Under Development - Faith Feeds International</title>
        <meta name="description" content="This page is currently under development. Please check back soon." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <main className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="space-y-6">
          {/* Icon */}
          <div className="flex justify-center items-center">
            <div className="p-5 bg-[#833556]/10 rounded-full">
              <Construction size={50} className="text-[#833556]" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Page Under Development
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
            We are working hard to bring this section to life. Thank you for your patience. Please check back later!
          </p>

          {/* Action Button */}
          <div className="pt-4">
            <Link href="/">
              <button className="group relative px-8 py-4 bg-[#833556] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Return to Home
              </button>
            </Link>
          </div>
        </div>
      </main>

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

export default UnderDevelopmentPage;
