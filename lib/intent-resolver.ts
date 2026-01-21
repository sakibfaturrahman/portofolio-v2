import { intents } from "@/data/intents";

export function resolveIntent(text: string): keyof typeof intents | null {
  const lower = text.toLowerCase();

  for (const key in intents) {
    if (intents[key as keyof typeof intents].some((k) => lower.includes(k))) {
      return key as keyof typeof intents;
    }
  }

  return null;
}
