import { Button } from "@/components/ui/button"
// import { Navbar } from "@/components/navbar"
import { LandingNav } from "@/components/landingnav"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Code, Brain, Zap } from 'lucide-react';
import BackgroundPaths from "@/components/ui/background-paths"
import Footer from "@/components/footer";
import { Timeline } from "@/components/ui/timeline";
import dynamic from 'next/dynamic';


const AnimatedLandingCards = dynamic(() => import('@/components/animated-landing-cards').then(mod => mod.AnimatedLandingCards), {
  loading: () => <div className="w-full max-w-[800px] h-[800px] mx-auto flex items-center justify-center">Loading...</div>
});


const AnimatedFeatureCards = dynamic(() => import('@/components/animated-feature-cards').then(mod => mod.AnimatedFeatureCards), {
  loading: () => <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50">Loading features...</div>
});

const AnimatedCTA = dynamic(() => import('@/components/animated-cta').then(mod => mod.AnimatedCTA), {
  loading: () => <div className="py-16 md:py-24 w-full text-center">Loading...</div>
});

const AnimatedHorizontalCards = dynamic(() => import('@/components/animated-horizontal-cards').then(mod => mod.AnimatedHorizontalCards), {
  loading: () => <div className="w-full py-16 flex items-center justify-center">Loading demonstration...</div>
});

export default async function Home() {
  


  // if logged in directly redirect to /site-crawl


  const timelineData = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "May 2025",
      description: "",
      content: {title : "Self-Learning Agents", description : "Advanced agents that adapt to new attack methodologies and the latest bug-finding reports for improved detection."}
    },
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "July 2025",
      description: "",
      content: {title : "Swagger File Creation", description : "Automatically generate Swagger files based on the Exploring Agent's interaction with site features, simplifying API documentation for blackbox testing usecases."}
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "October 2025",
      description: "",
      content: {title : "DevOps Integration", description : "Seamlessly incorporate AutoVuln into SDLC pipelines for proactive security. Automate security testing at every stage of development."}
    },
  ];

  return (
    <>  
    <LandingNav />
    
    <div className="flex min-h-screen flex-col pt-16">
      
      <div className="flex-1 w-full flex flex-col items-center ">
        {/* Hero Section */}
        <BackgroundPaths title="THE  AI  PENTEST  TOOL" />
        
        {/* Fade effect outside of BackgroundPaths */}
        <div className="relative w-full h-24 mt-[-6rem] z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-black"></div>
        </div>
        
        {/* Mini text section */}
        <div className="text-center mb-16 mt-12 md:mt-20 relative z-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">How Auto-Vuln Operates</h2>
          <p className="text-base md:text-lg max-w-[800px] mx-auto mb-6">
            Our intelligent, AI-driven platform enhances penetration testing with a dynamic multi-agent approach for
            superior vulnerability detection.
          </p>
          <Link href="/book-demo">
            <Button className="bg-black text-white dark:bg-white dark:text-black font-medium">
              SCHEDULE DEMO
            </Button>
          </Link>
        </div>
        
        {/* Animated Landing Cards */}
        <section > 
          <AnimatedLandingCards />
        </section>
        
        {/* Agent Demonstration Section */}
        <section id="ai-at-work" className="w-full mt-24 pt-24 mb-24" >
          <AnimatedHorizontalCards />
          

        </section>
        
        {/* Key Features Section */}
        <section id="features" className="py-16 md:py-24 w-full flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Key Features</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Auto-Vuln provides powerful features to enhance your security testing workflow.
              </p>
            </div>
            
            <AnimatedFeatureCards />
          </div>
        </section>
     
        {/* Timeline Section */}
        <div id="timeline" className="w-full mt-20 pl-8 md:pl-16 lg:pl-24">
          <Timeline data={timelineData} />
        </div>

        {/* CTA Section */}
        <AnimatedCTA />
      </div>

      <Footer />
    </div>
    </>
  )
}
