// pages/api/generate-name.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { petType, gender } = req.body;
    const apiKey = process.env.NEXT_PUBLIC_AI21_API_KEY;
    console.log('API Key:', apiKey);
    console.log('Received body:', { petType, gender });

    const response = await fetch('https://api.ai21.com/studio/v1/j1-large/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },

      body: JSON.stringify({ prompt: input, maxTokens: 10, stopSequences: ['.'], }), }); 
    const data = await response.json(); 
      console.log("Ya man here is data output:",data);
    return data.completions[0].data.text; }; 
  
  // Use the function 
  const text = await generateText('Generate a unique and creative pet name.'); 
  console.log("Ya man here is text output:",text);
