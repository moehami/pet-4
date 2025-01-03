const fs = require('fs');
const path = require('path');

// Netlify Scheduled Function Handler
exports.handler = async function (event, context) {
  console.log('Starting scheduled task...');

  try {
    // Source and temporary paths
    const sourceFolder = path.join(__dirname, '..', 'public', 'source');
    const tmpFolderPath = path.join('/tmp', 'public', 'source');
    const tmpSeoFilePath = path.join(tmpFolderPath, 'seo.json');
    const tmpDestPath = path.join('/tmp', 'posts');

    // Create temporary folders
    fs.mkdirSync(tmpFolderPath, { recursive: true });
    fs.mkdirSync(tmpDestPath, { recursive: true });

    // Copy seo.json to /tmp
    const originalSeoPath = path.join(sourceFolder, 'seo.json');
    if (fs.existsSync(originalSeoPath)) {
      fs.copyFileSync(originalSeoPath, tmpSeoFilePath);
      console.log('seo.json copied to /tmp successfully.');
    } else {
      console.error(`SEO file seo.json not found at ${originalSeoPath}`);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'SEO file not found' }),
      };
    }

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

    // Limit number of files
    const LIMIT = 10;
    let processedCount = 0;

    // Copy markdown files into /tmp
    const mdFiles = fs.readdirSync(sourceFolder).filter((file) => file.endsWith('.md'));

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
