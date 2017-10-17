<template>
	<section class="hd_tehui">
		<header>
			<a href="javascript:;">
				<img src="../img/hd_adv.PNG" alt="">
			</a>
		</header>
		<div class="hd_section">
			<figure>
				<figcaption>限量抢购</figcaption>
				<p>超值美味 9.9元 起</p>
				<div class="qg_state">
					<span>{{state}}</span><span>人</span><em>正在抢 &gt;</em>
				</div>
				<div class="qg_img">
					<img :src="imgqg" alt="">
				</div>
			</figure>
			<figure @click="changeroute">
				<figcaption>热卖套餐</figcaption>
				<p>销量最高,好评最多</p>
				<div class="hd_hot_top">
					<span>TOP 100 &gt;</span>
				</div>
				<div class="qg_img">
					<img :src="imgtop" alt="">
				</div>				
			</figure>
		</div>
		<footer class="hd_foot">
			<figure v-for="i in tejiadata">
				<figcaption>{{i.title}}</figcaption>
				<span>{{i.cont}}</span>
				<div>
					<img :src="i.imgurl" alt="">
				</div>					
			</figure>
		</footer>
	</section>
</template>
<script>
	export default {
		data(){
			return {
				imgqg:require("../img/qiang.PNG"),
				imgtop:require("../img/remai.PNG"),
				state:379,
				tejiadata:[
					{
						title:"天天特价",
						cont:"低至1折",
						imgurl:require("../img/tian.PNG")
					},{
						title:"乐享鲜果",
						cont:"鲜果乐享7折",
						imgurl:require("../img/lexiang.PNG")
					},{
						title:"品质优选",
						cont:"尖货来袭",
						imgurl:require("../img/pinzhi.PNG")
					}				
				]
			}
		},
		methods:{
			changeroute(){
				//跳转路由
				this.$router.push({path:"/remai"});
			}
		},
		mounted(){
		}
	}
</script>
<style lang="scss" scoped>
	.hd_tehui{
		width: 96%;
	    margin: 0 auto;	
	    header{
		    width: 100%;
		    height: 2.2rem;
		    padding-bottom: 0.2rem;	 
		    a{
			    display: block;
			    overflow: hidden;
			    width: 100%;
			    height: 100%;
			   img{
			   	width: 100%;
			   	height: 100%;
			   } 		    	
		    }   	
	    }
	    .hd_section{
		    display: -webkit-box;
		    display: -ms-flexbox;
		    display: flex;
		    width: 100%;
		    -webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		    justify-content: space-between;
		    height: 3.2rem;	    
		    figure{
			    width: 46%;
			    padding-left: 0.4rem;
				background: #f8f8f8;
			    position: relative;		    	
		    }
		    figure:nth-of-type(1){
		    	figcaption{
				    font-size: 32px;
				    font-weight: 600;
				    color: #f33;		    		
		    	}
		    	p{
				    font-size: 28px;
				    line-height: 48px;		    		
				    color: #888;
		    	}
		    	.qg_state{
				    font-size: 24px;
				    font-weight: 600;	
				    span{
				    	color: #f33;
				    }	    		
				    em{
				    	color: #666;
				    }
		    	}
		    	.qg_img{
				    width: 3rem;
				    height: 2.2rem;
				    position: absolute;
				    right: 0;
				    bottom: -0.4rem;	
				    img{
				    	width: 100%;
				    	height: 100%;
				    }	    		
		    	}
		    }
		    figure:nth-of-type(2){
		    	width: 45%;
		    	figcaption{
				    font-size: 32px;
				    font-weight: 600;
				    color: #333;		    		
		    	}	
		    	p{
				    font-size: 28px;
				    line-height: 48px;		    		
				    color: #888;
		    	}		    	
		    	.hd_hot_top{
		    		display: -webkit-box;
		    		display: -ms-flexbox;
		    		display: flex;
		    		span{
					    font-size: 24px;
					    font-weight: 600;
					    color: #af8260;		    			
		    		}
		    	}	
		    	.qg_img{
				    width: 3rem;
				    height: 2.2rem;
				    position: absolute;
				    right: 0;
				    bottom: -0.4rem;	
				    img{
				    	width: 100%;
				    	height: 100%;
				    }	    		
		    	}    	
		    }	
	    }	
	    .hd_foot{
			width: 100%;
		    margin-top: 0.2rem;	    	
		    display: -webkit-box;	    	
		    display: -ms-flexbox;	    	
		    display: flex;
		    -webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		    justify-content: space-between;
		    overflow: hidden;
			figure{
			    width: 33%;
			    -webkit-box-sizing: border-box;
			    box-sizing: border-box;
			    background: #f8f8f8;
			    display: -webkit-box;
			    display: -ms-flexbox;
			    display: flex;
			    -webkit-box-pack: justify;
			    -ms-flex-pack: justify;
			    justify-content: space-between;
			    -webkit-box-orient: vertical;
			    -webkit-box-direction: normal;
			    -ms-flex-flow: column wrap;
			    flex-flow: column wrap;
			    height: 4rem;
			    text-align: center;			
				figcaption{
				    font-size: 32px;
				    font-weight: 600;
				    color: #444;	
				    line-height: 1rem;				
				}
				span{
				    font-size: 24px;
				    color: #666;
				    border: 1px solid #d8d8d8;
				    width: 62%;
				    margin: 0 auto;				
				}
				div{
				    width: 3rem;
				    height: 2.2rem;	
				    img{
				    	width: 100%;
				    	height: 100%;
				    }				
				}
			}
			figure:nth-of-type(1) span{
				color: #f33;
			}			
	    }
	}
</style>