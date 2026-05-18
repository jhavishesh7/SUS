// Vercel serverless function for word generation via Gemini API

const SYSTEM = `You are the word generator for a South Asian impostor party game (Hindi/Hinglish/Nepali/Urdu meme culture).
Output ONE secret topic word/phrase that:
- feels naturally desi (Bollywood, cricket, street food, hostel, college, festivals, transport, tuition, memes, etc.)
- is concrete enough that players can describe it in 1 clue without saying it
- is 1 to 4 words
- avoids anything offensive, religious targeting, casteist, or explicit
- has never appeared in the avoid list

Return strict JSON: {"word": string, "category": string, "hint_vibe": string}
No prose, no markdown fences.`;

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "GEMINI_API_KEY missing" });
  }

  const { avoid = [], mode = "Classic", categories = [] } = req.body || {};

  const categoryString =
    categories && categories.length > 0 ? categories.join(" OR ") : "Random/Any";

  const userMsg = `Mode: ${mode}. Category/Categories: ${categoryString}.
Avoid these recent words (don't repeat or near-duplicate): ${avoid.join(", ") || "(none)"}
Pick a word from the requested category/categories. Be punchy.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: [{ parts: [{ text: userMsg }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 1.1,
          },
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: `AI ${response.status}`,
        detail: text.slice(0, 300),
      });
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    let parsed = {};
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {};
    }

    return res.status(200).json({
      word: parsed.word ?? null,
      category: parsed.category ?? "Desi",
      hint_vibe: parsed.hint_vibe ?? "",
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to call AI", detail: String(err) });
  }
}
