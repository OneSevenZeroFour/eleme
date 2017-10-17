/* 
* @Author: Marte
* @Date:   2017-10-12 18:50:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-13 16:42:43
*/

var webpack = require('webpack');
// const publicPath = "http://localhost:10001"; 用于配置引入图片时 寻找路径的问题
module.exports = {
    entry:'./index.js',
    output:{
        path:__dirname + '/dist',
        filename:'bundle.js',
        // publicPath
    },
    module:{
        loaders:[{
            test:/\.css$/,
            loader:'style-loader!css-loader'           
        },{
            test:/\.html$/,
            loader:'html-loader'
        },{
            test:/\.(jpg|png|gif|jpeg|PNG)$/,
            loader:'url-loader'
        },{
            test:/\.(ttf|woff|eot|svg)$/,
            loader:'file-loader'
        },{
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        },{
            test: /\.vue$/,
            loader: 'vue-loader'
        },{
            test: /\.js$/,
      
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        }]
    },
    //vue2.0加上这一句
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
    watch: true,
    devServer: { //npm run server
        contentBase: "./dist",
        inline: true,//实时刷新
        historyApiFallback: true, //不跳转        
        compress: true,
        port: 10001
    }
}