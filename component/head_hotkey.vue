<template>
	<div class="hd_list">
		<div class="hd_hotkey">
			<a href="javascript:void(0);" v-for="i in databox">{{i.search_word}}</a>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				databox:[]
			}
		},
		mounted(){
			var	self = this;
			console.log(self.$store)
			window.$.ajax({
				url:"http://localhost:10086/hotkey",
				type:"GET",
				data:{
					lat:self.$store.state.lat,
					lng:self.$store.state.lng
				},				
				success:function(datas){
					var res = datas;
					var result;
					try{
						res = JSON.parse(datas)
					}catch(err){
						console.log(err)
					}
					try{
						result = JSON.parse(res.data)
						// result.forEach(function(item){
						self.databox = result
						console.log(self.databox)
						// })
					}catch(e){
						console.log(e)
					}
				}
			})
		}
	}
</script>
<style lang="scss" scoped>
	.hd_list{
		background-image: linear-gradient(90deg,#0af,#0085ff);
    	width: 100%;
		.hd_hotkey{
			width: 90%;
		    height: 1.2rem;
		    
		    display: -webkit-box;
		    display: -ms-flexbox;
		    display: flex;
		    -ms-flex-pack: distribute;
		    justify-content: space-between;
		    -webkit-box-align: center;
		    -ms-flex-align: center;
		    align-items: center;
		    overflow: hidden;
		    overflow-x: scroll;
		    white-space: nowrap;
		    -webkit-overflow-scrolling: touch;
		    margin: 0 auto;
		    a{
				font-size: 28px;
			    color: #fff;
			    display: block;
			    padding: 0 0.2rem;
		    }
		}
		.hd_hotkey::-webkit-scrollbar{
			width:0;
			height: 0;
		}
	}
</style>