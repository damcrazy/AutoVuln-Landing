"use client";

import { motion } from "framer-motion";
import { BarChart3, Code, MessageSquare } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export function AnimatedFeatureCards() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
          }
        }
      }}
    >
      <motion.div variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            type: "spring", 
            stiffness: 80, 
            damping: 12 
          } 
        }
      }}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div 
                className="rounded-full bg-primary/10 p-3"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <BarChart3 className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold">Interactive Vulnerability Sitemap</h3>
              <p className="text-muted-foreground">
                A visual map of test results and findings for better engagement insights.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            type: "spring", 
            stiffness: 80, 
            damping: 12 
          } 
        }
      }}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div 
                className="rounded-full bg-primary/10 p-3"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Code className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold">Detailed Attack Analysis</h3>
              <p className="text-muted-foreground">
                Comprehensive UI for breakdown of attack vectors and their impact.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            type: "spring", 
            stiffness: 80, 
            damping: 12 
          } 
        }
      }}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div 
                className="rounded-full bg-primary/10 p-3"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <MessageSquare className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold">AI-Powered Chat Section</h3>
              <p className="text-muted-foreground">
                Chat with your vulnerability test results and interact with the sitemap using an intuitive chat interface.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
} 