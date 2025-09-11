const express = require('express');
//모듈 추가 (path, body-parser, todo 라우터)
const path = require('path');
const bodyParser = require('body-parser');

const todoRouter = require('./routes/todo');

const app = express();

// 미들웨어 추가 (body-parser(urlencoded, json), express.static, view engine, views)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// todo 라우터 연결
app.use('/', todoRouter);

// 서버 실행
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});