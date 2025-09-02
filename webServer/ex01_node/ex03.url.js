const http = require('http');
const url = require('url'); // 요청이 들어온 주소를 다룰 때
const fs = require('fs').promises;

http.createServer(async(req, res) => {
    // 요청 url parsing
    const parseUrl = url.parse(req.url, true); // true → queryString을 객체로 변환
    console.log('parseUrl',parseUrl);
    console.log('pathname',parseUrl.pathname); // 요청 경로
    console.log('query',parseUrl.query); // queryString

    // 응답
    const file = await fs.readFile('./ex02.html')

    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.write(file);
    res.end();

}).listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
})