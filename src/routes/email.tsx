import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToolPage } from "@/components/tool-page";
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Worksmith AI" },
      { name: "description", content: "Generate professional emails tuned to tone and audience." },
    ],
  }),
  component: EmailPage,
});

const TONES = ["Professional", "Friendly", "Concise", "Persuasive", "Empathetic", "Formal"];
const AUDIENCES = [
  "Executive / C-suite",
  "Manager",
  "Direct report",
  "Client",
  "Prospect",
  "Cross-functional team",
  "External vendor",
];

function EmailPage() {
  const run = useServerFn(generateEmail);
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [context, setContext] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!purpose.trim()) {
      toast.error("Please describe the email purpose");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await run({ data: { purpose, audience, tone, context } });
      setResult(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate email");
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setPurpose("");
    setContext("");
    setResult(null);
  };

  return (
    <ToolPage
      title="Smart Email Generator"
      description="Compose polished, on-brand emails by specifying the goal, audience, and tone."
      loading={loading}
      result={result}
      onSubmit={onSubmit}
      onReset={onReset}
      submitLabel="Generate Email"
      form={
        <>
          <div className="space-y-1.5">
            <Label htmlFor="purpose">Email purpose</Label>
            <Input
              id="purpose"
              placeholder="e.g. Follow up on yesterday's proposal call"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AUDIENCES.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="context">Key details (optional)</Label>
            <Textarea
              id="context"
              rows={5}
              placeholder="Specific points to include, names, dates, attachments referenced…"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>
        </>
      }
    />
  );
}
