/* DYT */

<template>
    <div class="userinfo">
        <header>
            <span id='back' v-backinfo='{a:setPsd,b:getSetPsd}' class="ico icon-arrow-left"></span>
         	账户信息
        </header>
        <div class="info" v-if="!setpsd">
        	<div class="img list">
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
        	<div v-topsd='setPsd' class="setpsd list">
        		<span>登录密码</span>
        		<p>修改<span class="ico icon-arrow-left"></span></p>
        	</div>
        	
        	<p v-exit class="exit">退出登录</p>
        </div>
        <div id="setpsd" v-if="setpsd">
        	<div class="txt_div">
        		<input v-psdinput :class="{'err':psderr}" v-regpsd="{a:setPsdError,b:surePsd}" maxlength="20" type="password" placeholder="新密码" />
        		<label for="" v-if='psderr' class="psdtips tips">密码长度为6-20位</label>
        		<input v-psdinput :class="{'err':sureerr}" v-surepsd="{a:surePsd,b:setPsdAg}" maxlength="20" type="password" placeholder="确认密码" />
        		<label for="" v-if='sureerr' class="suretips tips">两次输入不一致</label>
        	</div>
        	<p id='savepsd' v-savepsd="{a:getTel,b:setPsd}" :class="[{'save':save},{'notsave':!save}]">确认并保存</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                img:"http://localhost:10086/user_default.fw.png",
                usertel:false,
                name:"",
                setpsd:false,
                psderr:false,
                sureerr:false,
                psd:"",
                psdagain:"",
                save:false
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
                });
            },
            setPsd(bool){
            	this.setpsd = bool;
            },
            getSetPsd(){
                return this.setpsd;
            },
            setPsdError(bool){
            	if(bool===true)
            		this.psderr = true;
            	else{
            		this.psderr = false;
            		this.psd = bool;
            	}
            },
            surePsd(str){
            	var reg = /\S{6,20}/ig; 
            	if(this.psdagain===this.psd&&this.psd!==""&&this.psdagain!==""){
            		this.save = true;
            		this.sureerr = false;
            	}
            	else{
            		this.save = false;
            		if(this.psdagain!=="")
            			this.sureerr = true;
            	}            	

            },
            setPsdAg(str){
            	this.psdagain = str;
            },
            getTel(){
            	return {tel:this.usertel,psd:this.psd};
            }
        },
        directives:{
            topsd(el,bind){
            	$(el).on('click',function(){
            		bind.value(true);
            	});
            },
            backinfo(el,bind){
                //点击事件执行两次导致总返回me路由
                //多次触发
                //更正：先unbind再click  on()并没有解决这个问题
            	$(el).unbind('click').click(function(){
                    var bool = bind.value.b();
                    console.log(bool)
                    if(bool) bind.value.a(false);
                    else router.push("/me");
            	})
            },
            psdinput(el,bind){
            	$(el).on("focus",function(){
            		$(el).addClass("on");
            	}).on("blur",function(){
            		$(el).removeClass("on");
            	});
            },
            regpsd(el,bind){
            	$(el).on("blur",function(){
            		var reg = /\S{6,20}/ig;
            		var str = $(el).val();
            		if(!reg.test(str)&&str!==""){
            			bind.value.a(true);
            		}else bind.value.a(str);
            	}).on("keyup",function(){
            		var reg = /\S{6,20}/ig; 
            		var str = $(el).val();

            		if(reg.test(str)){
            			bind.value.b(str);
            			bind.value.a(str);
            		}
            		else {
            			bind.value.b("");
            			bind.value.a("");
            		}
            	}).on("keypress",function(){
            		var reg = /\S{6,20}/ig; 
            		var str = $(el).val();

            		if(reg.test(str)){
            			bind.value.b(str);
            			bind.value.a(str);
            		}
            		else {
            			bind.value.b("");
            			bind.value.a("");
            		}
            	});
            },
            surepsd(el,bind){
            	$(el).on("keyup",function(){
            		var reg = /\S{6,20}/ig; 
            		var str = $(el).val();
            		if(str!=="")
            			bind.value.a(str);
					//诡异的bug 为false时跑true的if
            		if(reg.test(str)){
            			bind.value.b(str);
            		}else bind.value.b("");
            			
            	}).on("keypress",function(){
            		var reg = /\S{6,20}/ig; 
            		var str = $(el).val();

            		if(str!=="")
            			bind.value.a(str);
            		if(reg.test(str)){
            			bind.value.b(str);
            		}else bind.value.b("");
            	});
            },
            savepsd(el,bind){
            	$(el).on("click",function(){
            		if(!$(el).hasClass("save"))	return false;
            		//保存
            		console.log("save psd now.");
            		var state = bind.value.a();
            		if(state.tel)
	            		$.ajax({ 
	            			url: 'http://localhost:10086/savePsd', 
	            			type: 'POST', 
	            			data: {id: state.tel,psd: state.psd}
	            		}).done((data)=>{ 
	            			console.log(data);
	            			bind.value.b(false);
	            		});
            	});
            },
            exit(el,bind){
            	$(el).on("click",function(e){
            		var dat = new Date();
            		dat.setDate(dat.getDate()-24);
            		document.cookie = 'user=false;path=/;expires='+dat;
            		router.push("/me");
            	})
            }
        },
        beforeRouteEnter(to, from, next) {
            $('body').css('background', '#f5f5f5');
            next();
        },
        beforeRouteLeave(to,from,next){
            $('body').css('background', 'none');
            next();
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
    header span{
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
        font-size: .426667rem;
        line-height: .453333rem;
        position:relative;    
        padding: .373333rem .266667rem;
        display: flex;
    }
    .list>span{
		font-size: .4rem;
		font-weight: 700;
		color:#222;
		display: inline-block;
		vertical-align: middle;
		width: 4em;
    }
    .list p{
    	flex:1;
    	font-size: .35rem;
    	color:#666;
    	font-weight: 400;
    	text-align: right;
    }
    .list p .icon-arrow-left{
    	/*tranform对inline元素无效*/
    	display: inline-block;
        transform: rotate(180deg);
    }
    
    .label{
    	font-size: .3rem;
    	color:#999;
    	line-height: 1em;
        border-bottom: 1px solid #ddd;
    	padding: .373333rem .266667rem;
    }
    .img{
    	border-bottom: 1px solid #ddd;
    }
    .img>span,.img p,.img p img,.img p span{
    	vertical-align: middle;
    }
    .img>span{
    	line-height: 1.2rem;
    }
    .img img{
    	display: inline-block;
    	width: 1.2rem;
    	height: 1.2rem;
    	border:1px solid #eee;
    	border-radius: 50%;
    }
    .setpsd>span{
    	font-weight: 400;
    	font-size: .38rem;
    }
    .shouji .icon-shouji,.setpsd p{
    	color:#2395FF;
    }
    .setpsd p .ico{
    	color:#666;
    }
    
    .exit{
    	padding: .373333rem .266667rem;
    	text-align: center;
    	color:#F20;
    	font-size: .4rem;
    	background: #FFF;
    	margin-top: .4rem;
    	font-weight: 700;
    }
/*==========================修改密码=====================*/
	#setpsd .txt_div{
		background: #fff;
		font-size: .35rem;
		border-bottom: 1px solid #ddd;
		padding: 1em;
		padding-bottom: 0;
	}
	#setpsd .txt_div input{
		display: block;
		margin-bottom:1em;
		background: #F2F2F2;
		border:1px solid #ccc;
		border-radius: 1px;
		width: 100%;
		padding: 0.5em;
		font-size: .35rem;
		line-height: 1.5em;
		box-sizing: border-box;
		outline: none;
	}
	#setpsd .txt_div input.on{
		border-color:#03F;
	}
	#setpsd .txt_div input.err{
		border-color:#f00;
	}
	#setpsd .txt_div label{
		color:#F00;
		position: relative;
		top: -1em;
		font-size: .32rem;
	}
	#setpsd #savepsd{
		border-radius: 0.1em;
		font-size: .4rem;
		font-weight: 700;
		color:#fff;
		text-align: center;
		line-height: 2.5em;
		margin:1em;
	}
	#setpsd .notsave{
		background: #ccc;
	}
	#setpsd .save{
		background: #0085FF;
	}
</style>
