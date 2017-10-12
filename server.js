/* 
* @Author: Marte
* @Date:   2017-10-12 16:29:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-12 16:38:15
*/
var https = require("https");
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