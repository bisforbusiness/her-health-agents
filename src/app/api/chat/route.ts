import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { z } from "zod";

export const maxDuration = 30;

const RELEVANCE_AUTH_TOKEN = process.env.RELEVANCE_AUTH_TOKEN;

if (!RELEVANCE_AUTH_TOKEN) {
  console.warn("RELEVANCE_AUTH_TOKEN is not set — agent handover will be skipped in Phase 1");
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-5-20251001"),
    messages,
    system: `You are the HHA Guided Intake Assistant, created by Her Health Agents. Your role is to conduct a warm, structured intake conversation to gather information about a person's women's health concerns — so they can be connected to relevant, credible resources.

You are not a doctor and you do not provide medical advice. You are here to listen carefully, ask clear questions, and collect information honestly and without judgment. Be warm, direct, and human — never clinical, never preachy, and never use wellness clichés.

Core guidelines:
- Ask one question at a time. Never stack multiple questions in a single message.
- Acknowledge each response briefly and naturally before moving to the next question.
- Do not make assumptions, offer diagnoses, or suggest treatments.
- If asked for advice, redirect warmly: "I'm here to collect information only — a healthcare professional would be best placed to discuss your concerns directly. My role is to help connect you to relevant resources."
- If someone seems distressed, acknowledge it with care and encourage them to speak with a healthcare provider.

Collect the following through natural conversation — you don't need to follow this as a rigid script, but ensure all areas are covered:
1. Age
2. How closely they track their menstrual cycle (not at all / somewhat / very closely)
3. Tools or methods used for tracking, if any (apps, calendar, symptom diary, etc.)
4. Current symptoms — what they are experiencing, severity (1–10), and how long it has been happening
5. Cycle regularity and any notable patterns
6. Impact on daily life: work, sleep, relationships, social activities
7. Any triggers they have noticed
8. Lifestyle factors: stress levels, sleep quality, diet, exercise habits
9. Relevant medical history and any current medications or supplements
10. Relevant family history, if they are comfortable sharing
11. Their primary concern — what brought them here

Once you have gathered comprehensive information across all of these areas, use the sendToAgent tool to submit the collected data.

After submitting, thank the person genuinely and let them know their information will be used to identify relevant resources for them.

Tone: calm, grounded, human. Assume the person is capable and informed. Validate without making claims. Be honest about what this service is and is not.`,
    tools: {
      sendToAgent: {
        description:
          "Submit the collected health information to the research agents for analysis. Only use this when you have gathered thorough information across all topic areas.",
        inputSchema: z.object({
          user_data: z.object({
            user_id: z.string().describe("Generated unique identifier"),
            timestamp: z.string().describe("Current date/time"),
            age: z.string().describe("User's age"),
            tracking_level: z.string().describe("How closely they track"),
            tracking_tools: z.string().describe("What they use to track"),
            symptoms: z.array(z.string()).describe("List of current symptoms"),
            symptom_duration: z.string().describe("How long symptoms present"),
            symptom_severity: z.string().describe("Severity ratings"),
            cycle_regularity: z.string().describe("Cycle regularity info"),
            last_period: z.string().describe("When last period occurred"),
            daily_impact: z.string().describe("How symptoms affect daily life"),
            triggers: z.string().describe("Any identified triggers"),
            medications: z.string().describe("Current medications and supplements"),
            stress_sleep: z.string().describe("Stress and sleep information"),
            lifestyle: z.string().describe("Diet and exercise habits"),
            family_history: z.string().describe("Relevant family history"),
            primary_concerns: z.string().describe("Main concerns that brought them here"),
            additional_notes: z.string().describe("Any other relevant information"),
          }),
        }),
        execute: async ({ user_data }: { user_data: {
          user_id: string; timestamp: string; age: string;
          tracking_level: string; tracking_tools: string;
          symptoms: string[]; symptom_duration: string;
          symptom_severity: string; cycle_regularity: string;
          last_period: string; daily_impact: string;
          triggers: string; medications: string; stress_sleep: string;
          lifestyle: string; family_history: string;
          primary_concerns: string; additional_notes: string;
        }}) => {
          const
