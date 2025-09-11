// 사용자 정의 모듈 가져올 때는 경로 지정 필요
// 확장자는 생략 가능
const {odd, even} = require('./var');

function checkOddOrEven(num) {
    if (num % 2 === 1) { // Odd Num
        return odd;
    } else {
        return even;
    }
}

module.exports = checkOddOrEven;