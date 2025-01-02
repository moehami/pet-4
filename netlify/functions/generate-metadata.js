const fs = require('fs');
const path = require('path');

// Netlify Scheduled Function Handler
exports.handler = async function (event, context) {
  console.log('Starting scheduled task...');

  try {
    // Define folder and file paths
    const folderPath = path.join(__dirname, 'public', 'source');
    const seoFilePath = path.join(__dirname, 'public', 'source', 'seo.json');
    const destPath = path.join(__dirname, 'posts');

    // Create destination folder if it doesn't exist
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }

    // Helper function to get the current system date in YYYY-MM-DD format
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

    // Check if seo.json exists
    if (!fs.existsSync(seoFilePath)) {
      console.error(`SEO file seo.json not found at ${seoFilePath}`);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'SEO file not found' })
      };
    }

    // Read SEO data from seo.json
    let seoData = {};
    try {
      const seoContent = fs.readFileSync(seoFilePath, 'utf8');
      seoData = JSON.parse(seoContent);
    } catch (err) {
      console.error('Error reading or parsing seo.json:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to read SEO file' })
      };
    }

    // Limit the number of files to process
    const LIMIT = 10; // Change this number to set your desired limit
    let processedCount = 0;

    // Check if the folder exists
    if (fs.existsSync(folderPath)) {
      // Read all files in the folder
      const files = fs.readdirSync(folderPath);

      // Filter for markdown files
      const mdFiles = files.filter((file) => file.endsWith('.md'));

      // Iterate through each markdown file
      for (const file of mdFiles) {
        if (processedCount >= LIMIT) break; // Stop processing after reaching the limit

        const filePath = path.join(folderPath, file);
        const destFilePath = path.join(destPath, file);

        // Extract keyword from filename by replacing hyphens with spaces and removing extension
        const keyword = path.basename(file, '.md').replace(/-/g, ' ');

        // Get SEO details from the JSON data
        const seoInfo = seoData[keyword] || {};
        const seoTitle = seoInfo.title || 'Untitled';
        const seoDescription = seoInfo.description || '';

        // Read the current content of the file
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Calculate read time
        const readTime = calculateReadTime(fileContent);

        // Generate metadata
        const metadata = `---\ntitle: "${seoTitle}"\ndate: "${getCurrentDate()}"\nexcerpt: "${seoDescription}"\nreadTime: "${readTime}"\n---\n\n`;

        // Combine metadata with the original content
        const updatedContent = metadata + fileContent;

        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Metadata dynamically added to file: ${file}`);

        // Move the file to the final folder after updating
        fs.renameSync(filePath, destFilePath);
        console.log(`File moved to final folder: ${destFilePath}`);

        processedCount++; // Increment the processed file count
      }

      if (mdFiles.length === 0) {
        console.log('No markdown files found in the folder.');
      }
    } else {
      console.error('The folder does not exist:', folderPath);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Task completed successfully!' })
    };
  } catch (error) {
    console.error('Error processing scheduled task:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Task failed.' })
    };
  }
};
