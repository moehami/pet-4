import { useState, useEffect } from 'react';
import cohere from 'cohere-ai';
import Clipboard3Component from "./Clipboard3Component";

const MAX_GENERATIONS = 51;

const PetNameGenerator = ({
  onNameGenerated,
  className,
}) => {
  const [petType, setPetType] = useState('');
  const [gender, setGender] = useState('');
  const [generatedNames, setGeneratedNames] = useState([]);
  const [generationCount, setGenerationCount] = useState(0);
  const [nameInfo, setNameInfo] = useState('');
  const [activeNameIndex, setActiveNameIndex] = useState(-1);

  useEffect(() => {
    console.log('Initializing Cohere...');
    cohere.init(process.env.NEXT_PUBLIC_COHERE_API_KEY);

    const savedCount = localStorage.getItem('generationCount');
    if (savedCount) {
      setGenerationCount(parseInt(savedCount, 10));
    }

    if (typeof window !== "undefined") {
      import('tw-elements').then(module => {
        const { Tooltip, initTE } = module;
        initTE({ Tooltip });
      }).catch(err => console.error('Error importing tw-elements:', err));
    }
  }, []);

  const generateNames = async () => {
    if (!petType) {
      alert('Please enter a pet type');
      return;
    }

    if (generationCount >= MAX_GENERATIONS) {
      alert('You have reached the maximum number of generations allowed.');
      return;
    }

    console.log(`Generating names for ${gender} ${petType}`);

    let namesList = [];
    let prompt = `Generate just 4 unique random ${gender} names for a ${petType}:`;

    if (gender !== 'male' && gender !== 'female') {
      prompt = `Generate just 2 unique random male names and 2 unique random female names for a ${petType}:`;
    }

    const response = await cohere.generate({
      model: 'command-r-plus',
      prompt,
      max_tokens: 50,
      temperature: 0.7,
    });

    if (response.statusCode === 200) {
      namesList = response.body.generations.map((gen) => gen.text.trim().split('\n')).flat().filter(Boolean);
      const selectedNames = namesList.length < 4 ? namesList : namesList.slice(0, 4);

      setGeneratedNames(selectedNames);

      if (onNameGenerated) {
        onNameGenerated({ names: selectedNames, gender, petType });
      }

      const newCount = generationCount + 1;
      setGenerationCount(newCount);
      localStorage.setItem('generationCount', newCount);
    } else {
      console.error('Response Error:', response);
      alert(`Failed to generate names. Status: ${response.statusCode}. Message: ${response.body.message}`);
    }
  };

  const fetchNameInfo = async (name, index) => {
    const prompt = `Provide a brief description or interesting facts about the name "${name}".`;
    const response = await cohere.generate({
      model: 'command-r-plus',
      prompt,
      max_tokens: 50,
      temperature: 0.7,
    });
    if (response.statusCode === 200) {
      setNameInfo(response.body.generations[0].text.trim());
      setActiveNameIndex(index);
      if (typeof window !== "undefined") {
        import('tw-elements').then(module => {
          const { Tooltip, initTE } = module;
          initTE({ Tooltip });
        }).catch(err => console.error('Error importing tw-elements:', err));
      }
    } else {
      console.error('Failed to fetch name info:', response);
      setNameInfo('Information not available.');
      setActiveNameIndex(index);
      if (typeof window !== "undefined") {
        import('tw-elements').then(module => {
          const { Tooltip, initTE } = module;
          initTE({ Tooltip });
        }).catch(err => console.error('Error importing tw-elements:', err));
      }
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 ${className}`}>
      <h1 className="text-4xl font-bold text-center mb-8" style={{ color: '#ed5c01' }}>
        Pet Name Generator
      </h1>

      <div className="space-y-6">
        <div>
          <label htmlFor="petType" className="block text-2xl font-medium text-gray-700 mb-2">
            What kind of pet do you have?
          </label>
          <input
            type="text"
            id="petType"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
            style={{ focusRing: '#ed5c01' }}
            placeholder="e.g., Dog, Cat, Bird..."
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          {['male', 'female', 'any'].map((type) => (
            <button
              key={type}
              onClick={() => setGender(type)}
              className="flex-1 py-2 px-4 rounded-lg transition-all duration-300 transform"
              style={{
                backgroundColor: gender === type ? '#ed5c01' : '#062d3e',
                color: 'white',
                transform: gender === type ? 'translateY(-2px)' : 'none',
                boxShadow: gender === type ? '0 4px 12px rgba(237, 92, 1, 0.25)' : 'none'
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={generateNames}
          className="w-full py-3 px-4 text-white text-lg rounded-lg font-medium transition-all duration-300"
          style={{
            backgroundColor: '#e45a03',
            transform: 'translateY(0)',
            boxShadow: '0 4px 12px rgba(237, 92, 1, 0.15)',
          }}
        >
          Generate Names
        </button>

        {generatedNames.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-2xl font-medium" style={{ color: '#062d3e' }}>
              Perfect names for your {petType}:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {generatedNames.map((name, index) => (
                <div
                  key={index}
                  className="p-4 text-lg rounded-lg transition-all duration-300 relative"
                  style={{
                    backgroundColor: '#062d3e',
                    color: 'white',
                    cursor: 'pointer',
                    transform: 'translateY(0)',
                    boxShadow: '0 2px 8px rgba(6, 45, 62, 0.15)',
                  }}
                  onClick={() => fetchNameInfo(name, index)}
                  data-twe-toggle="tooltip"
                  title={activeNameIndex === index ? nameInfo : 'Click to know more'}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">
                      <Clipboard3Component textToCopy={name} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetNameGenerator;
