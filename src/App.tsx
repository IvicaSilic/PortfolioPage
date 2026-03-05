import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./assets/components/NavBar";
import Footer from "./assets/components/Footer";
import Home from "./pages/home";
import Projects from "./assets/components/projects";
import About from "./assets/components/About";
import Contact from "./assets/components/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}