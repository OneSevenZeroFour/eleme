/* DYT */

<template>
    <div class="userinfo">
        <header>
            <a href="#/home" class="ico icon-arrow-left"></a>
            我的
        </header>
        <div class="img list" v-nologinclick="getCookie" url='/setUserAds'>
            <span>头像</span>
            <p>
                <img :src="img" alt="" />
                <span class="ico icon-arrow-left"></span>
            </p>
        </div>

        <div class="name list">
            <span>用户名</span>
            <p>{{name}}<span class="ico icon-arrow-left"></span></p>
        </div>
        
        <p class="label">账号绑定</p>
        <div class="shouji list">
            <span><span class="ico icon-shouji"></span>手机</span>
            <p>{{userinfo.tel}}<span class="ico icon-arrow-left"></span></p>
        </div>

        <p class="label">安全设置</p>
        <div class="setpsd list">
            <span>登录密码</span>
            <p>修改<span class="ico icon-arrow-left"></span></p>
        </div>

        <p class="exit">退出登录</p>
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
        }
    }
</script>

<style scoped>
    .userinfo{
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

    