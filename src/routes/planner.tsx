import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToolPage } from "@/components/tool-page";
import { planTasks } from "@/lib/ai.functions";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Worksmith AI" },
      { name: "description", content: "Prioritize and time-block your tasks with AI." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const run = useServerFn(planTasks);
  const [tasks, setTasks] = useState("");
  const [timeframe, setTimeframe] = useState("this week");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (tasks.trim().length < 3) {
      toast.error("Please list at least one task");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await run({ data: { tasks, timeframe } });
      setResult(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to plan tasks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage
      title="AI Task Planner"
      description="Drop in your tasks and get a prioritized, time-blocked plan tailored to your timeframe."
      loading={loading}
      result={result}
      onSubmit={onSubmit}
      onReset={() => {
        setTasks("");
        setResult(null);
      }}
      submitLabel="Build My Plan"
      form={
        <>
          <div className="space-y-1.5">
            <Label htmlFor="tasks">Your tasks</Label>
            <Textarea
              id="tasks"
              rows={12}
              placeholder={
                "One per line, e.g.\n- Finalize Q3 deck\n- Review PR #482\n- 1:1 with Sam\n- Draft hiring plan"
              }
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="timeframe">Timeframe</Label>
            <Input
              id="timeframe"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              placeholder="this week, today, next 3 days…"
            />
          </div>
        </>
      }
    />
  );
}
