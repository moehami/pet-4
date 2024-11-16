
import { NextResponse } from 'next/server';

const AI21_API_KEY = process.env.NEXT_PUBLIC_AI21_API_KEY;

export async function POST(request) {
  try {
    const { petType } = await request.json();

    const response = await fetch('https://api.ai21.com/studio/v1/j2-ultra/complete', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI21_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Generate 5 creative and unique pet names for a ${petType}.`,
        numResults: 1,
        maxTokens: 50,
        temperature: 0.7,
        topP: 1,
        stopSequences: ["\n"]
      }),
    });

    const data = await response.json();
    console.log("AI21 Response:", data);
    const generatedText = data.completions[0].text;
    const names = generatedText
      .split(/[,\n]/)
      .map(name => name.trim())
      .filter(name => name.length > 0)
      .slice(0, 5);
console.log("AI21 2nd Response:", names);
    return NextResponse.json({ names });
  } catch (error) {
    console.log('API Details:', error);
    return NextResponse.json({ 
      names: ['Ziggy', 'Shadow', 'Milo', 'Ruby', 'Scout']
    });
  }
}
