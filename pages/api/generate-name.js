//import fetch from 'node-fetch';

const API_URL = 'https://api-inference.huggingface.co/models/gpt2';
const API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
    console.log('API Key:', apiKey);
    console.log('Received body:', { petType, gender });
const generateText = async (input) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: input }),
  });
  const data = await response.json();
  console.log('Response:', data);
  return data[0].generated_text;
};

// Use the function
const text = await generateText('Generate a unique and creative pet name.');
console.log(text);
