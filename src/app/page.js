'use client'
import React from 'react';
import FaithFeedsHero from '@/landing/page';
import ServicesSection from '@/services/page';
import AboutPage from '@/app/pages/about/page';
import FaithFeedsFooter from '@/app/layout/footer/page';
import WhatWeDoPage from '@/app/pages/whatwedo/page';
import LandingPage from '@/landing/page';
import Navigation from '@/app/layout/navigation/Navigation';
export default function App() {
  return (
    <main className="bg-white">
           
      <LandingPage />
  
      <ServicesSection />

      <AboutPage />
    </main>
  );
}
