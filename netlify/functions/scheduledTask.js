// netlify/functions/scheduledTask.js
const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
  console.log('Starting scheduled task...');
  console.log('Current working directory:', __dirname);

  // Your task logic here, for example:
  const filePath = path.join(__dirname, 'source', 'seo.json');

  // Simulate some file handling or other tasks
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
