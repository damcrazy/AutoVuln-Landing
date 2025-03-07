import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileJson, GitBranch, Zap } from "lucide-react";
import { COLORS } from "@/lib/constants";

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="py-20 bg-gradient-to-b from-background to-background/90"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Roadmap
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Exciting upcoming features on our development timeline
            </p>
          </div>
        </div>
        <div className="relative mt-12">
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b ${COLORS.primary} rounded-full hidden md:block`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="hidden md:block" />
            <RoadmapCard
              icon={<Zap className={`h-10 w-10 text-${COLORS.accent}`} />}
              title="Self-Learning Agents"
              description="Advanced agents that adapt to new attack methodologies and the latest bug-finding reports. Continuously improving security coverage."
              position="right"
              timeframe="April 2025"
            />
            <RoadmapCard
              icon={<FileJson className={`h-10 w-10 text-${COLORS.accent}`} />}
              title="Swagger File Creation"
              description="Automatically generate Swagger files based on the Exploring Agent's interaction with site features, simplifying API documentation."
              position="left"
              timeframe="July 2025"
            />
            <div className="hidden md:block" />
            <div className="hidden md:block" />
            <RoadmapCard
              icon={<GitBranch className={`h-10 w-10 text-${COLORS.accent}`} />}
              title="DevOps Integration"
              description="Seamlessly incorporate AutoVuln into SDLC pipelines for proactive security. Automate security testing at every stage of development."
              position="right"
              timeframe="October 2025"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapCard({
  icon,
  title,
  description,
  position,
  timeframe,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  position: "left" | "right";
  timeframe: string;
}) {
  return (
    <div
      className={`relative ${position === "right" ? "md:ml-6" : "md:mr-6 md:col-start-1"}`}
    >
      <div
        className={`hidden md:block absolute top-6 -mt-1 w-6 h-6 rounded-full bg-gradient-to-r ${COLORS.primary} shadow-lg shadow-${COLORS.shadow} ${position === "right" ? "left-0 -ml-3" : "right-0 -mr-3"}`}
      />
      <Card className="bg-black/20 backdrop-blur-sm border border-white/10 transition-all hover:scale-105 hover:bg-black/30 hover:border-cyan-500/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-black/30">
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <div className={`text-xs font-medium text-${COLORS.accent} mt-1`}>
                {timeframe}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground text-sm">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
