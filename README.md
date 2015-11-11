# asyncify-functions
Convert functions with node style callbacks into functions returning Promises

## Usage

```javascript
import promisify from 'promisify-members';
import fs from 'fs';

// Promisify a single function from an object
const readdirAsync = promisify(fs,f => f.readdir);

// Promisify a list of functions from an object
const [mkdirAsync,closeAsync] = promisify(fs, f => [f.mkdir,f.close]);
```
