import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const DATA_DIRI = `
  NAMA: Sakib Faturrahman
  KONTAK: +6281933340862 | sakibfaturrahman92@gmail.com | Tasikmalaya, West Java
  EDUCATION: S1 Informatics Engineering (2nd Semester), Universitas Perjuangan Tasikmalaya. Vocational High School (SMK) Graduate in Software Engineering (RPL).
  
  EXPERIENCE:
  - Junior Web Developer (Internship) at CV ABDI CREATIVE TECHNOLOGY: Developed book lending systems, JSON CRUD APIs, and authentication middleware.
  - Freelance Junior Web Developer at FtrTech ID: Handled requirement analysis to project deployment.

  FEATURED PROJECTS:
  - Rental PS: Online reservation system with Midtrans Payment Gateway.
  - Feeldrop: Mood sharing web with Spotify API integration (Express.js & Tailwind).
  - Safa: POS (Point of Sale) Application with receipt printing & barcode features.
  - KilatCuci: Laundry App with QR Code tracking.
  - SIMPATIK: Internship management & Attendance system.

  TECH STACK:
  - Web & Languages: HTML5, CSS3, JavaScript, TypeScript, Dart, PHP.
  - Back-End: Laravel, Node.js, Express.
  - Front-End: React, Next.js, Tailwind CSS, Flutter.
  - Database: MySQL, MongoDB, Supabase.
  - Tools: Git, Postman, VS Code.
`;

const SYSTEM_INSTRUCTION = `
  You are "Sakib AI", a smart and professional virtual assistant for Sakib Faturrahman's portfolio.
  
  IDENTITY & TONE:
  - Be friendly, tech-savvy, and professional.
  - Use English as the primary language unless the user asks in Indonesian.
  - Use technical terms where relevant (e.g., scalable, clean architecture, middleware).
  - Main source of truth: ${DATA_DIRI}.

  STRICT RULES:
  1. Only answer questions related to Sakib (Skills, Projects, Experience, Contact).
  2. If the user asks about unrelated topics (e.g., politics, cooking, general coding not related to Sakib's work), respond with: 
     "I am Sakib Faturrahman's dedicated assistant. I can only provide information regarding Sakib's professional profile, skills, and projects."
  3. Never make up information. If it's not in the data, say you don't know.
`;

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key not configured." },
        { status: 500 },
      );
    }

    const { message, history } = await req.json(); // Mengambil history dari client

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chatSession = model.startChat({
      generationConfig: {
        temperature: 0.5, // Sedikit diturunkan agar lebih konsisten
        maxOutputTokens: 500,
      },
      // Masukkan history dari frontend jika ada agar chat berkelanjutan
      history: history || [],
    });

    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("GEMINI_ROUTE_ERROR:", error);
    return NextResponse.json(
      {
        text: "Communication protocol interrupted. My systems are currently rebooting. Please try again.",
      },
      { status: 500 },
    );
  }
}
