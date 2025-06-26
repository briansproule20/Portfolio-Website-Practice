"use client";

import { EchoProvider } from "@zdql/echo-react-sdk";
import { ThemeProvider } from "./context/ThemeContext";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const echoConfig = {
    appId: "ec4e4459-effe-4331-aaa5-046ec8279a1c",
    apiUrl: "https://echo.merit.systems",
    redirectUri: mounted ? window.location.origin : "http://localhost:3000",
  };

  if (!mounted) {
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  return (
    <EchoProvider config={echoConfig}>
      <ThemeProvider>{children}</ThemeProvider>
    </EchoProvider>
  );
}
