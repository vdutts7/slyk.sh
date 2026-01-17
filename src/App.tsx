import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";

const App = () => (
  <TooltipProvider>
    <div className="min-h-screen relative" style={{ backgroundColor: '#ffffff' }}>
      <Toaster />
      <Sonner />
      <Index />
    </div>
  </TooltipProvider>
);

export default App;
