import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import logo from '/src/assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout, login, signup, googleLogin, setGuestUser } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services", protected: true },
    { path: "/projects", label: "Projects", protected: true },
    { path: "/contact", label: "Contact", protected: true },
  ];

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogin = async (formData, rememberMe) => {
    console.log("Login attempt:", formData);
    const result = await login(formData.email, formData.password);
    
    if (result.ok) {
      closeModals();
      navigate("/");
    } else {
      throw new Error(result.message);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await googleLogin();
    
    if (result.ok) {
      closeModals();
      navigate("/");
    } else {
      throw new Error(result.message);
    }
  };

  // UPDATED Guest login handler - Uses AuthContext setGuestUser
  const handleGuestLogin = async () => {
    console.log("Guest login attempt");
    
    try {
      // Create guest user data
      const guestUser = {
        id: 'guest_' + Date.now(),
        name: 'Guest',
        email: 'guest@navyasreeinteriors.com',
        isGuest: true,
        permissions: ['browse', 'view_projects', 'access_services']
      };
      
      // Use AuthContext to set guest user
      if (setGuestUser) {
        setGuestUser(guestUser);
      } else {
        // Fallback: Store in localStorage directly
        localStorage.setItem('user', JSON.stringify(guestUser));
      }
      
      // Close the modal
      closeModals();
      
      // Navigate to home to refresh the app state
      navigate("/");
      
      return guestUser;
    } catch (error) {
      console.error("Guest login error:", error);
      throw new Error('Failed to create guest session');
    }
  };

  const handleSignup = async (userData) => {
    console.log("Signup attempt:", userData);
    const result = await signup(
      userData.username, 
      userData.email, 
      userData.password, 
      userData.username
    );
    
    if (result.ok) {
      closeModals();
      navigate("/");
    } else {
      throw new Error(result.message);
    }
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleProtectedNavigation = (path, isProtected) => {
    if (isProtected && !user) {
      setShowLogin(true);
      return;
    }
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <nav className="bg-slate-100 dark:bg-gray-900 shadow-lg fixed w-full top-0 left-0 z-50 transition-all duration-300">
        <div className="max-w-9xl mx-auto px-9 py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-200"
          >
            {/* Logo */}
            <img 
              src={logo} 
              alt="logo" 
              className="bg-transparent h-20"  
            />
            
            {/* Text Container */}
            <div className="leading-tight">
              <span 
                className="text-xl bg-gradient-to-r from-gray-900 via-blue-700 to-blue-800 dark:from-white dark:via-blue-300 dark:to-blue-200 text-transparent bg-clip-text"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Navyasree
              </span>
              <span
                className="block text-lg bg-gradient-to-r from-blue-700 to-pink-500 dark:from-blue-300 dark:to-teal-200 text-transparent bg-clip-text italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Interiors
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.protected && !user ? (
                  <button
                    onClick={() => handleProtectedNavigation(link.path, true)}
                    className="relative text-lg font-medium transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer"
                  >
                    {link.label}
                    <span className="absolute -top-1 -right-2 text-xs text-red-500">🔒</span>
                  </button>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative text-lg font-medium transition-all duration-300 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}

            {/* THEME BUTTON */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {theme === "light" ? (
                <FiMoon className="text-gray-800 text-xl" />
              ) : (
                <FiSun className="text-yellow-400 text-xl" />
              )}
            </button>

            {/* AUTH LINKS */}
            {!user ? (
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-2 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="bg-gradient-to-r from-pink-300 to-purple-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-2 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-purple-700 dark:text-purple-300 font-medium font-serif">
                  Hi, {user.name} 
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden text-3xl text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 space-y-4 shadow-md">
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.protected && !user ? (
                  <button
                    onClick={() => handleProtectedNavigation(link.path, true)}
                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors text-left w-full flex items-center"
                  >
                    {link.label}
                    <span className="ml-2 text-xs text-red-500">🔒</span>
                  </button>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}

            {!user ? (
              <>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsOpen(false);
                  }}
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left w-full"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowSignup(true);
                    setIsOpen(false);
                  }}
                  className="block text-lg font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors text-left w-full"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-medium"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        )}
      </nav>

      {/* LOGIN POPUP MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[999]">
          <div className="relative">
            <button
              onClick={closeModals}
              className="absolute -top-4 -right-4 bg-red-500 text-white w-8 h-8 rounded-full text-xl flex items-center justify-center hover:bg-red-600 transition"
            >
              ✕
            </button>
            <LoginForm 
              onClose={closeModals} 
              onLogin={handleLogin}
              onGoogleLogin={handleGoogleLogin}
              onSwitchToSignup={switchToSignup}
              onGuestLogin={handleGuestLogin}
            />
          </div>
        </div>
      )}

      {/* SIGNUP POPUP MODAL */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[999]">
          <div className="relative">
            <button
              onClick={closeModals}
              className="absolute -top-4 -right-4 bg-red-500 text-white w-8 h-8 rounded-full text-xl flex items-center justify-center hover:bg-red-600 transition"
            >
              ✕
            </button>
            <SignupForm 
              onClose={closeModals} 
              onSignup={handleSignup}
              onSwitchToLogin={switchToLogin}
              onGuestLogin={handleGuestLogin}
            />
          </div>
        </div>
      )}
    </>
  );
}
