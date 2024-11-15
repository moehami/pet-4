'use client';

import { useState } from 'react';

export default function PetNameGenerator() {
  const [petType, setPetType] = useState('');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateNames = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ petType }),
      });
      
      const data = await response.json();
      setGeneratedNames(data.names);
    } catch (error) {
      console.error('Error generating names:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Pet Name Generator</h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="petType" className="block text-sm font-medium mb-2">
            Type of Pet
          </label>
          <input
            id="petType"
            type="text"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            placeholder="e.g., cat, dog, bird"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
          />
        </div>

        <button
          onClick={generateNames}
          disabled={!petType || loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Names'}
        </button>

        {generatedNames.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Generated Names:</h2>
            <ul className="space-y-2">
              {generatedNames.map((name, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-100 rounded-md"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
