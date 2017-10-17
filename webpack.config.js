/* 
* @Author: Marte
* @Date:   2017-10-12 18:50:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-13 15:18:27
*/

var webpack = require('webpack');

module.exports = {
    devtool:'source-map',
    //入口起点 引引入index.js文件，一会经过处理并输出新的处理文件
    entry:'./index.js',
    //输出结束点
    output:{
        //输出后的文件名
        filename:'bundle.js',
        //输出之后的文件路径 必须是绝对路径
        path:__dirname + '/dist'
    },
    //配置加载器 加载器就是处理非js类型的文件，把它通通转化为js文件类型
    module:{
        loaders:[{
            test:/\.css$/,
            loader:'style-loader!css-loader'           
        },{
            test:/\.html$/,
            loader:'html-loader'
        },{
            test:/\.(jpg|png|gif|jpeg)$/,
            loader:'url-loader'
        },{
            test:/\.(ttf|woff|eot|svg)$/,
            loader:'file-loader'
        },{
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        },{
            //vue-template-compiler vue-loader ::node-sass
            test: /\.vue$/,
            loader: 'vue-loader'
        },{
            //babel-loader babel-core babel-preset-env
            test: /\.js$/,
            options: {
                presets: ['env']
            },
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
    //npm run server
    watch: true,
    devServer: {
        contentBase: "./dist",
        compress: true,
        port: 10002
    }
}