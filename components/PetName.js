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
    <div>
      <h1>Pet Name Generator</h1>
      <div>
        <label>
          Pet Type:
          <input
            type="text"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Gender:
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleGenerateName} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Name'}
      </button>
      {generatedName && <p>Generated Name: {generatedName}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
