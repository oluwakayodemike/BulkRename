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
            newFileName = file.startsWith(textToRemove) ? file.slice(textToRemove.length) : file;
          } else if (position.toLowerCase() === 'end') {
            //  orend of the file name!
            newFileName = file.endsWith(textToRemove) ? file.slice(0, -textToRemove.length) : file;
          } else {
            console.error('Invalid. You can specify only "beginning" or "end".');
            return;
          }

          const newFilePath = path.join(directoryPath, newFileName);

          // Renaming file
          fs.rename(oldFilePath, newFilePath, (renameErr) => {
            if (renameErr) {
              console.error(`Error renaming ${file}:`, renameErr);
            } else {
              console.log(`Renamed ${file} to ${newFileName}`);
            }
          });
        });
      });
    });
  });
});
