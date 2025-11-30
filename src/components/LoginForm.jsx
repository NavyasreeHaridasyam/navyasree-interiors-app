import React, { useState } from 'react';

const LoginForm = ({ onClose, onLogin, onSwitchToSignup, onGoogleLogin, onGuestLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (authError) {
      setAuthError('');
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setAuthError('');
    
    try {
      await onLogin(formData, rememberMe);
    } catch (error) {
      console.error("Login form error:", error);
      setAuthError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setAuthError('');
    
    try {
      await onGoogleLogin();
    } catch (error) {
      console.error("Google login form error:", error);
      setAuthError(error.message || 'Google login failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    setAuthError('');
    
    try {
      await onGuestLogin();
    } catch (error) {
      console.error("Guest login form error:", error);
      setAuthError(error.message || 'Guest login failed. Please try again.');
    } finally {
      setGuestLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Semi-transparent overlay - allows homepage to show through */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      {/* Main Card with reduced size and margins */}
      <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mx-auto border border-white/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-600 hover:text-purple-800 transition-colors p-1 rounded-lg hover:bg-purple-50 z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Compact Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-md mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-xs font-medium">
            Sign in to your account
          </p>
        </div>

        {/* Auth Error - Compact */}
        {authError && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium text-xs">
            <div className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {authError}
            </div>
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="space-y-2 mb-3">
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading || isLoading || guestLoading}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow text-xs"
          >
            {googleLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin mr-1 h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </div>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <button
            onClick={handleGuestLogin}
            disabled={guestLoading || isLoading || googleLoading}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow text-xs"
          >
            {guestLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin mr-1 h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entering...
              </div>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Continue as Guest
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500 font-medium">or with email</span>
          </div>
        </div>

        {/* Compact Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 transition-all duration-300 text-sm ${
                errors.email 
                  ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-400' 
                  : 'border-gray-200 bg-white focus:ring-purple-200 focus:border-purple-400'
              }`}
              placeholder="Enter your email"
              disabled={isLoading || googleLoading || guestLoading}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 transition-all duration-300 text-sm pr-8 ${
                  errors.password 
                    ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-400' 
                    : 'border-gray-200 bg-white focus:ring-purple-200 focus:border-purple-400'
                }`}
                placeholder="Enter your password"
                disabled={isLoading || googleLoading || guestLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 p-0.5 transition-colors"
                disabled={isLoading || googleLoading || guestLoading}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.83 3.83" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  )}
                </svg>
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3 w-3 text-purple-600 focus:ring-purple-200 border-gray-300 rounded"
                disabled={isLoading || googleLoading || guestLoading}
              />
              <span className="ml-2 text-gray-700 font-medium">Remember me</span>
            </label>
            <button
              type="button"
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              disabled={isLoading || googleLoading || guestLoading}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || googleLoading || guestLoading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow text-sm mt-2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-1">
                <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Compact Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            New user?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-purple-600 hover:text-purple-700 font-bold transition-colors"
              disabled={isLoading || googleLoading || guestLoading}
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
