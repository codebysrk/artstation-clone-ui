import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (file.endsWith('.css')) {
    // Remove CSS comments /* ... */
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  } else {
    // Remove JSX comments {/* ... */}
    content = content.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');
    
    // Remove block comments /* ... */
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove line comments // ...
    // Note: We need to be careful with URLs (e.g. https://...).
    // This regex matches // only if it is not preceded by : (like in http://)
    // and not preceded by a quote (like in string literals if they contain //).
    // Actually, a simpler approach is matching // not preceded by :
    content = content.replace(/(?<!:)\/\/.*$/gm, '');
  }

  // Remove multiple empty lines left behind by comment removal
  content = content.replace(/\n\s*\n/g, '\n\n');
  
  fs.writeFileSync(file, content);
});

console.log('Comments removed from all files.');
