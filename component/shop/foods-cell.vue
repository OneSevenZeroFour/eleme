//商品条目
<template>
	<dd class="foods-cell" :foods-item-id="cell.item_id">
		<div class="cellWrap">
			<span class="foodslogo">
				<img :src="'https://fuss10.elemecdn.com/' + cell.image_path.slice(0,1) + '\/' + cell.image_path.slice(1,3) + '\/' + cell.image_path.slice(3)+ '.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/'" alt="" />
			</span>
			<div class="foodsInfo">
				<p class="InfoName">{{cell.name}}</p>
				<p class="InfoSale">
					<span>月售{{cell.month_sales}}份</span>
					<span>好评率{{cell.satisfy_rate}}%</span>
				</p>
				<strong class="Info-price">{{cell.specfoods[0].price}}</strong>
				<div class="cartbutton">
					<div>
						<span class="cartbutton-entitybutton">
							<button class="cartbtn minusbtn" @click="btnClick"></button>
							<span class="cartQty">1</span>
							<button class="cartbtn plusbtn" @click="btnClick"></button>
						</span>
					</div>
				</div>
			</div>
		</div>
	</dd>
</template>

<script>
	export default {
		props:["cell"],
		data(){
			return {
				
			}
		},
		methods: {
			btnClick(ev){
				ev.preventDefault()
				console.log(55555)
			}
		}
	}
</script>

<style scoped>
	.foods-cell{
		border-bottom: 1px solid #eee;
		min-height: 3.0666667rem;
		margin: 0;
	}
	.cellWrap{
		padding: 20px 20px 20px 0;
		display: flex;
		
	}
	.foodslogo{
		width: 2.026667rem;
		height: 2.026667rem;
		position: relative;
		vertical-align: top;
		border: 1px solid #ddd;
		margin-right: .266667rem;
	}
	.foodslogo img{
		border-radius: .0533333rem;
		width: 100%;
	}
	.foodsInfo{
		flex: 1;
		position: relative;
		padding-bottom: .6666667rem;
	}
	.InfoName{
		color: #333;
		font-size: .4rem;
		font-weight: bold;
		line-height: 1.2;
		overflow: hidden;
		padding-right: .5333333rem;
	}
	.InfoSale{
		margin: .1733333rem 0 !important;
		color: #666;	
		font-size: .2933333rem;
		line-height: 1;
	}
	.Info-price{
	    font-weight: 700;
    	font-size: .426667rem;
	    line-height: .426667rem;
	    color: #f60;
	    padding-bottom: .093333rem;
	    position: absolute;
	    bottom: 0;
	}
	.Info-price::before{
		content: "￥";
	}
	.cartbutton{
		/*display: inline-block;*/
		/*height: 40px;*/
		line-height: 1.2;
	    position: absolute;
	    right: 0;
	    bottom: -.066667rem;
	    font-size: .346667rem;
	}
	.cartbutton-entitybutton{
		display: inline-block;
		    white-space: nowrap
	}
	.cartQty{
	    display: inline-block;
	    text-align: center;
	    color: #666;
	    vertical-align: top;
	    font-size: .373333rem;
	    min-width: .4rem;
	    max-width: 2em;
	    overflow: hidden;
	}
	.cartbtn{
		border: 0 none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		outline: none;
	}
	.minusbtn{
		background: url(../../imgs/minus.png);
		background-size: contain;
	}
	.plusbtn{
		background: url(../../imgs/plus.png);
		background-size: contain;
	}
</style>