"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Moon, Sun, X } from "lucide-react"
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

const LandingNavLinks = [
  {
    label: "AI AT WORK",
    href: "/#ai-at-work",
    section: "ai-at-work",
  },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
        // Add offset for better positioning
        const yOffset = link.section === 'ai-at-work' ? -80 : -60
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({top: y, behavior: 'smooth'})
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

          {/* Main Navigation - Center (hidden on mobile) */}
          <div className="flex-1 items-center justify-center space-x-10 hidden md:flex">
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
            {/* Contact Us Button (hidden on mobile) */}
            <Link href="/book-demo" className="hidden md:block">
              <Button 
                size="sm"
                className="bg-white text-black hover:bg-gray-100 font-medium rounded-lg transition-all duration-500 ease-in-out"
                style={{ 
                  height: `calc(2rem - 0.25rem * ${scrollRatio})`,
                  fontSize: `calc(0.75rem - 0.125rem * ${scrollRatio})`,
                  padding: `0 calc(1rem - 0.25rem * ${scrollRatio})`
                }}
              >
                CONTACT US
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white md:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] bg-black/95 border-gray-800 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center">
                      <Image 
                        src="/logo.png" 
                        alt="Autovuln Logo"
                        width={32}
                        height={32}
                        className="mr-3"
                      />
                      <span className="text-xl text-white font-semibold">Autovuln</span>
                    </div>
                  </div>
                  <div className="flex flex-col p-6 space-y-6 flex-grow">
                    {LandingNavLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link 
                          href={link.href} 
                          onClick={(e) => handleNavClick(e, link)}
                          className="text-white text-lg font-medium uppercase tracking-wider"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <div className="p-6 border-t border-gray-800">
                    <SheetClose asChild>
                      <Link href="/book-demo" className="w-full">
                        <Button 
                          size="default"
                          className="bg-white text-black hover:bg-gray-100 font-medium rounded-lg w-full"
                        >
                          CONTACT US
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  )
} 