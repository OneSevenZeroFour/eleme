<template>
    <div class='box'>
        <div class='search' v-setTop='[reTop,setShow,setHide]'>
            <a href='#/search'>
                <span class='iconfont'>&#xe6b1;</span>
                <span>搜索商家、商店名称</span>
            </a>
        </div>
        <div v-show='flag'></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                top:'',
                flag:false
            }
        },
        methods:{
            reTop(){
                return this.top;
            },
            setShow(){
                this.flag = true;
            },
            setHide(){
                this.flag = false;
            }
        },
        directives:{
            setTop:{
                bind(el,binding){
                    document.addEventListener('scroll',function(){
                        if(window.scrollY>=binding.value[0]()){
                            $(el).addClass('active');
                            binding.value[1]();
                        }else{
                            $(el).removeClass('active');
                            binding.value[2]();
                        }
                    });
                }
            }
        },
        mounted(){
            this.top = $('.search')[0].offsetTop;
        }
    }
    
</script>

<style scoped lang='scss'>
    .active{
        position:fixed;
        top:0;
        z-index:100;
    }
    .box{
        >div:last-child{
            width:100%;
            height:1.22222rem;
            padding-top:.18888rem;
        }
    }
    .search{
        width:100%;
        height:1.22222rem;
        padding-top:.18888rem;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        a{
            background:#fff;
            width:90%;
            margin:0 auto;
            height:1.066666rem;
            line-height:1.06666rem;
            display:block;
            text-align:center;
            font-weight:600;
            color:#666;
            font-size:.4rem;
            span:first-child{
                color:#999;
                font-size:.3722222rem;
            }
        }
    }
    
</style>