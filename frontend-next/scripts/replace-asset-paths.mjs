import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Read mapping
const mapping = JSON.parse(readFileSync('cloudinary-mapping.json', 'utf8'));

// Sort by longest path first to avoid partial matches
const entries = Object.entries(mapping).sort((a, b) => b[0].length - a[0].length);

console.log(`Loaded ${entries.length} path mappings`);

// Collect all .tsx, .ts, .js files under src/
function getFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      getFiles(full, files);
    } else if (['.tsx', '.ts', '.js'].includes(extname(full))) {
      files.push(full);
    }
  }
  return files;
}

const srcFiles = getFiles('src');
console.log(`Found ${srcFiles.length} source files to scan`);

let totalReplacements = 0;
const changedFiles = [];

for (const file of srcFiles) {
  let content = readFileSync(file, 'utf8');
  let changed = false;
  let fileReplacements = 0;

  for (const [localPath, cloudinaryUrl] of entries) {
    // Escape special regex chars in the path
    const escaped = localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, cloudinaryUrl);
      changed = true;
      fileReplacements += matches.length;
    }
  }

  if (changed) {
    writeFileSync(file, content, 'utf8');
    totalReplacements += fileReplacements;
    changedFiles.push({ file, count: fileReplacements });
    console.log(`  ✅ ${file} — ${fileReplacements} replacements`);
  }
}

console.log(`\n✅ Done: ${totalReplacements} replacements across ${changedFiles.length} files`);
