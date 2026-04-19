/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/utils/buildPrompt";
import { headers } from "next/headers";

const FREE_POINTS = 6;

const rateLimitMap = new Map<string, { count: number; date: string }>();

function getTodayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function validateKeyFormat(provider: string, key: string): boolean {
  if (!key || key.trim().length < 10) return false;
  if (provider === "openai" && !key.startsWith("sk-")) return false;
  if (provider === "claude" && !key.startsWith("sk-ant-")) return false;
  if (provider === "gemini" && !key.startsWith("AIza")) return false;
  return true;
}

function sanitizeErrorMessage(msg: string): string {
  const envKeys = [
    process.env.GEMINI_API_KEY,
    process.env.OPENAI_API_KEY,
    process.env.ANTHROPIC_API_KEY,
    process.env.TMDB_API_KEY,
  ];
  let sanitized = msg;
  for (const key of envKeys) {
    if (key && key.length > 4) {
      sanitized = sanitized.replaceAll(key, "[REDACTED]");
    }
  }
  return sanitized;
}

export async function POST(req: Request) {
  try {
    const { messages, provider, apiKey } = await req.json();

    if (!provider || typeof provider !== "string") {
      return NextResponse.json({ error: "Invalid provider." }, { status: 400 });
    }
    const allowedProviders = ["gemini", "openai", "claude"];
    if (!allowedProviders.includes(provider)) {
      return NextResponse.json({ error: "Invalid provider." }, { status: 400 });
    }
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 },
      );
    }
    if (messages.length > 50) {
      return NextResponse.json(
        { error: "Too many messages in context." },
        { status: 400 },
      );
    }

    let resolvedKey: string;
    const userSuppliedKey = typeof apiKey === "string" ? apiKey.trim() : "";

    if (userSuppliedKey) {
      if (!validateKeyFormat(provider, userSuppliedKey)) {
        return NextResponse.json(
          { error: "The API key format is invalid for the selected provider." },
          { status: 400 },
        );
      }
      resolvedKey = userSuppliedKey;
    } else {
      const headersList = await headers();
      const ip =
        headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
        headersList.get("x-real-ip") ||
        "unknown";
      const today = getTodayKey();
      const record = rateLimitMap.get(ip);

      if (!record || record.date !== today) {
        rateLimitMap.set(ip, { count: 1, date: today });
      } else {
        if (record.count >= FREE_POINTS) {
          return NextResponse.json(
            {
              error:
                "You've used all 6 Seek Points for today. Your points will refresh tomorrow — or add your own API key to keep searching.",
              seekPointsRemaining: 0,
            },
            { status: 429 },
          );
        }
        record.count += 1;
        rateLimitMap.set(ip, record);
      }

      const serverKey =
        provider === "gemini"
          ? process.env.GEMINI_API_KEY
          : provider === "openai"
            ? process.env.OPENAI_API_KEY
            : process.env.ANTHROPIC_API_KEY;

      if (!serverKey) {
        return NextResponse.json(
          {
            error:
              "This provider is not configured. Please use your own API key.",
          },
          { status: 503 },
        );
      }
      resolvedKey = serverKey;
    }

    const safeMessages = messages
      .filter(
        (m: any) =>
          m &&
          typeof m.content === "string" &&
          ["user", "assistant", "system"].includes(m.role),
      )
      .map((m: any) => ({
        role: m.role as string,
        content: m.content as string,
      }));

    const systemPrompt = buildSystemPrompt();
    let reply = "";

    if (provider === "gemini") {
      const ai = new GoogleGenAI({ apiKey: resolvedKey });
      const contents = safeMessages
        .filter((m) => m.role !== "system")
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: { systemInstruction: systemPrompt },
        contents,
      });
      reply = response.text ?? "";
    } else if (provider === "openai") {
      const openai = new OpenAI({ apiKey: resolvedKey });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...safeMessages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ],
      });
      reply = completion.choices[0].message.content || "";
    } else if (provider === "claude") {
      const anthropic = new Anthropic({ apiKey: resolvedKey });
      const message = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: systemPrompt,
        messages: safeMessages
          .filter((m) => m.role !== "system")
          .map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
      });
      reply = (message.content[0] as any).text;
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API Error:", error);

    let msg = "Something went wrong. Please try again.";
    if (error instanceof Error) {
      const raw = sanitizeErrorMessage(error.message);
      if (
        raw.includes("429") ||
        raw.toLowerCase().includes("quota") ||
        raw.includes("RESOURCE_EXHAUSTED")
      ) {
        msg = "AI quota exceeded. Please try again in a moment.";
      }
    }

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
