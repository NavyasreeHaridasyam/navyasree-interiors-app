import useScrollFadeIn from "../hooks/useScrollFadeIn";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function About() {
  const refMission = useScrollFadeIn("up", 1, 0.2);
  const refVision = useScrollFadeIn("up", 1, 0.4);

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww",
      bio: "15+ years in luxury interior design"
    },
    {
      name: "Mike Chen",
      role: "Architect",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
      bio: "Specialized in modern architectural design"
    },
    {
      name: "Anita Desai",
      role: "Project Manager",
      image: "https://media.istockphoto.com/id/2060433249/photo/photo-of-young-girl-wearing-t-shirt-isolated-yellow-background-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=hk99PC5UEh5LemwxdHqRKrFCVEu2eKuL4W9t0n74mfU=",
      bio: "Ensuring seamless project execution"
    },
    {
      name: "Liam Smith",
      role: "3D Visualizer",
      image: "https://media.istockphoto.com/id/1303206644/photo/portrait-of-smiling-caucasian-man-pose-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=akRiOpll6XSlduMj09n9Zm11SsRpAjtdr85GbGJ99uM=",
      bio: "Bringing designs to life through visualization"
    }
  ];

  const values = [
    {
      icon: "🎨",
      title: "Creativity",
      description: "Innovative designs that push boundaries"
    },
    {
      icon: "⭐",
      title: "Excellence",
      description: "Uncompromising quality in every detail"
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "Working together to achieve your vision"
    },
    {
      icon: "⚡",
      title: "Innovation",
      description: "Staying ahead with latest trends and technologies"
    }
  ];

  return (
    <div className="px-6 md:px-20 py-20 bg-cyan-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
          About <span className="text-blue-600 dark:text-blue-400">Our Studio</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We are passionate creators dedicated to transforming spaces into inspiring environments 
          that reflect your personality and enhance your lifestyle.
        </p>
      </motion.section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4000 }}
            loop={true}
            className="rounded-3xl shadow-2xl"
          >
            {[
              "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=900&q=80"
            ].map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Studio ${index + 1}`}
                  className="w-full h-96 md:h-[500px] object-cover rounded-3xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Crafting Spaces That Inspire
          </h2>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Founded with a vision to revolutionize interior design, our studio brings together 
            creativity, innovation, and craftsmanship. We believe that every space tells a story, 
            and we're here to help you write yours.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Our team of expert designers, architects, and craftsmen work collaboratively to 
            create environments that are not just beautiful, but also functional, sustainable, 
            and tailored to your unique needs.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "500+", label: "Happy Clients" },
              { number: "150+", label: "Projects" },
              { number: "25+", label: "Awards" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Values Section */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          Our Values
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          What Drives Us
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mission */}
          <motion.div
            ref={refMission}
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-800"
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">
                Our Mission
              </h3>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
              To enhance lives by designing beautiful, practical, and luxurious living spaces 
              using creativity, innovation, and craftsmanship. We strive to create environments 
              that inspire, comfort, and reflect the unique personalities of our clients.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            ref={refVision}
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-800"
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">
                Our Vision
              </h3>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
              To become a globally recognized interior design brand delivering exceptional quality 
              and unmatched customer satisfaction. We envision a world where every space is 
              beautifully designed to enhance human experience and well-being.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {member.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}