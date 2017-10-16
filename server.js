/* 
* @Author: Marte
* @Date:   2017-10-12 16:29:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-16 16:31:25
*/
var https = require("https");
// const mysql = require("mysql");
var url_mode = require("url");
var express = require('express');
var body_parser = require('body-parser');
var querystring = require('querystring')

var epx = new express();
epx.use(body_parser.json());
epx.use(body_parser.urlencoded({
    extended:true
    //false时，键值对中的值为String/Array形式
    //为true的时候，可为任何数据类型
}));
epx.use(express.static("./imgs"));
epx.use(express.static("./dist"));
//连接数据库
// var connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
// 	database:"ele"
// });
// connection.connect();

console.log('run');

// ===============================DYT start================================
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

}).post("/getNearby",function(req,res){
    console.log("getNearby");
    res.append('Access-Control-Allow-Origin',"*");
    var arg = req.body;
    console.log(arg);
    // 中文拼进url记得转码
    var url = "https://restapi.ele.me/bgs/poi/search_poi_nearby?keyword="+encodeURI(arg.kw)+"&offset="+arg.ofs+"&limit="+arg.num+"&longitude="+arg.lng+"&latitude="+arg.lat;
    console.log(url);

    https.get(url,function(getres){
        var data = '';
        getres.setEncoding('utf8');
        getres.on("data",function(chunk){
            data += chunk;
        }).on("end",function(){
            console.log("end");
            res.send(data);
        })
//      .on("error",function(){
//          console.log("get error");                 
//      });
    });
         
}).post('/checkUser',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    var arg = req.body;
    console.log("user_tel:",arg);
    connection.query('SELECT count(*) from user where id='+arg.id,function(err,ress,field){
        if(err) throw err;
        var str = JSON.stringify(ress);
        var start = str.indexOf(":")*1+1;
        str = str.slice(start, -2);

        //没有 - 注册
        if(str==0){
            connection.query(`insert into user (id,name) values ("${arg.id}","eleme${arg.id}")`,function(err,inserres,field){
                if(err) throw err;
                console.log("regist success");
                res.send(JSON.stringify(inserres));
            });
        }
    });      
}).post('/readUser',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    var arg = req.body.id;
    console.log("user_id:",arg);
    connection.query('SELECT * from user where id='+arg,function(err,ress,field){
        if(err) throw err;
        res.send(JSON.stringify(ress));
    });      
});
// ===============================DYT end==================================


// ===============================LZH start================================
epx.get('/shopheader',function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var query = url_mode.parse(req.url).query;
    var data = querystring.parse(query);
    var shop_url = "https://restapi.ele.me/shopping/restaurant/"+data['id']+"?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=31.23037&longitude=121.473701";
    https.get(shop_url,function(response){
        var data = "";
        response.setEncoding('utf8');
        response.on('data',function(chunk){
            console.log('header接受数据');
            data += chunk;
        });
        response.on('end',function(){
            console.log("header数据接受完毕");
            res.send(data);
        })
    })

})
epx.get('/shop',function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var query = url_mode.parse(req.url).query;
    var data = querystring.parse(query);
    var shop_goods_url = "https://restapi.ele.me/shopping/v2/menu?restaurant_id="+data['id'];
    //id后拼接参数（商家id）
    https.get(shop_goods_url,function(response){
        var data = "";
        response.setEncoding('utf8');
        response.on("data",function(chunk){
            console.log("接受数据")
            data += chunk;
        }).on("end",function(){
            console.log("数据接受完毕")
            res.send(data);
        })
    })
});
// ===============================LZH end==================================
epx.listen(10086);
