"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import { TextSizeProvider } from "@/components/text-size-provider";
import { SiteHeader } from "./layout/site-header";
import LoadingComponent from "@/app/loading";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Application-level providers wrapper.
 *
 * Sets up theme persistence (`next-themes`), text size provider and global
 * UI pieces such as the site header and Toaster. Intended to be mounted once
 * around the application (e.g. in the root layout).
 *
 * @param props.children - React children rendered inside providers
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TextSizeProvider>
        <SiteHeader />
        <main className="pt-24 pb-10 min-h-screen">
          <React.Suspense fallback={<LoadingComponent />}>
            {children}
          </React.Suspense>
        </main>
        <Toaster />
      </TextSizeProvider>
    </NextThemesProvider>
  );
}
