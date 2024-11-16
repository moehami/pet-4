import { NextResponse } from 'next/server';

const AI21_API_KEY = process.env.NEXT_PUBLIC_AI21_API_KEY;

export async function POST(request) {
  console.log('API Route Started');
  console.log("Start of Log");
  console.log('Checking AI21 API Key:', AI21_API_KEY ? 'Present' : 'Missing');

  try {
    const { petType } = await request.json();
    console.log('Received pet type:', petType);

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

    console.log('AI21 API Response Status:', response.status);
    const data = await response.json();
    console.log('AI21 API Response Data:', data);

    const generatedText = data.completions[0].text;
    const names = generatedText
      .split(/[,\n]/)
      .map(name => name.trim())
      .filter(name => name.length > 0)
      .slice(0, 5);

    console.log('Generated Names:', names);
    return NextResponse.json({ names });
  } catch (error) {
    console.log('Error Details:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json({ 
      names: ['Ziggy', 'Shadow', 'Milo', 'Ruby', 'Scout']
    });
  }
}
