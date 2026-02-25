import { useState } from "react";
import Navbar from "./assets/components/NavBar";
import Hero from "./assets/components/Hero";
import Footer from "./assets/components/footer";
import About from "./assets/components/About";
import TetrisBoard from "./assets/components/About";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  return (
    <div>
      <Navbar darkMode={darkMode} transitioning={transitioning} />
      <Hero darkMode={darkMode} setDarkMode={setDarkMode} transitioning={transitioning} setTransitioning={setTransitioning} />
      <TetrisBoard/>
      <Footer darkMode={darkMode} />
    </div>
  );
}