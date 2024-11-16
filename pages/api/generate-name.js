

import { NextResponse } from 'next/server';

const AI21_API_KEY = process.env.NEXT_PUBLIC_AI21_API_KEY;

export default async function POST(request) {
  try {
  //  const { petType } = await request.json();
    
const { petType, gender } = JSON.parse(reqest.body);
    const prompt = `Generate 2 creative and unique pet names for a ${petType}. Only return the names separated by commas.`;
console.log("Prompt:", prompt);
    const response = await fetch('https://api.ai21.com/studio/v1/j2-ultra/complete', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI21_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        maxTokens: 100,
        temperature: 0.7,
        numResults: 1,
      }),
    });


    const data = await response.json();
    console.log("ya manga data:", data);
    const generatedText = data.completions[0].data.text;
        console.log("ya manga genrated text:", generatedText);
    const names = generatedText.split(',').map(name => name.trim());
    console.log("ya manga names is:", names);
     res.status(200).json({ names });
  //  return NextResponse.json({ names });
  } catch (error) {
        console.log("ya manga error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
   // return NextResponse.json({ error: 'Failed to generate pet names' }, { status: 500 });
  }
}
