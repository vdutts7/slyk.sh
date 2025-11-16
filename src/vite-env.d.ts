/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GH_USERNAME: string;
  readonly VITE_GH_TOKEN?: string;
  readonly VITE_POLL_INTERVAL: string;
  readonly VITE_AMPLITUDE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
