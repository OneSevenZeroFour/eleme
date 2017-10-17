var https = require("https");
//解析url的专用模块
// var url = require("url");
// var querystring = require("querystring");
// https.createServer((res, req) => {
//解析url数据
    // var query = url.parse(res.url).query;
    // var data = querystring.parse(query);
    // console.log(data.qu)
    https.get("https://restapi.ele.me/shopping/v2/entries?latitude=31.23037&longitude=121.473701&templates[]=main_template",function(res){
        var data = "";
        res.on("data",function(chunk){
            data+=chunk;
        })
        res.on("end",function(){
            console.log(data)
        })
    })
//不懂，但写了准没错
    // req.setHeader("Access-Control-Allow-Origin", "*");
    // req.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });
    
// }).listen(12345)
console.log('go')