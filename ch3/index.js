const { odd, even } = require('./var.js');
const checkNumber = require('./func.js');

// ES6 모듈(브라우저)를 사용할 때에는 import로 불러옴
// import { odd, even } from './var.js';
// import checkNumber from './func.js';

function checkStringOddOrEven(str) {
    if (str.length % 2) {
        return odd;
    } else {
        return even;
    }
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));