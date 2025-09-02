"use client";

import { ThemeProvider } from "./context/ThemeContext";
import { AmbientSoundProvider } from "./context/AmbientSoundContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AmbientSoundProvider>
        {children}
      </AmbientSoundProvider>
    </ThemeProvider>
  );
}
