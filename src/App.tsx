import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";

const App = () => (
  <TooltipProvider>
    <div className="min-h-screen bg-background relative">
      {/* Wave background - TEST VERSION */}
      <div className="wave-background">
        <div className="wave-layer-3"></div>
      </div>
      
      {/* DEBUG: Visible test element */}
      <div className="fixed top-4 left-4 z-50 bg-red-500 text-white p-2 rounded text-xs">
        Wave Test Active
      </div>
      
      <Toaster />
      <Sonner />
      <Index />
    </div>
  </TooltipProvider>
);

export default App;
