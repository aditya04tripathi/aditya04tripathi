"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

type TextSize = "small" | "normal" | "large";

interface TextSizeContextType {
    size: TextSize;
    setSize: (size: TextSize) => void;
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(
    undefined
);

export function TextSizeProvider({ children }: { children: ReactNode }) {
    const [size, setSizeState] = useState<TextSize>("normal");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const storedSize = localStorage.getItem("text-size") as TextSize;
        if (storedSize) {
            setSizeState(storedSize);
            applySize(storedSize);
        }
        setMounted(true);
    }, []);

    const applySize = (newSize: TextSize) => {
        const root = document.documentElement;
        if (newSize === "small") {
            root.style.fontSize = "85%";
        } else if (newSize === "large") {
            root.style.fontSize = "110%";
        } else {
            root.style.fontSize = "100%";
        }
    };

    const setSize = (newSize: TextSize) => {
        setSizeState(newSize);
        localStorage.setItem("text-size", newSize);
        applySize(newSize);
    };

    // Prevent flash by avoiding rendering children until mounted if strict
    // But for text size, a minor shift is better than no content.
    // We must render Provider always so children hooks don't fail.

    return (
        <TextSizeContext.Provider value={{ size, setSize }}>
            {children}
        </TextSizeContext.Provider>
    );
}

export function useTextSize() {
    const context = useContext(TextSizeContext);
    if (context === undefined) {
        throw new Error("useTextSize must be used within a TextSizeProvider");
    }
    return context;
}
