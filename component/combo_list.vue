<template>
	<div class="remai_list">
		<header>
			<img :src="remaiImg" alt="">
		</header>
		<section>
			<nav>
				<span
				 	v-for="i in sortlist"
				   @click="interval(i.event_name)"
				    :class="{'nav_active':idx==i.event_name}">{{i.condition}}</span>
			</nav>
		</section>
		<div class="remai_content">
			<ul>
				<li v-for="i in databox">
					<div class="remai_content_img">
						<img :src="foods" alt="">
					</div>
					<content class="remai_content_contains">
						<h3>{{i.foods[0].name}}</h3>
						<p class="dianpu_details">
							<i><svg viewBox="0 0 24 24" id="hot" width="100%" height="100%"><path fill="none" fill-rule="evenodd" stroke="#BBB" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.887 21.05A7.985 7.985 0 0 0 20 14.713a8.076 8.076 0 0 0-.963-3.805c-.852-1.599-1.388-3.349-1.468-5.024-1.722 1.474-1.995 3.474-3.333 4.922.411-3.217-1.689-8.662-3.379-9.807.021 3.357-4.391 7.922-4.75 8.314A7.97 7.97 0 0 0 4 14.714a8 8 0 0 0 8 8"></path></svg></i>
							月售<span>{{i.foods[0].month_sales}}</span><i><svg viewBox="0 0 24 24" id="good" width="100%" height="100%"><g fill="none" fill-rule="evenodd" stroke="#BBB" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14.001 7.987V1C8.523 1 7 8 7 8v14h8.11a6.002 6.002 0 0 0 5.863-4.721l1.497-6.866a2 2 0 0 0-1.954-2.426h-6.516zM2 22.001h5V8H2v9.002"></path></g></svg></i>好评率<span>{{i.foods[0].satisfy_rate}}%</span>
						</p>
						<h4><i><svg viewBox="0 0 24 24" id="shop" width="100%" height="100%"><g fill="none" fill-rule="evenodd" stroke="#BBB" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 12v3.333A6.667 6.667 0 0 1 14.333 22H3v-4.999M15.918 9.222C16.202 10.798 17.665 12 19.432 12 21.402 12 23 10.507 23 8.667L21.81 2H2.19L1 8.667C1 10.507 2.597 12 4.567 12c1.768 0 3.231-1.202 3.514-2.778"></path><path d="M8.255 9.222C8.66 10.812 10.175 12 12 12c1.827 0 3.354-1.186 3.757-2.778"></path></g></svg></i>{{i.foods[0].restaurant_name}}</h4>
						<div>
							<p><span>{{i.foods[0].price}}</span><em>{{i.foods[0].discount_activity}}</em></p>
							<button>来一份</button>
						</div>
					</content>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				remaiImg:"./img/remai_logo.PNG",
				foods:"./img/remai.PNG",
				sortlist:[
					{
						condition:"全部",
						event_name:"remai",
					},{
						condition:"￥20以下",
						event_name:"remai20",
					},{
						condition:"￥20-￥30",
						event_name:"remai30",
					},{
						condition:"￥30-￥40",
						event_name:"remai40",
					},{
						condition:"￥40以上",
						event_name:"remaimax",
					},{
						condition:"蜂鸟专送",
						event_name:"hummingbird",
					},{
						condition:"品牌商家",
						event_name:"shops",
					},{
						condition:"距离最近",
						event_name:"recently",
					}
				],	
				databox:[],
				// 设置一个默认值 默认高亮；其他的点击时更改值 符合条件就高亮
				idx:"remai",				
				currentActive:""		
			}
		},
		methods:{
			quest(){
				var self = this;
				window.$.ajax({
					url:"http://localhost:10086/remai",
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
							result = JSON.parse(res.data)
							self.databox = result.query_list
							console.log(self.databox)
						}catch(e){
							console.log(e)
						}						
					}
				})
			},
			interval(key){
				this.idx = key;
				var self = this;
				console.log(key)
				//防止重复请求
				if(this.currentActive == key){
					return
				}
				//更新条件判断
				this.currentActive = key;
				console.log("return",key)
				window.$.ajax({
					url:"http://localhost:10086/"+key,
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
							console.log(result)
							if(key == "remai"){
								self.databox = result.query_list
								console.log("默认全部",self.databox)
							}else{
								self.databox = result
								console.log("否则条件筛选",self.databox)
							}
						}catch(e){
							console.log(e)
						}						
					}
				})				
			}
		},
		mounted(){
			this.quest()
		}
	}
</script>
<style lang="scss" scoped>
	.remai_list{
		width: 100%;
		header{
			img{
			    width: 100%;
			    height: auto;				
			}
		}
		section{
		    width: 100%;
		    height: 1.2rem;
		    background: #f8f8f8;
		    line-height: 1.2rem;
		    overflow: hidden;			
			nav{
			    width: 100%;
			    font-size: 24px;
			    overflow: hidden;
			    overflow-x: scroll;
			    overflow-y: hidden;
			    white-space: nowrap;
			    -webkit-overflow-scrolling: touch;				
				span{
				    font-size: 24px;
				    color: #333;
				    border: 1px solid #d8d8d8;
				    padding: 0.08rem 0.36rem;
				    border-radius: 0.8rem;
				    margin: 0 0.2rem;				
				}
				.nav_active{
    				background: #ebf5ff;
				    color: #2395ff;
				    border-color: #2395ff;
				    font-weight: bold;					
				}
			}
			nav::-webkit-scrollbar{
				width: 0;
				height: 0;
			}
		}
		.remai_content{
			ul{
				padding: 0 0.4rem;
				li{
				    width: 100%;
				    min-height: 2.8rem;
				    display: -webkit-box;
				    display: -ms-flexbox;
				    display: flex;
				    -ms-flex-pack: distribute;
				    justify-content: space-around;
				    padding: 0.2rem 0;					
					.remai_content_img{
						width: 30%;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.remai_content_contains{
						width: 70%;
					    box-sizing: border-box;
					    padding-left: 0.36rem;
					    border-bottom: 1px solid #d8d8d8;
					    margin-left: 0.16rem;					    						
						h3{
						    font-size: 30px;
						    color: #444;
						    line-height: 0.6rem;							
						}
						.dianpu_details{
						    font-size: 24px;
						    color: #999;
						    line-height: 0.6rem;
						    i{
								display: inline-block;
							    width: 0.32rem;
							    height: 0.32rem;
							    vertical-align: middle;
							    line-height: 0.32rem;						    	
						    }
						    span{
								color: #ff6000;
							    padding-right: 0.4rem;						    	
						    }							
						}
						h4{
						    font-size: 24px;
						    font-weight: normal;
						    color: #999;	
						    i{
								display: inline-block;
							    width: 0.32rem;
							    height: 0.32rem;
							    vertical-align: middle;
							    line-height: 0.32rem;						    	
						    }						    						
						}
						div{
						    font-size: 28px;
						    overflow: hidden;
						    padding-top: 0.2rem;
						    p{
							    line-height: 1rem;
							    height: 1rem;
							    float: left;	
							    span{
								    color: #ff6000;
								    font-weight: bold;
								    font-size: 36px;
								    vertical-align: middle;							    	
							    }	
							    span::before{
							    	content:"￥";
							    	font-size: 24px;
							    }
							    em{
									font-size: 24px;
								    background: #f8f8f8;
								    color: #888;
								    margin-left: 0.4rem;							    	
							    }				    	
						    }
						    button{
							    font-size: 28px;
							    font-weight: bold;
							    float: right;
							    color: #f94843;
							    padding: 0.16rem 0.4rem;
							    background: #fff;
							    border: 1px solid #f94843;
							    border-radius: 8px;						    	
						    }							
						}
					}
				}
			}
		}
	}
</style>