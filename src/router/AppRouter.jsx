import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';

function AppRouter() {
  

  return (
          <MainLayout>
            <Navbar />
            <main className="pt-16"> {/* Add padding to account for fixed navbar */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ProtectedRoute> <Services /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute> <Projects /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute> <Contact /></ProtectedRoute>} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </MainLayout>
  )
        
}

export default AppRouter;