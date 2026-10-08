import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Terminal, Activity, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background text-foreground px-6 py-24 sm:py-32 selection:bg-primary selection:text-primary-foreground">
      {/* Background Decorative Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-20"
      >
        <div className="size-[500px] rounded-full bg-gradient-to-tr from-primary to-accent blur-3xl" />
      </div>

      <main className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Eyebrow Badge */}
        <Badge
          variant="secondary"
          className="mb-6 px-3.5 py-1 text-sm font-medium border border-border/60 backdrop-blur-sm"
        >
          <Sparkles className="mr-1.5 size-3.5 text-primary" />
          Next-Generation Platform
        </Badge>

        {/* Hero Title */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Build and deploy software{" "}
          <span className="bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
            at lightspeed.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          Supercharge your workflow with modern engineering tooling, composable UI
          components, and enterprise-grade infrastructure built for high-growth teams.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto font-semibold gap-2 shadow-lg shadow-primary/10">
            Get Started Free
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto font-medium gap-2 border-border/80"
          >
            <Terminal className="size-4" />
            Documentation
          </Button>
        </div>

        {/* Feature & Metric Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl text-left">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="size-5" />
                <span className="text-xl font-bold text-foreground">99.99%</span>
              </div>
              <p className="text-xs text-muted-foreground">High availability SLA guaranteed across all regions.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Activity className="size-5" />
                <span className="text-xl font-bold text-foreground">&lt; 50ms</span>
              </div>
              <p className="text-xs text-muted-foreground">Ultra-low global edge latency with smart routing.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="size-5" />
                <span className="text-xl font-bold text-foreground">10x</span>
              </div>
              <p className="text-xs text-muted-foreground">Accelerate deployment velocity from day one.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
