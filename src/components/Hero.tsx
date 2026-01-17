import { ChevronRight, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Just talk";
  const [showCursor, setShowCursor] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Wave Background Animation - Inverted white/gray dots pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="rgba(0, 0, 0, 0.08)" className="wave-dot-svg" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-dots)" className="wave-pattern" />
        </svg>
      </div>
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 border-b border-gray-200/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/slyk-logo.svg" alt="Slyk Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold">slyk</h1>
            <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50/80 rounded-full border border-blue-100/50">
              BETA
            </span>
          </div>
          <nav>
            <a 
              href="https://form.typeform.com/to/LJRZBZjB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
            >
              Get access <ChevronRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      </header>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-8 py-32">
        <h2 className="text-5xl md:text-8xl font-bold mb-16">
          <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-gray-300 animate-typing">
            {displayText}
          </span>
          {showCursor && displayText.length < fullText.length && (
            <span className="inline-block w-1 h-[0.9em] bg-gray-400 ml-1 animate-pulse" />
          )}
        </h2>
        
        <p className="text-xl text-gray-600 mb-20 max-w-2xl mx-auto">
          <span className="inline-block overflow-hidden whitespace-nowrap animate-tagline-reveal">
            Move at the speed of <em>thought</em>
          </span>
        </p>
        
        {/* Download Section */}
        <div className="space-y-4">
          <div className="relative inline-block" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="group inline-flex items-center justify-between gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium text-lg"
            >
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span>Download for macOS</span>
              </div>
              <ChevronDown className="w-5 h-5 animate-bounce group-hover:!animate-none transition-all" />
            </button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="glass-frosted absolute top-full left-0 mt-2 w-80 backdrop-blur-2xl bg-white/70 supports-[backdrop-filter]:bg-white/60 border border-white/40 rounded-2xl shadow-2xl z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 pointer-events-none"></div>
                <a 
                  href="https://pub-ce85575ff2b94452925f9b534bf4fd98.r2.dev/releases/slyk_1.0.0_aarch64.dmg" 
                  download
                  className="relative flex items-center justify-between px-6 py-4 hover:bg-white/30 transition-colors rounded-2xl"
                >
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-left">Apple Silicon</div>
                    <div className="text-sm text-gray-500 text-left">M1, M2, M3 • macOS 13+</div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 ml-4 rotate-180" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
