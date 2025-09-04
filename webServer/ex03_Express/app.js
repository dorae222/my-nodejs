const express = require('express');
const path = require('path');

// express → app 객체 생성 (core)
const app = express(); 

// 미들웨어
app.use(express.urlencoded({ extended: true }));
// => body parsing 미들웨어 추가

// localhost:3000/join => join.html
// 모든 요청들은 따로 요청 방식을 지정하지 않는 한 기본이 GET
// → 주소창에 주소 직접 입력해서 요청 하는 방식 → GET
// get → form(method=get/post)
app.get('/join', (req, res) => {
  // 페이지 응답
  // ex03_express/views/join.html
  // ex03_express → app.js와 동일한 위치 → 현재(__dirname)
  res.sendFile(path.join(__dirname, 'views', 'join.html'));
});

// localhost:3000/users/join
app.post('/users/join', (req, res) => {
  console.log(req.body); // form 태그에 입력한 값들이 객체 형태로 출력
  // 로그인페이지로 이동(forwarding 방식으로 이동)
  // -> 최종적으로 이동한 페이지의 실제 경로가 주소창에서 확인이 안됨
  // (최초로 클라이언트가 요청했던 회원가입 요청주소만 노출됨) -> 어색한 방식
  // res.sendFile(path.join(__dirname, 'views', 'login.html'));

  // redirecting 방식으로 변경
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// 로그인 처리
// localhost:3000/users/login
app.post('/users/login', (req, res) => {
  // res
  // sendFile : 파일 경로를 지정해서 파일을 응답하는 방법
  // redirect : 리다이렉팅 방식으로 다른 경로로 재요청하게 만드는 방법
  // send : 단순 텍스트 응답
  res.send('로그인 완료'); // 자동으로 2000k 코드 응답함, Content-Type도 자동으로 설정됨
});

// 3000번 포트에 서버 열기
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});