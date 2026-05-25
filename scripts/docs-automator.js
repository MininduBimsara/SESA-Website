const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const DOCS_DIR = path.join(__dirname, '../V2 Docs');
const INDEX_FILE = 'INDEX.md';

function getNextPrefixNumber(files) {
    let max = 0;
    for (const file of files) {
        const match = file.match(/^(\d+)-/);
        if (match) {
            const num = parseInt(match[1], 10);
            if (num > max) max = num;
        }
    }
    return max + 1;
}

function extractTitle(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const match = content.match(/^#\s+(.+)$/m);
        if (match) return match[1].trim();
        
        // Fallback: title-case the filename if no heading found
        const baseName = path.basename(filePath, '.md').replace(/^\d+-/, '');
        return baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    } catch (e) {
        return path.basename(filePath);
    }
}

function extractDescription(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        let inFrontmatter = false;
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed === '---') {
                inFrontmatter = !inFrontmatter;
                continue;
            }
            // Skip empty lines, headings, images, html tags, blockquotes
            if (inFrontmatter || !trimmed || trimmed.startsWith('#') || trimmed.startsWith('![') || trimmed.startsWith('<') || trimmed.startsWith('>')) {
                continue;
            }
            // Found the first valid text paragraph
            if (trimmed.length > 0) {
                // Truncate to 100 characters max for the table
                return trimmed.length > 100 ? trimmed.substring(0, 97) + '...' : trimmed;
            }
        }
        return '';
    } catch (e) {
        return '';
    }
}

function processDocs() {
    console.log('Automating V2 Docs...');
    
    if (!fs.existsSync(DOCS_DIR)) {
        fs.mkdirSync(DOCS_DIR, { recursive: true });
    }

    let allFiles = fs.readdirSync(DOCS_DIR)
        .filter(f => f.endsWith('.md') && f !== INDEX_FILE);

    let needsAnotherPass = false;

    // 1. Rename files without a numeric prefix
    for (const file of allFiles) {
        if (!/^\d+-/.test(file)) {
            const nextNum = getNextPrefixNumber(allFiles);
            const prefix = nextNum.toString().padStart(2, '0');
            const newName = `${prefix}-${file}`;
            
            console.log(`Renaming: ${file} -> ${newName}`);
            fs.renameSync(
                path.join(DOCS_DIR, file),
                path.join(DOCS_DIR, newName)
            );
            needsAnotherPass = true;
            // Update allFiles list for the next iteration to avoid collisions
            allFiles = fs.readdirSync(DOCS_DIR)
                .filter(f => f.endsWith('.md') && f !== INDEX_FILE);
        }
    }

    // 2. Generate INDEX.md
    // Re-read files just in case
    const sortedFiles = fs.readdirSync(DOCS_DIR)
        .filter(f => f.endsWith('.md') && f !== INDEX_FILE)
        .sort((a, b) => {
            const numA = parseInt(a.match(/^(\d+)/)?.[1] || 0, 10);
            const numB = parseInt(b.match(/^(\d+)/)?.[1] || 0, 10);
            return numA - numB;
        });

    let indexContent = `# V2 Documentation Index\n\n`;
    indexContent += `This index is automatically generated. Do not edit it manually.\n\n`;
    indexContent += `| Order | Document | Description | File |\n`;
    indexContent += `| :---: | :--- | :--- | :--- |\n`;

    for (const file of sortedFiles) {
        const numMatch = file.match(/^(\d+)/);
        const order = numMatch ? parseInt(numMatch[1], 10) : '-';
        const fullPath = path.join(DOCS_DIR, file);
        const title = extractTitle(fullPath);
        const description = extractDescription(fullPath);
        
        indexContent += `| ${order} | **${title}** | ${description} | [${file}](./${encodeURIComponent(file)}) |\n`;
    }

    const indexPath = path.join(DOCS_DIR, INDEX_FILE);
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log(`Updated ${INDEX_FILE}`);
}

const isWatchMode = process.argv.includes('--watch');

if (isWatchMode) {
    console.log(`Watching for changes in ${DOCS_DIR}...`);
    let timeout = null;
    
    // We use a debounce to prevent running multiple times for a single save/rename event
    const runDebounced = () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            processDocs();
        }, 500); // Wait 500ms before processing
    };

    const watcher = chokidar.watch(path.join(DOCS_DIR, '*.md'), {
        ignored: path.join(DOCS_DIR, INDEX_FILE),
        persistent: true,
        ignoreInitial: false,
    });

    watcher
        .on('add', runDebounced)
        .on('change', runDebounced)
        .on('unlink', runDebounced);
} else {
    processDocs();
}
