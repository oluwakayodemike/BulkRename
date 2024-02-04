const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter path to the folder: ', (directoryPath) => {
  rl.close();

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const oldFilePath = path.join(directoryPath, file);

      // Replace [UNWANTED-NAMING] with an empty string
      const newFileName = file.replace('[UNWANTED-NAMING] ', '');

      const newFilePath = path.join(directoryPath, newFileName);

      // Rename the file
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
