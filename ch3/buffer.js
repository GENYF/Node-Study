const buffer = Buffer.from('change me to buffer');
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [Buffer.from('space '), Buffer.from('space '), Buffer.from('spacing')];
console.log(Buffer.concat(array).toString());

console.log(Buffer.alloc(5));