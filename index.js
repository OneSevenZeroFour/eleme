/* 
* @Author: Marte
* @Date:   2017-10-12 18:42:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-13 21:20:50
*/

//webpack入口文件

import Vue from "vue";
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);

import "./css/base.css";
import "./font/iconfont.css";

import $ from 'jquery';
window.$ = $;


// DYT 
import deng_ww from "./component/deng/deng_ele.vue";
import logindiv from "./component/deng/login.vue";
import msglogindiv from "./component/deng/msglogin.vue";
import psdlogindiv from "./component/deng/psdlogin.vue";

//配置路由
const router = new VueRouter({
    routes: [{
            path:'/',
            redirect:'/home'
        },{
            path: '/home',
            component: deng_ww
        },{
            path: '/my',
            component: deng_ww
        },{
            path: '/login',
            component: logindiv,
            children:[{
                path:'/login',
                redirect:'/login/msg'
            },{
                path:'msg',
                component:msglogindiv
            },{
                path:'psd',
                component:psdlogindiv
            }]
        }
    ]
})
// =============================Vuex================================
var store = new Vuex.Store({
    state: {
        position: "获取位置中...",
        lat:0,
        lng:0
    },
    mutations: {
        setPosition(state, obj) {       
            state.position = obj.ads;
            state.lat = obj.lat;
            state.lng = obj.lng;
        }
    },
    actions: {
        letSetPosition(context, obj) {
            context.commit("setPosition", obj)
        }
    },
    getters: {
        getPosition(state) {
            return state.position;
        },
        getPoint(state){
            return {lat:state.lat,lng:state.lng};
        }
    }

});
new Vue({
    el: "#ele",
    data: {
        name: "eleme"
    },
    router,
    store
});