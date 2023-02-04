const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme_buffer.txt', { highWaterMark: 16 });
writeStream.on('finish', () => {
    console.log('finish file write');
});
writeStream.write('write me please!');
writeStream.write('one more write me please!');
writeStream.end();
