"use client";

import { EchoProvider } from "@zdql/echo-react-sdk";
import { ThemeProvider } from "./context/ThemeContext";

const echoConfig = {
  appId: "ec4e4459-effe-4331-aaa5-046ec8279a1c",
  apiUrl: "https://echo.merit.systems",
  redirectUri: typeof window !== "undefined" ? window.location.origin : "",
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EchoProvider config={echoConfig}>
      <ThemeProvider>{children}</ThemeProvider>
    </EchoProvider>
  );
}
