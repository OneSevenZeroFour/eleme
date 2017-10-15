//右侧商品dl
<template>
	<dl class="menu">
		<dt></dt>
		<foodsCell></foodsCell>
		<foodsCell></foodsCell>
	</dl>
</template>

<script>
	import foodsCell from "./foods-cell.vue";
	export default {
		data(){
			return {}
		},
		components: {
			foodsCell
		}
	}
</script>

<style>
</style>