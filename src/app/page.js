'use client'
import React from 'react';
import FaithFeedsHero from '@/landing/page';
import ServicesSection from '@/services/page';
import AboutPage from '@/about/page';
import FaithFeedsFooter from '@/footer/page';

// Helper component for icons (using inline SVG for simplicity)

// --- App (Root Page) Component ---
// This is the main page component for your Next.js app's root route (`/`).
// It imports and arranges the Hero and Services sections.
export default function App() {
  return (
    <main className="bg-white">
      {/* The Hero section is placed at the top of the page. */}
      <FaithFeedsHero />

      {/* The Services section follows the hero to detail what the organization offers. */}
      <ServicesSection />

      <AboutPage />
      <FaithFeedsFooter/>

      {/* You can continue adding more components here for a complete page */}
      {/* For example: <TestimonialsSection />, <EventsCalendar />, <ContactForm /> etc. */}
    </main>
  );
}
