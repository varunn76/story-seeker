export function parseAIResponse(text: string) {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (e) {
      console.error("Failed to parse AI JSON:", e);
      return null;
    }
  }
  return null;
}

// Strips the ```json ... ``` block from the AI reply so users don't see raw JSON
export function stripJsonBlock(text: string): string {
  return text.replace(/```json[\s\S]*?```/g, "").trim();
}
