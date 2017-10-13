/* DYT */

<template>
    <div class="login">
        <h2>
            <span class="ico icon-eliaomo"></span>
            {{eleme}}
            <p>{{brief}}</p>
        </h2>
        <div class="logintype">
            <a v-dtab href="#/login/msg" class="on">短信登录</a>
            <a v-dtab href="#/login/psd">密码登录</a>
        </div>
        <router-view></router-view>
        <p v-login class="login_bn">登录</p>
        <a href="#/about" class="about">关于我们</a>
    </div>
</template>

<script>
     export default{
        data(){
            return{
                eleme:"饿了么",
                brief:"美好生活 触手可得",
            }
        },
        directives:{
            login(el,bind){
                $(el).on('click',function(e){
                    console.log('clickbn');
                })
            },
            dtab(el,bind){
                $(el).on('click',function(e){
                    $(el).addClass('on').siblings("*").removeClass('on');
                })
            }
        }
     }
</script>

<style scoped>
    .login{
        text-align: center;
    }
    h2{
        font-size: 0.8rem;
        font-family: "幼圆";
        font-weight: 600;
        color:#37F;
        line-height: 1em;
        padding-top:0.8rem;
    }
    h2 p{
        font-size: 0.4rem;
        font-weight: 400;
    }
    .logintype{
        display:block;
        padding: 0;
        margin-bottom: 0.2em;
    }
    .logintype a{
        font-size: 0.35rem;
        color:#333;
        margin:0 4%;
        line-height: 2em;
        display:inline-block;
    }
    .logintype a:active,.logintype a.on{
        color:#36F;
        font-weight: 600;
        border-bottom: 2px solid #33F;
    }

    .login_bn{
        width: 80%;
        height: 0.9rem;
        line-height: 0.9rem;
        background: #2d3;
        margin:2em auto 1em;
        color:#fff;
        font-size: 0.4rem;
        text-align: center;
        border-radius: 8px;
    }
    .about{
        font-size: 0.3rem;
        color:#666;
        line-height: 1em;
        display:block;
        width: 4em;
        height: 1em;
        margin: 0 auto;
    }
</style>