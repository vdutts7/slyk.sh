import { useState, useEffect, useCallback } from "react";

const HowToUse = () => {
  const [isOptionPressed, setIsOptionPressed] = useState(false);
  const [isZPressed, setIsZPressed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [waveformData, setWaveformData] = useState<number[]>(Array(50).fill(2));
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

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

  // Real microphone input processing
  useEffect(() => {
    let animationFrame: number;
    
    const startMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMediaStream(stream);
        
        const context = new AudioContext();
        const analyserNode = context.createAnalyser();
        const source = context.createMediaStreamSource(stream);
        
        analyserNode.fftSize = 256;
        source.connect(analyserNode);
        
        setAudioContext(context);
        setAnalyser(analyserNode);
        
        const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
        
        const updateWaveform = () => {
          if (isRecording && analyserNode) {
            analyserNode.getByteFrequencyData(dataArray);
            
            // Convert frequency data to waveform bars
            const newWaveformData = Array.from({ length: 50 }, (_, i) => {
              const dataIndex = Math.floor((i / 50) * dataArray.length);
              const amplitude = dataArray[dataIndex] || 0;
              
              // Scale amplitude to pixel height (2-60px)
              const height = Math.max(2, (amplitude / 255) * 58 + 2);
              return height;
            });
            
            setWaveformData(newWaveformData);
          } else {
            setWaveformData(Array(50).fill(2));
          }
          
          animationFrame = requestAnimationFrame(updateWaveform);
        };
        
        updateWaveform();
      } catch (error) {
        console.log('Microphone access denied, using fallback animation');
        // Fallback to fake animation if mic access denied
        if (isRecording) {
          const interval = setInterval(() => {
            const fakeData = Array.from({ length: 50 }, () => 
              Math.max(2, Math.random() * 58 + 2)
            );
            setWaveformData(fakeData);
          }, 100);
          
          return () => clearInterval(interval);
        }
      }
    };
    
    if (isRecording) {
      startMicrophone();
    } else {
      // Stop microphone and reset waveform
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        setMediaStream(null);
      }
      if (audioContext) {
        audioContext.close();
        setAudioContext(null);
      }
      setAnalyser(null);
      setWaveformData(Array(50).fill(2));
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [isRecording]);

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
                Press + hold <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">⌥ + Z</kbd>
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
            
            {/* Step 2: Apple-style Sound Waveform */}
            <div className="flex flex-col items-center gap-8">
              {/* Apple Voice Memos Style Waveform */}
              <div className="flex items-center justify-center gap-1 h-20">
                {waveformData.map((height, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-100 ${
                      isRecording ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    style={{
                      height: `${height}px`,
                    }}
                  />
                ))}
              </div>
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
