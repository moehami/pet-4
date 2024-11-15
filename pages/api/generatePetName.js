// pages/api/generatePetName.js


const API_URL = "https://api.ai21.com/studio/v1/j1-large/complete";
const API_KEY = process.env.NEXT_PUBLIC_AI21_API_KEY;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sex } = req.body;
    const prompt = `Generate a unique and creative ${sex} pet name.`;

    console.log("Prompt:", prompt);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          maxTokens: 10,
          stopSequences: [".", "\n"],
        }),
      });

      const data = await response.json();
      console.log("AI21 Response:", data);

      if (data.completions && data.completions.length > 0) {
        const petName = data.completions[0].data.text.trim();
        res.status(200).json({ petName });
      } else {
        throw new Error("No completions found in the response");
      }
    } catch (error) {
      console.error("Error generating pet name:", error);
      res.status(500).json({ error: "Error generating pet name" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
