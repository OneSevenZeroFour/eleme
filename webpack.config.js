/* 
* @Author: Marte
* @Date:   2017-10-12 18:50:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-17 17:42:14
*/

var webpack = require('webpack');

module.exports = {
    entry:'./index.js',
    output:{
        path:__dirname + '/dist',
        filename:'bundle.js'
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
    devServer: {
        contentBase: "./dist",
        compress: true,
        port: 10001
    }
}