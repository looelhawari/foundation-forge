/**
 * Upload all public assets to Cloudinary and generate a mapping file.
 * 
 * Usage: node scripts/upload-to-cloudinary.mjs
 * 
 * Requires: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 */

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary config
cloudinary.config({
    cloud_name: 'dhxlvvzih',
    api_key: '871669749674246',
    api_secret: 'Ud21OZBJhnUqyqKdYsEmvr3_mhM',
    secure: true,
});

const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets');
const MAPPING_FILE = path.join(__dirname, '..', 'cloudinary-mapping.json');

// Supported extensions
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];
const VIDEO_EXTS = ['.mp4', '.webm', '.mov'];

function getAllFiles(dir, baseDir = dir) {
    const results = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            results.push(...getAllFiles(fullPath, baseDir));
        } else {
            const ext = path.extname(item.name).toLowerCase();
            if ([...IMAGE_EXTS, ...VIDEO_EXTS].includes(ext)) {
                const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
                results.push({ fullPath, relativePath, ext });
            }
        }
    }
    return results;
}

async function uploadFile(file) {
    const isVideo = VIDEO_EXTS.includes(file.ext);
    const publicId = `cpc-website/${file.relativePath.replace(file.ext, '').replace(/\s+/g, '_')}`;

    try {
        const options = {
            public_id: publicId,
            resource_type: isVideo ? 'video' : 'image',
            overwrite: false,
            unique_filename: false,
            use_filename: true,
            folder: '',
            // Auto-optimize
            ...(isVideo ? {} : {
                quality: 'auto:good',
                fetch_format: 'auto',
            }),
        };

        console.log(`  Uploading: ${file.relativePath} → ${publicId}`);
        const result = await cloudinary.uploader.upload(file.fullPath, options);

        return {
            localPath: `/assets/${file.relativePath}`,
            cloudinaryUrl: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
            resourceType: result.resource_type,
        };
    } catch (error) {
        // If already exists, try to get the URL
        if (error.http_code === 409 || error.message?.includes('already exists')) {
            try {
                const existing = await cloudinary.api.resource(publicId, {
                    resource_type: isVideo ? 'video' : 'image',
                });
                console.log(`  Already exists: ${file.relativePath}`);
                return {
                    localPath: `/assets/${file.relativePath}`,
                    cloudinaryUrl: existing.secure_url,
                    publicId: existing.public_id,
                    format: existing.format,
                    width: existing.width,
                    height: existing.height,
                    bytes: existing.bytes,
                    resourceType: existing.resource_type,
                };
            } catch (e) {
                console.error(`  Failed to get existing: ${file.relativePath}`, e.message);
                return null;
            }
        }
        console.error(`  Failed: ${file.relativePath}`, error.message);
        return null;
    }
}

async function main() {
    console.log('🔍 Scanning assets directory...');
    const files = getAllFiles(ASSETS_DIR);
    console.log(`📦 Found ${files.length} files to upload\n`);

    const mapping = {};
    let uploaded = 0;
    let failed = 0;

    for (const file of files) {
        const result = await uploadFile(file);
        if (result) {
            mapping[result.localPath] = result.cloudinaryUrl;
            uploaded++;
        } else {
            failed++;
        }
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 300));
    }

    // Save mapping
    fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));

    console.log(`\n✅ Complete: ${uploaded} uploaded, ${failed} failed`);
    console.log(`📄 Mapping saved to: ${MAPPING_FILE}`);
}

main().catch(console.error);
