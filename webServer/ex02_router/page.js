const http = require('http');
const fs = require('fs').promises;
const url = require('url');

http.createServer(async(req,res)=>{
    // 주소 설계
    // 서버 기본 주소 : https://localhost:3000
    // 회원가입 페이지 주소 : https://localhost:3000/join
    // 로그인 페이지 주소 : https://localhost:3000/login

    const parseUrl = url.parse(req.url,true);
    const pathname = parseUrl.pathname; // '/join', '/login'

    // pathname 값에 따라서
    // join => join.html | login => login.html
    let file;

    if (pathname === '/join') {
        file = await fs.readFile('./join.html');
    } else if (pathname === '/login') {
        file = await fs.readFile('./login.html');
    }

    if (file){ // join or login 경로가 아닐 경우, file이 없음
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(file);
    }
}).listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})