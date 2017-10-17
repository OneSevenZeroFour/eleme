/* 
* @Author: Marte
* @Date:   2017-10-12 16:29:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-12 16:38:15
*/
const https = require("https");
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
    https.get("https://restapi.ele.me/shopping/v3/hot_search_words?latitude="+req.query.lat+"&longitude="+req.query.lng,function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })
});
//热卖套餐
app.get("/remai",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    console.log(req.query)
    https.get("https://restapi.ele.me/shopping/v1/sale_list_index?type=hot_sale_combo&latitude="+req.query.lat+"&longitude="+req.query.lng+"&params=%7B%22restaurant_category_ids%22%3A%22None%22%7D",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })   
});
//热卖套餐 价格区间 20以下
app.get("/remai20",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v1/sale_list_items?type=hot_sale_combo&latitude="+req.query.lat+"&longitude="+req.query.lng+"&params=%7B%22restaurant_category_ids%22%3A%22None%22%2C%22sift_factor%22%3A%225%22%7D&offset=0&limit=20",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })   
});
//热卖套餐 价格区间 20-30
app.get("/remai30",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v1/sale_list_items?type=hot_sale_combo&latitude="+req.query.lat+"&longitude="+req.query.lng+"&params=%7B%22restaurant_category_ids%22%3A%22None%22%2C%22sift_factor%22%3A%226%22%7D&offset=0&limit=20",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })   
});
//热卖套餐 价格区间 30-40
app.get("/remai40",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v1/sale_list_items?type=hot_sale_combo&latitude="+req.query.lat+"&longitude="+req.query.lng+"&params=%7B%22restaurant_category_ids%22%3A%22None%22%2C%22sift_factor%22%3A%227%22%7D&offset=0&limit=20",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })   
});
//热卖套餐 价格区间 40以上
app.get("/remaimax",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v1/sale_list_items?type=hot_sale_combo&latitude="+req.query.lat+"&longitude="+req.query.lng+"&params=%7B%22restaurant_category_ids%22%3A%22None%22%2C%22sift_factor%22%3A%228%22%7D&offset=0&limit=20",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })   
});
//热卖套餐 价格区间 蜂鸟专送 Hummingbird
app.get("/hummingbird",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v1/sale_list_items?type=hot_sale_combo&latitude="+req.query.lat+"&longitude="+req.query.lng+"&params=%7B%22restaurant_category_ids%22%3A%22None%22%2C%22sift_factor%22%3A%222%22%7D&offset=0&limit=20",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })   
});
//热卖套餐 价格区间 品牌商家 Shops
app.get("/shops",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v1/sale_list_items?type=hot_sale_combo&latitude="+req.query.lat+"&longitude="+req.query.lng+"&params=%7B%22restaurant_category_ids%22%3A%22None%22%2C%22sift_factor%22%3A%223%22%7D&offset=0&limit=20",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })   
});
//热卖套餐 价格区间 距离最近
app.get("/recently",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v1/sale_list_items?type=hot_sale_combo&latitude="+req.query.lat+"&longitude="+req.query.lng+"&params=%7B%22restaurant_category_ids%22%3A%22None%22%2C%22sift_factor%22%3A%224%22%7D&offset=0&limit=20",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })   
});
//首页->导航 -> 美食 
app.get("/navcate",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/restaurants?latitude="+req.query.lat+"&longitude="+req.query.lng+"&keyword=&offset=0&limit=20&extras[]=activities&restaurant_category_ids[]=209&restaurant_category_ids[]=211&restaurant_category_ids[]=212&restaurant_category_ids[]=213&restaurant_category_ids[]=214&restaurant_category_ids[]=215&restaurant_category_ids[]=216&restaurant_category_ids[]=217&restaurant_category_ids[]=218&restaurant_category_ids[]=219&restaurant_category_ids[]=221&restaurant_category_ids[]=222&restaurant_category_ids[]=223&restaurant_category_ids[]=224&restaurant_category_ids[]=225&restaurant_category_ids[]=226&restaurant_category_ids[]=227&restaurant_category_ids[]=228&restaurant_category_ids[]=229&restaurant_category_ids[]=230&restaurant_category_ids[]=231&restaurant_category_ids[]=232&restaurant_category_ids[]=234&restaurant_category_ids[]=235&restaurant_category_ids[]=236&restaurant_category_ids[]=237&restaurant_category_ids[]=238&restaurant_category_ids[]=263&restaurant_category_ids[]=264&restaurant_category_ids[]=265&restaurant_category_ids[]=266&restaurant_category_ids[]=267&restaurant_category_ids[]=268&restaurant_category_ids[]=269",function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })   
});
//首页->导航 -> 筛选导航
app.get("/navmenu",function(req,response){
    response.setHeader("Access-Control-Allow-Origin","*");
    https.get("https://restapi.ele.me/shopping/v2/restaurant/category?latitude="+req.query.lat+"&longitude="+req.query.lng,function(res){
        var data = "";
        res.setEncoding('utf8');
        res.on("data",function(chunk){
            data+=chunk
        })
        res.on("end",function(){
            console.log("请求成功")
            response.send(JSON.stringify({
                data
            }));
        })
    })   
});
app.listen(10086);
console.log("server start")