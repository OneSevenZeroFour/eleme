/* 
* @Author: Marte
* @Date:   2017-10-12 16:29:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-17 11:20:31
*/
var https = require("https");
const mysql = require("mysql");
const express = require("express");
const bodyps = require("body-parser");

//连接远程数据库(邓)
// var connection = mysql.createConnection({
//  host:"10.3.132.128",
//  user:"eleme",
//  password:"123123",
//  database:"ele"
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
            response.send(JSON.stringify({
                data
            }));
        })
    })
})

app.get('/list',function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    console.log(req.query.num*1)
    https.get("https://restapi.ele.me/shopping/restaurants?latitude="+req.query.lat+"&longitude="+req.query.lng+"&keyword=&offset="+req.query.num*1+"&limit=20",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk;
        })
        res.on("end",function(){
            response.send(data);
        })
    })
})

app.get('/hot',function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v3/hot_search_words?geohash=wtw3sjq6n6um&latitude=31.23037&longitude=121.473701&timestamp=1507878076&locationName=%E9%BB%84%E6%B5%A6%E5%8C%BA%E4%B8%8A%E6%B5%B7%E5%B8%82%E5%A7%94(%E4%BA%BA%E6%B0%91%E5%A4%A7%E9%81%93%E5%8C%97)",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk;
        })
        res.on("end",function(){
            console.log(data)
            response.send(data);
        })
    })
})

app.get('/search',function(req,response){
    console.log(req.query.data)
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v1/restaurants/search?offset=0&limit=20&keyword="+req.query.data+"&latitude="+req.query.lat+"&longitude="+req.query.lng,function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk;
        })
        res.on("end",function(){
            console.log(data)
            response.send(data);
        })
    })
})

    

app.listen(10086);
console.log("go")
