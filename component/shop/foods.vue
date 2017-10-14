<template>
	<div class="foodsWrap">
		<dl>
			<dt>title</dt>
			<foodsCell></foodsCell>
			<foodsCell></foodsCell>
		</dl>
	</div>
</template>

<script>
	import foodsCell from "./foods-cell.vue";
	export default {
		data(){
			return {
				
			}
		},
		components: {
			foodsCell
		}
	}
</script>

<style scoped>
	.foodsWrap{
	}
</style>