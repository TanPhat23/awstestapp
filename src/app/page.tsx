export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans selection:bg-foreground selection:text-background">
      {/* Navigation bar */}
      <nav className="w-full border-b border-black/[0.08] dark:border-white/[0.08] px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-foreground flex items-center justify-center text-background font-mono font-bold text-xs">
            A
          </div>
          <span className="font-semibold text-sm tracking-tight">AgentFlow</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-block"
          >
            Features
          </a>
          <a
            href="#docs"
            className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-block"
          >
            Docs
          </a>
          <a
            href="#get-started"
            className="px-3.5 py-1.5 rounded-full bg-foreground text-background text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Sign in
          </a>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-24 text-center max-w-4xl mx-auto">
        {/* Status / Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-black/[0.02] dark:bg-white/[0.04] text-xs font-medium text-muted-foreground mb-8">
          <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>v1.0 Public Beta is now live</span>
          <span className="text-foreground/40">→</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl leading-[1.1] mb-6">
          Deploy and manage autonomous agents with confidence
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mb-10 leading-relaxed font-normal">
          Orchestrate multi-step workflows, enforce strict verification gates,
          and track agent progress in real time with end-to-end observability.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center mb-16">
          <a
            id="get-started"
            href="#start"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:opacity-90 transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Start Free Trial
          </a>
          <a
            id="docs"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-black/[0.1] dark:border-white/[0.15] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] font-medium text-sm transition-colors text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            View Documentation
          </a>
        </div>

        {/* Highlights / Features Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 pt-10 border-t border-black/[0.08] dark:border-white/[0.08] w-full text-left">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-foreground">Type-Safe Workflows</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
              Pre-built contracts and execution models designed for deterministic results.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-foreground">Adversarial Verification</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
              Autonomous quality and security evaluations on every task deliverable.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-foreground">Full Observability</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
              Step-level event streaming, trace logs, and human-in-the-loop overrides.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-black/[0.08] dark:border-white/[0.08] py-6 px-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
        <p>© {new Date().getFullYear()} AgentFlow Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
