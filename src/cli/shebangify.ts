import * as fs from 'fs';
import * as path from 'path';

import { shebangify } from '../index';


const fileToShebangify = process.argv[2];

if (!fileToShebangify) {
    // tslint:disable-next-line:no-console
    console.log('Missing <filepath> to file that you want to shebangify');
    process.exit(1);
}

async function start() {
    const resolvedPath = path.resolve(process.cwd(), fileToShebangify);

    if (fs.existsSync(resolvedPath) === false)
        throw new Error('File not found');

    const fileContents = fs.readFileSync(resolvedPath, 'utf8');
    const shebangedFileContents = shebangify(fileContents);

    await fs.writeFileSync(resolvedPath, shebangedFileContents, 'utf8');

    // tslint:disable-next-line:no-console
    console.log(`File ${resolvedPath} shebangified ok`);
}

function handleError(error) {
    // tslint:disable-next-line:no-console
    console.log(`Could not shebangify file "${fileToShebangify}", something went wrong...`, error);
    process.exit(1);
}

start().catch(handleError);

