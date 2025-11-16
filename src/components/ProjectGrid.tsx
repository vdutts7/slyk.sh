import { Mic } from "lucide-react";

const HowToUse = () => {
  return (
    <section className="px-8 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="p-16">
          <div className="space-y-16">
            {/* Step 1: Keyboard Shortcut */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 px-8 py-4 rounded-2xl">
                <kbd className="animate-key-press px-6 py-3 bg-white border-2 border-gray-300 rounded-2xl shadow-sm font-mono text-xl font-semibold">
                  ⌥
                </kbd>
                <span className="text-gray-400 text-xl">+</span>
                <kbd className="animate-key-press px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-2xl shadow-sm font-mono text-xl font-semibold">
                  Z
                </kbd>
              </div>
            </div>
            
            {/* Step 2: Microphone + Sound Waves */}
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <Mic className="animate-mic-glow w-12 h-12 text-gray-400" />
              </div>
              
              {/* Sound Waves */}
              <div className="flex items-center gap-2 h-16">
                <div className="animate-pulse-wave w-1 rounded-full bg-blue-500" style={{height: '20px', animationDelay: '0s'}} />
                <div className="animate-pulse-wave w-1 rounded-full bg-blue-500" style={{height: '40px', animationDelay: '0.1s'}} />
                <div className="animate-pulse-wave w-1 rounded-full bg-blue-500" style={{height: '60px', animationDelay: '0.2s'}} />
                <div className="animate-pulse-wave w-1 rounded-full bg-blue-500" style={{height: '40px', animationDelay: '0.3s'}} />
                <div className="animate-pulse-wave w-1 rounded-full bg-blue-500" style={{height: '20px', animationDelay: '0.4s'}} />
              </div>
            </div>
            
            {/* Step 3: Text Output */}
            <div className="flex flex-col items-center gap-6">
              <div className="px-8 py-4 backdrop-blur-xl bg-white/90 border border-white/30 rounded-2xl shadow-2xl min-w-[400px]">
                <p className="text-gray-700 text-lg font-medium">
                  This is my transcribed text
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
