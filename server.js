/* 
* @Author: Marte
* @Date:   2017-10-12 16:29:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-17 18:49:40
*/
var https = require("https");
const mysql = require("mysql");
var url_mode = require("url");
var express = require('express');
var body_parser = require('body-parser');
var querystring = require('querystring');
var md5 = require("md5");

var app = new express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended:true
    //false时，键值对中的值为String/Array形式
    //为true的时候，可为任何数据类型
}));
app.use(express.static("./imgs"));
app.use(express.static("./dist"));
//连接数据库
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
	database:"ele"
});
connection.connect();

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

//lyh
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
            response.send(data);
        })
    })
})


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
}).post('/savePsd',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    var arg = req.body;
    console.log("setpsd:",arg,md5(arg.psd));
    connection.query(`update user set psd="${md5(arg.psd)}" where id=${arg.id}`,function(err,ress,field){
        if(err) throw err;
        console.log("update user psd success.");
        res.send("success save new psd.");
    });      
}).post('/readOrder',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    var arg = req.body.id;
    console.log("get list of user ",arg);
    connection.query('SELECT * from userOrder where userid='+arg,function(err,ress,field){
        if(err) throw err;
        res.send(JSON.stringify(ress));
    });      
});
// ===============================DYT end==================================


// ===============================LZH start================================
app.get('/shopheader',function(req,res){
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
        }).on('error',function(){
            console.log("read error");
            res.send('error');
        });
    })

})
app.get('/shop',function(req,res){
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
        }).on("error",function(){
            console.log("read error");
            res.send('error');
        });
    })
});
app.post('/saveOrder', function(req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var arg = req.body.obj;
    console.log("order:", arg);
    connection.query(`insert into userOrder (sellerid,sellerimg,seller,userid,txt,ads,time,timeExp,sum,pay) 
    values ("${arg.sellerid}","${arg.sellerimg}","${arg.seller}","${arg.userid}"),"${arg.txt}","${arg.ads}","${arg.time}","${arg.timeExp}","${arg.pay}","${arg.pay}"`, function(err, inserres, field) {
        if(err) throw err;
        console.log("order success");
        res.send(JSON.stringify(inserres));
    });
});
// ===============================LZH end==================================
app.listen(10086);
