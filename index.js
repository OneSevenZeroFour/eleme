/* 
* @Author: Marte
* @Date:   2017-10-12 18:42:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-13 10:11:58
*/

//webpack入口文件

import Vue from "vue";
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);
import "./css/base.css";
import $ from 'jquery';

//配置路由
// var router = new VueRouter({
//     routes: [{
//             path: '/home',
//             component: xhome
//         },
//         {
//             path: '/setting',
//             component: xfooter
//         }
//     ]
// })
// 
new Vue({
    el: "#ele",
    data: {
        name: "eleme"
    },
    // router
});