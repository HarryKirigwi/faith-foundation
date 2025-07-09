import React, { useState } from 'react';
import { 
  Wheat, 
  GraduationCap, 
  Stethoscope, 
  Droplets, 
  Heart, 
  Users,
  ArrowRight
} from 'lucide-react';

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      icon: Wheat,
      title: "Healthy Food",
      description: "Providing nutritious food to families in need, ensuring no one goes hungry in our communities.",
      buttonText: "Make a Donation",
      buttonAction: "donate"
    },
    {
      id: 2,
      icon: GraduationCap,
      title: "Education",
      description: "Supporting youth with educational programs and mentorship opportunities for a brighter future.",
      buttonText: "Join Us",
      buttonAction: "volunteer"
    },
    {
      id: 3,
      icon: Stethoscope,
      title: "Medical Care",
      description: "Offering free medical camps and healthcare services to underserved communities worldwide.",
      buttonText: "Make a Donation",
      buttonAction: "donate"
    },
    {
      id: 4,
      icon: Droplets,
      title: "Clean Water",
      description: "Installing clean water systems in rural and marginalized areas to improve quality of life.",
      buttonText: "Make a Donation",
      buttonAction: "donate"
    },
    {
      id: 5,
      icon: Heart,
      title: "Love & Care",
      description: "Providing emotional and spiritual support for families and individuals in times of need.",
      buttonText: "Share With Us",
      buttonAction: "share"
    },
    {
      id: 6,
      icon: Users,
      title: "Community Volunteering",
      description: "Participating in volunteering activities such as health awareness education and community development.",
      buttonText: "Join Us",
      buttonAction: "volunteer"
    }
  ];

  const handleButtonClick = (action, title) => {
    console.log(`${action} clicked for ${title}`);
  };

  const getButtonStyles = (action) => {
    const baseStyles = "group relative px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2";
    
    switch (action) {
      case 'donate':
        return `${baseStyles} bg-[#833556] text-white shadow-lg hover:shadow-xl`;
      case 'volunteer':
        return `${baseStyles} bg-transparent border-2 border-[#833556] text-[#833556] hover:bg-[#833556] hover:text-white`;
      case 'share':
        return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300`;
      default:
        return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200`;
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#833556]">Impact Areas</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how we're making a difference in communities worldwide through our comprehensive programs and initiatives.
          </p>
          <div className="mt-6 w-24 h-1 bg-[#833556] mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Subtle hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#833556]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon Container */}
              <div className="relative mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#833556]/10 group-hover:bg-[#833556] transition-all duration-300">
                <service.icon size={28} className="text-[#833556] group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Action Button */}
                <button
                  onClick={() => handleButtonClick(service.buttonAction, service.title)}
                  className={getButtonStyles(service.buttonAction)}
                >
                  {service.buttonText}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-[#833556] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#833556]/10 rounded-full flex items-center justify-center">
                <Heart size={20} className="text-[#833556]" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">Ready to make a difference?</h3>
                <p className="text-sm text-gray-600">Join our mission to transform lives through faith and community.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 bg-[#833556] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Get Started
                <ArrowRight size={16} />
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-[#833556] hover:text-[#833556] transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #833556 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </section>
  );
};

export default ServicesSection;