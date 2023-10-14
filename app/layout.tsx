import "./globals.css";
import type {Metadata} from "next";

import {Inter} from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs";

import {ThemeProvider} from "@/components/theme-provider";
import {NavigationMenu} from "@/components/navigation/navigation-menu";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "WhosIn?",
  description: "Quien esta disponible?",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <body className={inter.className}>
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="system"
          >
            <NavigationMenu />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
