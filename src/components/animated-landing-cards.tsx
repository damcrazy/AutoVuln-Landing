"use client";

import { motion } from "framer-motion";
import { Telescope, UserSearch, ShieldAlert, ShieldCheck } from 'lucide-react';
import { LandingCard } from "@/components/ui/landing-card";

export function AnimatedLandingCards() {
  // Animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full max-w-[1200px] h-[800px] mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Top left card */}
      <motion.div 
        className="absolute left-10 top-0"
        variants={itemVariants}
      >
        <LandingCard 
          title="Define Scope"
          description="Provide the target site, specify the depth of testing, and outline the engagement scope."
        >
          <Telescope className="h-6 w-6 text-primary" />
        </LandingCard>
      </motion.div>

      {/* Top right card */}
      <motion.div 
        className="absolute right-10 top-[100px]"
        variants={itemVariants}
      >
        <LandingCard 
          title="Exploring Agent"
          description="Unlike traditional crawlers, our exploring agent navigates the site like a penetration tester, analyzing features and documenting business logic."
        >
          <UserSearch className="h-6 w-6 text-primary" />
        </LandingCard>
      </motion.div>

      {/* Bottom left card - moved down */}
      <motion.div 
        className="absolute left-10 top-[280px]"
        variants={itemVariants}
      >
        <LandingCard 
          title="Security Agents"
          description="Our security agents analyze the tech stack, business logic, and input/output data for each feature, generating precise attack vectors."
        >
          <ShieldAlert className="h-6 w-6 text-primary" />
        </LandingCard>
      </motion.div>

      {/* Bottom right card - adjusted to match left side spacing */}
      <motion.div 
        className="absolute right-10 top-[400px]"
        variants={itemVariants}
      >
        <LandingCard 
          title="Testing Agents"
          description="The testing agents execute these attack vectors by writing their own exploit code and delivering a detailed analysis of the tests conducted."
        >
          <ShieldCheck className="h-6 w-6 text-primary" />
        </LandingCard>
      </motion.div>
    </motion.div>
  );
} 