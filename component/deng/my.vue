/* DYT */

<template>
    <div class="mine">
        <header>
            <a @click='back()' class="ico icon-arrow-left"></a>
            我的
        </header>
        <div class="tologin" v-nologinclick="getCookie" url='/setinfo'>
            <img :src="img" alt="" />
            <div class="txt">
                <p>{{name}}</p>
                <p class="logintips"><span class="ico icon-shouji"></span>{{userinfo.tel}}</p>
            </div>
            <span class="ico icon-arrow-left"></span>
        </div>
        <div class="saveDiv">
            <div class="save" v-nologinclick="getCookie" url='/checkSave'>
                <p>
                    <span v-if='!usertel' class="ico icon-benzi"></span>
                    <span class='info' v-if="usertel"><strong>{{save}}</strong>个</span>
                </p>
                <p>优惠</p>
            </div>
            <div class="coin" v-nologinclick="getCookie" url='/checkCoin'>
                <p>
                    <span v-if='!usertel' class="ico icon-qian"></span>
                    <span class='info' v-if="usertel"><strong>{{coin}}</strong>个</span>
                </p>
                <p>金币</p>
            </div>
        </div>

        <div class="ads list" v-nologinclick="getCookie" url='/setUserAds'>
            <span class='ico icon-dingwei'></span>
            <p>我的地址<span class="ico icon-arrow-left"></span></p>
        </div>

        <div class="score list">
            <span class='ico icon-02'></span>
            <p>积分商城<span class="ico icon-arrow-left"></span></p>
        </div>

        <div class="kefu list">
            <span class='ico icon-hua'></span>
            <p>我的客服<span class="ico icon-arrow-left"></span></p>
        </div>
        <div class="download list">
            <span class='ico icon-eliaomo'></span>
            <p>下载饿了么APP<span class="ico icon-arrow-left"></span></p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                img:"http://localhost:10086/user_default.fw.png",
                usertel:false,
                name:"登录/注册",
                save:0,
                coin:1
            }
        },
        computed:{
            userinfo(){
                var state = this.getCookie('user');
                var obj = {
                    tel:"登录后享受更多特权"
                }

                this.usertel = (state===0)?false:state;

                //已登录
                if(state!==0){
                    obj = {tel:state.replace(state.substring(3,7),"****")}
                    this.getInfo(state);
                }
                return obj;
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
        },
        directives:{
            nologinclick(el,bind){
                $(el).on('click',function(e){
                    var loginstate = bind.value('user');
                    if(loginstate===0){
                        console.log("你没有登录");
                        router.push("/login");
                    }else router.push($(el).attr('url'));
                });
            }
        },
        beforeRouteLeave(to,from,next){
            this.$store.state.destroy();
            next(true);
        }
    }
</script>

<style scoped>
    .mine{
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
/*=======================登录注册提示===================*/
    .tologin{
        background-image: linear-gradient(90deg,#0af,#0085ff);
        padding: .666667rem .4rem;
        color: #fff;
        height: 1.6rem;
    }
    .tologin>img{
        float:left;
        width: 1.6rem;
        height: 1.6rem;
        vertical-align: middle;
        display:block;
    }
    .tologin .txt{
        display:flex;
        height: 100%;
        flex-direction: column;
        float:left;
        margin-left: .48rem;
        color:#fff;
        justify-content: center;
    }
    .tologin .txt p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: .56rem;
        margin-bottom: .213333rem;
        font-weight: 700;
    }
    .tologin .txt .logintips{
        margin-bottom: 0;
        font-weight: normal;
        font-size: .32rem;
        line-height: 1em;
    }
    .tologin>.ico{
        transform: rotate(180deg);
        line-height: 1.6rem;
        font-size: .3rem;
        float:right;
    }
/*===========================优惠信息====================*/
    .saveDiv{
        height: 2.24rem;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
        display:flex;
        justify-content: center;
    }
    .saveDiv>div{
        flex:1;
        text-align: center;
        font-size: .32rem;
        line-height: .373333rem;
        color: #666;
        font-weight: 700;
        padding:0.5rem 0 ;
    }
    .saveDiv>div>p:last-child{
        margin-top: .133333rem;
    }
    .saveDiv .ico{
        display:inline-block;
        color:#fff;
        width: .693333rem;
        height: .693333rem;
        border-radius: 50%;
        text-align: center;
        line-height: .693333rem;
    }
    .saveDiv .save{
        border-right: 1px solid #ddd;
    }
    .saveDiv .save .ico{
        background: rgb(255, 95, 62);
    }
    .saveDiv .save .info{
        color:rgb(255, 95, 62);
    }
    .saveDiv .coin .ico{
        background: rgb(106, 194, 11);
    }
    .saveDiv .coin .info{
        color:rgb(106, 194, 11);
    }
    .saveDiv strong{
        font-size: .6rem;
    }
/*========================设置/入口=======================*/
    .list{
        background: #fff;
        color:#333;
        font-size: .426667rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        font-size: .426667rem;
        line-height: .453333rem;
        position:relative;    
        padding: .373333rem .266667rem .373333rem 1.1rem;
    }
    .list>.ico{
        position:absolute;
        font-size: .5rem;
        top: .373333rem;
        left: .35rem;
        display:block;
        width: .6rem;
        height: .6rem;
        background: transparent;
    }
    .list .icon-arrow-left{
        transform:rotate(180deg);
        float:right;
    }
    .ads,.score,.kefu{
        margin-top: .266667rem;
    }
    .ads>.ico{
        font-size: .6rem;
    }
    .ads>.ico,.kefu>.ico{
        color:rgb(74, 165, 240);
    }
    .score>.ico{
        color:rgb(106, 194, 11);
    }
    .list .icon-eliaomo{
        color:#fff;
        background: rgb(60, 171, 255);
        border-radius: 0.2em;
        font-size: 0.25rem;
        width: .35rem;
        height: .35rem;
        text-align: center;
        line-height: .35rem;
        margin-left: .08rem;
    }
    .download{
        border-top: none;
    }
</style>

    