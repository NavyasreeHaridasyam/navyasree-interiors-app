import { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock, FiMessageCircle } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle phone number click
  const handlePhoneClick = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  };

  // Function to handle email click
  const handleEmailClick = (email) => {
    window.open(`mailto:${email}`);
  };

  // Function to handle location click
  const handleLocationClick = () => {
    const address = encodeURIComponent("Gachibowli, Hyderabad");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
  };

  // Function to handle WhatsApp click
  const handleWhatsAppClick = (phoneNumber) => {
    const message = encodeURIComponent("Hello, I'm interested in your interior design services!");
    window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Message sent successfully! We'll get back to you within 24 hours.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    setFormData({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
    setIsSubmitting(false);
  };

  const contactDetails = [
    {
      icon: <FiPhone className="text-2xl" />,
      label: "Phone",
      value: "+91 9133129537",
      subtext: "Mon-Fri from 9am to 6pm",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      onClick: () => handlePhoneClick("+919133129537")
    },
    {
      icon: <FiMail className="text-2xl" />,
      label: "Email",
      value: "navyasreeharidasyam22@gmail.com",
      subtext: "We'll respond within 24 hours",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      onClick: () => handleEmailClick("navyasreeharidasyam22@gmail.com")
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      label: "Office",
      value: "Gachibowli, Hyderabad",
      subtext: "Visit our studio by appointment",
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      onClick: handleLocationClick
    },
    {
      icon: <FiMessageCircle className="text-2xl" />,
      label: "WhatsApp",
      value: "+91 9133129537",
      subtext: "Quick responses",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      onClick: () => handleWhatsAppClick("+919133129537")
    }
  ];

  const services = [
    "Home Interior Design",
    "Commercial Spaces",
    "Custom Furniture",
    "Renovation",
    "3D Visualization",
    "Color Consultation"
  ];

  const budgetRanges = [
    "₹5L - ₹10L",
    "₹10L - ₹20L",
    "₹20L - ₹50L",
    "₹50L+",
    "Not Sure"
  ];

  return (
    <div className="px-6 md:px-20 py-16 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Get In <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your space? Let's start a conversation about your project. 
            We're here to listen, understand, and bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center mb-8">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 mr-4">
                <FiSend className="text-2xl" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                Send us a message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Budget
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {budgetRanges.map((range, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="budget"
                        value={range}
                        checked={formData.budget === range}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className={`flex-1 text-center p-3 border rounded-xl cursor-pointer transition-all ${
                        formData.budget === range
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-700 dark:text-gray-300"
                      }`}>
                        {range}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us about your project, requirements, timeline, and any specific ideas you have in mind..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="text-lg" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="p-8 rounded-3xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactDetails.map((detail, index) => (
                  <motion.button
                    key={index}
                    onClick={detail.onClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer text-left w-full"
                  >
                    <div className={`p-3 rounded-xl ${detail.bgColor} group-hover:scale-110 transition-transform duration-300 ${detail.color}`}>
                      {detail.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-white">{detail.label}</p>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">{detail.value}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{detail.subtext}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="p-8 rounded-3xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400 mr-4">
                  <FiClock className="text-2xl" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Business Hours
                </h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM", status: "open" },
                  { days: "Saturday", hours: "10:00 AM - 4:00 PM", status: "open" },
                  { days: "Sunday", hours: "Closed", status: "closed" }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-gray-700 dark:text-gray-300">{schedule.days}</span>
                    <span className={`font-semibold ${
                      schedule.status === "open" 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-red-500"
                    }`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="p-8 rounded-3xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                Visit Our Studio
              </h2>
              <button 
                onClick={handleLocationClick}
                className="w-full rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              >
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6588947358854!2d78.35684657505075!3d17.43230150313483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93ca0dd2e13d%3A0xc33ae36231186a96!2sGachibowli%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1701100000000"
                  width="100%"
                  height="250"
                  className="border-0"
                  loading="lazy"
                  style={{ filter: "grayscale(20%) contrast(1.1)" }}
                ></iframe>
              </button>
              <div className="mt-4 text-center">
                <button 
                  onClick={handleLocationClick}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Gachibowli, Hyderabad · By appointment only
                </button>
              </div>
            </div>

            {/* Quick Response */}
            <div className="p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <h3 className="text-2xl font-semibold mb-3">Quick Response</h3>
              <p className="mb-4 opacity-90">
                Need immediate assistance? We typically respond within 1-2 hours during business hours.
              </p>
              <motion.button 
                onClick={() => handlePhoneClick("+919133129537")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Call Now: +91 9133129537
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Success Stats */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">
            Why Clients Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: "24h", label: "Avg. Response Time" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "500+", label: "Projects Completed" },
              { number: "15+", label: "Years Experience" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}