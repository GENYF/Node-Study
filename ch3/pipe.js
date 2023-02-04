const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./readme_pipe.txt', { highWaterMark: 16 });
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./writeme_pipe.txt');

readStream.pipe(zlibStream).pipe(writeStream);