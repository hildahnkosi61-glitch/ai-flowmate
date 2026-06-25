import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolPage } from "@/components/tool-page";
import { summarizeMeeting } from "@/lib/ai.functions";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Worksmith AI" },
      {
        name: "description",
        content: "Turn raw meeting notes into key points, decisions, and action items.",
      },
    ],
  }),
  component: NotesPage,
});

const SAMPLE = `Quick sync on Q3 launch.
- Maya: marketing site copy still in review with legal, expected back Wed
- Devon: pricing page A/B test live, early data suggests variant B +14% signups
- Priya: support needs at least 5 days lead time for new doc rollout
- Decision: ship variant B to 100% next Monday assuming variance holds
- Action: Devon to share full test report by Friday
- Action: Maya to escalate legal review by EOD if no response
- Risk: enterprise tier landing page still blocked on design review
- Open: do we need a separate launch email for existing customers?`;

function NotesPage() {
  const run = useServerFn(summarizeMeeting);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (notes.trim().length < 10) {
      toast.error("Please paste at least a few sentences of notes");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await run({ data: { notes } });
      setResult(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to summarize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage
      title="Meeting Notes Summarizer"
      description="Paste raw notes and get a structured summary with decisions, action items, and deadlines."
      loading={loading}
      result={result}
      onSubmit={onSubmit}
      onReset={() => {
        setNotes("");
        setResult(null);
      }}
      submitLabel="Summarize Notes"
      form={
        <>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="notes">Raw meeting notes</Label>
              <button
                type="button"
                onClick={() => setNotes(SAMPLE)}
                className="text-xs text-primary hover:underline"
              >
                Use sample
              </button>
            </div>
            <Textarea
              id="notes"
              rows={18}
              placeholder="Paste your meeting notes, transcript snippets, or bullet points here…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </>
      }
    />
  );
}
