/* 
* @Author: Marte
* @Date:   2017-10-12 16:29:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-15 13:39:30
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

/*-------------------by:lfp--------start--------------------------*/
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

console.log("server start")
/*-------------------by:lfp--------end--------------------------*/


app.use(express.static("./imgs"));

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
app.post('/getWeather',function(req,res){
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
        }).on("error",function(){
            console.log("get error");                 
        });
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
})

app.listen(10086);
// ===============================DYT end==================================

