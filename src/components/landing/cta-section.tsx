"use client";

import { Button } from "@/components/ui/button";
import { FEATURES, COLORS } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background/90 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Security Testing?
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Join the revolution in AI-powered penetration testing
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
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
                Schedule a Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
