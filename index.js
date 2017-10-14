/* 
* @Author: Marte
* @Date:   2017-10-12 18:42:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-13 10:43:46
*/

//webpack入口文件

import Vue from "vue";
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);
import "./css/base.css";
import $ from 'jquery';

//引入组件
import shop from "./component/shop/shop.vue";


//配置路由

var router = new VueRouter({
    routes: [{
    		path: '/',
    		redirect: '/home'
   		},{
            path: '/home',
            component: shop
        },
        {
            path: '/setting/:id',
            component: {
                template:`<div>setting</div>`
            } 
        }
    ]
})
 
new Vue({
    el: "#ele",
    data: {
        name: "eleme"
    },
    template:`
        <div id="ele">
            <router-view></router-view>
        </div>
    `,
    router
});