"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LandingCardProps {
  children: React.ReactNode
  title: string
  description: string
  className?: string
}

export function LandingCard({ children, title, description, className }: LandingCardProps) {
  // Prevent hydration mismatch by delaying theme detection until client-side
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Only update the state after the component has mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Safely determine if we're in dark mode after mounting
  const isDarkMode = mounted && resolvedTheme === "dark"

  // Animation variants for card content
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    },
    hover: {
      transition: {
        staggerChildren: 0.07,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  }
  
  return (
    <motion.div
      whileHover="hover"
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      className={`relative overflow-visible w-[350px] ${className}`}
    >
      {/* Primary Glow Effect - Different for dark/light modes */}
      <motion.div 
        className={`absolute -inset-3 ${isDarkMode ? 'bg-white/15' : 'bg-black/30'} rounded-xl blur-2xl`}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.2, duration: 0.3 } },
          hover: { opacity: 0.9, scale: 1.05, transition: { duration: 0.2 } }
        }}
      />
      
      {/* Secondary glow for both modes */}
      <motion.div 
        className={`absolute -inset-1 ${isDarkMode ? 'bg-white/10' : 'bg-black/15'} rounded-lg blur-xl`} 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.3, duration: 0.3 } },
          hover: { opacity: 0.8, scale: 1.03, transition: { duration: 0.2 } }
        }}
      />
      
      {/* Bottom Glow Effect */}
      <motion.div 
        className={`absolute -bottom-4 inset-x-2 h-10 ${isDarkMode ? 'bg-white/15' : 'bg-black/25'} rounded-b-2xl blur-xl`}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.4, duration: 0.3 } },
          hover: { opacity: 0.9, scale: 1.1, transition: { duration: 0.2 } }
        }}
      />
      
      {/* Card Content - Use Tailwind dark: class for automatic handling */}
      <motion.div 
        className="relative overflow-hidden rounded-lg bg-white/90 dark:bg-black/90 p-6 shadow-sm transition-all hover:shadow-lg"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.1, type: "spring", stiffness: 100 } },
          hover: { y: -5, transition: { type: "spring", stiffness: 300, damping: 15 } }
        }}
      >
        <div className="flex flex-col space-y-4">
          <motion.div 
            className="rounded-full bg-black/5 dark:bg-white/5 p-3 w-fit"
            variants={{
              hidden: { scale: 0.8, opacity: 0 },
              visible: { scale: 1, opacity: 1, transition: { delay: 0.2, type: "spring", stiffness: 200 } },
              hover: { 
                scale: 1.1, 
                rotate: [0, -5, 5, -5, 0],
                transition: { 
                  scale: { type: "spring", stiffness: 300 },
                  rotate: { duration: 0.5, ease: "easeInOut" }
                } 
              }
            }}
          >
            {children}
          </motion.div>
          
          <div className="space-y-2">
            <motion.h3 
              className="text-xl font-bold text-black/90 dark:text-white/90"
              variants={itemVariants}
            >
              {title}
            </motion.h3>
            <motion.p 
              className="text-gray-600/90 dark:text-gray-400/90"
              variants={itemVariants}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 