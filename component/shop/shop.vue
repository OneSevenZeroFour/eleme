//商店详情
<template>
    <div class="index-root"  v-bodyScroll>
	    <div class="shop-warp">
	    	<shopHeader :shopHeader="shopModel.shop"></shopHeader>
	    	<shopMain :foodModel="shopModel"></shopMain>

	    </div>
    </div>
</template>


<script>
	import shopHeader from "./shop-header.vue";
	import shopMain from "./shop-main.vue";

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
			var shopid = "";
			var start = location.href.lastIndexOf('\/')*1+1;
			shopid = location.href.slice(start);
			console.log(shopid)
			     
			var self = this;
			$.ajax({
				url: 'http://localhost:10086/shop',
				type: 'GET',
				dataType: 'json',
				data: {id: shopid},
			})
			.done(function(data) {
				console.log(data)
				var dataArr = data.slice(2)
				
				self.shopModel.main.foods = data.slice(2)

				let list = [];
				for(let i = 0; i < dataArr.length; i++){
					var arr = [];
					for(let j = 0; j < dataArr[i]["foods"].length; j++){
						var obj = {
							outeridx: i,
							inneridx: j,
							name: dataArr[i]["foods"][j]["name"],	
							item_id: dataArr[i]["foods"][j]["item_id"],
							price: dataArr[i]["foods"][j]["specfoods"][0]["price"],
							qty: 0
						};
						arr.push(obj);
					} 
					list.push(arr);
				}
				self.$store.dispatch("letSetDetailMsg",list);

				console.log(self.$store.getters.getDetailMsg)
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
				data: {id: shopid},
				//156426709
			})
			.done(function(data) {
				self.shopModel.shop = data;
				this.$store.dispatch("letSetShop",data);
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