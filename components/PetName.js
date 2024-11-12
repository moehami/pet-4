import { useState } from 'react';

export default function PetNameGenerator() {
  const [petType, setPetType] = useState('');
  const [gender, setGender] = useState('');
  const [generatedName, setGeneratedName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateName = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ petType, gender }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed response:', errorText);
        throw new Error('Failed to generate name');
      }

      const data = await response.json();
      setGeneratedName(data.name);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate name. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Pet Name Generator</h1>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Pet Type:
          <input
            type="text"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Gender:
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <button
        onClick={handleGenerateName}
        disabled={isLoading}
        className={`mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {isLoading ? 'Generating...' : 'Generate Name'}
      </button>
      {generatedName && (
        <p className="mt-4 text-center text-green-600">Generated Name: {generatedName}</p>
      )}
      {error && (
        <p className="mt-4 text-center text-red-600">{error}</p>
      )}
    </div>
  );
}
