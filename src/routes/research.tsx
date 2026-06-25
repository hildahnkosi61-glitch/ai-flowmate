import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToolPage } from "@/components/tool-page";
import { researchTopic } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Worksmith AI" },
      { name: "description", content: "Generate structured research briefs and insights." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const run = useServerFn(researchTopic);
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState<"overview" | "deep">("overview");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (topic.trim().length < 2) {
      toast.error("Please enter a topic");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await run({ data: { topic, depth } });
      setResult(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to research topic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage
      title="AI Research Assistant"
      description="Get a structured brief with insights, context, and follow-up questions on any topic."
      loading={loading}
      result={result}
      onSubmit={onSubmit}
      onReset={() => {
        setTopic("");
        setResult(null);
      }}
      submitLabel="Research Topic"
      form={
        <>
          <div className="space-y-1.5">
            <Label htmlFor="topic">Topic or question</Label>
            <Input
              id="topic"
              placeholder="e.g. The state of AI agents in enterprise SaaS"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Depth</Label>
            <Select value={depth} onValueChange={(v) => setDepth(v as "overview" | "deep")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview (faster, broader)</SelectItem>
                <SelectItem value="deep">Deep dive (longer, more detail)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      }
    />
  );
}
