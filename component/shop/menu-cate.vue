//左侧分类栏
<template>
	<ul class="menu-cate">
		<li class="cateItem" v-for="item in stairs">
			<span class="cateName">{{item.name}}</span>
		</li>
	</ul>
</template>

<script>
	export default {
		props: ['stairs'],
		computed:{
			
		}
	}
</script>

<style scoped>
	.menu-cate{
    		width: 2.266667rem;
		height: 100%;
	    overflow-y: auto;
  	 	background-color: #f8f8f8;
	}
	.cateItem{
	    position: relative;
	    padding: .466667rem .2rem;
	    border-bottom: 1px solid #e8e8e8;
	    font-size: .346667rem;
	    color: #666;
	}
	.cateItem.cateItemActive{
	    background-color: #fff;
	    border-right-color: #fff;
	    font-weight: bolder;
	}
	.cateName{
	}
</style>