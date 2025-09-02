// http 모듈 사용 웹 서버 구현
// http → Core API 제공 (서버 생성, 요청 처리, 응답 정의 등)
const http = require('http');

// 파일시스템(fs) 모듈 → 시간이 걸림(I/O) → 비동기 처리 필요(libuv)
// Promise(비동기 통신)→ async/await 문법과 대부분 같이 사용됨 → 코드를 간결하게 처리 가능
const fs = require('fs').promises;

// req → request, 어떻게 요청처리 할 것인지
// res → response, 어떻게 응답처리 것인지

// 포트 번호(PortNumber): 컴퓨터에서 어떤 프로그램(서비스)가
// 어떤 문(특정 서비스가 대기하고 있는 접속 지점)으로 통신할지 구분하는 번호
// 한 컴퓨터 안에서 여러 프로그램이 동시에 서비스 될 수 있으니
// 서로 충돌없이 구분할 수 있는 포트번호가 필요함
// 80(HTTP), 443(HTTPS), 21(FTP), 22(SSH), ... (0~1023은 시스템 포트이기 때문에 사용 주의)

// 웹 개발시 자주 사용되는 포트 번호
// 3000(Node.js), 3001(예비용)
// 5000, 8888(테스트용, 로컬용)

http.createServer(async(req, res) => {
    // 요청처리~~(req), 응답정의~~(res)

    // 1. ex02.html 파일 불러오기(fs)
    const file = await fs.readFile('./ex02.html');
    // 파일을 읽어올 때까지 기다릴 수 있도록 async/await 문법 사용

    // 읽어온 ex02.html 파일을 응답할 시, 파일을 불러오지 못하면 문제 발생
    // 2. 응답 처리: 패킷 사용하여 응답 → Head | body 2가지 파트로 구성됨
    // Head : 응답 코드 (200 Ok, 404 Not Found, 500 Internal Server Error, 201 Created ...)
    //        응답 형식 (html, json, ..., 인코딩 방식(UTF-8))
    // body : 응답 본문 (html 문서, ...)
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.write(file); // 패킷 body 정의
    res.end(); // 패킷 전송
}).listen(3000,()=>{
    // 서버가 정상적으로 실행되었을 때 어떻게 할 것인지
    console.log('Server is running on http://localhost:3000');
});

// localhost => 개인의 로컬 컴퓨터 주소