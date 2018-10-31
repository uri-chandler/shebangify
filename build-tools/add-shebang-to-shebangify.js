const fs = require('fs');

const pathToShebangify = __dirname + '/../dist/cli/shebangify.js';
const shebang = '#!/usr/bin/env node';

const shebangify = fs.readFileSync(pathToShebangify, 'utf8');

fs.writeFileSync(pathToShebangify, shebang + '\n' + shebangify, 'utf8');