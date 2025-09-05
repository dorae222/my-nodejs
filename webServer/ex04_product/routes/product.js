const express = require('express');
const router = express.Router();

// products 페이지
// localhost:3000/products
// app.js에서 '/products'로 마운트되므로 여기서는 루트('/')로 매핑
router.get('/', (req, res) => { 
    const productData = {
        items : [
            { name: 'MacBook M4 Pro 14 inch', price: 420 },
            { name: 'Galaxy Book 4 Ultra 16 inch', price: 450 },
            { name: 'Logitech Mechanical Keyboard Mini', price: 15 },
            { name: 'Logitech MX Master 3', price: 13 }
        ]
    };
    res.render('products', { productData }); // views/products.ejs
});

module.exports = router;