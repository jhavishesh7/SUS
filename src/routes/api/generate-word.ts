import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";

const SYSTEM = `You are the word generator for a South Asian impostor party game (Hindi/Hinglish/Nepali/Urdu meme culture).
Output ONE secret topic word/phrase that:
- feels naturally desi (Bollywood, cricket, street food, hostel, college, festivals, transport, tuition, memes, etc.)
- is concrete enough that players can describe it in 1 clue without saying it
- is 1 to 4 words
- avoids anything offensive, religious targeting, casteist, or explicit
- has never appeared in the avoid list

Return strict JSON: {"word": string, "category": string, "hint_vibe": string}
No prose, no markdown fences.`;

type Body = { avoid?: string[]; mode?: string; category?: string };

export const Route = createFileRoute("/api/generate-word")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const key = process.env.GEMINI_API_KEY;
        if (!key) {
          return new Response(JSON.stringify({ error: "GEMINI_API_KEY missing" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        const body: Body = await request.json().catch(() => ({}));
        const avoid = Array.isArray(body.avoid) ? body.avoid.slice(0, 50) : [];
        const mode = typeof body.mode === "string" ? body.mode : "Classic";
        const category = typeof body.category === "string" && body.category !== "Random" 
          ? body.category 
          : "a fresh desi topic";

        const userMsg = `Mode: ${mode}. Category: ${category}.
Avoid these recent words (don't repeat or near-duplicate): ${avoid.join(", ") || "(none)"}
Pick a word from the requested category. Be punchy.`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM }]
            },
            contents: [{
              parts: [
                { text: userMsg }
              ]
            }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 1.1,
            }
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          return new Response(
            JSON.stringify({ error: `AI ${res.status}`, detail: text.slice(0, 300) }),
            { status: res.status, headers: { "content-type": "application/json" } },
          );
        }

        const data = await res.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
        
        let parsed: { word?: string; category?: string; hint_vibe?: string } = {};
        try {
          parsed = JSON.parse(content);
        } catch {
          parsed = {};
        }

        return new Response(
          JSON.stringify({
            word: parsed.word ?? null,
            category: parsed.category ?? "Desi",
            hint_vibe: parsed.hint_vibe ?? "",
          }),
          { headers: { "content-type": "application/json" } },
        );
      },
    },
  },
});
