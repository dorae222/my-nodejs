const http = require('http');
const fs = require('fs').promises;
const url = require('url');

http.createServer(async(req,res)=>{
    // 주소 설계
    // 서버 기본 주소 : https://localhost:3000
    // 회원가입 페이지 주소 : https://localhost:3000/join
    // 로그인 페이지 주소 : https://localhost:3000/login
    // https://localhost:3000/user/login → 로그인 처리(입력한 id,pw 페이지 출력)

    // 사용자가 입력한 값에 따라서 페이지에 출력값이 달라져야 함(html 가공)
    // 1. 템플릿엔진 (ejs, pug, nunjucks 등) => 페이지 구성이 복잡할 때(일반적)
    // 2. 서버쪽에서 html을 매번 생성해주는 방법 => 페이지 구성이 매우 단순할 때

    const parseUrl = url.parse(req.url,true);
    console.log(parseUrl);
    const pathname = parseUrl.pathname; // '/join', '/login'
    const query = parseUrl.query; // {id: 'sample', pw: 'sample_pw'}

    // pathname 값에 따라서
    // join => join.html | login => login.html
    let file;

    if (pathname === '/join') {
        file = await fs.readFile('./join.html');
    } else if (pathname === '/login') {
        file = await fs.readFile('./login.html');
    } else if (pathname ==='/user/login'){
        let html = '<html>';
        html += '<body>';
        html += '<h1>' + query.id + '</h1>';
        html += '<h1>' + query.pw + '</h1>';
        html += '</body>';
        html += '</html>';
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    }

    if (file){ // join or login 경로가 아닐 경우, file이 없음
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(file);
        res.end();
    }
}).listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})