// pages/Home.tsx - only the hero
import Hero from "../assets/components/Hero";
import Projects from "../assets/components/projects";
import JigsawSkills from "../assets/components/Skills";


export default function Home() {
  return (
    <>
    <Hero/>
    <JigsawSkills />
    <Projects/>
    </>
  );
}