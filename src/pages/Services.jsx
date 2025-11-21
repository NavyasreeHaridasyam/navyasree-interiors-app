import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCouch, 
  FaDraftingCompass, 
  FaHome, 
  FaPalette, 
  FaTools,
  FaBuilding,
  FaPaintRoller,
  FaLightbulb
} from "react-icons/fa";

export default function Services() {
  const [filter, setFilter] = useState("all");
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      category: "interior",
      icon: <FaHome className="text-4xl" />,
      title: "Home Interior Design",
      description: "Elegant and functional home designs tailored to your personality and lifestyle.",
      fullDescription: "Our home interior design service transforms your living space into a personalized sanctuary. We work with you to understand your lifestyle, preferences, and needs, creating designs that are both beautiful and functional. From concept to completion, we ensure every detail reflects your unique style.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
      features: ["Custom Space Planning", "Material Selection", "Color Consultation", "3D Visualization"]
    },
    {
      category: "furniture",
      icon: <FaCouch className="text-4xl" />,
      title: "Custom Furniture Design",
      description: "Custom-made furniture crafted with premium materials to match your space perfectly.",
      fullDescription: "Create furniture that's uniquely yours. Our custom furniture service combines expert craftsmanship with innovative design to create pieces that fit your space and style perfectly. We use only the finest materials and work closely with you throughout the process.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
      features: ["Bespoke Designs", "Premium Materials", "Expert Craftsmanship", "Perfect Fit Guarantee"]
    },
    {
      category: "interior",
      icon: <FaDraftingCompass className="text-4xl" />,
      title: "3D Modeling & Rendering",
      description: "High-quality 3D visualizations to help you preview your dream space before implementation.",
      fullDescription: "See your design come to life before any work begins. Our advanced 3D modeling and rendering services provide photorealistic visualizations of your space, allowing you to make informed decisions and adjustments before the physical transformation starts.",
      image: "https://images.unsplash.com/photo-1653022860307-0ccb6379f78b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fDNEJTIwbW9kZWxsaW5nJTIwYW5kJTIwcmVuZGVyaW5nJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
      features: ["Photorealistic Rendering", "Virtual Walkthroughs", "Real-time Revisions", "Multiple Design Options"]
    },
    {
      category: "interior",
      icon: <FaPalette className="text-4xl" />,
      title: "Color Consultation",
      description: "Expert color combination suggestions for a modern and refreshing ambience.",
      fullDescription: "Colors transform spaces and moods. Our color consultation service helps you choose the perfect palette that complements your space, lighting, and personal style. We consider psychological impacts, trends, and practicality to create harmonious color schemes.",
      image: "https://plus.unsplash.com/premium_photo-1683141378838-e2e421cf7ee3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["Color Psychology", "Lighting Analysis", "Trend Research", "Material Coordination"]
    },
    {
      category: "renovation",
      icon: <FaTools className="text-4xl" />,
      title: "Renovation & Remodeling",
      description: "Complete renovation services to upgrade old spaces with contemporary designs and functionality.",
      fullDescription: "Transform your existing space into something extraordinary. Our renovation and remodeling services combine structural expertise with design innovation to revitalize your space while maintaining its character and improving functionality.",
      image: "https://plus.unsplash.com/premium_photo-1683121004450-ced102f8db0e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg0fHxyZW5vdmF0aW9uJTIwY29uc3RydWN0aW9ufGVufDB8fDB8fHww",
      features: ["Structural Assessment", "Design Integration", "Quality Construction", "Project Management"]
    },
    {
      category: "commercial",
      icon: <FaBuilding className="text-4xl" />,
      title: "Commercial Spaces",
      description: "Professional interior designs for offices, retail spaces, and commercial establishments.",
      fullDescription: "Create commercial spaces that impress clients and inspire employees. We design offices, retail stores, and commercial establishments that reflect your brand identity while optimizing functionality, workflow, and customer experience.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80",
      features: ["Brand Integration", "Space Optimization", "Employee Wellness", "Client Experience"]
    }
  ];

  const filteredServices = filter === "all" ? services : services.filter((s) => s.category === filter);

  const categories = [
    { key: "all", label: "All Services", count: services.length },
    { key: "interior", label: "Interior Design", count: services.filter(s => s.category === "interior").length },
    { key: "furniture", label: "Furniture", count: services.filter(s => s.category === "furniture").length },
    { key: "renovation", label: "Renovation", count: services.filter(s => s.category === "renovation").length },
    { key: "commercial", label: "Commercial", count: services.filter(s => s.category === "commercial").length }
  ];

  return (
    <div className="px-6 md:px-20 py-20 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-white">
          Our <span className="text-blue-600 dark:text-blue-400">Services</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Discover our comprehensive range of interior design services tailored to transform 
          your space into something extraordinary. From concept to completion, we've got you covered.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center flex-wrap gap-4 mb-16"
      >
        {categories.map((category) => (
          <motion.button
            key={category.key}
            onClick={() => setFilter(category.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center space-x-2 ${
              filter === category.key 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span>{category.label}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              filter === category.key 
                ? "bg-blue-500" 
                : "bg-gray-300 dark:bg-gray-600"
            }`}>
              {category.count}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Services Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <AnimatePresence>
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
              onClick={() => setSelectedService(service)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 2 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                      +{service.features.length - 2} more
                    </span>
                  )}
                </div>
                <button className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Services Message */}
      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No services found for the selected category.
          </p>
        </motion.div>
      )}

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 mr-4">
                    {selectedService.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {selectedService.title}
                  </h2>
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {selectedService.fullDescription}
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedService.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Book This Service
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-20 text-center"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss your project and bring your vision to life with our expert services.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Get Free Consultation
            </button>
            </Link>
            <Link to="/">
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Our Portfolio
            </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}