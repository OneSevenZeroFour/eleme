/* DYT */

<template>
    <div class="msglogin">
        <div class="txt login_tel">
            <input v-loginfocus type="telphone" placeholder="手机号" />
            <span>获取验证码</span>
        </div>
        <div class="txt">
            <input v-loginfocus type="password" placeholder="验证码" />
        </div>
        <p class="tips">{{tips}}<a href="#/protocol">《用户服务协议》</a></p>
    </div>
</template>

<script>
     export default{
        data(){
            return{
                tips:"温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意"
            }
        },
        directives:{
            loginfocus(el,bind){
                $(el).on("focus",function(e){
                    $(el).closest('div').addClass('on')
                }).on("blur",function(e){
                    $(el).closest('div').removeClass('on');
                });
            }
        }
     }
</script>

<style scoped>
    .txt{
        width: 80%;
        padding: 1em;
        height: 1rem;
        font-size: 0.3rem;
        box-sizing: border-box;
        margin:0 auto 1em;
        border:1px solid #ddd;
        border-radius: 8px;
        text-align: left;
        color:#999;
    }
    .msglogin div.on{
        border-color: #36F;
    }
    input{
        font-size: 0.3rem;
        border:none;
        padding: 0;
        width: 100%;
        display:block;
        color:#333;
        outline: none;
    }
    .login_tel{
        position:relative;
        padding-right: 7em;
    }
    .login_tel span{
        position:absolute;
        right: 1em;
        top: 1em;
    }
    .tips{
        font-size: 0.3rem;
        color:#999;
        line-height: 1.5em;
        width: 80%;
        margin: 0 auto;
        text-align: left;
    }
    .tips a{
        color:#37F;
    }
</style>