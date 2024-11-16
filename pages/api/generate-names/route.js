import { NextResponse } from 'next/server';

const AI21_API_KEY = process.env.NEXT_PUBLIC_AI21_API_KEY;

export async function POST(request) {
  try {
    const { petType } = await request.json();

    const prompt = `Generate 5 creative and unique pet names for a ${petType}. Only return the names separated by commas.`;

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
    
    // Enhanced response handling
    if (data.completions && data.completions[0] && data.completions[0].data && data.completions[0].data.text) {
        const generatedText = data.completions[0].data.text;
        const names = generatedText.split(',').map(name => name.trim());
        return NextResponse.json({ names });
    }

    // Fallback response if the structure is different
    if (data.generations && data.generations[0]) {
        const generatedText = data.generations[0].text;
        const names = generatedText.split(',').map(name => name.trim());
        return NextResponse.json({ names });
    }

    // Default response if no valid data
    return NextResponse.json({ names: ['Buddy', 'Max', 'Luna', 'Charlie', 'Bailey'] });

  } catch (error) {
    console.log('AI21 API Response Error:', error);
    return NextResponse.json({ 
      names: ['Buddy', 'Max', 'Luna', 'Charlie', 'Bailey'],
      message: 'Using fallback names'
    });
  }
}
