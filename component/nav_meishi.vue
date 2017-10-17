<template>
	<div class="nav_meishi">
		<header>
			<div>
				<span>
					<svg viewBox="0 0 20 32" id="arrow-left.6f6409e" width="100%" height="100%">
						<path fill="#fff" d="M16.552 5.633L14.508 3.59 2.243 15.853 14.508 28.41l2.044-2.043-10.22-10.513z"></path>
					</svg>
				</span>
			</div>
			<h1>美食</h1>
		</header>
		<nav>
			<a href="javascript:;" @click="show_shops()" :class="{'change_color':change_bg1}"><span>全部商家</span><em><svg :class="{'svg_active':change_bg1}" viewBox="0 0 72 32"><path d="M36 32l36-32h-72z"></path></svg></em></a>
			<a href="javascript:;" @click="show_sort()" :class="{'change_color':change_bg2}"><span>排序</span><em><svg :class="{'svg_active':change_bg2}" viewBox="0 0 72 32"><path d="M36 32l36-32h-72z"></path></svg></em></a>
			<a href="javascript:;" @click="show_filter()" :class="{'change_color':change_bg3}"><span>筛选</span><em><svg :class="{'svg_active':change_bg3}" viewBox="0 0 72 32"><path d="M36 32l36-32h-72z"></path></svg></em></a>
		</nav>
		<div class="submenu" v-show="flag1">
			<ul>
				<li v-for="(i,idx) in listdata">
					<a href="javascript:;" @click="change_list(idx)">{{i.name}}<span>{{i.count}}</span></a>
				</li>
			</ul>
			<ol v-for="(j,index) in listdetails" v-show="index == defaultIdx">
				<li v-for="s in j">
					<a href="javascript:;">{{s.name}}<span>{{s.count}}</span></a>
				</li>
			</ol>
		</div>
		<div class="subsort" v-show="flag2">
			<ul>
				<li v-for="list in sortdata"  @click="choice_this(list.maker)">
					<em><img :src="list.imgurl1" alt=""></em>
					<span :class="{'change_color':list.maker === active_val}">{{list.title}}</span>
					<i v-show="list.maker === active_val"><img :src="list.imgurl2" alt=""></i>
				</li>
				
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				listdata:[],
				listdetails:[],
				defaultIdx:1,
				flag1: false,
				flag2: false,
				flag3: false,
				change_bg1: false,
				change_bg2: false,
				change_bg3: false,
				active_val:"",
				sortdata:[
					{
						title:"综合排序",
						imgurl1:require("../img/nav/sort.png"),
						imgurl2:require("../img/nav/choice.png"),
						maker:0
					},{
						title:"销量最高",
						imgurl1:require("../img/nav/hot.png"),
						imgurl2:require("../img/nav/choice.png"),
						maker:1
					},{
						title:"起送价最低",
						imgurl1:require("../img/nav/price.png"),
						imgurl2:require("../img/nav/choice.png"),
						maker:2
					},{
						title:"配送最快",
						imgurl1:require("../img/nav/fast.png"),
						imgurl2:require("../img/nav/choice.png"),
						maker:3
					},
				],
			}
		},
		methods:{
			loading_nav(){
				var self = this;
				window.$.ajax({
					url:"http://localhost:10086/navmenu",
					type:"GET",
					data:{
						lat:self.$store.state.lat,
						lng:self.$store.state.lng
					},					
					success(datas){
						var res = datas;
						var result;
						try{
							res = JSON.parse(datas)
						}catch(err){
							console.log(err)
						}
						try{
							result = JSON.parse(res.data);
							self.listdata = result;
							result.forEach(function(item){
								if(item.sub_categories){
									self.listdetails.push(item.sub_categories)
									// console.log(item)
								}
							})
									console.log(self.listdetails)
							// console.log(result)
						}catch(e){
							console.log(e)
						}						
					}
				})				
			},
			change_list(idx){
				this.defaultIdx = idx - 1;
			},
			show_shops(){
				this.flag1 = !this.flag1;
				this.flag2 = false;
				this.flag3 = false;
				this.change_bg2 = false;
				this.change_bg1 = !this.change_bg1;
			},
			show_sort(){
				this.flag2 = !this.flag2;
				this.flag1 = false;
				this.flag3 = false;		
				this.change_bg1 = false;		
				this.change_bg2 = !this.change_bg2;
			},
			show_filter(){

			},
			choice_this(key){
				this.active_val = key
			}
		},
		mounted(){
			this.loading_nav();
		}
	}
</script>
<style lang="scss" scoped>
	.nav_meishi{
		header{
		    width: 100%;
		    height: 1.4rem;
		    line-height: 1.4rem;
		    background: #0085ff;
		    overflow: hidden;
		    div{
			    float: left;
			    padding-left: 0.4rem;
			    overflow: hidden;		    	
		    	span{
				    display: inline-block;
				    width: 0.4rem;
				    height: 100%;
		    	}
		    }
		    h1{
				font-size: 38px;
			    color: #fff;
			    overflow: hidden;
			    text-align: center;		    	
		    }
		}
		nav{
		    width: 100%;
		    height: 1.2rem;
		    line-height: 1.2rem;
		    background: #f8f8f8;
		    display: -webkit-box;
		    display: -ms-flexbox;
		    display: flex;
		    -ms-flex-pack: distribute;
		    justify-content: space-between;
		    a{
			    display: block;		    	
		    	width: 100%;
			    color: #666;
			    font-size: 28px;
    			text-align: center;
    			transition:0.5s linear;
		    	em{
				    display: inline-block;
				    width: 0.28rem;
				    padding-left: 0.1rem;	
				    transition:0.5s linear;	    		
		    		svg{
    					fill: #a8a8a8;
    					transition:0.5s linear;
		    		}
		    		.svg_active{
					    fill: #3190e8;
					    transition:0.5s linear;
					    -webkit-transform: rotate(180deg);
					    transform: rotate(180deg);		    			
		    		}
		    	}
		    }
		    .change_color{
		    	color: #3190e8;
		    }
		}
		.submenu{
		    display: -webkit-box;
		    display: -ms-flexbox;
		    display: flex;
		    width: 100%;	
		    height: 10rem;
		    overflow: hidden;		    		
			ul{
			    width: 40%;
			    padding-left: 0.288rem;
			    background: #fafafa;
			    overflow-x: hidden;
			    overflow-y: scroll;	
			    box-sizing: border-box;		    				
				li{
				    height: 1.2rem;
				    line-height: 1.2rem;					
					a{
					    font-size: 26px;
					    color: #666;
					    display: block;	
					    overflow: hidden;					
						span{
						    font-size: 22px;
						    background: #fff;
						    float: right;
						    margin-right: 0.3rem;
						    line-height: 0.4rem;
						    padding: 0 0.2rem;
						    margin-top: 0.4rem;
						    border-radius: 1rem;
						}
					}
				}
			}
			ul::-webkit-scrollbar{
				width: 0;
				height: 0;
			}
			ol{
			    width: 60%;
			    padding-left: 0.288rem;
			    background: #fff;
			    overflow-x: hidden;
			    overflow-y: scroll;	
			    box-sizing: border-box;		    				
				li{
				    height: 1.2rem;
				    line-height: 1.2rem;					
					a{
					    font-size: 26px;
					    color: #666;
					    display: block;	
					    overflow: hidden;					
						span{
						    font-size: 22px;
						    float: right;
						    margin-right: 0.3rem;
						    line-height: 0.4rem;
						    padding: 0 0.2rem;
						    margin-top: 0.4rem;
						    border-radius: 1rem;
						    border: 1px solid #888;
						}
					}
				}
			}	
			ol::-webkit-scrollbar{
					width: 0;
					height: 0;
			}
		}	
		.subsort{
			ul{
				padding: 0 0.4rem;
				li{
					border-bottom: 1px solid #d8d8d8;
					overflow: hidden;
					em{
					    display: inline-block;
					    width: 0.6rem;
					    padding-left: 0.1rem;
					    img{
					    	width: 100%;
					    	height: 100%;
					    }
					}
					span{
					    font-size: 26px;
					    color: #555;
					    vertical-align: middle;
					}
				    .change_color{
				    	color: #3190e8;
				    }					
					i{
					    display: inline-block;
					    width: 0.84rem;
					    float: right;
					    margin-top: 0.36rem;
					    img{
					    	width: 100%;
					    	height: 100%;
					    }
					}
				}
			}
		}
	}
</style>