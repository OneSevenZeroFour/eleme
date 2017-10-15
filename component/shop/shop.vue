//商店详情
<template>
    <div class="index-root">
	    <div class="shop-warp">
	    	<shopHeader></shopHeader>
	    	<shopMain></shopMain>
	    </div>
    </div>
</template>


<script>
	import shopHeader from "./shop-header.vue";
	import shopMain from "./shop-main.vue";
	export default {
		components: {
			shopHeader,
			shopMain
		}
	}
</script>

<style scoped>
	.index-root{
		width: 100%;
		overflow-x: hidden;
	}
	.shop-warp{
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
</style>