/* 
* @Author: Marte
* @Date:   2017-10-12 16:29:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-12 16:38:15
*/
var https = require("https");
const mysql = require("mysql");

//连接远程数据库(邓)
var connection = mysql.createConnection({
	host:"10.3.132.128",
	user:"eleme",
	password:"123123",
	database:"ele"
});
connection.connect();
//console.log(http);
//http.get(url,callback)
//mysql cheerio
https.get("https://restapi.ele.me/shopping/restaurants?latitude=31.23037&longitude=121.473701&offset=1&limit=20&extras[]=activities&terminal=h5",function(res){
    var data = "";
    res.setEncoding('utf8');
    res.on("data",function(chunk){
        data+=chunk
    })
    res.on("end",function(){
        console.log(data)
    })
})