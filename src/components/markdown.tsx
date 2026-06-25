import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("markdown text-sm leading-relaxed text-foreground", className)}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
