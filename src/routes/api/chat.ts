import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getModel } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are the AI Workplace Productivity Assistant — a concise, professional copilot for working professionals.

You help with:
- Drafting and refining business communication
- Summarizing meetings and documents
- Planning and prioritizing tasks
- Quick research and explanations
- Brainstorming and decision support

Style guide:
- Be clear, direct, and confident — no fluff
- Use Markdown formatting (headings, lists, bold) for any structured answer
- When the user asks for output (an email, plan, summary), produce it immediately — do not ask unnecessary clarifying questions
- Keep responses tight; expand only when explicitly asked
- Flag uncertainty honestly

End substantive outputs with a one-line note only if the user might act on it: *AI-generated — please review before sending.*`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("Messages required", { status: 400 });
        }
        const result = streamText({
          model: getModel(),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
        });
        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
