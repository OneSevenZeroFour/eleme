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

window.$ = $;

import hotkey from "./component/head_hotkey.vue";
import hdmenu from "./component/head_slidemenu.vue";
import hdtehui from "./component/head_tehui.vue";
import remaicombo from "./component/combo_list.vue";
import navmeishi from "./component/nav_meishi.vue";
//配置路由
var router = new VueRouter({
    routes: [
    	{
    		path:"/",
    		redirect:"/home"
    	},{
            path: '/home',
            components: {
            	hotkey: hotkey,
            	hdmenu: hdmenu,
            	hdtehui: hdtehui,
            },
        },{
        	path:"/remai",
        	components:{
        		combo: remaicombo
        	}
        },{
        	path:"/meishi",
        	components:{
        		navmeishi: navmeishi
        	}
        }
    ]
})

var store = new Vuex.Store({
	state:{
		lat:23.13388,
		lng:113.32507
	}
});

new Vue({
    el: "#ele",
    data: {
        name: "eleme"
    },
    template:`
    	<div>
	    	<router-view name="hotkey"></router-view>
	    	<router-view name="hdmenu"></router-view>
	    	<router-view name="hdtehui"></router-view>
	    	<router-view name="combo"></router-view>
	    	<router-view name="navmeishi"></router-view>
    	</div>
    `,
    router,
    store
});