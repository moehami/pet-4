module.exports = {
    presets: [
      ['next/babel'], // Ensure Next.js preset
      ['@babel/preset-react', { runtime: 'automatic' }] // Enforce React's automatic runtime
    ]
  };
  