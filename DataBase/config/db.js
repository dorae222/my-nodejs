// Express에서 DB로 연결하기 위한 연결 정보를 관리하는 파일

const mysql = require('mysql2');

// 1. Connection 객체 생성
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'nodejs'
});

// 2. Connection 실행
conn.connect();

module.exports = conn;