import { useState } from "react";
import {Link} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const allProjects = [
  {
    id: 1,
    title: "Modern Luxury Living Room",
    image: "https://plus.unsplash.com/premium_photo-1661924452989-fae8c1092210?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "interior",
    type: "Residential",
    duration: "6 weeks",
    budget: "Premium",
    description: "A sophisticated living room design featuring custom furniture and intelligent space planning.",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://plus.unsplash.com/premium_photo-1746888841256-aa28caaf8764?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9kZXJuJTIwbHV4YXJ5JTIwbGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  {
    id: 2,
    title: "Minimalist Master Bedroom",
    image: "https://plus.unsplash.com/premium_photo-1661962493427-910e3333cf5a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fG1pbmltYWxpc3QlMjBtYXN0ZXIlMjBiZWRyb29tfGVufDB8fDB8fHww",
    category: "interior",
    type: "Residential",
    duration: "4 weeks",
    budget: "Medium",
    description: "Clean lines and calming colors create a peaceful retreat for rest and relaxation.",
    images: [
      "https://images.unsplash.com/photo-1758448755969-8791367cf5c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1pbmltYWxpc3QlMjBtb2Rlcm4lMjBiZWRyb29tfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1636716773306-9441c484fd88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fG1pbmltYWxpc3QlMjBtb2Rlcm4lMjBiZWRyb29tfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1638840992956-142399e7e2df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIzfHxtaW5pbWFsaXN0JTIwbW9kZXJuJTIwYmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  {
    id: 3,
    title: "Contemporary Kitchen Design",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
    category: "furniture",
    type: "Residential",
    duration: "8 weeks",
    budget: "High",
    description: "State-of-the-art kitchen with custom cabinetry and premium appliances.",
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
      "https://plus.unsplash.com/premium_photo-1661913039360-859645e0ba49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGNvbnRlbXBhcmFyeSUyMGtpdGNoZW4lMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1680127402190-4ec85e040290?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGNvbnRlbXBhcmFyeSUyMGtpdGNoZW4lMjBkZXNpZ258ZW58MHx8MHx8fDA%3D"
    ]
  },
  {
    id: 4,
    title: "Creative Workspace Office",
    image: "https://images.unsplash.com/photo-1683549003873-b5c0d1c9ea51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
    category: "interior",
    type: "Commercial",
    duration: "12 weeks",
    budget: "Premium",
    description: "Innovative office design promoting collaboration and productivity.",
    images: [
      "https://images.unsplash.com/photo-1580584125761-7e6c3b0b2d7b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1693159682618-074078ed271e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JlYXRpdmUlMjB3b3Jrc3BhY2UlMjBvZmZpY2V8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1755436612906-60fbd2bffd69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNyZWF0aXZlJTIwd29ya3NwYWNlJTIwb2ZmaWNlfGVufDB8fDB8fHww"
    ]
  },
  {
    id: 5,
    title: "Custom Modular Sofa Set",
    image: "https://images.unsplash.com/photo-1653972233678-5d1c28d2a99f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "furniture",
    type: "Residential",
    duration: "3 weeks",
    budget: "Medium",
    description: "Bespoke modular sofa designed for flexibility and comfort.",
    images: [
      "https://images.unsplash.com/photo-1616627982382-b2f6e24d61ff?auto=format&fit=crop&w=1200&q=80",
      "https://plus.unsplash.com/premium_photo-1682125905209-92600e930b77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGN1c3RvbSUyMG1vZHVsZXIlMjBzb2ZhJTIwc2V0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1757969687837-03c847fffa06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGN1c3RvbSUyMG1vZHVsZXIlMjBzb2ZhJTIwc2V0fGVufDB8fDB8fHww"
    ]
  },
  {
    id: 6,
    title: "Luxury Hotel Lobby",
    image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1200&q=80",
    category: "interior",
    type: "Commercial",
    duration: "16 weeks",
    budget: "Premium",
    description: "Grand hotel lobby design combining luxury with warm hospitality.",
    images: [
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1677129666028-7bd789bb51aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGx1eGFyeSUyMGhvdGVsJTIwbG9iYnl8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1534679541758-8dc76ff8081d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGx1eGFyeSUyMGhvdGVsJTIwbG9iYnl8ZW58MHx8MHx8fDA%3D"
    ]
  }
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'carousel'

  const filteredProjects = filter === "all" 
    ? allProjects 
    : allProjects.filter((p) => p.category === filter);

  const categories = [
    { key: "all", label: "All Projects", count: allProjects.length },
    { key: "interior", label: "Interior Design", count: allProjects.filter(p => p.category === "interior").length },
    { key: "furniture", label: "Furniture", count: allProjects.filter(p => p.category === "furniture").length }
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
          Our <span className="text-blue-600 dark:text-blue-400">Projects</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Explore our portfolio of stunning interior design projects. Each space tells a unique story 
          of creativity, functionality, and exceptional craftsmanship.
        </p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3"
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

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1"
        >
          {[
            { key: "grid", icon: "⏹️", label: "Grid" },
            { key: "carousel", icon: "🔄", label: "Carousel" }
          ].map((view) => (
            <button
              key={view.key}
              onClick={() => setViewMode(view.key)}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === view.key
                  ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{view.icon}</span>
                <span className="hidden sm:inline">{view.label}</span>
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Projects Display */}
      {viewMode === "grid" ? (
        /* Grid View */
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {project.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                    <div className="flex items-center space-x-4 text-white/80 text-sm">
                      <span>{project.duration}</span>
                      <span>•</span>
                      <span>{project.budget}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                      {project.category}
                    </span>
                    <button className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Carousel View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto py-10"
        >
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={true}
            modules={[EffectCoverflow, Navigation]}
            className="px-4"
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.id} className="max-w-sm">
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-lg mx-2 group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-start p-6">
                    <div className="text-white transform">
                      <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">
                          {project.category}
                        </span>
                        <span className="px-2 py-1 bg-green-600 rounded-full text-sm">
                          {project.type}
                        </span>
                      </div>
                      <p className="text-sm opacity-90 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}

      {/* No Projects Message */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No projects found for the selected category.
          </p>
        </motion.div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Carousel */}
              <div className="relative h-96">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation
                  autoplay={{ delay: 5000 }}
                  loop={true}
                  className="h-full"
                >
                  {selectedProject.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`${selectedProject.title} ${index + 1}`}
                        className="w-full h-96 object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                    {selectedProject.category}
                  </span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                    {selectedProject.type}
                  </span>
                  <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                    {selectedProject.duration}
                  </span>
                  <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
                    {selectedProject.budget}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                  {selectedProject.title}
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {selectedProject.duration}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Project Duration</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {selectedProject.budget}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Budget Level</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {selectedProject.type}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Project Type</div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Start Similar Project
                  </button>
                  <button 
                    onClick={() => setSelectedProject(null)}
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

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
      >
        {[
          { number: "150+", label: "Projects Completed", color: "blue" },
          { number: "98%", label: "Client Satisfaction", color: "green" },
          { number: "15+", label: "Years Experience", color: "purple" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className={`text-4xl font-bold mb-2 text-${stat.color}-600 dark:text-${stat.color}-400`}>
              {stat.number}
            </div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-20"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Inspired by Our Work?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's collaborate to create something extraordinary for your space.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </button>
            </Link>
            <Link to="/services">
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View All Services
            </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}