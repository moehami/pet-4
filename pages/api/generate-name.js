const API_URL = 'https://api.ai21.com/studio/v1/j1-large/complete';
const API_KEY = process.env.NEXT_PUBLIC_AI21_API_KEY;

const generateText = async (input) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: input,
      maxTokens: 10,
      stopSequences: ['.'],
    }),
  });
  const data = await response.json();
  return data.completions[0].data.text;
};

// Use the function
const text = await generateText('Generate a unique and creative pet name.');
console.log(text);
