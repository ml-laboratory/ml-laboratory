"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9" />; // Placeholder to avoid layout shift
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-foreground transition-colors overflow-hidden"
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5">
                <motion.div
                    initial={false}
                    animate={{
                        scale: theme === "dark" ? 1 : 0,
                        opacity: theme === "dark" ? 1 : 0,
                        rotate: theme === "dark" ? 0 : -90,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="absolute inset-0"
                >
                    <Moon className="w-full h-full text-primary" />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{
                        scale: theme === "light" ? 1 : 0,
                        opacity: theme === "light" ? 1 : 0,
                        rotate: theme === "light" ? 0 : 90,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="absolute inset-0"
                >
                    <Sun className="w-full h-full text-orange-500" />
                </motion.div>
            </div>
        </button>
    );
}
