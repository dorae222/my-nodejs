const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index.js');
const aiSchoolRouter = require('./routes/aischool.js');

// 세션을 사용하기 위한 불러들이기
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileStore = require('session-file-store')(session);

const app = express();

// 세션 사용 설정
app.use(cookieParser('secret key')); //쿠키 가지고 올 때 필요
app.use(session({
    httpOnly: true,    //자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함 → 프론트 단에서 document.cookie로 접근 불가
    secure: true,    //https 환경에서만 session 정보를 주고받도록처리
    secret: 'secret key',    //암호화하는 데 쓰일 키 → 고정값
    resave: false,    //세션을 언제나 저장할지 설정함
    saveUninitialized: true,    //세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    cookie: {    //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
      httpOnly: true,
      secure: true
    },
    store : new fileStore()
  }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/', aiSchoolRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});