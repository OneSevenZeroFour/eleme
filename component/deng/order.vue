/* DYT */

<template>
    <div class="order">
        <header>
            <a @click='back()' class="ico icon-arrow-left"></a>
            订单
        </header>
        <div class="error" v-if='!usertel'>
            <img src="https://fuss10.elemecdn.com/f/18/9fb04779371b5b162b41032baf5f3gif.gif" alt="" />
            <p class="noress">登录后查看外卖订单</p>
            <a href="#/login" class="tologin">立即登录</a>
        </div>
        <ul class="list" v-if="usertel">
        	<li v-for="item in orders">
        		<div class="head">
        			<img :src="item.sellerimg" alt="" />
        			<div class="headinfo">
        				<div class="where">
        					<h5>
        						{{item.seller}}
        						<span class="ico icon-arrow-left"></span>
        					</h5>
        					<p>{{item.time}}</p>
        				</div>
        				<div class="state" :class="{'on':item.ok==0}">
        					{{item.ok==1?'订单已完成':'制作配送中'}}
        				</div>
        			</div>
        		</div>
        		<p class="content">
        			<a class="food" href="javascript:;">{{item.txt}}</a>
        			<span class="pay">￥{{item.pay}}</span>
        		</p>
        		<p class="bns">
        			<a class="tomoreone" href="javascript:;">再来一单</a>
        			<a class="tocomment" href="javascript:;">评价得10金币</a>
        		</p>
        	</li>
        </ul>
        <xfooter></xfooter>
    </div>
</template>

<script>
    export default {
    	data(){
    		return{
    			orders:[]
    		}
    	},
        computed:{
            usertel(){
                var state = this.getCookie('user');
                
                //已登录
                if(state!==0){
                    this.getList(state);
                    return state;
                }
                return false;
            }
        },
        methods:{
            back(){
                this.$store.state.back();
            },
            getCookie(name){
                var c = document.cookie;
                if(c.length === 0) //没有cookie
                    return 0;
                var c_arr = c.split('; ');
                for(var i=0;i<c_arr.length;i++){
                    var arr = c_arr[i].split('=');
                    if(arr[0] === name)
                        return arr[1];
                }
                return 0;
            },
            getList(state){
                var self = this;
                $.ajax({
                    url: 'http://localhost:10086/readOrder',
                    type: 'POST',
                    data: {id: state}
                }).done((data)=>{
                    data = JSON.parse(data);
                    console.log("getuser_success",data,typeof data);  					 
                    var day = new Date();
                    for(var i=0;i<data.length;i++){
						data[i].sum = data[i].sum.toFixed(2);
						data[i].pay = data[i].pay.toFixed(2);
						
                    	var time = Date.parse(day)-Date.parse(data[i].time);
                    	
                    	console.log(Date.parse(day),Date.parse(data[i].time));
                    	var hour = Math.floor(time/1000/60/60);
                    	var min = Math.floor(time/1000/60%60);

                    	if(hour>=24){
                    		var end = data[i].time.lastIndexOf(":");
                    		var str = data[i].time.slice(0,end);
                    		data[i].time = str.replace(/t/i," ");
                    	}else{
                    		data[i].time = `${hour}小时${min}分钟前`;
                    	}
                    }
                    self.orders = data;
                   
                });
            }
       		
        },
        beforeRouteEnter(to, from, next) {
            $('body').css('background', '#f5f5f5');
            next();
        },
        beforeRouteLeave(to,from,next){
            this.$store.state.destroy();
            $('body').css('background', 'none');
            next(true);
        }
    }
</script>

<style scoped>
    .order{
        background-color: #f5f5f5;
        width: 100%;
        height: 100%;
    }
/*=========================header==========================*/
    header{
        height: 1.173333rem;
        color: #fff;
        font-size: .48rem;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        text-align: center;
        line-height: 1.173333rem;
        position:relative;
        font-weight: 700;
    }
    header a{
        color:#fff;
        position: absolute;
        top: 0;
        left:.333333rem;
        font-weight: 400;
    }
/*=========================error===========================*/
    .error{
        margin-top: 2.666667rem;
        text-align: center;
    }
    .error img{
        display: block;
        margin:0 auto;
    }
    .error .noress{
        font-size: .453333rem;
        margin: .25rem 0;
        color: #6a6a6a;
        font-weight: 400;
    }
    .error .tologin{
        display:block;
        border: none;
        border-radius: .053333rem;
        background-color: #56d176;
        color: #fff;
        text-align: center;
        font-size: .38rem;
        padding: .266667rem;
        width: 2.7rem;
        margin:0 auto;
    }
/*==========================list==========================*/
	.list li{
		background: #FFF;
		margin-top: .2rem;
		padding: .3rem;
		padding-right:0;
	}
	.list .head{
		display: flex;
		height: 1.1rem;
	}
	.list .head img{
		width: .75rem;
	    height: .75rem;
	    display: block;
	    margin-right: .22rem;
	    border: 1px solid #eef;
	    border-radius: 3px;
	}
	.list .head .headinfo{
		flex:1;
		display: flex;
		padding-right: .3rem;
		border-bottom: 1px solid #ddd;
	}
	.where{
		flex:1.7;
		font-size: .254rem;
		color:#aaa;
	}
	.where h5{
		font-size: .4rem;
		color:#666;
		font-weight: 400;
	}
	.where .icon-arrow-left{
        transform:rotate(180deg);
        display: inline-block;
        font-size: .25rem; 
        color:#aaa;
    }
	.state{
		flex:1;
		font-size: .33rem;
		text-align: right;
		color:#555;
	}
	.headinfo>.on{
		color:#00AAFF;
	}
	.content{
		display: flex;
		border-bottom: 1px solid #ddd;
	}
	.content a{
		flex:1;
		padding:0 1.1rem;
		font-size: .35rem;
	    color: #999;
	    line-height: 3em;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.content span{
		width: 20%;
		font-size: .35rem;
		color:#111;
		line-height: 3em;
		font-weight: 600;
	}
	.bns{
		padding-right: .1rem;
		text-align: right;
		font-size: 0;
	}
	.bns a{
		display: inline-block;
	    font-size: .332rem;
	    padding: 0 .8em;
	    border-radius: .2em;
	    line-height: 2em;
	    margin-right: .5em;
	    margin-top: .8em;
	}
	.bns .tomoreone{
		color:#00AAFF;
		border:1px solid #00AAFF;
	}
	.bns .tocomment{
		color:#F20;
		border:1px solid #F20;
	}
</style>

    