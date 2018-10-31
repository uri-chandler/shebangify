import * as chai from 'chai';

import { shebangify } from '../../src/lib/shebangify';


// init "should" assertions
chai.should();

describe('lib/shebangify', function() {

    it('adds a shebang to a text', async () => {

        const data = 'console.log("this is my cli app")';
        const shebang = '#!/usr/bin/env node';

        shebangify(data).should.equal(shebang + '\n' + data);
    });
});