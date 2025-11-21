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

  // Listen for auth state changes
  useEffect(() => {
    if (!auth) {
      console.error('Firebase auth not available');
      setFirebaseError('Firebase authentication is not configured properly. Please check your Firebase configuration.');
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          username: firebaseUser.displayName || firebaseUser.email.split('@')[0]
        });
        setFirebaseError(null);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    }, (error) => {
      console.error('Auth state change error:', error);
      setFirebaseError('Authentication error: ' + error.message);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const checkFirebase = () => {
    if (!auth) {
      throw new Error('Firebase is not properly configured. Please check your Firebase configuration.');
    }
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
        username: username
      };
      
      setUser(updatedUser);
      return { ok: true, user: updatedUser };
    } catch (error) {
      let message = "Signup failed. Please try again.";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = "Email already exists";
          break;
        case 'auth/invalid-email':
          message = "Invalid email address";
          break;
        case 'auth/weak-password':
          message = "Password should be at least 6 characters";
          break;
        default:
          message = error.message;
      }
      
      return { ok: false, message };
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
        username: firebaseUser.displayName || firebaseUser.email.split('@')[0]
      };
      
      setUser(userData);
      return { ok: true, user: userData };
    } catch (error) {
      let message = "Login failed. Please try again.";
      
      switch (error.code) {
        case 'auth/invalid-email':
          message = "Invalid email address";
          break;
        case 'auth/user-not-found':
          message = "No account found with this email";
          break;
        case 'auth/wrong-password':
          message = "Incorrect password";
          break;
        default:
          message = error.message;
      }
      
      return { ok: false, message };
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
        username: firebaseUser.displayName || firebaseUser.email.split('@')[0]
      };
      
      setUser(userData);
      return { ok: true, user: userData };
    } catch (error) {
      let message = "Google login failed. Please try again.";
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          message = "Google login was cancelled";
          break;
        case 'auth/popup-blocked':
          message = "Popup was blocked. Please allow popups for this site";
          break;
        default:
          message = error.message;
      }
      
      return { ok: false, message };
    }
  }

  // LOGOUT FUNCTION
  async function logout() {
    try {
      checkFirebase();
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  const value = {
    user,
    login,
    logout,
    signup,
    googleLogin,
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