import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize Amplitude Analytics
const amplitudeKey = import.meta.env.VITE_AMPLITUDE_API_KEY;
if (amplitudeKey) {
  const script = document.createElement('script');
  script.src = `https://cdn.amplitude.com/script/${amplitudeKey}.js`;
  script.onload = () => {
    if (window.amplitude) {
      window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
      window.amplitude.init(amplitudeKey, {
        fetchRemoteConfig: true,
        autocapture: {
          attribution: true,
          fileDownloads: true,
          formInteractions: true,
          pageViews: true,
          sessions: true,
          elementInteractions: true,
          networkTracking: true,
          webVitals: true,
          frustrationInteractions: true
        }
      });
    }
  };
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")!).render(<App />);
