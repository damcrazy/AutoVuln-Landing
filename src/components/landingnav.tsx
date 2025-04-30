"use client"

import Link from "next/link"
import Image from "next/image"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const LandingNavLinks = [
  {
    label: "FEATURES",
    href: "/#features",
    section: "features",
  },
  {
    label: "ROADMAP",
    href: "/#timeline",
    section: "timeline",
  },

]

interface NavLink {
  label: string;
  href: string;
  section?: string;
}

export function LandingNav() {
  const { setTheme } = useTheme()
  const [scrollRatio, setScrollRatio] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      // Calculate a smooth scroll ratio between 0 and 1
      const ratio = Math.min(window.scrollY / 150, 1)
      setScrollRatio(ratio)
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    // Only apply smooth scrolling on the homepage
    if (pathname === '/' && link.section) {
      e.preventDefault()
      const element = document.getElementById(link.section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (link.href.includes('#') && pathname !== '/') {
      // If we're not on homepage but the link has a hash, navigate first then handle scroll
      e.preventDefault()
      router.push(link.href)
    }
  }

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out",
      isScrolled ? "pt-4" : "pt-0"
    )}>
      {/* Glow Effect - only visible when scrolled */}
      {isScrolled && (
        <div 
          className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-gradient-to-b from-white/20 to-transparent blur-xl pointer-events-none" 
          style={{ 
            opacity: scrollRatio,
            transition: "opacity 500ms ease-in-out"
          }}
        />
      )}
      <nav 
        className={cn(
          "mx-auto bg-black/80 backdrop-blur-md dark:bg-black/80 shadow-md border border-gray-800/50 transition-all duration-500 ease-in-out",
          // Width transitions from 100% to 90% as you scroll
          "w-[calc(100%-10%*var(--scroll-ratio))]",
          // Rounded corners only when scrolled
          isScrolled ? "rounded-2xl" : "rounded-none"
        )}
        style={{ "--scroll-ratio": scrollRatio } as React.CSSProperties}
      >
        <div 
          className={cn(
            "flex items-center px-8 mx-auto transition-all duration-500 ease-in-out",
            // Use dynamic height based on scroll ratio
            "h-[calc(3.5rem-0.5rem*var(--scroll-ratio))]",
            isScrolled && "px-6"
          )}
          style={{ "--scroll-ratio": scrollRatio } as React.CSSProperties}
        >
          {/* Logo & Brand - Left */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="font-semibold text-white">
              <div className="flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="Autovuln Logo"
                  width={40}
                  height={40}
                  className="mr-3 transition-all duration-500 ease-in-out"
                  style={{ 
                    height: `calc(2.5rem - 0.4rem * ${scrollRatio})`,
                    width: `auto`,
                    objectFit: "contain",
                    objectPosition: "center"
                  }}
                />
                <span 
                  className="transition-all duration-500 ease-in-out"
                  style={{ 
                    fontSize: `calc(1.25rem - 0.125rem * ${scrollRatio})`
                  }}
                >
                  Autovuln
                </span>
              </div>
            </Link>
          </div>

          {/* Main Navigation - Center */}
          <div className="flex-1 flex items-center justify-center space-x-10">
            {LandingNavLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link)}
                className="text-white hover:text-white/80 transition-colors uppercase tracking-wider transition-all duration-500 ease-in-out font-medium"
                style={{ 
                  fontSize: `calc(0.875rem - 0.125rem * ${scrollRatio})`
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Controls - Right */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            {/* Theme Toggle Button */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white transition-all duration-500 ease-in-out"
                  style={{ 
                    height: `calc(2rem - 0.25rem * ${scrollRatio})`,
                    width: `calc(2rem - 0.25rem * ${scrollRatio})`
                  }}
                >
                  <Sun 
                    className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
                    style={{ 
                      height: `calc(1rem - 0.125rem * ${scrollRatio})`,
                      width: `calc(1rem - 0.125rem * ${scrollRatio})`
                    }}
                  />
                  <Moon 
                    className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
                    style={{ 
                      height: `calc(1rem - 0.125rem * ${scrollRatio})`,
                      width: `calc(1rem - 0.125rem * ${scrollRatio})`
                    }}
                  />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            {/* Sign Up/Sign In Button - changes based on current page */}
            <Link href={pathname === '/contact-us' ? '/contact-us' : '/contact-us'}>
              <Button 
                size="sm"
                className="bg-white text-black hover:bg-gray-100 font-medium rounded-lg transition-all duration-500 ease-in-out"
                style={{ 
                  height: `calc(2rem - 0.25rem * ${scrollRatio})`,
                  fontSize: `calc(0.75rem - 0.125rem * ${scrollRatio})`,
                  padding: `0 calc(1rem - 0.25rem * ${scrollRatio})`
                }}
              >
                {pathname === '/contact-us' ? 'CONTACT US' : 'CONTACT US'}
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
} 