import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, MessageSquareText, Network } from "lucide-react";
import { COLORS } from "@/lib/constants";

export function FeatureSection() {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-background/90 to-background"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Key Features
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Powerful tools designed to revolutionize your security testing
              workflow
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            icon={<Network className={`h-12 w-12 text-${COLORS.accent}`} />}
            title="Interactive Vulnerability Sitemap"
            description="A visual map of test results and findings for better engagement insights. Navigate through your application's attack surface with ease."
          />
          <FeatureCard
            icon={<BarChart3 className={`h-12 w-12 text-${COLORS.accent}`} />}
            title="Detailed Attack Analysis"
            description="Comprehensive UI for breaking down attack vectors and their impact. Understand vulnerabilities with clear, actionable insights."
          />
          <FeatureCard
            icon={
              <MessageSquareText
                className={`h-12 w-12 text-${COLORS.accent}`}
              />
            }
            title="AI-Powered Chat Section"
            description="Chat with your vulnerability test results and interact with the sitemap using an intuitive chat interface. Get answers instantly."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-black/20 backdrop-blur-sm border border-white/10 transition-all hover:scale-105 hover:bg-black/30 hover:border-cyan-500/50">
      <CardHeader>
        <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-black/30 mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground text-sm">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
