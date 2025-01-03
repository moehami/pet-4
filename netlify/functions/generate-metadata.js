const fs = require('fs');
const path = require('path');

// Netlify Scheduled Function Handler
exports.handler = async function (event, context) {
  console.log('Starting scheduled task...');
  console.log('Current working directory:', __dirname);

  try {
    // Path to seo.json in bundled function
    const bundledSeoPath = path.join(__dirname, 'source', 'seo.json');

    // Verify the bundled seo.json file exists
    if (!fs.existsSync(bundledSeoPath)) {
      console.error(`SEO file seo.json not found at ${bundledSeoPath}`);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'SEO file not found in bundled function.' }),
      };
    }

    // Temporary paths for processing
    const tmpFolderPath = path.join('/tmp', 'source');
    const tmpSeoFilePath = path.join(tmpFolderPath, 'seo.json');

    // Create /tmp folder structure
    fs.mkdirSync(tmpFolderPath, { recursive: true });

    // Copy seo.json to /tmp for processing
    fs.copyFileSync(bundledSeoPath, tmpSeoFilePath);
    console.log('seo.json successfully copied to /tmp.');

    // Simulate task completion
    console.log('Task completed successfully!');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Task completed successfully!' }),
    };
  } catch (error) {
    console.error('Error processing scheduled task:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Task failed.' }),
    };
  }
};
