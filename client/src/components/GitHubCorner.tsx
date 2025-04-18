import { useSettings } from "@/context/SettingContext"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

function GitHubCorner() {
    const { showGitHubCorner } = useSettings()
    const { width } = useWindowDimensions()
    const [isHovered, setIsHovered] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    
    // Determine visibility based on settings and window width
    useEffect(() => {
        setIsVisible(showGitHubCorner && width > 640)
    }, [showGitHubCorner, width])

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href="https://github.com/codewith-yush/Code-Sync"
                    className="github-corner z-50 fixed"
                    aria-label="View source on GitHub"
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        top: 0,
                        right: 0,
                        pointerEvents: "auto"
                    }}
                >
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 250 250"
                        className="absolute right-0 top-0 border-none"
                        aria-hidden="true"
                        style={{
                            fill: "var(--color-primary, #2563eb)",
                            color: "var(--color-background, #ffffff)",
                            transition: "all 0.3s ease"
                        }}
                    >
                        <motion.path 
                            d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"
                            fill="currentColor"
                            animate={{
                                fill: isHovered ? "var(--color-accent, #4f46e5)" : "var(--color-primary, #2563eb)"
                            }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.g
                            style={{
                                transformOrigin: "130px 106px"
                            }}
                        >
                            <motion.path
                                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                                fill="currentColor"
                                className="octo-arm"
                                animate={{
                                    transform: isHovered 
                                        ? "rotate(-20deg) translate(-5px, 5px)" 
                                        : "rotate(0deg) translate(0px, 0px)"
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                    repeat: isHovered ? Infinity : 0,
                                    repeatType: "reverse"
                                }}
                            />
                            <path
                                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                                fill="currentColor"
                                className="octo-body"
                            />
                        </motion.g>
                    </svg>
                    
                    {/* Tooltip that appears on hover */}
                    <motion.div
                        className="absolute right-0 top-20 rounded-lg py-1 px-3 text-xs font-medium shadow-lg"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ 
                            opacity: isHovered ? 1 : 0, 
                            x: isHovered ? 0 : 10 
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                            backgroundColor: "var(--color-primary, #2563eb)",
                            color: "white",
                            pointerEvents: "none"
                        }}
                    >
                        View on GitHub
                    </motion.div>
                </motion.a>
            )}
        </AnimatePresence>
    )
}

export default GitHubCorner