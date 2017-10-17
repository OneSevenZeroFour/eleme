/* DYT */

<template>
    <div class="psdlogindiv">
        <div class="txt">
            <input v-loginfocus type="telphone" placeholder="手机号/邮箱/用户名" />
        </div>
        <div class="txt loginpsd">
            <input v-loginfocus :type="isShow?'text':'password'" placeholder="密码" />
            <div @click='showFun' class="showpsd" :class="[{'show':isShow},{'hide':backAnit}]">
                {{showtxt}}
                <span :class="[{'transition':isShow},{'backtransiton':backAnit}]"></span>
            </div>
        </div>
        <p class="login_bn">登录</p>
    </div>
</template>

<script>
     export default{
        data(){
            return{
                showtxt:"···",
                isShow:false,
                backAnit:false
            }
        },
        methods:{
            showFun(){
                this.isShow = !this.isShow;
                this.backAnit = !this.isShow;
                this.showtxt = this.isShow?"abc":"...";
            }
        },
        directives:{
            loginfocus(el,bind){
                $(el).on("focus",function(e){
                    console.log("runnnn");
                    $(el).closest('div').addClass('on');
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
        height: 1.2rem;
        font-size: 0.35rem;
        box-sizing: border-box;
        margin:0 auto 1em;
        border:1px solid #ddd;
        border-radius: 8px;
        text-align: left;
        color:#999;
    }
    .psdlogindiv div.on{
        border-color: #2395ff;
    }
    input{
        font-size: 0.35rem;
        border:none;
        padding: 0;
        width: 100%;
        display:block;
        color:#333;
        outline: none;
    }

    .loginpsd{
        position:relative;
        padding-right: 5em;
    }
/*============================显示密码与否======================*/
    .showpsd{
        width: 3em;
        position:absolute;
        top: 1em;
        right: 1em;
        height: 1.2em;
        border-radius: 1em;
        text-align: right;
        background: #FFF;
        color:#999;
        border: 1px solid #ddd;
        box-sizing: border-box;
        padding: 0.1em 0.2em;
        line-height: 1em;
    }
    .showpsd span{
        position:absolute;
        left: 0;
        top: 0;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        background: #FFF;
        border:1px solid #ddd;
    }
    .hide{
        animation:fadehide 0.5s ease;
        animation-fill-mode:forwards;
    }
    .show{
        animation:fadeshow 0.5s ease;
        animation-fill-mode:forwards;
    }
    .transition{
        animation:swiper 0.5s ease;
        animation-fill-mode:forwards;
    }
    .backtransiton{
        animation:backswiper 0.5s ease;
        animation-fill-mode:forwards;
    }
    @keyframes swiper{
        from{
            left:0;
        }
        to{
            left:100%;
            transform:translateX(-100%);
        }
    }
    @keyframes backswiper{
        from{
            left:100%;
        }
        to{
            left:0;
            /*transform:translateX(100%);*/
        }
    }

    @keyframes fadeshow{
        from{
            text-align: right;
            background: #FFF;
            color:#999;
        }
        to{
            background: #36C;
            color:#FFF;
            text-align: left;
        }
    }@keyframes fadehide{
        from{
            background: #36C;
            color:#FFF;
            text-align: left;
        }
        to{
            text-align: right;
            background: #FFF;
            color:#999;
        }
    }
/*==========================登录按钮=======================*/
    .login_bn{
        width: 80%;
        height: 1.1rem;
        line-height: 1.1rem;
        background: #4cd96f;
        margin:2em auto 1em;
        color:#fff;
        font-size: 0.45rem;
        text-align: center;
        border-radius: 8px;
    }
</style>