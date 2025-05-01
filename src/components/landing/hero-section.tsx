"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FEATURES, COLORS } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-background/90">
      <div className="absolute inset-0 bg-grid-white/5 bg-[length:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                AI-Powered Penetration Testing Platform
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Revolutionizing automated security testing with AI agents that
                think like penetration testers.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {FEATURES.REQUEST_EARLY_ACCESS && (
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${COLORS.primary} ${COLORS.hover}`}
                >
                  Request Early Access
                </Button>
              )}
              {FEATURES.SCHEDULE_DEMO && (
                <Button
                  size="lg"
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
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 rounded-full blur-3xl`}
              />
              <div className="relative bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 h-full">
                  <ProcessAnimation />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessAnimation() {
  return (
    <div className="grid grid-cols-1 gap-6 h-full">
      <div className="flex flex-col space-y-4">
        <h3 className="text-xl font-semibold text-center">
          The 4-Step Testing Process
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <ProcessStep
            number="1"
            title="Define Scope"
            description="Specify target site, testing depth, and engagement parameters"
            iconPath="/images/scope-icon.svg"
          />
          <ProcessStep
            number="2"
            title="Exploring Agent"
            description="AI navigates like a real tester, analyzing features and logic"
            iconPath="/images/explore-icon.svg"
          />
          <ProcessStep
            number="3"
            title="Security Agents"
            description="Examine tech stack and generate precise attack vectors"
            iconPath="/images/security-icon.svg"
          />
          <ProcessStep
            number="4"
            title="Testing Agents"
            description="Execute attacks and deliver detailed analysis"
            iconPath="/images/testing-icon.svg"
          />
        </div>
      </div>
    </div>
  );
}

function ProcessStep({
  number,
  title,
  description,
  iconPath,
}: {
  number: string;
  title: string;
  description: string;
  iconPath: string;
}) {
  return (
    <div className="flex flex-col p-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg transition-all hover:scale-105 hover:bg-black/30 hover:border-cyan-500/50">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${COLORS.primary} text-white font-bold`}
        >
          {number}
        </div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
