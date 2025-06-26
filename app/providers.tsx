"use client";

import { EchoProvider } from "@zdql/echo-react-sdk";
import { ThemeProvider } from "./context/ThemeContext";
import { AmbientSoundProvider } from "./context/AmbientSoundContext";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const echoConfig = {
    appId: "e4221534-92c7-4129-ad1d-50169a0c5841",
    apiUrl: "https://echo.merit.systems",
    redirectUri: mounted ? window.location.origin : "http://localhost:3000",
  };

  if (!mounted) {
    return (
      <ThemeProvider>
        <AmbientSoundProvider>
          {children}
        </AmbientSoundProvider>
      </ThemeProvider>
    );
  }

  return (
    <EchoProvider config={echoConfig}>
      <ThemeProvider>
        <AmbientSoundProvider>
          {children}
        </AmbientSoundProvider>
      </ThemeProvider>
    </EchoProvider>
  );
}
