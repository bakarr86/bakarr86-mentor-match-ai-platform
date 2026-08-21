import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import "./interaction.css";

export const metadata: Metadata = {
  title: "Per Scholas Mentor Match",
  description: "Connect talent, mentors, goals, and meaningful rewards.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
