const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');

router.get('/', (req, res) => {
    const info = req.session && req.session.user ? req.session.user : undefined;
    res.render('index', { info });
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
    if (req.session && req.session.user) return res.redirect('/');
    res.render('login');
});

router.post('/login', (req, res) => {
    const { id, pw } = req.body;
    if (!id || !pw) return res.redirect('/login');

    const sql = 'select id, nick from member where id=? and pw=?';
    conn.query(sql, [id, pw], (err, rows) => {
        if (err) {
            console.error('로그인 DB 오류:', err);
            return res.redirect('/login');
        }

        if (rows && rows.length > 0) {
            const user = { id: rows[0].id, nick: rows[0].nick };
            req.session.user = user; // 세션 저장
            console.log('로그인:', `${user.nick}님 환영합니다.`);
            return res.redirect('/');
        }

        console.log('로그인 실패: 아이디/비밀번호 불일치');
        return res.redirect('/login');
    });
});
    
// 로그아웃
router.get('/logout', (req, res) => {
    if (!req.session) return res.redirect('/');
    req.session.destroy((err) => {
        if (err) console.error('세션 종료 오류:', err);
        res.clearCookie('connect.sid');
        return res.redirect('/');
    });
});

router.get('/update', (req, res) => {
   res.render('update');
});

router.post('/update', (req,res) => {
    // console.log(req.body);
    // 회원 정보 수정기능을 구현
    const { id, pw, nick } = req.body;
    const sql = 'update member set pw=?, nick=? where id=?';

    conn.query(sql, [ pw, nick, id ], (err, rows) => {
        console.log(rows);

        if(rows.affectedRows > 0) {
            console.log('닉네임:',`${nick}이 변경되었습니다.`);
        } else {
            console.log('회원정보 수정 실패');
        }
    });

    // 회원정보 수정 후에는 다시 메인페이지로 이동
    res.redirect('/');
});

router.get('/delete', (req, res) => {
    res.render('delete');
});

router.post('/delete', (req, res) => {
    // console.log(req.body);
    // 회원 탈퇴 기능을 구현
    const { id, pw } = req.body;
    const sql = 'delete from member where id=? and pw=?';

    conn.query(sql, [id, pw], (err, rows) => {
        if(rows.affectedRows > 0) {
            console.log('회원탈퇴:',`${id}님이 탈퇴하였습니다.`);
        } else {
            console.log('회원탈퇴 실패');
        }

        // 성공/실패 상관없이 메인으로 이동
        res.redirect('/');
    });
});

router.get('/list', (req, res) => {
    // 모든 회원의 정보를 console에 출력하고 페이지에 ok를 응답하시오

    const sql = "select * from member where id not in ('admin')";

    conn.query(sql, (err, rows) => {
        console.log(rows);
        const listData = { list : rows };
        res.render('list', listData);
    });

});

router.get('/aDelete', (req, res) => {
    const id = req.query.id;
    const sql = 'delete from member where id=?';

    conn.query(sql, [id], (err, rows) => {
        if(rows.affectedRows > 0) {
            console.log('회원탈퇴:',`${id}님을 탈퇴시켰습니다.`);
        } else {
            console.log('회원탈퇴 실패');
        }
        res.redirect('/list');
    });
});
module.exports = router;