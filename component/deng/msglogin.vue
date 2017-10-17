/* DYT */

<template>
    <div class="msglogin">
        <div class="txt login_tel">
            <input maxlength="11" v-loginfocus v-inputtel="{a:regNum,b:regTel,c:getTel}" type="telphone" placeholder="手机号" />
            <span v-getvcode="{a:getvcode,b:clickGetCode}" :class="{'getTrue':showGet}">获取验证码{{timesecond}}</span>
        </div>
        <div class="txt">
            <input v-loginfocus v-inputvcode='getuservcode' type="text" placeholder="验证码" maxlength="8" />
        </div>
        <p class="tips">{{tips}}<a href="#/protocol">《用户服务协议》</a></p>
        <p @click="msgLogin" class="login_bn">登录</p>
        <transition name='fade'>
            <div id="notATel" v-if='showErr'>
                {{errortips}}
            </div>
        </transition>
    </div>
</template>

<script>
     export default{
        data(){
            return{
                tips:"温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意",
                tel:'',
                showGet:false,
                trueTel:false,
                errortips:'',
                showErr:false,
                getCode:false,
                countdown:-1,
                vcode:''
            }
        },
        computed:{
            timesecond(){
                if(this.countdown>=0)
                    return '('+this.countdown +')';
                else
                    return '';
            }
        },
        methods:{
            getTel(str){
                this.tel = str;
            },
            getuservcode(str){
                this.vcode = str;
            },
            regNum(bool){
                this.showGet = bool;
            },
            regTel(bool){
                this.trueTel = bool;
            },
            getvcode(){
                if(this.trueTel){
                    var self = this;
                    this.showErr = false;
                    // 发送验证码
                    var time = 30;
                    this.countdown = time;
                    var timer = setInterval(function(){
                        if(time<=0){
                            self.countdown = -1;
                            clearInterval(timer);
                            //发送完可以点击重发
                            self.showGet = true;
                        }
                        self.countdown = --time;
                    }, 1000);
                    // 发送验证码的时候不能再点
                    this.showGet = false;                    
                }else{
                    this.showErr = true;
                    this.errortips = '请检查手机号码格式是否有误';
                    var self = this;
                    setTimeout(function(){
                        self.showErr = false;
                    },5000);
                }
            },
            clickGetCode(){
                this.getCode = true;          
            },
            msgLogin(){
                if(this.tel==''){
                    this.showErr = true;
                    this.errortips = '请输入手机';
                }else{
                    if(!this.getCode){
                        this.showErr = true;
                        this.errortips = '请获取验证码';
                    }
                    else{
                        console.log(this.tel);
                        if(this.trueTel){
                            var self = this;
                            // 查询数据库有无
                            $.ajax({
                                url: 'http://localhost:10086/checkUser',
                                type: 'POST',
                                data: {id: self.tel},
                            }).done(function(data) {
                                console.log("success",data);
                            });

                            //验证码验证 code
                            if(this.vcode.toLowerCase()==='code1234'){
                                //登录成功
                                var str = `user=${this.tel};path=\/`;
                                document.cookie = str;
                                router.push('/home');
                            }else{
                                this.showErr = true;
                                this.errortips = '指定的验证码是 code1234';
                            }
                        }else{
                            this.showErr = true;
                            this.errortips = '请获取验证码';
                        }
                    }
                }
                var self = this;
                if(this.showErr == true)
                    setTimeout(function(){
                        self.showErr = false;
                    },4000)
            }
        },
        directives:{
            loginfocus(el,bind){
                $(el).on("focus",function(e){
                    $(el).closest('div').addClass('on')
                }).on("blur",function(e){
                    $(el).closest('div').removeClass('on');
                });
            },
            inputtel(el,bind){
                var regTel = /1[34578][\d]{9}/;
                var reg = /\d{11}/; 
                $(el).on("keyup",function(e){
                    var str = $(el).val();
                    bind.value.c(str);
                    if(str!==''){
                        if(reg.test(str)&&str.length==$(el).attr("maxlength")*1){
                            bind.value.a(true);
                            if(regTel.test(str)){
                                bind.value.b(true);
                            }else{
                                bind.value.b(false);
                            }
                        }else{
                            bind.value.a(false);
                        }
                    }
                    
                });
            },
            getvcode(el,bind){
                $(el).on('click',function(e){
                    bind.value.b();
                    if(!$(el).hasClass('getTrue')) return false;
                    bind.value.a();
                });
            },
            inputvcode(el,bind){
                $(el).on("keyup",function(e){
                    bind.value($(el).val());
                })
            }
        }
     }
</script>

<style scoped>
/*=============================输入框=====================*/
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
    .msglogin div.on{
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
    .getTrue{
        color:#2395ff;
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
        font-size: 0.35rem;
        color:#999;
        line-height: 1.5em;
        width: 80%;
        margin: 0 auto;
        text-align: left;
    }
    .tips a{
        color:#37F;
    }
/*====================手机号错误等错误提示==================*/
    #notATel{
        position:fixed;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        color:#fff;
        background: #666;
        line-height: 1.5em;
        font-size: 0.35rem;
        padding: 0.5em 1em;
        border-radius: 1.5em;
        text-align: left;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s
    }
    /*opacity 0->1->0*/
    
    .fade-enter-to,
    .fade-leave {
        opacity: 1;
    }
    
    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active in below version 2.1.8 */ 
    {
        opacity: 0;
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