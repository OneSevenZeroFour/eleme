//商品详情主题
<template>
	<div class="shop-main">
		<div class="shop-tab-container">
			<div class="tab-item" :class="{'active':tabState[0]}" @click="changeTab(0)"><span>商品</span></div>
			<div class="tab-item" :class="{'active':tabState[1]}" @click="changeTab(1)"><span>评价</span></div>
			<div class="tab-item" :class="{'active':tabState[2]}" @click="changeTab(2)"><span>店铺</span></div>
		</div>
		<foods v-show="tabState[0]" :foodModel="foodModel.main.foods"></foods>
		<comments v-show="tabState[1]"></comments>
		<mall v-show="tabState[2]"></mall>
	</div>
</template>

<script>
	import foods from "./foods.vue";
	import comments from "./comments.vue";
	import mall from "./mall.vue";
	export default {
		props:["foodModel"],//该商店的商品信息
		data(){
			return {
				curTabIdx: 0,
				tabState: [true,false,false]
			}
		},
		methods: {
			showTab(idx){
				if(this.curTabIdx === idx){
					return true;
				}else{ 
					return false;
				}
			},
			changeTab(idx){
				this.curTabIdx = idx;
				this.tabState = [false,false,false];
				this.tabState[idx] = true;
			}
		},
		components: {
			foods,
			comments,
			mall
		}
	}
</script>

<style>
	.shop-main{
		height: 100%;
	}
	.shop-tab-container{
		display: flex;
		line-height: 1.066667rem;
		height: 1.066667rem;
		border: 1px solid #ddd;
		font-size: .373333rem;
		text-align: center;
	}
	.tab-item{
		flex: 1;
		height: 1.066667rem;
	}
	.tab-item span{
		display: block;
		width: 56px;
		color: #666;
		height: 1.066667rem;
		margin: 0 auto;
	}
	.tab-item.active span{
		color: #3199E8;
		border-bottom: 0.06rem solid #3199E8;
		height: 1.006667rem;
		font-weight: bold;
	}
</style>