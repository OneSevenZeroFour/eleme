//商品模块
<template>
	<div class="foodsWrap">
	<!-- <p style="font-size: 30px">{{foodList}}</p> -->
		<menuCate :stairs="foodModel"></menuCate>
		<div class="menu-container" @scroll="menuScroll">
			<div class="menu-list" >
				<dl v-for="(item,index) in foodModel" :key="item.item_id" :data-index="index" class="menu-stair">
					<dt>
						<div class="foodsCate"><strong class="cateName">{{item.name}}</strong></div>
					</dt>
					<foodsCell v-for="(food,idx) in item.foods" :cell="food" :data-cellindex="idx" :data-dlIndex="index" :dlidx="index" :clidx="idx"></foodsCell>
				</dl>			
			</div>
		</div>	
		<cart></cart>
	</div>
</template>

<script>
	import foodsCell from "./foods-cell.vue";
	import menuCate from "./menu-cate.vue";
	import cart from "./cart.vue";
	export default {
		props:["foodModel"],
		data(){
			return {
				foodList: []
			}
		},
		methods:{
			menuScroll(ev){
				this.$store.dispatch('letSetDetailPosition',ev.target.scrollTop);
			}
		},
		computed:{
			curStair(){
				var cur = 0;
				console.log($('.menu-stair'))
				for(var i = 0; i < this.foodModel.length; i++){
					if ($('.menu-list')[0].scrollTop >= $('.menu-stair').eq(i).offsetTop ) {
						console.log(i);
						cur = i;
					}				
				}
				return cur;
			}
		},
		components: {
			foodsCell,
			menuCate,
			cart
		}
	}
</script>

<style scoped>
	.foodsWrap{
		display: flex;
		height: 1252px;
	}
	.menu-container{
	    position: relative;
	    height: 100%;
    	width: 7.733333rem;
	    flex: 1;
	    overflow-y: auto;
	}
	.menu-list{
		height: 100%;
	    padding-left: .266667rem;
	}
	.menu-stair{

	}
	dt{
		box-sizing: border-box;
	    position: relative;
	    padding: .2rem .8rem .2rem 0;
	    border-bottom: 1px solid #eee;
	}
	.foodsCate{
		box-sizing: inherit;
	    display: flex;
	    -webkit-box-align: center;
	    align-items: center;
	    overflow: hidden;	
	}
	.cateName{
		box-sizing: inherit;
	    margin-right: .133333rem;
	    font-weight: 700;
	    font-size: .32rem;
	    color: #666;
		flex: none;
	}
	
</style>