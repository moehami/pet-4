// pages/api/generate-name.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { petType, gender } = req.body;
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a creative pet name generator. Generate one unique and creative name based on the pet type and gender provided. Return only the name, nothing else.'
          },
          {
            role: 'user',
            content: `Generate a creative name for a ${gender} ${petType}.`
          }
        ],
        temperature: 0.7,
        max_tokens: 30
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate name');
    }

    const data = await response.json();
    const generatedName = data.choices[0].message.content;
    res.status(200).json({ name: generatedName });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate name' });
  }
}
