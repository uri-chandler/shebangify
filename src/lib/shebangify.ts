const shebang = '#!/usr/bin/env node';

export function shebangify(text :string) :string {
    return shebang + '\n' + text;
}