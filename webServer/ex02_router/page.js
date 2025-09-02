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

    if (pathname === '/join') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const data = await fs.readFile('./join.html');
        res.end(data);
    } else if (pathname === '/login') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const data = await fs.readFile('./login.html');
        res.end(data);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
}).listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})