//商品详情头部
<template>
	<div class="shop-header">
		<nav class="shop-header-nav">
			<a href="javascript:void(0)" v-back>&lt</a>
		</nav>
		<div class="shop-header-main">
			<img :src="'https://fuss10.elemecdn.com/' + shopHeader.image_path.slice(0,1) + '\/' + shopHeader.image_path.slice(1,3) + '\/' + shopHeader.image_path.slice(3)+ '.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'" class="shop-header-logo"/>
			<div class="shop-header-content">
				<h2 class="shop-name">{{shopHeader.name}}</h2>
				<p class="shop-header-delivery">
					<span>{{(shopHeader["delivery_mode"])["text"]}}</span>/<span>{{shopHeader["order_lead_time"]}}分钟送达</span>/<span>配送费￥{{shopHeader["float_delivery_fee"]}}</span>
				</p>
				<div class="shop-header-notice">
					<span>公告：</span>
					<span>欢迎光临，用餐高峰期请提前下单，谢谢</span>
				</div>
			</div>
		</div>
		<div class="shop-header-activities">
			<span>新用户下单立减17元（不与其他活动同享）</span>
		</div>
	</div>
</template>

<script>
	export default {
		props:["shopHeader"],
		data(){
			return {}
		},
		directives: {
			back: {
				bind(el,bindings){
					el.onclick = function(){
						window.history.back();
					}
				}
			}
		}
	}
</script>

<style scoped>
	.shop-header{
		height: 283px;
		background: #372C3B;
		position: relative;
	}
	.shop-header-nav{
		height: 71px;
		padding: 8px 20px;
		box-sizing: border-box;
	}
	.shop-header-nav a{
		display: block;
		width: 50px;
		height: 50px;
		font-size: 40px;
		line-height: 50px;
		color: #fff;
	}
	.shop-header-main{
		padding: 20px 30px 0;
		display: flex;
		color: #fff;
		position: relative;
	}
	.shop-header-logo{
		width: 1.73rem;
		height: 1.73rem;
		border: 1px solid #fff;
		border-radius: .05333rem;
		margin: 0 .266667rem 0 0;
	}
	.shop-header-content{
		flex: 1;
		width: 7.2rem;
	}
	.shop-name{
		font-size: .466667rem;
		line-height: 1.2 em;
		font-weight: 700;
		white-space: nowrap;
	}
	.shop-header-delivery{
		white-space: nowrap;
		height: .666667rem;
		line-height: .666667rem;
		font-size: .29333333rem;
	}
	.shop-header-notice{
		white-space: nowrap;
		height: .5333333rem;
		line-height: .53333333rem;
		font-size: .29333333rem;
		overflow: hidden;
	}
	.shop-header-activities{
		position: absolute;
		bottom: .133333rem;
		left: .4rem;
		right: .4rem;
		white-space: nowrap; 
		height: .666667rem; 
		line-height: .8rem; 
		color: #fff;
		font-size: .29333333rem;
	}
</style>