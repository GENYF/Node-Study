// const value = require('./var.js');
// const odd = value.odd;
// const even = value.even;

// 구조분해 할당
const { odd, even } = require('./var.js');

// ES6 모듈(브라우저)를 사용할 때에는 import로 불러옴
// import { odd, even } from './var.js';

function checkOddOrEven(num) {
    if (num % 2) {
        return odd;
    } else {
        return even;
    }
}

// console.log(value);

module.exports = checkOddOrEven;

// ES6 모듈(브라우저)로 만들 때는 export default에 객체를 할당
// export default checkOddOrEven