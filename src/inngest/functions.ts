import { generateText } from "ai";
import { inngest } from "./client";
import { anthropic } from "@ai-sdk/anthropic";

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ step }) => {
    step.run("generate text", async () => {
      const response = await generateText({
        model: anthropic("claude-sonnet-4-5"),
        prompt:
          "Write a vegetarian recipe that includes mushrooms and is suitable for a weeknight dinner.",
      });

      return response;
    });
  },
);