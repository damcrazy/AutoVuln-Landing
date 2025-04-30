"use client";

import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AnimatedCTA() {
  return (
    <section className="py-16 md:py-24 w-full flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Security Testing?
          </motion.h2>
          <motion.p 
            className="max-w-[700px] text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Auto-Vuln is more than a tool—it's a paradigm shift in penetration testing. It's a companion to stomp out surface-level bugs, not a replacement.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link> */}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/book-demo">
                <Button size="lg" variant="outline">
                  Request a Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 