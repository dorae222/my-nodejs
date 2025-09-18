const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // 세션 관리
const FileStore = require('session-file-store')(session);
const indexRouter = require('./routes/index.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 쿠키/세션은 라우터보다 먼저 설정되어야 함
app.use(cookieParser('secret key'));
app.use(
  session({
    secret: 'secret key', // 암호화 키
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // 개발 환경(http)에서는 false, 운영(https)에서는 true 권장
      secure: process.env.NODE_ENV === 'production',
      // 예: 1시간
      maxAge: 1000 * 60 * 60,
    },
    store: new FileStore({}),
  })
);

// 라우터는 미들웨어 설정 후에 등록
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});