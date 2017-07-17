/**
 * Created by Administrator on 2017/7/14.
 */
var express = require('express');
var User = require('../modules').User;
var mysqlConnection = require('../modules').mysqlConnection;
var crypto = require('crypto');
var router = express.Router();
var Ware = require('../modules').Ware;
var uuid = require('uuid');
var parser = require('multer')().single('imgSrc');
var fs = require('fs');
var mime = require('mime');
/*function encrypt(str){
    return crypto.createHash('md5').update(str).update(str).digest('hex');
}*/

router.post('/reg',function(req,res) {
    var user = req.body;
    //var md5Email = encrypt(user.email);
    //var safePassword = encrypt(user.password);
    //user.avatar = "https://secure.gravatar.com/avatar/" + md5Email + "?s=48";
    var insertSql = 'insert into Customer(customerEmail,customerPassword) values (?,?)';
    var insertParams = [user.email, user.password];
    console.log(user.email);
    console.log(user.password);
    mysqlConnection.query(insertSql, insertParams, function (err, rows) {
        if (err) {
            console.log("registry failed");
            res.status(500).json({msg: err});
        } else {
            console.log("registry success");
            return  res.end(JSON.stringify(rows));
        }
    });
});
    router.post('/login',function(req,res) {
        var user = req.body;
        var selectSql = 'select id from Customer where customerPassword="'+user.password+'"'+' and customerEmail="'+user.email+'"';
        var sql = 'select id from Customer where customerPassword="?" and customerEmail="?"';
        //console.log(selectSql);
        //var sql_value_arr = [user.password,user.email];
        mysqlConnection.query(selectSql, function (err, rows,fields) {
            //console.log(rows);
            //console.log(rows.length);
            if (err) {
                console.log("login failed");
                res.status(500).json({msg: err});
            } else if(rows.length == 0){
                res.status(500).json({failedFlag: "Email address or password is incorrct"});
            }else {
                console.log("login success");
                req.session.user = user;
                res.json(user);
            }
        });
    });

router.post('/logout',function(req,res){
    var user = req.body;
    req.session.user = null;
    res.status(200).json({msg:'success'});
});
router.get('/home', function (req, res) {
    var selectSql = 'select * from PictureList';
    mysqlConnection.query(selectSql, function (error, results, fields) {
        if (error) {
            console.log("load picture list failed");
            res.status(500).json({msg: error});
        } else {
            console.log("load picture list success");
            res.json(results);
        }
    });
});
router.post('/addShoppingList',function(req,res) {
    var ware = req.body;
    var insertSql = 'insert into ShoppingList(name,price,imgSrc) values (?,?,?)';
    var insertParams = [ware.name, ware.price, ware.imgSrc];
    mysqlConnection.query(insertSql, insertParams, function (err, rows) {
        if (err) {
            console.log("add to shopping list failed");
            res.status(500).json({msg: err});
        } else {
            console.log("add to shopping list success");
            return  res.end(JSON.stringify(rows));
        }
    });
});
router.post('/deleteShoppingList',function(req,res) {
    var list = req.body;
    var insertSql = 'delete from ShoppingList where id='+list.id;
    mysqlConnection.query(insertSql, function (err, rows) {
        if (err) {
            console.log("delete from shopping list failed");
            res.status(500).json({msg: err});
        } else {
            console.log("delete from shopping list success");
            res.json(rows);
        }
    });
});
router.get('/getShoppingList',function(req,res) {
    var user = req.body;
    var insertSql = 'select * from ShoppingList';
    mysqlConnection.query(insertSql,function (err, rows) {
        if (err) {
            console.log("get the data from shopping list failed");
            res.status(500).json({msg: err});
        } else {
            console.log("get the data from shopping list success")
            res.json(rows);
        }
    });
});
router.post('/validate',function(req,res){
    var user = req.session.user;
    if(user && user._id){
        res.status(200).json(user)
    }else{
        res.status(401).json({msg:'please login first'});
    }
});
module.exports = router;