const express = require('express');
const indexRouter = require('./routes/index'); // index.js 라우터 모듈 불러오기
const userRouter = require('./routes/users'); // users.js 라우터 모듈 불러오기

// express → app 객체 생성 (core)
const app = express(); 

// 미들웨어
app.use(express.urlencoded({ extended: true }));
// → body parsing 미들웨어 추가

// localhost:3000/a/join
// localhost:3000/b/login
// 어디까지가 고정 위치인지 정해야 함
// localhost:3000으로 들어오면 indexRouter로 연결
app.use('/', indexRouter);

// localhost:/3000/users.join
// localhost:/3000/users.login
// /users로 들어오면 userRouter로 연결
app.use('/users', userRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});