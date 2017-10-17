/* 
* @Author: Marte
* @Date:   2017-10-12 18:42:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-17 17:22:10
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
import logindiv from "./component/deng/login.vue";
import searchNearby from "./component/deng/setPosition.vue";
import deng_mine from "./component/deng/my.vue";
import deng_userorder from "./component/deng/order.vue";
import deng_userinfo from "./component/deng/userinfo.vue";

import shop from "./component/shop/shop.vue";

//lfp
import home from "./component/home.vue";
import remaicombo from "./component/combo_list.vue";
import navmeishi from "./component/nav_meishi.vue";

//lyh
import xsousuo from './component/sousuo.vue';
import xfooter from './component/footer.vue';
import xdiscover from './component/discover.vue';
Vue.component('xfooter',xfooter);


//配置路由
const router = new VueRouter({
    routes: [{
            path:'/',
            redirect:'/home'
        },{
            path: '/home',
            component: home
        },{
            path:'/search',
            component:xsousuo
        },{
            path:'/discover',
            component:xdiscover
        },{
            path:"/remai",
            component:remaicombo
        },{
            path:"/meishi",
            component:navmeishi
        },{
            path: '/me',
            component: deng_mine
        },{
            path: '/login',
            component: logindiv
        },{
            path:"/searchNear",
            component:searchNearby
        },{
            path:"/userorder",
            component:deng_userorder
        },{
            path:"/userinfo",
            component:deng_userinfo
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
        detailTop: 0,
        detailMsg: [],
        cart: [],
        idx:0,
        shop: {},
        destroy:function(){
            document.cookie = 'rou='+app.$route.fullPath;
        },
        back:function(){
            var cookie = document.cookie.split('; ');
            var rou;
            cookie.forEach(function(item){
                var arr = item.split('=');
                if(arr[0]=='rou'){
                    rou = arr[1];
                }
            });
            if(rou){
                var url = location.href;
                location.href = url.replace(app.$route.fullPath,rou);
            }else{
                return;
            }
        }
    },
    mutations: {
        setShop(state, obj){
            state.shop = obj;
        },
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
        },
        setDetailMsg(state,obj){
            state.detailMsg = obj;
        },
        setDetailQty(state, obj){
            state.detailMsg[obj.oi][obj.ii]["qty"] += obj.qty;
        },
        setCart(state, obj){
            //当商品数量大于1时，加入购物车
            var clist = [];
            for(let i = 0; i <state.detailMsg.length; i++){
                for(let j = 0; j < state.detailMsg[i].length; j++){
                    if (state.detailMsg[i][j]["qty"]>0) {
                        clist.push(state.detailMsg[i][j]);
                    }
                }
            }
            state.cart = clist;
            console.log(state.cart);
        },
        //清空购物车
        clearCart(state,obj){
            state.cart = [];
            for(let i = 0; i <state.detailMsg.length; i++){
                for(let j = 0; j < state.detailMsg[i].length; j++){
                        state.detailMsg[i][j]["qty"] = 0;
                }
            }
        },
        setIdx:function(state,data){
            state.idx = data;
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
        },
        letSetDetailMsg(context,obj){
            context.commit("setDetailMsg",obj);
        },
        letSetDetailQty(context,obj){
            context.commit("setDetailQty",obj);
        },
        letSetCart(context, obj){
            context.commit("setCart",obj);
        },
        //清空购物车
        letClearCart(context, obj){
            context.commit("clearCart",obj);
        },
        letSetShop(context, obj){
            context.commit("setShop", obj);
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
        },
        getDetailMsg(state){
            return state.detailMsg;
        },
        getCart(state){
            return state.cart;
        },
        getShop(state){
            return state.shop;
        }

    }

});
var app = new Vue({
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
    template:`
        <div>
            <router-view></router-view>
        </div>
    `,
    created(){
        this.getPosition();
    },
    router,
    store
});