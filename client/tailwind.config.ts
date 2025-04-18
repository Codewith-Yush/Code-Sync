/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{jsx,tsx}", "./*.html"],
    theme: {
        extend: {
            colors: {
                dark: "#212429",
                darkHover: "#3D404A",
                light: "#f5f5f5",
                primary: "#39E079",
                danger: "#ef4444",
                purple: {
                    400: "#C4B5FD",
                    500: "#A78BFA",
                    600: "#8B5CF6",
                    900: "#4C1D95",
                },
                blue: {
                    400: "#60A5FA",
                    500: "#3B82F6",
                    600: "#2563EB",
                    900: "#1E3A8A",
                },
                gray: {
                    300: "#D1D5DB",
                    400: "#9CA3AF",
                    900: "#111827",
                },
                neon: {
                    green: "#39E079",
                    pink: "#FF00D4",
                    blue: "#00F0FF",
                },
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            animation: {
                "up-down": "up-down 2s ease-in-out infinite alternate",
                "gradient-xy": "gradientXY 15s ease infinite",
                "pulse-glow": "pulseGlow 3s ease-in-out infinite",
                "float": "float 4s ease-in-out infinite",
                "spin-slow": "spinSlow 12s linear infinite",
            },
            keyframes: {
                "up-down": {
                    "0%": { transform: "translateY(0)" },
                    "100%": { transform: "translateY(-10px)" },
                },
                gradientXY: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
                pulseGlow: {
                    "0%, 100%": {
                        boxShadow: "0 0 0 0 rgba(168, 85, 247, 0.7)",
                    },
                    "50%": {
                        boxShadow: "0 0 25px 10px rgba(168, 85, 247, 0.7)",
                    },
                },
                float: {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-8px)" },
                    "100%": { transform: "translateY(0px)" },
                },
                spinSlow: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
            boxShadow: {
                neon: "0 0 10px rgba(124, 58, 237, 0.8), 0 0 20px rgba(124, 58, 237, 0.5)",
                glow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                glass: "inset 0 0 0 1000px rgba(255, 255, 255, 0.05)",
            },
            backgroundImage: {
                "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
                "glass-effect": "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            },
        },
    },
    plugins: [],
}
