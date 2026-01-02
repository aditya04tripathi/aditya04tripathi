"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import { TextSizeProvider } from "@/components/text-size-provider";
import { SiteHeader } from "./layout/site-header";
import LoadingComponent from "@/app/loading";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
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
