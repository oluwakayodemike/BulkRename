const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter path to the folder: ', (directoryPath) => {
  rl.question('Exact keyword to remove: ', (textToRemove) => {
    rl.question('Where is it at? (Type "beginning" or "end"): ', (position) => {
      rl.close();

      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return;
        }

        files.forEach((file) => {
          const oldFilePath = path.join(directoryPath, file);

          let newFileName;

          if (position.toLowerCase() === 'beginning') {
            // Remove from beginning of file name
            if (file.startsWith(textToRemove)) {
              newFileName = file.slice(textToRemove.length);
            } else {
              // keyword not found at the beginning err
              console.error(`Error: Keyword "${textToRemove}" not found at the beginning of ${file}.`);
              return;
            }
          } else if (position.toLowerCase() === 'end') {
            // Remove from anywhere in the file name
            if (file.includes(textToRemove)) {
              // treat special sign as literal characters in regular expression pattern
              const escapedTextToRemove = textToRemove.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
              newFileName = file.replace(new RegExp(escapedTextToRemove, 'g'), '');
            } else {
              // Keyword not found in the file name
              console.error(`Error: Keyword "${textToRemove}" not found in ${file}.`);
              return;
            }
          } else {
            console.error('Invalid. You can specify only "beginning" or "end".');
            return;
          }

          // Check if the new file name is different from the old one before renaming
          if (file !== newFileName) {
            const newFilePath = path.join(directoryPath, newFileName);

            // Renaming file
            fs.rename(oldFilePath, newFilePath, (renameErr) => {
              if (renameErr) {
                console.error(`Error renaming ${file}:`, renameErr);
              } else {
                console.log(`Renamed ${file} to ${newFileName}`);
              }
            });
          }
        });
      });
    });
  });
});