/**
 * Created by Administrator on 2017/7/13.
 */
var express = require('express');
var path = require("path");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var bodyParser = require('body-parser');
var users = require('./routes/users');
var manage = require('./routes/manage');

var app = express();
app.use(express.static(path.join(__dirname,'app','public')));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(session({
    key: "loginSession",
    name: "userLogin",
    secret: "minShp",
    store: new FileStore(),
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 60 * 1000
    }
}));
app.use('/users',users);
app.use('/manage',manage);
app.listen(8080,function(){
    console.log("It's Started on PORT 8080");
});