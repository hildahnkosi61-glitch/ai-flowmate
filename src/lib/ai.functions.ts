import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { getModel } from "./ai-gateway.server";

// ---------- Email Generator ----------
const EmailInput = z.object({
  purpose: z.string().min(1),
  audience: z.string().min(1),
  tone: z.string().min(1),
  context: z.string().optional().default(""),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => EmailInput.parse(d))
  .handler(async ({ data }) => {
    const prompt = `You are an expert business communication writer.
Compose a professional email with the following parameters:

PURPOSE: ${data.purpose}
AUDIENCE: ${data.audience}
TONE: ${data.tone}
ADDITIONAL CONTEXT: ${data.context || "None"}

REQUIREMENTS:
- Provide a compelling subject line on the first line, prefixed with "Subject:"
- Use a greeting appropriate to the audience and tone
- Keep paragraphs short (2-3 sentences)
- End with a clear call-to-action or next step
- Sign off appropriately

Return only the email content, no commentary.`;
    const { text } = await generateText({ model: getModel(), prompt });
    return { content: text };
  });

// ---------- Meeting Notes Summarizer ----------
const NotesInput = z.object({ notes: z.string().min(10) });

export const summarizeMeeting = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => NotesInput.parse(d))
  .handler(async ({ data }) => {
    const prompt = `You are an expert meeting analyst. Analyze the following raw meeting notes and produce a structured summary in Markdown.

NOTES:
"""
${data.notes}
"""

OUTPUT FORMAT (use exactly these headings):

## Executive Summary
A 2-3 sentence overview.

## Key Discussion Points
- Bulleted list of the most important topics covered.

## Decisions Made
- Bulleted list. If none, write "None recorded".

## Action Items
| Owner | Action | Deadline |
|-------|--------|----------|
List every actionable task. Use "Unassigned" / "Not specified" where missing.

## Open Questions & Risks
- Bulleted list. If none, write "None".

Be concise, professional, and faithful to the source notes — do not invent details.`;
    const { text } = await generateText({ model: getModel(), prompt });
    return { content: text };
  });

// ---------- Task Planner ----------
const PlannerInput = z.object({
  tasks: z.string().min(3),
  timeframe: z.string().optional().default("this week"),
});

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => PlannerInput.parse(d))
  .handler(async ({ data }) => {
    const prompt = `You are an executive productivity coach using the Eisenhower Matrix and time-blocking.

TASKS (one per line or comma-separated):
${data.tasks}

TIMEFRAME: ${data.timeframe}

Produce a Markdown plan with these sections:

## Prioritized Plan
A numbered list ordered by priority. For each item include:
**[P1/P2/P3] Task** — *Est: X min* — One-line rationale.
(P1 = urgent+important, P2 = important, P3 = nice-to-have)

## Suggested Schedule
A simple time-blocked schedule for ${data.timeframe} (morning / afternoon blocks).

## Focus Tips
2-3 short, specific tips tailored to this workload.

Be realistic, decisive, and concise.`;
    const { text } = await generateText({ model: getModel(), prompt });
    return { content: text };
  });

// ---------- Research Assistant ----------
const ResearchInput = z.object({
  topic: z.string().min(2),
  depth: z.enum(["overview", "deep"]).optional().default("overview"),
});

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ResearchInput.parse(d))
  .handler(async ({ data }) => {
    const prompt = `You are a senior research analyst. Produce a structured research brief on the topic below.

TOPIC: ${data.topic}
DEPTH: ${data.depth}

Output in Markdown with these sections:

## TL;DR
3-4 sentence executive summary.

## Key Insights
- 5-7 substantive, non-obvious insights.

## Background & Context
A short ${data.depth === "deep" ? "3-4 paragraph" : "1-2 paragraph"} primer.

## Notable Players / Examples
Brief bulleted list of relevant companies, people, or case examples.

## Implications & Opportunities
What this means for a working professional or decision-maker.

## Suggested Next Questions
3 sharp follow-up questions worth investigating.

Be objective, specific, and avoid filler. Note any uncertainty explicitly.`;
    const { text } = await generateText({ model: getModel(), prompt });
    return { content: text };
  });
