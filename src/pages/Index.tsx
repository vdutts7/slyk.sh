import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import { Github } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <main>
        <ProjectGrid />
      </main>
      
    </div>
  );
};

export default Index;
