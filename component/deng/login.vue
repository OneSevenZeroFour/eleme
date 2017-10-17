/* DYT */

<template>
	<div class="login">
		<h2>
            <span class="ico icon-eliaomo"></span>
            {{eleme}}
            <p>{{brief}}</p>
        </h2>
		<div class="logintype">
			<span v-dtab='setShow' class="msga on">短信登录</span>
			<span v-dtab='setShow'>密码登录</span>
		</div>
		<dengmsg v-show="msg"></dengmsg>
		<dengpsd v-show="!msg"></dengpsd>
		<a href="#/about" class="about">关于我们</a>
	</div>
</template>

<script>
	import dengmsg from './msglogin.vue';
	import dengpsd from './psdlogin.vue';
	export default {
		data() {
			return {
				eleme: "饿了么",
				brief: "美好生活 触手可得",
				msg: true
			}
		},
		methods: {
			setShow(bool) {
				this.msg = bool;
			}
		},
		directives: {
			dtab(el, bind) {
				$(el).on('click', function(e) {
					$(el).addClass('on').siblings("*").removeClass('on');
					if($(el).hasClass("msga"))
						bind.value(true);
					else bind.value(false);
				})
			}
		},
		components: {
			dengmsg,
			dengpsd
		}
	}
</script>

<style scoped>
	.login {
		text-align: center;
	}
	
	h2 {
		font-size: 0.85rem;
		font-family: "幼圆";
		font-weight: 600;
		color: #2395ff;
		line-height: 1em;
		padding-top: 1rem;
		padding-bottom: 0.2rem;
	}
	
	h2 p {
		font-size: 0.4rem;
		font-weight: 400;
	}
	
	.logintype {
		display: block;
		padding: 0;
		margin-bottom: 0.2em;
	}
	
	.logintype span {
		font-size: 0.35rem;
		color: #333;
		margin: 0 4%;
		line-height: 2em;
		display: inline-block;
	}
	
	.logintype span:active,
	.logintype span.on {
		color: #2395ff;
		font-weight: 600;
		border-bottom: 2px solid #2395ff;
	}
	
	.about {
		font-size: 0.35rem;
		color: #666;
		line-height: 1em;
		display: block;
		width: 4em;
		height: 1em;
		margin: 0 auto;
	}
</style>