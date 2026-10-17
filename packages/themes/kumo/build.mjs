import fs from 'node:fs';
import path from 'node:path';
import * as sass from 'sass';
const directory = import.meta.dirname;
const result = sass.compile(path.join(directory, 'scss/theme.scss'), {
	style: 'compressed',
});
fs.mkdirSync(path.join(directory, 'dist'), { recursive: true });
fs.writeFileSync(path.join(directory, 'dist/theme.css'), result.css);
