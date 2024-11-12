// pages/api/generate-name.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { petType, gender } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a creative pet name generator. Generate one unique and creative name based on the pet type and gender provided. Return only the name, nothing else.',
        },
        {
          role: 'user',
          content: `Generate a creative name for a ${gender} ${petType}.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 30,
    });

    const generatedName = response.choices[0].message.content;
    res.status(200).json({ name: generatedName });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate name' });
  }
}
