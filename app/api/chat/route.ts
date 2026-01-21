import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    return NextResponse.json({
      text: response.text,
    });
  } catch (error: any) {
    if (error?.status === 429) {
      return NextResponse.json(
        {
          text: "AI sedang istirahat sebentar. Coba lagi dalam beberapa detik.",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { text: "Core systems recovering." },
      { status: 500 },
    );
  }
}
