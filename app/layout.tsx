import "leaflet/dist/leaflet.css";
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DemoProvider } from "@/components/providers/demo-provider";

export const metadata: Metadata = {
  title: "Fund Intelligence Portal",
  description: "Synthetic internal and investor portal demo for a pan-European core real estate fund."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
