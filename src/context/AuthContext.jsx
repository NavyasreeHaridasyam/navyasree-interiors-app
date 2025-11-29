import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  initializeApp 
} from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

// === REPLACE WITH YOUR ACTUAL FIREBASE CONFIG ===
// Get these FRESH values from Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log('🔥 Firebase Configuration Check:', {
  hasApiKey: !!firebaseConfig.apiKey,
  apiKeyLength: firebaseConfig.apiKey?.length,
  apiKeyStart: firebaseConfig.apiKey?.substring(0, 10),
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
});

// Validate configuration
const validateFirebaseConfig = (config) => {
  const errors = [];
  
  if (!config.apiKey || config.apiKey.includes('YOUR_')) {
    errors.push('Invalid API Key');
  }
  if (!config.projectId || config.projectId.includes('YOUR_')) {
    errors.push('Invalid Project ID');
  }
  if (!config.authDomain || config.authDomain.includes('YOUR_')) {
    errors.push('Invalid Auth Domain');
  }
  
  return errors;
};

const configErrors = validateFirebaseConfig(firebaseConfig);
if (configErrors.length > 0) {
  console.error('❌ Firebase Configuration Errors:', configErrors);
  console.log('💡 Please get your actual Firebase config from:');
  console.log('   Firebase Console → Project Settings → Your apps → Web app → Config');
}

// Initialize Firebase
let app;
let auth;

try {
  if (configErrors.length === 0) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log('✅ Firebase initialized successfully');
  } else {
    console.error('❌ Firebase not initialized due to configuration errors');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState(configErrors.length > 0 ? 'Invalid Firebase configuration' : null);

  // Load user from localStorage on initial load
  const loadUserFromLocalStorage = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // Only set as user if it's a guest user (has isGuest property)
        if (userData.isGuest) {
          console.log('👤 Loaded guest user from localStorage:', userData);
          setUser(userData);
          return true;
        }
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('user');
    }
    return false;
  };

  // Listen for auth state changes AND localStorage changes
  useEffect(() => {
    // First, try to load guest user from localStorage
    const guestUserLoaded = loadUserFromLocalStorage();
    
    // If Firebase is available, listen to auth state
    if (auth && !guestUserLoaded) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const userData = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            username: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            isGuest: false // Regular Firebase user, not guest
          };
          setUser(userData);
          setFirebaseError(null);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }, (error) => {
        console.error('Auth state change error:', error);
        setFirebaseError('Authentication service is currently unavailable. Please try again later.');
        setIsLoading(false);
      });

      return () => unsubscribe();
    } else {
      // If no Firebase or guest user already loaded, stop loading
      setIsLoading(false);
    }
  }, []);

  // NEW: Function to set guest user (called from Navbar)
  const setGuestUser = (guestUserData) => {
    setUser(guestUserData);
    localStorage.setItem('user', JSON.stringify(guestUserData));
  };

  // NEW: Function to clear guest user on logout
  const clearGuestUser = () => {
    localStorage.removeItem('user');
  };

  const checkFirebase = () => {
    if (!auth) {
      throw new Error('Authentication service is currently unavailable. Please try again later.');
    }
  };

  // Helper function to get user-friendly error messages
  const getAuthErrorMessage = (error) => {
    const errorCode = error.code;
    
    // Signup errors
    if (errorCode === 'auth/email-already-in-use') {
      return "This email address is already registered. Please use a different email or try logging in.";
    }
    if (errorCode === 'auth/invalid-email') {
      return "Please enter a valid email address.";
    }
    if (errorCode === 'auth/weak-password') {
      return "Password should be at least 6 characters long.";
    }
    
    // Login errors
    if (errorCode === 'auth/user-not-found') {
      return "No account found with this email address. Please check your email or sign up for a new account.";
    }
    if (errorCode === 'auth/wrong-password') {
      return "Incorrect password. Please try again or reset your password if you've forgotten it.";
    }
    if (errorCode === 'auth/invalid-credential') {
      return "Invalid email or password. Please check your credentials and try again.";
    }
    
    // Google auth errors
    if (errorCode === 'auth/popup-closed-by-user') {
      return "Google login was cancelled. Please try again if you'd like to continue with Google.";
    }
    if (errorCode === 'auth/popup-blocked') {
      return "Popup was blocked. Please allow popups for this site to continue with Google login.";
    }
    if (errorCode === 'auth/unauthorized-domain') {
      return "This domain is not authorized for Google login. Please contact support.";
    }
    
    // Network and other errors
    if (errorCode === 'auth/network-request-failed') {
      return "Network error. Please check your internet connection and try again.";
    }
    if (errorCode === 'auth/too-many-requests') {
      return "Too many unsuccessful login attempts. Please try again later or reset your password.";
    }
    if (errorCode === 'auth/user-disabled') {
      return "This account has been disabled. Please contact support for assistance.";
    }
    if (errorCode === 'auth/operation-not-allowed') {
      return "This login method is not enabled. Please contact support.";
    }
    
    // Default error message
    return "An unexpected error occurred. Please try again later.";
  };

  // SIGNUP FUNCTION
  async function signup(username, email, password, name) {
    try {
      checkFirebase();
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, {
        displayName: name || username
      });

      const updatedUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: name || username,
        username: username,
        isGuest: false
      };
      
      setUser(updatedUser);
      // Clear any guest session when regular user signs up
      localStorage.removeItem('user');
      return { success: true, user: updatedUser };
    } catch (error) {
      const userFriendlyMessage = getAuthErrorMessage(error);
      console.error('Signup error:', error);
      return { success: false, message: userFriendlyMessage };
    }
  }

  // LOGIN FUNCTION
  async function login(email, password) {
    try {
      checkFirebase();
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const userData = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        username: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        isGuest: false
      };
      
      setUser(userData);
      // Clear any guest session when regular user logs in
      localStorage.removeItem('user');
      return { success: true, user: userData };
    } catch (error) {
      const userFriendlyMessage = getAuthErrorMessage(error);
      console.error('Login error:', error);
      return { success: false, message: userFriendlyMessage };
    }
  }

  // GOOGLE LOGIN FUNCTION
  async function googleLogin() {
    try {
      checkFirebase();
      
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userData = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        username: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        isGuest: false
      };
      
      setUser(userData);
      // Clear any guest session when regular user logs in
      localStorage.removeItem('user');
      return { success: true, user: userData };
    } catch (error) {
      const userFriendlyMessage = getAuthErrorMessage(error);
      console.error('Google login error:', error);
      return { success: false, message: userFriendlyMessage };
    }
  }

  // LOGOUT FUNCTION - UPDATED to handle guest users
  async function logout() {
    try {
      // If it's a Firebase user, sign out from Firebase
      if (user && !user.isGuest && auth) {
        await signOut(auth);
      }
      
      // Always clear guest session and user state
      clearGuestUser();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, clear local state
      clearGuestUser();
      setUser(null);
      navigate("/");
    }
  }

  const value = {
    user,
    login,
    logout,
    signup,
    googleLogin,
    setGuestUser,
    isAuthenticated: !!user,
    isLoading,
    firebaseError,
    firebaseInitialized: !!auth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
