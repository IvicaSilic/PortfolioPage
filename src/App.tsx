import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/NavBar";
import Footer from "./assets/components/footer";
import Home from "./pages/home";
import JigsawPieces from "./assets/components/About";
import Projects from "./assets/components/projects";
import Aboutt from "./assets/components/ivica"
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} transitioning={transitioning} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} transitioning={transitioning} setTransitioning={setTransitioning} />} />
        <Route path="/about" element={<Aboutt />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer darkMode={darkMode} />
    </BrowserRouter>
  );
}