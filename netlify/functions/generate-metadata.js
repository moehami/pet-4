const fs = require('fs');
const path = require('path');

// Netlify Scheduled Function Handler
exports.handler = async function (event, context) {
  console.log('Starting scheduled task...');

  try {
    // Paths within the function's bundle
    const sourceFolder = path.join(__dirname, 'source'); // Directory bundled with the function
    const seoFilePath = path.join(sourceFolder, 'seo.json');
    const tmpFolderPath = path.join('/tmp', 'source');
    const tmpDestPath = path.join('/tmp', 'posts');

    // Create temporary folders
    fs.mkdirSync(tmpFolderPath, { recursive: true });
    fs.mkdirSync(tmpDestPath, { recursive: true });

    // Check if seo.json exists in the source folder
    if (!fs.existsSync(seoFilePath)) {
      console.error(`SEO file seo.json not found at ${seoFilePath}`);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'SEO file not found' }),
      };
    }

    // Copy seo.json to /tmp
    const tmpSeoFilePath = path.join(tmpFolderPath, 'seo.json');
    fs.copyFileSync(seoFilePath, tmpSeoFilePath);
    console.log('seo.json copied to /tmp successfully.');

    // Helper function to get the current date
    const getCurrentDate = () => {
      const now = new Date();
      return now.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
    };

    // Helper function to calculate read time
    const calculateReadTime = (content) => {
      const wordsPerMinute = 200; // Average reading speed
      const wordCount = content.split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      return `${minutes} min read`;
    };

    // Read SEO data from copied file
    let seoData = {};
    try {
      const seoContent = fs.readFileSync(tmpSeoFilePath, 'utf8');
      seoData = JSON.parse(seoContent);
    } catch (err) {
      console.error('Error reading or parsing seo.json:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to read SEO file' }),
      };
    }

    // Process markdown files in the source folder
    const mdFiles = fs.readdirSync(sourceFolder).filter((file) => file.endsWith('.md'));
    const LIMIT = 10; // Limit the number of files to process
    let processedCount = 0;

    for (const file of mdFiles) {
      if (processedCount >= LIMIT) break;

      const filePath = path.join(sourceFolder, file);
      const tmpFilePath = path.join(tmpFolderPath, file);
      const tmpDestFilePath = path.join(tmpDestPath, file);

      // Copy markdown file to /tmp
      fs.copyFileSync(filePath, tmpFilePath);

      // Extract keyword from filename
      const keyword = path.basename(file, '.md').replace(/-/g, ' ');

      // Get SEO details
      const seoInfo = seoData[keyword] || {};
      const seoTitle = seoInfo.title || 'Untitled';
      const seoDescription = seoInfo.description || '';

      // Read file content
      const fileContent = fs.readFileSync(tmpFilePath, 'utf8');

      // Generate metadata
      const metadata = `---\ntitle: "${seoTitle}"\ndate: "${getCurrentDate()}"\nexcerpt: "${seoDescription}"\nreadTime: "${calculateReadTime(fileContent)}"\n---\n\n`;

      // Update file with metadata
      fs.writeFileSync(tmpFilePath, metadata + fileContent);
      console.log(`Metadata added to file: ${file}`);

      // Move file to final destination in /tmp
      fs.renameSync(tmpFilePath, tmpDestFilePath);
      console.log(`File moved to: ${tmpDestFilePath}`);

      processedCount++;
    }

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
