"use client";

import { motion } from "motion/react";

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
}

export function FadeIn({ 
    children, 
    className, 
    delay = 0, 
    duration = 0.5,
    yOffset = 20
}: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
                duration: duration, 
                delay: delay,
                ease: "easeOut" 
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeInStagger({ 
    children, 
    className, 
    staggerDelay = 0.1 
}: { 
    children: React.ReactNode; 
    className?: string;
    staggerDelay?: number;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeInItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
