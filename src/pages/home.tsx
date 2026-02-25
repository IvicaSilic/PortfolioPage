import Hero from "../assets/components/Hero";
import JigsawPieces from "../assets/components/About";
import Projects from "../assets/components/projects";

interface HomeProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  transitioning: boolean;
  setTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Home({darkMode,setDarkMode,transitioning,setTransitioning,}: HomeProps) 
{
  return (<><Hero
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        transitioning={transitioning}
        setTransitioning={setTransitioning}/>
      <JigsawPieces />
      <Projects />
    </>
  );
}