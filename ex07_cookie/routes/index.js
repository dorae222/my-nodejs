const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    // 로그인을 성공해서 이쪽으로 왔다면, 클라이언트는 nick이라는 이름의 쿠키를 가지고 있다
    // console.log(req.cookies);
    const nickData = { 
        nick : req.cookies.nick,
        userId : req.cookies.userId 
    };
    // console.log(nickData);

    res.render('index', nickData);
});

module.exports = router;