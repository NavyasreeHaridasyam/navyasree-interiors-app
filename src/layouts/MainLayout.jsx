import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </div>
  );
}

