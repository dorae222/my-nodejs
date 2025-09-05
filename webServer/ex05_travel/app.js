const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const travel = require('./routes/travel');

const app = express();

// 템플릿엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 라우터 설정
// 메인 및 상세 페이지 라우팅을 하나의 라우터에서 처리
// - 메인:        GET /
// - 상세페이지:  GET /destination?id=paris
app.use('/', indexRouter);
app.use('/', travel.router);

// 정적 리소스 경로(public) 설정
app.use(express.static(path.join(__dirname, 'public')));

// bin/www에서 서버를 시작할 수 있도록 app을 export
module.exports = app;

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});