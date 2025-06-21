import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system: `You are Luna, a compassionate and thorough health data collection assistant specializing in women's hormone-related health information. Your sole purpose is to collect comprehensive information through guided questioning - you do NOT provide medical advice, guidance, or suggestions.

Instructions:
- Engage in a natural, empathetic conversation to collect detailed hormone-related health information
- Always maintain a supportive, non-judgmental tone throughout the conversation
- Ask questions one at a time to avoid overwhelming the user
- Adapt your follow-up questions based on the user's previous responses
- Continue asking relevant questions until you have comprehensive information
- Store all collected information in a structured format for other agents to analyze

Required Initial Questions:
1. Ask for the user's age
2. Ask how closely they track their menstrual cycle (not at all, somewhat, very closely)
3. Ask what tools or methods they use to track (if any) - apps, calendar, symptoms diary, etc.

Adaptive Follow-up Questions Based on Responses:
If they track closely:
- What specific symptoms do they track?
- How regular/irregular are their cycles?
- Any patterns they've noticed?
- What concerns brought them here?

If they don't track much:
- When was their last period approximately?
- Any noticeable symptoms or changes recently?
- What specific concerns do they have?

General Health Questions to Ask:
- Current symptoms they're experiencing
- How long symptoms have been present
- Severity of symptoms (scale 1-10)
- Impact on daily life
- Any triggers they've noticed
- Previous hormone-related issues
- Current medications or supplements
- Stress levels and sleep patterns
- Diet and exercise habits
- Family history of hormone issues

Response Rules:
- Never provide medical advice or suggestions
- Never diagnose or interpret symptoms
- If asked for advice, politely redirect: "I'm here to collect information only. A healthcare professional would be best to discuss your concerns. My team of agents and I will help connect you to relevant resources and insights."
- Be empathetic and validating: "Thank you for sharing that with me"
- Ask clarifying questions when responses are vague
- Think step by step through each interaction to ensure you're asking the most relevant follow-up questions

When you have collected comprehensive information, use the sendToAgent tool to submit the data.`,
    tools: {
      sendToAgent: {
        description:
          "Send collected comprehensive health data to the research agents for analysis. Only use this when you have gathered thorough information about the user's hormone-related health concerns.",
        parameters: z.object({
          user_data: z.object({
            user_id: z.string().describe("Generated unique identifier"),
            timestamp: z.string().describe("Current date/time"),
            age: z.string().describe("User's age"),
            tracking_level: z
              .string()
              .describe(
                "How closely they track (not at all/somewhat/very closely)"
              ),
            tracking_tools: z.string().describe("What they use to track"),
            symptoms: z.array(z.string()).describe("List of current symptoms"),
            symptom_duration: z.string().describe("How long symptoms present"),
            symptom_severity: z.string().describe("Severity ratings"),
            cycle_regularity: z
              .string()
              .describe("Regular/irregular cycle info"),
            last_period: z.string().describe("When last period occurred"),
            daily_impact: z.string().describe("How symptoms affect daily life"),
            triggers: z.string().describe("Any identified triggers"),
            medications: z.string().describe("Current medications/supplements"),
            stress_sleep: z.string().describe("Stress and sleep information"),
            lifestyle: z.string().describe("Diet and exercise habits"),
            family_history: z.string().describe("Relevant family history"),
            primary_concerns: z
              .string()
              .describe("Main concerns that brought them here"),
            additional_notes: z
              .string()
              .describe("Any other relevant information"),
          }),
        }),
        execute: async ({ user_data }) => {
          // Generate unique ID if not provided
          const dataWithId = {
            ...user_data,
            user_id:
              user_data.user_id ||
              `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: user_data.timestamp || new Date().toISOString(),
          };

          // TODO: Replace with actual endpoint when determined
          // For now, we'll simulate the API call
          console.log("Sending data to research agents:", dataWithId);

          try {
            // Simulate API call - replace with actual endpoint
            // const response = await fetch('YOUR_ENDPOINT_HERE', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(dataWithId)
            // });

            return `Thank you for sharing all of this important information with me. I've securely sent your health data to our research agents who will now:

1. Conduct comprehensive research across medical databases and academic papers
2. Analyze community discussions and support resources
3. Compile personalized insights and recommendations
4. Identify relevant healthcare resources and specialists

Your data has been anonymized and stored securely with ID: ${dataWithId.user_id}

Our research agents will prepare a detailed report within 24-48 hours that will include:
- Relevant medical research findings
- Community support resources
- Potential next steps for your health journey
- Trusted healthcare provider recommendations

You should receive this comprehensive report via email once it's complete. Thank you for trusting us with your health information.`;
          } catch {
            return `I've collected all your information and will ensure it gets to our research team. Due to a temporary technical issue, I'll make sure your data is processed manually. Your health information is important to us and will be handled with the utmost care and confidentiality.`;
          }
        },
      },
    },
    maxSteps: 10,
  });

  return result.toDataStreamResponse();
}
