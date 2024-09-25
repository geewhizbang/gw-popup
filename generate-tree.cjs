const fs = require('fs');
const path = require('path');

const ignoreDirs = ['node_modules', '.git', 'public', '.vscode', 'stuff'];

function generateTree(dir, prefix = '') {
  let tree = '';
  const files = fs.readdirSync(dir);

  files.forEach((file, index) => {
    if (ignoreDirs.includes(file)) return;

    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const isLast = index === files.length - 1;

    tree += `${prefix}${isLast ? '└── ' : '├── '}${file}\n`;

    if (stats.isDirectory()) {
      tree += generateTree(filePath, `${prefix}${isLast ? '    ' : '│   '}`);
    }
  });

  return tree;
}

const tree = generateTree('.');
fs.writeFileSync('tree.txt', tree);
console.log('Tree structure has been written to tree.txt');
