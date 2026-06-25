import { useState, type ReactNode } from "react";
import { Loader2, Copy, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Markdown } from "@/components/markdown";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export function ToolPage({
  title,
  description,
  form,
  onSubmit,
  result,
  loading,
  onReset,
  submitLabel = "Generate",
}: {
  title: string;
  description: string;
  form: ReactNode;
  onSubmit: () => void;
  result: string | null;
  loading: boolean;
  onReset: () => void;
  submitLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]">
        {/* Input panel */}
        <Card className="shadow-card">
          <CardContent className="space-y-4 p-5">
            {form}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={onSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={onReset} disabled={loading}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <AiDisclaimer />
          </CardContent>
        </Card>

        {/* Output panel */}
        <Card className="min-h-[400px] shadow-card">
          <CardContent className="p-5">
            <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <h3 className="truncate font-display text-sm font-semibold text-muted-foreground">
                Output
              </h3>
              {result && (
                <Button variant="ghost" size="sm" onClick={copy} className="shrink-0">
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </Button>
              )}
            </div>

            {loading && !result && (
              <div className="space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  Crafting a thoughtful response…
                </div>
              </div>
            )}

            {!loading && !result && (
              <div className="flex h-[320px] items-center justify-center text-center">
                <div className="max-w-xs text-sm text-muted-foreground">
                  Fill out the form and hit{" "}
                  <span className="font-medium text-foreground">{submitLabel}</span> to see your
                  AI-generated result here.
                </div>
              </div>
            )}

            {result && <Markdown>{result}</Markdown>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
