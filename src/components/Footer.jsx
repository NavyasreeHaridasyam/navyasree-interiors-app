import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa";

export default function Footer() {
  // Function to handle phone number click
  const handlePhoneClick = () => {
    window.open('tel:+919133129537');
  };

  // Function to handle email click
  const handleEmailClick = () => {
    window.open('mailto:navyasreeharidasyam22@gmail.com');
  };

  // Function to handle location click
  const handleLocationClick = () => {
    // Open Google Maps with the address
    const address = encodeURIComponent("123 Design Street, Hitech City");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 w-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                Navyasree<span className="text-blue-400">Interiors</span>
              </h3>
              <p className="text-gray-400 dark:text-gray-300 mb-4">
                Transforming spaces with innovative interior design solutions since 2010.
              </p>
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {[FaFacebook, FaInstagram, FaPinterest, FaTwitter].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300 hover:text-white hover:bg-blue-600 transition-all"
                  >
                    <Icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Projects', 'Services', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={handleEmailClick}
                    className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition cursor-pointer text-left"
                  >
                    navyasreeharidasyam22@gmail.com
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handlePhoneClick}
                    className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition cursor-pointer text-left"
                  >
                    +91 9133129537
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleLocationClick}
                    className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition cursor-pointer text-left"
                  >
                    123 Design Street, Hitech City
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 dark:text-gray-300">
              © 2025 Interior Design. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}