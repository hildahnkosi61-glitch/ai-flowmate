import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none text-foreground",
        "prose-headings:font-display prose-headings:tracking-tight prose-headings:text-foreground",
        "prose-h1:text-xl prose-h2:text-lg prose-h3:text-base",
        "prose-p:leading-relaxed prose-p:text-foreground/90",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:rounded-lg prose-pre:bg-muted prose-pre:text-foreground",
        "prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2",
        "prose-table:text-sm prose-th:text-foreground prose-th:font-semibold prose-td:text-foreground/90",
        "prose-hr:border-border",
        className,
      )}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
