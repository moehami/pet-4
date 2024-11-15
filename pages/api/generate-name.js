// pages/api/generate-name.js
// pages/api/generate-name.js

// No need for explicit import on the server-side
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { petType, gender } = req.body;
    const apiKey = process.env.NEXT_PUBLIC_AI21_API_KEY;
    console.log('API Key:', apiKey);
    console.log('Received body:', { petType, gender });

    const response = await fetch('https://api.ai21.com/studio/v1/j2-grande-instruct/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: `Generate a creative name for a ${gender} ${petType}.`,
        numResults: 1,
        temperature: 0.7,
        max_tokens: 30
      })
    });
    console.log('Ya man response :', response);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed response:', errorText);
      throw new Error('Failed to generate name');
    }

    const data = await response.json();
    console.log('Ya man data Response:', data);
    const generatedName = data.choices[0].message.content.trim();
    res.status(200).json({ name: generatedName });
  } catch (error) {
    console.error('Error:', error.stack);
    res.status(500).json({ error: 'Failed to generate name', details: error.message });
  }
}
