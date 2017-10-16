/* 
* @Author: Marte
* @Date:   2017-10-12 16:29:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-12 16:38:15
*/
var https = require("https");
const mysql = require("mysql");
const express = require("express");
const bodyps = require("body-parser");

//连接远程数据库(邓)
// var connection = mysql.createConnection({
// 	host:"10.3.132.128",
// 	user:"eleme",
// 	password:"123123",
// 	database:"ele"
// });
// connection.connect();

var app = express();
app.use(bodyps.json());
app.use(bodyps.urlencoded({
    extended:true
}));

//console.log(http);
//http.get(url,callback)
//mysql cheerio
app.get("/hotkey",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v3/hot_search_words?latitude=23.17475&longitude=113.34145",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log(data)
            response.send(JSON.stringify({
                data
            }));
        })
    })
})
app.get("/remai",function(req,response){
     response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v1/sale_list_index?type=hot_sale_combo&latitude=23.13388&longitude=113.32507&params=%7B%22restaurant_category_ids%22%3A%22None%22%7D",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log(data)
            response.send(JSON.stringify({
                data
            }));
        })
    })   
})
app.listen(10086);
console.log("server start")