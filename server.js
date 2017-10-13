/* 
* @Author: Marte
* @Date:   2017-10-12 16:29:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-13 21:26:00
*/
var https = require("https");
const mysql = require("mysql");
var express = require('express');
var body_parser = require('body-parser');

var epx = new express();
epx.use(body_parser.json());
epx.use(body_parser.urlencoded({
    extended:true
    //false时，键值对中的值为String/Array形式
    //为true的时候，可为任何数据类型
}));

//连接远程数据库(邓)
// var connection = mysql.createConnection({
// 	host:"10.3.132.116",//116  128
// 	user:"eleme",
// 	password:"123123",
// 	database:"ele"
// });
// connection.connect();
console.log('run');
//获取天气
epx.post('/getWeather',function(req,res){
    console.log('getWeather');
    res.append("Access-Control-Allow-Origin", "*");
    var arg = req.body;
    console.log(arg);
    var url = "https://restapi.ele.me/bgs/weather/current?latitude="+arg.lat+"&longitude="+arg.lng;

    https.get(url,function(getres){
        var data = "";
        getres.setEncoding('utf8');
        getres.on("data",function(chunk){
            data+=chunk;
        }).on("end",function(){
            console.log('end');                 
            res.send(data);
        }).on("error",function(){
            console.log("read error");         
        });
    });

}).listen(10086);

// https.get("https://restapi.ele.me/shopping/restaurants?latitude=31.23037&longitude=121.473701&offset=1&limit=20&extras[]=activities&terminal=h5",function(res){
//     var data = "";
//     res.setEncoding('utf8');
//     res.on("data",function(chunk){
//         data+=chunk
//     })
//     res.on("end",function(){
//         console.log(data)
//     })
// })