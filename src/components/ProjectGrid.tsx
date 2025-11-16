import { Mic } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const HowToUse = () => {
  const [isOptionPressed, setIsOptionPressed] = useState(false);
  const [isZPressed, setIsZPressed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [outputText, setOutputText] = useState("");

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Prevent default behavior for Option+Z
    if (event.altKey && event.key.toLowerCase() === 'z') {
      event.preventDefault();
    }
    
    // Track individual key states
    if (event.key === 'Alt' || event.altKey) {
      setIsOptionPressed(true);
    }
    if (event.key.toLowerCase() === 'z') {
      setIsZPressed(true);
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    // Track key releases
    if (event.key === 'Alt') {
      setIsOptionPressed(false);
    }
    if (event.key.toLowerCase() === 'z') {
      setIsZPressed(false);
    }
  }, []);

  // Separate effect to handle recording state based on key combinations
  useEffect(() => {
    if (isOptionPressed && isZPressed && !isRecording) {
      // Start recording
      setIsRecording(true);
      setShowOutput(false);
      setOutputText("");
    } else if ((!isOptionPressed || !isZPressed) && isRecording) {
      // Stop recording
      setIsRecording(false);
      setTimeout(() => {
        setOutputText("Here is a sample sentence.");
        setShowOutput(true);
      }, 500);
    }
  }, [isOptionPressed, isZPressed, isRecording]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <section className="px-8 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="p-16">
          <div className="space-y-16">
            {/* Interactive Instructions */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">
                Try it yourself! Press and hold <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">⌥ + Z</kbd> on your keyboard
              </p>
            </div>
            
            {/* Step 1: Interactive Keyboard Shortcut */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 px-8 py-4 rounded-2xl">
                <kbd className={`px-6 py-3 border-2 rounded-2xl shadow-sm font-mono text-xl font-semibold transition-all duration-150 ${
                  isOptionPressed 
                    ? 'bg-blue-500 text-white border-blue-600 scale-95 shadow-lg' 
                    : 'bg-white border-gray-300'
                }`}>
                  ⌥
                </kbd>
                <span className="text-gray-400 text-xl">+</span>
                <kbd className={`px-6 py-3 border-2 rounded-2xl shadow-sm font-mono text-xl font-semibold transition-all duration-150 ${
                  isZPressed 
                    ? 'bg-blue-500 text-white border-blue-600 scale-95 shadow-lg' 
                    : 'bg-gray-50 border-gray-300'
                }`}>
                  Z
                </kbd>
              </div>
            </div>
            
            {/* Step 2: Interactive Microphone + Sound Waves */}
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <Mic className={`w-12 h-12 transition-colors duration-300 ${
                  isRecording ? 'text-red-500' : 'text-gray-400'
                }`} />
                {isRecording && (
                  <div className="absolute -inset-2 rounded-full bg-red-500/20 animate-ping" />
                )}
              </div>
              
              {/* Sound Waves - Only show when recording */}
              {isRecording && (
                <div className="flex items-center gap-2 h-16">
                  <div className="animate-pulse-wave w-1 rounded-full bg-blue-500" style={{height: '20px', animationDelay: '0s'}} />
                  <div className="animate-pulse-wave w-1 rounded-full bg-blue-500" style={{height: '40px', animationDelay: '0.1s'}} />
                  <div className="animate-pulse-wave w-1 rounded-full bg-blue-500" style={{height: '60px', animationDelay: '0.2s'}} />
                  <div className="animate-pulse-wave w-1 rounded-full bg-blue-500" style={{height: '40px', animationDelay: '0.3s'}} />
                  <div className="animate-pulse-wave w-1 rounded-full bg-blue-500" style={{height: '20px', animationDelay: '0.4s'}} />
                </div>
              )}
              
              {/* Recording Status */}
              {isRecording && (
                <p className="text-red-500 font-medium animate-pulse">
                  🔴 Recording... Release keys to stop
                </p>
              )}
            </div>
            
            {/* Step 3: Dynamic Text Output */}
            <div className="flex flex-col items-center gap-6">
              <div className={`px-8 py-4 backdrop-blur-xl bg-white/90 border border-white/30 rounded-2xl shadow-2xl min-w-[400px] transition-all duration-500 ${
                showOutput ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
              }`}>
                <p className="text-gray-700 text-lg font-medium">
                  {outputText || "Your transcribed text will appear here..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
