import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/utils/buildPrompt";

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: Request) {
  try {
    const { messages, provider, apiKey } = await req.json();
    console.log("\n🤖 [Chat API] Provider:", provider);
    console.log("🤖 [Chat API] Messages count:", messages.length);

    // Rate limiting for users without their own API key
    if (!apiKey) {
      const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
      const now = Date.now();
      const windowMs = 60 * 60 * 1000; // 1 hour
      const limit = 2; // minimal usage

      const userRecord = rateLimitMap.get(ip);
      if (!userRecord || (now - userRecord.timestamp > windowMs)) {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      } else {
        if (userRecord.count >= limit) {
          return NextResponse.json(
            { error: "Free tier limit reached. Please provide your API key to continue chatting." },
            { status: 429 }
          );
        }
        userRecord.count += 1;
        rateLimitMap.set(ip, userRecord);
      }
    }

    const systemPrompt = buildSystemPrompt();
    let reply = "";

    if (provider === "gemini") {
      const ai = new GoogleGenAI({
        apiKey: apiKey || process.env.GEMINI_API_KEY || "",
      });

      // Build contents array from conversation history
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: systemPrompt,
        },
        contents,
      });

      reply = response.text ?? "";
    } else if (provider === "openai") {
      const openai = new OpenAI({
        apiKey: apiKey || process.env.OPENAI_API_KEY || "",
      });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],
      });
      reply = completion.choices[0].message.content || "";
    } else if (provider === "claude") {
      const anthropic = new Anthropic({
        apiKey: apiKey || process.env.ANTHROPIC_API_KEY || "",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anthropicMessages = messages.map((m: any) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      }));
      const message = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: systemPrompt,
        messages: anthropicMessages,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reply = (message.content[0] as any).text;
    } else {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    console.log("🤖 [Chat API] AI Reply:\n", reply);
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API Error:", error);

    let msg = "Something went wrong";
    if (error instanceof Error) {
      msg = error.message;
    }

    // Handle Gemini quota error specifically
    if (
      msg.includes("429") ||
      msg.toLowerCase().includes("quota") ||
      msg.includes("RESOURCE_EXHAUSTED")
    ) {
      msg = "AI quota exceeded or rate limited. Please try again in 1 minute.";
    }

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
