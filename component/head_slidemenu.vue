<template>
	<section class="hd_menu">
		<div class="slide_submenu" v-touchslide>
			<aside>
				<a href="javascript:;" v-for="i in leftmenu">
					<div>
						<img :src="i.imgurl" alt="">
					</div>
					<span>{{i.title}}</span>
				</a>
			</aside>
			<aside>
				<a href="javascript:;" v-for="j in rightmenu">
					<div>
						<img :src="j.imgurl" alt="">
					</div>
					<span>{{j.title}}</span>
				</a>				
			</aside>
		</div>
		<div class="hd_menu_point">
			<span></span>
			<span></span>
		</div>
	</section>
</template>
<script>
//img.src = require("./img/1.jpg"); 
	export default {
		data(){
			return {
				leftmenu:[
					{
						title:"美食",
						imgurl:require("../img/meishi.PNG"),
						targeturl:""
					},{
						title:"甜品饮品",
						imgurl:require("../img/yinpin.PNG"),
						targeturl:""
					},{
						title:"商超便利",
						imgurl:require("../img/chaoshi.PNG"),
						targeturl:""
					},{
						title:"预订早餐",
						imgurl:require("../img/zaocan.PNG"),
						targeturl:""
					},{
						title:"果蔬生鲜",
						imgurl:require("../img/guosu.PNG"),
						targeturl:""
					},{
						title:"新店特惠",
						imgurl:require("../img/xindian.PNG"),
						targeturl:""
					},{
						title:"大牌必吃",
						imgurl:require("../img/dapai.PNG"),
						targeturl:""
					},{
						title:"晚餐",
						imgurl:require("../img/wancan.PNG"),
						targeturl:""
					}
				],
				rightmenu:[
					{
						title:"浪漫鲜花",
						imgurl:require("../img/hua.PNG"),
						targeturl:""
					},{
						title:"医药健康",
						imgurl:require("../img/yiyao.PNG"),
						targeturl:""
					},{
						title:"汉堡薯条",
						imgurl:require("../img/hanbao.PNG"),
						targeturl:""
					},{
						title:"包子粥店",
						imgurl:require("../img/baozi.PNG"),
						targeturl:""
					},{
						title:"地方菜系",
						imgurl:require("../img/difang.PNG"),
						targeturl:""
					},{
						title:"披萨意面",
						imgurl:require("../img/pisa.PNG"),
						targeturl:""
					},{
						title:"麻辣烫",
						imgurl:require("../img/malatan.PNG"),
						targeturl:""
					}
				],
			}
		},
		methods:{
			changecss(){

			}
		},
		directives:{
			touchslide:{
				bind(el,binding){
					var startX,
						moveX,
						result,
						sons = el.children,
						self = window.$(el);
						 
					el.addEventListener("touchstart",function(e){
						startX = e.touches[0].pageX;
					});
					el.addEventListener("touchmove",function(eve){
						moveX = eve.touches[0].pageX;
						result = startX - moveX;
						if(result > 50){
							sons[0].className = "";
							sons[1].className = "";
							sons[0].classList.add("dead");
							sons[1].classList.add("isactive");
							self.next().children().removeClass();
							self.next().children().eq(0).addClass("bg1");
							self.next().children().eq(1).addClass("bg2");
						}else if(result < -50){
							sons[0].className = "";
							sons[1].className = "";
							sons[1].classList.add("dead");
							sons[0].classList.add("isactive");
							self.next().children().removeClass();
							self.next().children().eq(0).addClass("bg2");
							self.next().children().eq(1).addClass("bg1");
						}
						//从左往右是负的 从右往左是正的
					})					
				}
			}
		},		
		mounted(){
			var	self = this;
			// window.$.ajax({
			// 	url:"http://localhost:10086/hotkey",
			// 	type:"GET",
			// 	success:function(datas){
			// 		var res = datas;
			// 		var result;
			// 		try{
			// 			res = JSON.parse(datas)
			// 		}catch(err){
			// 			console.log(err)
			// 		}
			// 		try{
			// 			result = JSON.parse(res.data)
			// 			// result.forEach(function(item){
			// 			self.databox = result
			// 			console.log(self.databox)
			// 			// })
			// 		}catch(e){
			// 			console.log(e)
			// 		}
			// 	}
			// })
		}
	}
</script>
<style lang="scss" scoped>
	.hd_menu{
		.slide_submenu{
			font-size: 14px;
		    overflow: hidden;
		    height: 2.6rem;
		    background-color: #fff;
		    text-align: center;
		    position:relative;
		    aside.isactive{
			    display: -webkit-box!important;
			    display: -ms-flexbox!important;
			    display: flex!important;
			    -webkit-transform: none!important;
			    transform: none!important;	
			    transition:3s 1s linear;	    	
		    }
		    aside.dead{
				transform: translateX(100%)!important;
				display: none!important;
				transition:3s 1s linear;		    	
		    }
			aside{
		    display: flex;
		    width: 100%;
		    height: 100%;
		    flex-flow: row wrap;
		    position: absolute;	
		    background: #fff;
		    transition:3s 1s linear;		
				a{
					color: #333;
					margin: 0 0.2rem;
    				display: block;
    				div{
					    width: 0.8rem;
					    height: 0.8rem; 
					    img{
						    display: block;
						    width: 100%;
						    height: 100%;					    	
					    }   					
    				}
				}
			}
			aside:nth-of-type(2){
				transform: translateX(100%);
				display: none;
			}
		}
	}
	.hd_menu_point{
	    width: 98%;
	    height: 0.3rem;
	    text-align: center;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    align-items: center;
	    border-bottom: 1px solid #e8e8e8;
	    margin: 0 auto;	
	    span{
		    display: inline-block;
		    width: 6px;
		    height: 6px;
		    background: #666;
		    border-radius: 100%;
	    }
	    span:nth-of-type(1){
	    	background:#3CB371;
		    margin-right: 0.1rem;		    	
	    }	
	    span.bg1{
			transition:all 0.3s linear;			
	    	background:#666;
	    }
	    span.bg2{
			transition:all 0.3s linear;
	    	background:#3CB371;
	    }	    	
	}
</style>