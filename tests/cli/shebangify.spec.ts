import * as chai from 'chai';
import { execSync } from 'child_process';
import * as fs from 'fs';


// init "should" assertions
chai.should();

describe('cli/shebangify', function() {

    const baseCommand = 'node ' + __dirname + '/../../dist/cli/shebangify.js ';

    it('throws if file is not specified', async () => {
        chai.expect( () => execSync(baseCommand) ).to.throw();
    });

    it('throws if file is not found', async () => {
        chai.expect( () => execSync(baseCommand + 'foo') ).to.throw();
    });

    it('adds a shebang to a file', async () => {
        const originalFile = fs.readFileSync(__dirname + '/fixtures/app.js', 'utf8');

        execSync(baseCommand + 'tests/cli/fixtures/app.js');

        const shebang = '#!/usr/bin/env node';
        const file = fs.readFileSync(__dirname + '/fixtures/app.js', 'utf8');

        try {
            file.startsWith(shebang).should.be.true;
        }
        catch(assertionError) {
            fs.writeFileSync(__dirname + '/fixtures/app.js', originalFile, 'utf8');
            throw assertionError;
        }

        fs.writeFileSync(__dirname + '/fixtures/app.js', originalFile, 'utf8');
    });
});