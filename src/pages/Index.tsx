import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Users, Target, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      setShowContent(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Logo Intro Animation */}
      {showLogo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary animate-fade-out">
          <div className="text-center animate-scale-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 border-4 border-primary-foreground flex items-center justify-center">
                <div className="w-8 h-8 bg-accent" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-primary-foreground tracking-tight">
                  THE ADMISSIONS
                </h1>
                <h1 className="text-5xl font-bold text-primary-foreground tracking-tight">
                  STUDIO
                </h1>
              </div>
            </div>
            <p className="text-accent font-medium text-lg tracking-widest">
              ADMISSIONS ASSISTANCE / SCORE IMPROVEMENT
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 border-2 border-primary flex items-center justify-center">
                <div className="w-4 h-4 bg-accent" />
              </div>
              <span className="font-bold text-xl text-foreground">THE ADMISSIONS STUDIO</span>
            </div>
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Students celebrating success"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
                Master the SAT with{" "}
                <span className="text-accent">AI-Powered</span> Learning
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Personalized adaptive learning that targets your weak areas, 
                tracks your progress, and guarantees results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="accent" size="xl" onClick={() => navigate("/auth")}>
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="heroOutline" size="xl">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                The Complete SAT Prep Solution
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Data-driven learning + Human insight + AI precision = Guaranteed results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Adaptive AI Engine",
                  description: "Personalized questions that evolve with your skill level"
                },
                {
                  icon: Target,
                  title: "Targeted Practice",
                  description: "Focus on weak areas identified by our smart algorithms"
                },
                {
                  icon: TrendingUp,
                  title: "Progress Tracking",
                  description: "Real-time analytics for students and parents"
                },
                {
                  icon: Users,
                  title: "Family Dashboard",
                  description: "Parents stay informed with dedicated monitoring tools"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-card border-2 border-border p-8 hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your SAT Score?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have achieved their dream scores with The Admissions Studio.
            </p>
            <Button variant="accent" size="xl" onClick={() => navigate("/auth")}>
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-foreground">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-background flex items-center justify-center">
                  <div className="w-3 h-3 bg-accent" />
                </div>
                <span className="font-bold text-background">THE ADMISSIONS STUDIO</span>
              </div>
              <p className="text-background/60 text-sm">
                © 2026 The Admissions Studio. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
