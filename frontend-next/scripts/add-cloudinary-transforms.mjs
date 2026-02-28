import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Add f_auto,q_auto after /upload/ for automatic format & quality optimization
// For videos, use q_auto only (f_auto not needed for mp4)
const IMAGE_PATTERN = /https:\/\/res\.cloudinary\.com\/dhxlvvzih\/image\/upload\/v/g;
const VIDEO_PATTERN = /https:\/\/res\.cloudinary\.com\/dhxlvvzih\/video\/upload\/v/g;

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
let totalReplacements = 0;

for (const file of srcFiles) {
  let content = readFileSync(file, 'utf8');
  let changed = false;

  // Images: add f_auto,q_auto
  const imgMatches = content.match(IMAGE_PATTERN);
  if (imgMatches) {
    content = content.replace(IMAGE_PATTERN, 'https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v');
    changed = true;
    totalReplacements += imgMatches.length;
  }

  // Videos: add q_auto
  const vidMatches = content.match(VIDEO_PATTERN);
  if (vidMatches) {
    content = content.replace(VIDEO_PATTERN, 'https://res.cloudinary.com/dhxlvvzih/video/upload/q_auto/v');
    changed = true;
    totalReplacements += vidMatches.length;
  }

  if (changed) {
    writeFileSync(file, content, 'utf8');
    console.log(`  ✅ ${file}`);
  }
}

console.log(`\n✅ Added transforms to ${totalReplacements} URLs`);
