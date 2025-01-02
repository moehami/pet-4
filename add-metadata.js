const fs = require('fs');
const path = require('path');

// Define folder and file paths
const folderPath = path.join(__dirname, 'public', 'testa');
const seoFilePath = path.join(__dirname, 'public', 'testa', 'seo.json');

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

// Check if the folder exists
if (fs.existsSync(folderPath)) {
  // Read all files in the folder
  const files = fs.readdirSync(folderPath);

  // Filter for markdown files
  const mdFiles = files.filter((file) => file.endsWith('.md'));

  // Iterate through each markdown file
  mdFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);

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

        // Generate metadata
        const metadata = `---
title: "${seoTitle}"
date: "${getCurrentDate()}"
excerpt: "${seoDescription}"
readTime: "${readTime}"
---

`;

        // Combine metadata with the original content
        const updatedContent = metadata + fileContent;

        // Write the updated content back to the file
        fs.writeFile(filePath, updatedContent, (writeErr) => {
          if (writeErr) {
            console.error(`Error writing to file ${file}:`, writeErr);
          } else {
            console.log(`Metadata dynamically added to file: ${file}`);
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
