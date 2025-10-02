const fs = require('fs');
const path = require('path');

const FILE_NAME = 'index.html';

/**
 * Copies the `index.html` file from the final build folder to the specified directories.
 *
 * Supposed to be used in the `postbuild` script in the `package.json` file.
 *
 * @note ⚠️ `homepage` in `package.json` should be specified as __absolute__ path.
 *
 * @param {string} buildFolderPath - Path to the final build folder.
 * @param {string[]} routes - Array of routes to copy the `index.html` file to.
 * @returns {void}
 */
function generateStatic(buildFolderPath, routes) {
  const sourceFilePath = path.join(buildFolderPath, FILE_NAME);

  if (!routes) {
    console.log('No routes found in package.json');
    return;
  }

  routes.forEach(targetFolder => {
    const resultPath = path.join(buildFolderPath, targetFolder);
    const targetFilePath = path.join(resultPath, FILE_NAME);
    const isFolderExists = fs.existsSync(resultPath);

    if (!isFolderExists) {
      fs.mkdirSync(path.join(resultPath), {
        recursive: true,
      });
    }

    copyFile(sourceFilePath, targetFilePath);
  });
}

/**
 * Copy file from source to target.
 *
 * @param {string} source - Source file path.
 * @param {string} target - Target file path.
 * @returns {void}
 */
function copyFile(source, target) {
  fs.copyFile(source, target, err => {
    if (err) throw err;
    console.log(`${source} copied to ${target}`);
  });
}

module.exports = {
  generateStatic,
};
