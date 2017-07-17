/**
 * Created by Administrator on 2017/7/16.
 */
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

router.get('/getAllList', function (req, res) {
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
router.post('/addPictureList',function(req,res) {
    var ware = req.body;
    var insertSql = 'insert into PictureList(name,price,imgSrc) values (?,?,?)';
    var insertParams = [ware.name, ware.price, ware.imgSrc];
    mysqlConnection.query(insertSql, insertParams, function (err, rows) {
        if (err) {
            console.log("add to picture list failed");
            res.status(500).json({msg: err});
        } else {
            console.log("add to picture list success");
            return  res.end(JSON.stringify(rows));
        }
    });
});
router.post('/deletePictureList',function(req,res) {
    var list = req.body;
    var insertSql = 'delete from PictureList where id='+list.id;
    mysqlConnection.query(insertSql, function (err, rows) {
        if (err) {
            console.log("delete from picture list failed");
            res.status(500).json({msg: err});
        } else {
            console.log("delete from picture list success");
            res.json(rows);
        }
    });
});
module.exports = router;