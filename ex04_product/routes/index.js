const express = require('express');
const router = express.Router();

// index 페이지
// localhost:3000/
router.get('/', (req, res) => {
    res.render('index'); // views/index.ejs
});

module.exports = router;
