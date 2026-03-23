import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool } from "ai";
import { z } from "zod";

export const maxDuration = 30;

const RELEVANCE_AUTH_TOKEN = process.env.RELEVANCE_AUTH_TOKEN;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-5-20251001"),
    messages,
    maxSteps: 10,
    system: `You are the HHA Guided Intake Assistant, created by Her Health Agents. Your role is to conduct a warm, structured intake conversation to gather information about a person's women's health concerns so they can be connected to relevant, credible resources.

You are not a doctor and you do not provide medical advice. Be warm, direct, and human — never clinical, never preachy.

Guidelines:
- Ask one question at a time.
- Acknowledge each response briefly before moving on.
- Do not diagnose or suggest treatments.
- If asked for advice: "I'm here to collect information only — a healthcare professional would be best placed to help directly."

Collect through natural conversation:
1. Age
2. How closely they track their menstrual cycle
3. Tracking tools or methods used
4. Current symptoms, severity and duration
5. Cycle regularity and patterns
6. Impact on daily life
7. Any triggers noticed
8. Lifestyle: stress, sleep, diet, exercise
9. Medical history and current medications
10. Family history
11. Primary concern — what brought them here

Once you have comprehensive information, use the sendToAgent tool to submit.
After submitting, thank them and confirm their information will be used to identify relevant resources.`,
    tools: {
      sendToAgent: tool({
        description: "Submit collected health information. Only use when comprehensive information has been gathered.",
        parameters: z.object({
          user_id: z.string().describe("Generated unique identifier"),
          timestamp: z.string().describe("Current date/time"),
          age: z.string().describe("User age"),
          tracking_level: z.string().describe("How closely they track"),
          tracking_tools: z.string().describe("Tracking tools used"),
          symptoms: z.array(z.string()).describe("List of symptoms"),
          symptom_duration: z.string().describe("How long symptoms present"),
          symptom_severity: z.string().describe("Severity ratings"),
          cycle_regularity: z.string().describe("Cycle regularity"),
          last_period: z.string().describe("Last period date"),
          daily_impact: z.string().describe("Impact on daily life"),
          triggers: z.string().describe("Identified triggers"),
          medications: z.string().describe("Medications and supplements"),
          stress_sleep: z.string().describe("Stress and sleep info"),
          lifestyle: z.string().describe("Diet and exercise"),
          family_history: z.string().describe("Family history"),
          primary_concerns: z.string().describe("Main concerns"),
          additional_notes: z.string().describe("Other relevant info"),
        }),
        execute: async (data) => {
          const dataWithId = {
            ...data,
            user_id: data.user_id || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: data.timestamp || new Date().toISOString(),
          };

          if (RELEVANCE_AUTH_TOKEN) {
            try {
              const response = await fetch(
                "https://api-d7b62b.stack.tryrelevance.com/latest/agents/trigger",
                {
                  method: "POST",
                  headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: RELEVANCE_AUTH_TOKEN,
                  }),
                  body: JSON.stringify({
                    agent_id: "f4637377-01a6-47dc-b6c0-b652551816dd",
                    message: { role: "user", content: JSON.stringify(dataWithId) },
                  }),
                }
              );
              if (!response.ok) throw new Error("Relevance API failed");
              return `Thank you for sharing. Your information has been passed to our research team. Reference: ${dataWithId.user_id}`;
            } catch (error) {
              console.error("sendToAgent error:", error);
              return `Thank you. Your information has been collected. Reference: ${dataWithId.user_id}`;
            }
          }

          console.log("[HHA] Intake collected:", JSON.stringify(dataWithId, null, 2));
          return `Thank you for sharing. Your information has been collected and will be used to identify relevant resources. Reference: ${dataWithId.user_id}`;
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
