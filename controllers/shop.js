const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => { //Route has to start with /
    // console.log('In another middleware!');
    //res.send("<h1>Hello from express</h1>"s); //Auto sets text/html content type to the response.

    /**
     * We can try:
     * res.sendFile - Requires absolute path as an input
     * res.sendFile('/views/shop/shop.html') - Starting slash (before 'views') refers to the root folder of OUR OS.
     */

    //console.log(adminData.products);
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop', 'shop.html'));
    /**
     * path.join will automatically BUILD the path to work on both LINUX and WINDOWS (detects which OS you are running on).
     * 
     * __dirname in our case points to app_folder/routes (folder of this file [shop.js]). That's why we need to go up one level with '../' next to __dirname.
     */

    //const products = adminData.products;

    Product.fetchAll((products) => {
        res.render('shop/product-list', { //Relative to 'root/views' folder
            pageTitle: 'All products', 
            prods: products, 
            path: '/products' 
            //hasProducts: products.length > 0,
            //activeShop: true,
            //productCSS: true
        }); //Render the shop.pug file in /shop folder. (which is located in '/views' folder - set in app.js)
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        //console.log(product);
        res.render('shop/product-detail', {
            pageTitle: product.title,
            path: `/products`,
            product
        });
    });

    //res.redirect('/');
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', { //Relative to 'root/views' folder
            pageTitle: 'Shop', 
            prods: products, 
            path: '/'
        }); //Render the shop.pug file in /shop folder. (which is located in '/views' folder - set in app.js)
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your cart', 
        path: '/cart'
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (prod) => {
        Cart.addProduct(prodId, prod.price);
    });
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your orders', 
        path: '/orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout', 
        path: '/checkout'
    });
}