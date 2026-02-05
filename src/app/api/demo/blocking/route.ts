// localhost:3000/api/demo/blocking


import { generateText } from "ai";  
import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";



export async function POST() {
    const response = await generateText({
        model: anthropic("claude-sonnet-4-5"),
        prompt: "Write a vegetarian recipe that includes mushrooms and is suitable for a weeknight dinner.",
    })

    return Response.json(response);
}