import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import './index.css'
import App from './App.jsx'
import './styles/global.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
  </BrowserRouter>
);

