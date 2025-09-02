// {}로 export된 경우는 변수명을 그대로 사용해야 하지만
// default로 export된 경우는 원하는 이름으로 사용 가능
const checkNum = require('./func');

console.log(checkNum(10));