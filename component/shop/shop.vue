//商店详情
<template>
    <div class="index-root"  v-bodyScroll>
	    <div class="shop-warp">
	    	<shopHeader :shopHeader="shopModel.shop"></shopHeader>
	    	<shopMain :foodModel="shopModel"></shopMain>
	    	<cart></cart>
	    </div>
    </div>
</template>


<script>
	import shopHeader from "./shop-header.vue";
	import shopMain from "./shop-main.vue";
	import cart from "./cart.vue";
	export default {
		data(){
			return {
				/*食物*/
				fds:[],
				/*商品信息*/
				shopModel: {
					shop:{},
					main:{
						foods:[]
					}
				}
			}
		},
		components: {
			shopHeader,
			shopMain,
			cart
		},
		computed:{
			fdswithQty(){
				// return this.shopModel.main.foods
				
			},
			/*获取菜单滚动距离*/
			bodyPos(){
				return this.$store.getters.getDetailTop
			}
		},
		methods:{
		},
		directives:{
			//shop容器滚动事件
			bodyScroll(el,bindings,vnode){
				el.scrollTop = vnode.context.bodyPos/10
			}
		},
		mounted(){
			console.log("run shop")
			var self = this;
			$.ajax({
				url: 'http://localhost:10086/shop',
				type: 'GET',
				dataType: 'json',
				data: {id: '156426709'},
			})
			.done(function(data) {
					console.log(data)
					self.shopModel.main.foods = data.slice(2)
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
			$.ajax({
				url: 'http://localhost:10086/shopheader',
				type: 'GET',
				dataType: 'json',
				data: {id: '156426709'},
			})
			.done(function(data) {
				self.shopModel.shop = data;
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
			
		}
	}
</script>

<style scoped>
	.index-root{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}
	.shop-warp{
		width: 100%;

		overflow-y: auto;
	}
</style>