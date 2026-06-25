import { AlertTriangle } from "lucide-react";

export function AiDisclaimer({ className }: { className?: string }) {
  return (
    <div
      className={
        "flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-warning-foreground " +
        (className ?? "")
      }
    >
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
      <span>AI-generated content may require human review.</span>
    </div>
  );
}
