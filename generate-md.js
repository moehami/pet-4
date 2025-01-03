const fs = require('fs');
const path = require('path');

// Define the folder and text to prepend
const folderPath = path.join(__dirname, 'public', 'source');
const textToPrepend = `---
title: "The Ultimate Guide to Cavapoo Dog Names: 100+ Adorable Ideas and Tips"
date: "2025-01-01"
excerpt: "Find the perfect name for your Cavapoo! This guide offers 100+ adorable name ideas, tips for choosing, and inspiration to help you find the ideal match for your furry friend."
readTime: "6 mins read"
---

`;

// Check if the folder exists
if (fs.existsSync(folderPath)) {
  // Read all files in the folder
  const files = fs.readdirSync(folderPath);

  // Filter for markdown files
  const mdFiles = files.filter((file) => file.endsWith('.md'));

  // Iterate through each markdown file
  mdFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // Read the current content of the file
    fs.readFile(filePath, 'utf8', (readErr, fileContent) => {
      if (readErr) {
        console.error(`Error reading file ${file}:`, readErr);
      } else {
        // Prepend the text and write it back
        const updatedContent = textToPrepend + fileContent;

        fs.writeFile(filePath, updatedContent, (writeErr) => {
          if (writeErr) {
            console.error(`Error writing to file ${file}:`, writeErr);
          } else {
            console.log(`Metadata prepended to file: ${file}`);
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
