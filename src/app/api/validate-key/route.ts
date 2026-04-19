import { NextResponse } from "next/server";

function validateKeyFormat(provider: string, key: string): boolean {
  if (!key || key.trim().length < 10) return false;
  if (provider === "openai" && !key.startsWith("sk-")) return false;
  if (provider === "claude" && !key.startsWith("sk-ant-")) return false;
  if (provider === "gemini" && !key.startsWith("AIza")) return false;
  return true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const provider: string = typeof body.provider === "string" ? body.provider.trim() : "";
    const apiKey: string = typeof body.apiKey === "string" ? body.apiKey.trim() : "";

    const allowedProviders = ["gemini", "openai", "claude"];
    if (!allowedProviders.includes(provider)) {
      return NextResponse.json(
        { valid: false, error: "Unknown provider." },
        { status: 400 }
      );
    }

    const serverKeys = [
      process.env.GEMINI_API_KEY,
      process.env.OPENAI_API_KEY,
      process.env.ANTHROPIC_API_KEY,
    ].filter(Boolean);

    if (serverKeys.includes(apiKey)) {
      return NextResponse.json(
        { valid: false, error: "Invalid API key." },
        { status: 400 }
      );
    }

    if (!validateKeyFormat(provider, apiKey)) {
      return NextResponse.json(
        {
          valid: false,
          error:
            provider === "openai"
              ? "OpenAI keys start with sk-. Please check your key."
              : provider === "claude"
              ? "Anthropic keys start with sk-ant-. Please check your key."
              : "Gemini keys start with AIza. Please check your key.",
        },
        { status: 200 }
      );
    }

    if (provider === "gemini") {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey });
      try {
        await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [{ role: "user", parts: [{ text: "hi" }] }],
        });
        return NextResponse.json({ valid: true });
      } catch (e: any) {
        const msg: string = e?.message || "";
        const isInvalid =
          msg.includes("API_KEY_INVALID") ||
          msg.includes("400") ||
          msg.includes("403") ||
          msg.toLowerCase().includes("invalid");
        return NextResponse.json({
          valid: false,
          error: isInvalid
            ? "Invalid Gemini API key. Check your Google AI Studio key."
            : "Gemini key check failed. It may still be valid — try a search.",
        });
      }
    }

    if (provider === "openai") {
      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey });
      try {
        await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "hi" }],
          max_tokens: 1,
        });
        return NextResponse.json({ valid: true });
      } catch (e: any) {
        const msg: string = e?.message || "";
        const isInvalid =
          msg.includes("401") ||
          msg.toLowerCase().includes("incorrect api key") ||
          msg.toLowerCase().includes("invalid");
        return NextResponse.json({
          valid: false,
          error: isInvalid
            ? "Invalid OpenAI API key. Check your key in OpenAI platform settings."
            : "OpenAI key check failed. It may still be valid — try a search.",
        });
      }
    }

    if (provider === "claude") {
      const Anthropic = (await import("@anthropic-ai/sdk")).default;
      const client = new Anthropic({ apiKey });
      try {
        await client.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 1,
          messages: [{ role: "user", content: "hi" }],
        });
        return NextResponse.json({ valid: true });
      } catch (e: any) {
        const msg: string = e?.message || "";
        const isInvalid =
          msg.includes("401") ||
          msg.toLowerCase().includes("authentication") ||
          msg.toLowerCase().includes("invalid");
        return NextResponse.json({
          valid: false,
          error: isInvalid
            ? "Invalid Anthropic API key. Check your key in the Anthropic console."
            : "Claude key check failed. It may still be valid — try a search.",
        });
      }
    }

    return NextResponse.json(
      { valid: false, error: "Unknown provider." },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { valid: false, error: "Validation failed. Please try again." },
      { status: 500 }
    );
  }
}
