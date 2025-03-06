import { ThemeSwitcher } from "@/components/theme-switcher";
import { FEATURES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="py-10 border-t border-white/10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AutoVuln</h3>
            <p className="text-sm text-muted-foreground">
              Revolutionizing automated penetration testing using AI agents.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Roadmap
                </a>
              </li>

              {FEATURES.BLOG && (
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:admin@autovuln.in"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  admin@autovuln.in
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-white/10">
          <p className="text-xs text-muted-foreground">
            © 2025 AutoVuln. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {FEATURES.THEME_SWITCHER && <ThemeSwitcher />}
          </div>
        </div>
      </div>
    </footer>
  );
}
