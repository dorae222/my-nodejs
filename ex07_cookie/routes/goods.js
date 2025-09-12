const express = require('express');
const router = express.Router();

router.get('/login', (req,res)=>{
    res.render('login');
});

router.post('/loginCheck', (req,res) => {
    // console.log(req.body);
    
    if(req.body.id == 'aischool' && req.body.pw == '1234'){
        // 로그인 성공
        // cookie는 key-value 형태로 전달
        res.cookie('nick','관리자');
        res.cookie('userId', req.body.id);
    } else if(req.body.id && req.body.pw) {
        // 다른 사용자들도 로그인 가능하도록
        res.cookie('nick', req.body.id);
        res.cookie('userId', req.body.id);
    }

    res.redirect('/');
});

router.get('/logout', (req,res) => {
    res.cookie('nick','', { maxAge:0 } );
    res.cookie('userId','', { maxAge:0 } );
    res.redirect('/');
});

router.get('/goodsAdd', (req,res) => {
    console.log(req.query.goods);

    const goods = req.query.goods;
    for (let i = 0; i < goods.length; i++) {
        res.cookie(`goods${i+1}`, goods[i]);
    }
    res.redirect('/');
});

router.get('/goodsList', (req,res) => {
    res.render('goodsList');
});

router.get('/myGoodsList', (req,res)=>{
    // cookie의 이름만 가져오기
    const key = Object.keys(req.cookies);
    // console.log(req.cookies);
    // console.log(key);
    
    // cookie의 값 가져오기
    const cookieData = { goods : []};
    
    for (let i = 0; i < key.length; i++) {
    cookieData.goods.push(req.cookies[key[i]])
    }

    res.render('myGoodsList', cookieData);
});

router.get('/goodsRemove', (req, res) => {
    // 문제: 내가 가진 모든 쿠기를 삭제하고 /myGoodsList로 다시 이동
    const key = Object.keys(req.cookies);

    for (let i = 0; i < key.length; i++) {
        res.cookie(key[i], '', { maxAge: 1 });
    }

    res.redirect('/myGoodsList');
});

module.exports = router;