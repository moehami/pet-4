const fs = require('fs');
const path = require('path');

// Netlify Scheduled Function Handler
exports.handler = async function (event, context) {
  console.log('Starting scheduled task...');
  console.log('Current working directory:', __dirname);

  // Verify the current directory structure
  console.log('Directory contents:', fs.readdirSync(__dirname));

  // Adjust the path to match the actual location of seo.json
  const filePath = path.join(__dirname, 'seo.json');
  console.log('Checking file path:', filePath);

  try {
    if (fs.existsSync(filePath)) {
      console.log('File exists:', filePath);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Task completed successfully!' }),
      };
    } else {
      console.error('File not found:', filePath);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'File not found' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
