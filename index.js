/* 
* @Author: Marte
* @Date:   2017-10-12 18:42:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-17 10:42:15
*/

//webpack入口文件
//框架
import Vue from 'vue';

//库 工具
import $ from 'jquery';
window.$ = $;

//插件
import VueRouter from 'vue-router';
import Vuex from 'vuex';

//必须要通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter);
Vue.use(Vuex);

//引入为注册的组件

import xsousuo from './component/sousuo.vue';
import xfooter from './component/footer.vue';
import xhome from './component/home.vue';
import xdiscover from './component/discover.vue';
import "./css/base.css";
import './font/iconfont.css';

//mdzz
Vue.component('xfooter',xfooter);


//配置路由
var router = new VueRouter({
    routes:[{
        path:'/home',
        component:xhome
    },{
        path:'/search',
        component:xsousuo
    },{
        path:'/discover',
        component:xdiscover
    }]
})

//配置状态管理
var store = new Vuex.Store({
    //保存数据状态
    state:{
        lat:23.13388,
        lng:113.32507,
        idx:0,
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
    mutations:{
        setIdx:function(state,data){
            state.idx = data;
        }
    }
})

//精制导弹
var app = new Vue({
    data:{

    },
    template:`
        <div>
            <router-view></router-view>
        </div>
    `,
    methods:{
        
    },
    router,
    store
}).$mount('#ele');