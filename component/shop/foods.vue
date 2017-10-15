<template>
	<div class="foodsWrap">
		<menuCate :stairs="fruit"></menuCate>
		<div class="menu-list">
			<dl>
				<dt>
					<div class="foodsCate"><strong class="cateName">title</strong></div>
				</dt>
				<foodsCell></foodsCell>
				<foodsCell></foodsCell>
			</dl>			
		</div>
			</div>
</template>

<script>
	import foodsCell from "./foods-cell.vue";
	import menuCate from "./menu-cate.vue";
	export default {
		data(){
			return {
				fruit:["stair1","stari2","stair3"]
			}
		},
		components: {
			foodsCell,
			menuCate
		}
	}
</script>

<style scoped>
	.foodsWrap{
		display: flex;
	}
	.menu-list{
	    position: relative;
	    padding-left: .266667rem;
	    height: 100%;
        	width: 7.733333rem;
	    flex: 1;
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