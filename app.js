const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars'); 

const errorController = require('./controllers/error');

const app = express(); //create express application

//app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));

//app.set('view engine', 'pug'); //For any dynamic template trying to render - use noted engine. ( https://expressjs.com/en/4x/api.html#app.set )
//app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views', 'views'); //Find all templates in the '/views' folder of our app tree.

//const routes = require('./routes');
//const adminData = require('./routes/admin');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/*
app.use((req, res, next) => { //executed for each incoming request
    console.log('In the middleware!');
    next(); //Allows the request to continue to the next middleware in line (below this one)
});
*/

app.use(bodyParser.urlencoded({extended: false})); //Registering a parser before all routes. It registers a middleware that handles the body parsing (so we don't do it manually)
//It wont parse all kinds of bodies (files, json, etc), it parses bodies sent through a form. 

app.use(express.static(path.join(__dirname, 'public')));
/**
 * Serving files statically (not handled by the express router or upper middleware, but instead directly forwarded to the file system)
 * 
 * Granting READ access to the 'public' folder. 
 */


//app.use('/admin', adminData.routes); //Using our defined admin routes. All routes defined there will start with the same string: /admin/...
//ONLY routes starting with /admin will go to adminRoutes file.
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//const server = http.createServer(routes.handler
    //(request, response) => {
    //console.log(request.url); //, request.method, request.headers
    // process.exit();
    //} 
//);

app.listen(3000);

/*
const server = http.createServer(app); //const app is a valid request handler
server.listen(3000);
*/