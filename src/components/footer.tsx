import Link from "next/link";
import { Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <div className="relative w-full">
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-t from-amber-500/40 via-orange-500/30 to-transparent blur-[120px] pointer-events-none" />
      
      <footer className="relative bg-black text-white py-8 w-[90%] mx-auto rounded-t-3xl">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4">
          {/* Brand Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold">Autovuln</h2>
            <p className="mb-2 text-gray-300">
              Revolutionizing automated penetration testing using AI agents.
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-semibold mb-2">Contact</h3>
            <div className="flex items-center gap-6">
              <Link 
                href="https://twitter.com/autovuln" 
                className="hover:text-gray-300 transition-colors"
                target="_blank"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="mailto:admin@autovuln.in"
                className="hover:text-gray-300 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link 
                href="https://linkedin.com/company/autovuln"
                className="hover:text-gray-300 transition-colors"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms And Condition
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Contacts
            </Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            {new Date().getFullYear()} © Autovuln | All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}