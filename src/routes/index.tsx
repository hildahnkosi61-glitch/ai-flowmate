import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListChecks,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Worksmith AI" },
      {
        name: "description",
        content: "Your AI workplace productivity dashboard. Email, meetings, tasks, research.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    title: "Smart Email Generator",
    desc: "Draft polished emails tuned to your audience and tone in seconds.",
    href: "/email",
    icon: Mail,
    accent: "from-cyan-500/15 to-teal-500/10",
  },
  {
    title: "Meeting Notes Summarizer",
    desc: "Turn raw notes into key points, decisions, and action items.",
    href: "/notes",
    icon: FileText,
    accent: "from-sky-500/15 to-indigo-500/10",
  },
  {
    title: "AI Task Planner",
    desc: "Prioritize and time-block your workload with one click.",
    href: "/planner",
    icon: ListChecks,
    accent: "from-emerald-500/15 to-teal-500/10",
  },
  {
    title: "Research Assistant",
    desc: "Get structured briefs, insights, and follow-up questions.",
    href: "/research",
    icon: Lightbulb,
    accent: "from-amber-500/15 to-orange-500/10",
  },
  {
    title: "AI Chat",
    desc: "A general-purpose copilot for anything else on your plate.",
    href: "/chat",
    icon: MessageSquare,
    accent: "from-fuchsia-500/15 to-rose-500/10",
  },
] as const;

const stats = [
  { label: "Tools", value: "5", icon: Sparkles },
  { label: "Avg. time saved per task", value: "12 min", icon: Zap },
  { label: "Data stays in session", value: "100%", icon: Shield },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Hero */}
      <section className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-accent/10 p-6 shadow-card sm:p-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> Powered by Lovable AI
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back.{" "}
              <span className="text-gradient-primary">Let's get the busywork done.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Worksmith AI handles the repetitive parts of your workday — writing, summarizing,
              planning, and researching — so you can focus on what matters.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card/60 px-3 py-3 backdrop-blur"
            >
              <s.icon className="h-4 w-4 text-primary" />
              <div className="mt-2 font-display text-lg font-bold sm:text-xl">{s.value}</div>
              <div className="text-[11px] text-muted-foreground sm:text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tool grid */}
      <section className="mt-8">
        <h2 className="mb-4 font-display text-lg font-semibold">Your AI toolkit</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.href}
              to={t.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
            >
              <div
                className={`absolute inset-0 -z-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100 ${t.accent}`}
              />
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <AiDisclaimer />
      </div>
    </div>
  );
}
