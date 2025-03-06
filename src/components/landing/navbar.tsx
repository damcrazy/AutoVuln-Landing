"use client";

import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { FEATURES, COLORS } from "@/lib/constants";
import { useEffect } from "react";

export function Navbar() {
  // Add smooth scrolling functionality
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const id = target.getAttribute("href");
        const element = document.querySelector(id as string);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 80,
            behavior: "smooth",
          });
        }
      }
    };

    document.querySelector("nav")?.addEventListener("click", handleNavClick);
    return () => {
      document
        .querySelector("nav")
        ?.removeEventListener("click", handleNavClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <div
              className={`h-8 w-8 rounded-full bg-gradient-to-r ${COLORS.primary}`}
            ></div>
            <span className="text-xl font-bold">AutoVuln</span>
          </a>
        </div>
        <nav className="hidden md:flex gap-6">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#roadmap"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Roadmap
          </a>

          {FEATURES.BLOG && (
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </a>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {FEATURES.THEME_SWITCHER && <ThemeSwitcher />}
          {FEATURES.SIGN_IN && (
            <Button size="sm" variant="outline" className="hidden md:flex">
              Sign In
            </Button>
          )}
          {FEATURES.SCHEDULE_DEMO && (
            <Button
              size="sm"
              className="bg-[#00b8d9] hover:bg-[#00a0c0] text-black font-medium transition-colors"
              onClick={() => {
                window.location.href =
                  "mailto:admin@autovuln.in?subject=Schedule%20Demo%20Request&body=Hello%20AutoVuln%20Team,%0A%0AI'm%20interested%20in%20scheduling%20a%20demo%20of%20your%20AI-powered%20penetration%20testing%20platform.%0A%0ACompany:%20%0AName:%20%0APhone:%20%0APreferred%20Date/Time:%20%0A%0AThank%20you!";
              }}
            >
              Schedule Demo
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
