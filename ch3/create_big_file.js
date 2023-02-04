const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for (let i = 0; i <= 10_000_000; i++) {
    file.write('Hello, We have to write a big file. Are you ready?');
}
file.end()