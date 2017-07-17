/**
 * Created by Administrator on 2017/7/15.
 */
var mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
    host        :         "localhost",
    user        :         "root",
    password    :         "",
    database     :         "myminShop"
});
mysqlConnection.connect(function(error){
    if(error)    {
        console.log("Problem with MySQL"+error);
    } else {
        console.log("Connected with Database");
    }
});
module.exports = mysqlConnection;