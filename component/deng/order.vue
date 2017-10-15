/* DYT */

<template>
    <div class="order">
        <header>
            <a href="#/home" class="ico icon-arrow-left"></a>
            订单
        </header>
        <div class="error" v-if='!usertel'>
            <img src="https://fuss10.elemecdn.com/f/18/9fb04779371b5b162b41032baf5f3gif.gif" alt="" />
            <p class="noress">登录后查看外卖订单</p>
            <a href="#/login" class="tologin">立即登录</a>
        </div>
    </div>
</template>

<script>
    export default {
        computed:{
            usertel(){
                var state = this.getCookie('user');
                
                //已登录
                if(state!==0){
                    // this.getInfo(state);
                    return state;
                }
                return false;
            }
        },
        methods:{
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
            getInfo(state){
                var self = this;
                $.ajax({
                    url: 'http://localhost:10086/readUser',
                    type: 'POST',
                    data: {id: state}
                }).done((data)=>{
                    data = JSON.parse(data)[0];
                    console.log("getuser_success",data,typeof data);
                    self.name = data.name.replace(data.name.slice(1,-1),"***");

                    // 优惠信息
                    if(data.save!==null){
                        var savelist = data.save.split(';');
                        if(savelist[savelist.length-1]=='')
                            savelist.pop();
                        self.save = savelist.length;
                    }

                    self.coin = data.coin;    
                });
            }
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
/*==================================error==================================*/
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
</style>

    