const fs = require('fs');
const path = require('path');

// Define folder and file paths
const folderPath = path.join(__dirname, 'public', 'source');
const seoFilePath = path.join(__dirname, 'public', 'source', 'seo.json');
const destPath = path.join(__dirname, 'posts');

// Create destination folder if it doesn't exist
if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, { recursive: true });
}

// Helper function to get a random date between 1 November 2024 and 3 January 2025
const getRandomDate = () => {
  const startDate = new Date('2024-11-01');
  const endDate = new Date('2025-01-03');
  const randomDate = new Date(startDate.getTime() + (Math.random() * (endDate.getTime() - startDate.getTime())));
  return randomDate.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
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
  process.exit(1); // Exit the script if seo.json is missing
}

// Read SEO data from seo.json
let seoData = {};
try {
  const seoContent = fs.readFileSync(seoFilePath, 'utf8');
  seoData = JSON.parse(seoContent);
} catch (err) {
  console.error('Error reading or parsing seo.json:', err);
  process.exit(1);
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
  mdFiles.forEach((file) => {
    if (processedCount >= LIMIT) return; // Stop processing after reaching the limit

    const filePath = path.join(folderPath, file);
    const destFilePath = path.join(destPath, file);

    // Extract keyword from filename by replacing hyphens with spaces and removing extension
    const keyword = path.basename(file, '.md').replace(/-/g, ' ');

    // Get SEO details from the JSON data
    const seoInfo = seoData[keyword] || {};
    const seoTitle = seoInfo.title || 'Untitled';
    const seoDescription = seoInfo.description || '';

    // Read the current content of the file
    fs.readFile(filePath, 'utf8', (readErr, fileContent) => {
      if (readErr) {
        console.error(`Error reading file ${file}:`, readErr);
      } else {
        // Calculate read time
        const readTime = calculateReadTime(fileContent);

        // Generate metadata with a random date
        const metadata = `---\ntitle: "${seoTitle}"\ndate: "${getRandomDate()}"\nexcerpt: "${seoDescription}"\nreadTime: "${readTime}"\n---\n\n`;

        // Combine metadata with the original content
        const updatedContent = metadata + fileContent;

        // Write the updated content back to the file
        fs.writeFile(filePath, updatedContent, (writeErr) => {
          if (writeErr) {
            console.error(`Error writing to file ${file}:`, writeErr);
          } else {
            console.log(`Metadata dynamically added to file: ${file}`);

            // Move the file to the final folder after updating
            fs.rename(filePath, destFilePath, (renameErr) => {
              if (renameErr) {
                console.error(`Error moving file ${file}:`, renameErr);
              } else {
                console.log(`File moved to final folder: ${destFilePath}`);
                processedCount++; // Increment the processed file count
              }
            });
          }
        });
      }
    });
  });

  if (mdFiles.length === 0) {
    console.log('No markdown files found in the folder.');
  }
} else {
  console.error('The folder does not exist:', folderPath);
}
