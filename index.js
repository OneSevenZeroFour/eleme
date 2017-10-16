/* 
* @Author: Marte
* @Date:   2017-10-12 18:42:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-16 17:24:40
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
import searchNearby from "./component/deng/setPosition.vue";
import deng_mine from "./component/deng/my.vue";
import deng_userorder from "./component/deng/order.vue";
import shop from "./component/shop/shop.vue";
//配置路由
const router = new VueRouter({
    routes: [{
            path:'/',
            redirect:'/home'
        },{
            path: '/home',
            component: deng_ww
        },{
            path: '/me',
            component: deng_mine
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
        },{
            path:"/searchNear",
            component:searchNearby
        },{
            path:"/userorder",
            component:deng_userorder
        },{
            path:"/shop/:id",
            component:shop
        }
    ]
});
window.router = router;
// =============================Vuex================================
var store = new Vuex.Store({
    state: {
        position: "获取位置中...",
        lat:0,
        lng:0,
        weather:'',
        detailTop: 0
    },
    mutations: {
        setAds(state, obj) {       
            state.position = obj;
        },
        setLat(state, obj) {       
            state.lat = obj;
        },
        setLng(state, obj) {       
            state.lng = obj;
        },
        setWeather(state, obj){
            state.weather = obj;
        },
        setDetailTop(state,obj){
            state.detailTop = obj;
        }
    },
    actions: {
        letSetPosition(context, obj) {
            context.commit("setAds", obj.ads);
            if(obj.lat)
                context.commit("setLat", obj.lat);
            if(obj.lng)
                context.commit("setLng", obj.lng);
        },
        letGetWeather(context, obj){
            context.commit("setWeather",obj);
        },
        letSetDetailPosition(context, obj){
            context.commit("setDetailTop", obj);
        }
    },
    getters: {
        getPosition(state) {
            return state.position;
        },
        getPoint(state){
            return {lat:state.lat,lng:state.lng};
        },
        getWeather(state){
            return state.weather;
        },
        getDetailTop(state){
            return state.detailTop;
        }

    }

});
new Vue({
    el: "#ele",
    data: {
        name: "eleme"
    },
    methods:{
        getPosition:function(){
            console.log('getPositiion');
            var self = this;
            var geo = new BMap.Geolocation();
            if(!geo){
                console.log("垃圾网络");
                return false;   
            }
            geo.getCurrentPosition(function(data){
                if(this.getStatus()==BMAP_STATUS_SUCCESS){
                    var mk = new BMap.Marker(data.point);
                    var lat = data.point.lat;
                    var lgt = data.point.lng;

                    var point_ = new BMap.Point(lgt,lat);
                    var geoc = new BMap.Geocoder();    
                    geoc.getLocation(point_, function(rs){
                        console.log(rs,rs.street);
                        var obj = {ads:rs.address,lat:rs.point.lat,lng:rs.point.lng};            
                        self.$store.dispatch("letSetPosition", obj);                              
                    }); 
                          
                }else{
                    console.log('failed'+this.getStatus());     
                    var obj = {ads:"未能获取地址"};
                    self.$store.dispatch("letSetPosition",obj);                    
                }
                 
            },{enableHighAccuracy:true});
        }
    },
    created(){
        // this.getPosition();
    },
    router,
    store
});