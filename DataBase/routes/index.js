const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/join', (req, res) => {
    res.render('join');
});

router.post('/join', (req, res) => {
    console.log('회원가입:',req.body); // { id: 'test-id', pw: 'test-pw', nick: 'test-nick' }
    
    const { id, pw, nick } = req.body;
    // 쿼리문 작성
    const sql = 'insert into member values(?, ?, ?)';
    
    conn.query(sql, [id, pw, nick], (err, rows) => {
        console.log('rows',rows);
    });

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    console.log(req.body);
    const { id, pw } = req.body;
    const sql = 'select * from member where id=? and pw=?';

    conn.query(sql, [id, pw], (err, rows) => {
        if(rows.length > 0) {
            console.log('로그인:',`${rows[0].nick}님 환영합니다.`);
            res.send(`${rows[0].nick}님 환영합니다.`);
        } else {
            res.send('아이디 또는 비밀번호가 틀렸습니다.');
        }
    });
});

module.exports = router;