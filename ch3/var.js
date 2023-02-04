const odd = '홀수입니다';
const even = '짝수입니다';

// 간단하게 모듈 export 가능, module.exports와 함께 사용 불가, 참조 관계 유의하기
exports.odd = odd;
exports.even = even;

// 객체를 모듈로 만들 때는 module.exports에 객체를 할당
// module.exports = {
//     odd,
//     even,
// };

// 배열을 모듈로 만들 때는 module.exports에 배열을 할당
// module.exports = [odd, even];

// ES6 모듈(브라우저)로 만들 때는 export default에 객체를 할당
// export default { odd, even };