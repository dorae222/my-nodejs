const express = require("express");
//모듈 추가 (path, body-parser, todo 라우터)

const app = express();

// 미들웨어 추가 (body-parser(urlencoded, json), express.static, view engine, views)

// todo 라우터 연결

// 서버 실행
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});