"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useTextSize } from "@/components/text-size-provider";
import { useEffect, useState } from "react";

export function SettingsWidget() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { size, setSize } = useTextSize();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <div className="flex items-center gap-1 border border-border/40 rounded-none p-1 bg-background/50 backdrop-blur-sm">
            <Button
                variant={size === "small" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setSize("small")}
                className="h-7 w-7"
                title="Small Text"
            >
                <span className="text-xs font-bold">A</span>
            </Button>
            <Button
                variant={size === "normal" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setSize("normal")}
                className="h-7 w-7"
                title="Normal Text"
            >
                <span className="text-sm font-bold">A</span>
            </Button>
            <Button
                variant={size === "large" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setSize("large")}
                className="h-7 w-7"
                title="Large Text"
            >
                <span className="text-lg font-bold">A</span>
            </Button>

            <div className="w-px h-4 bg-border/50 mx-1" />

            <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-7 w-7"
                title="Toggle Theme"
            >
                {resolvedTheme === "dark" ? (
                    <Sun className="size-4" />
                ) : (
                    <Moon className="size-4" />
                )}
            </Button>
        </div>
    );
}
