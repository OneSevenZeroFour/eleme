<template>
    <div :url="senddd" class='seller' v-scrolls='[addNum,loadMore,setFlag,reFlag]'>
        <h4>推荐商家</h4>
        <div v-for='a in restaurant' class='box'>
            <img :src='a.image_path'>
            <a :href="'/shop?id='+a.id">
                <p class='first'>{{a.name}}</p>
                <p>评分{{a.rating}} 月售{{a.recent_order_num}}<span v-if='a.type' class='send'>蜂鸟专送</span></p>
                <p>￥{{a.float_minimum_order_amount}}起送 | 配送费￥{{a.float_delivery_fee}}<span class='dis'>{{a.distance}} | {{a.order_lead_time}}分钟</span></p>
                <p><span class='new'>首</span> 新用户下单立减{{a.new}}元</p>
                <p><span class='down'>减</span> {{a.down}}</p>
            </a>
        </div>
        <div v-show='flag'>
            <img src='http://img4.imgtn.bdimg.com/it/u=2647176794,1543754535&fm=214&gp=0.jpg'>
            <span>正在加载</span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                restaurant:[],
                new:['17','18','19','20'],
                down:['满25减9，满50减18，满80减25','满25减14，满50减19，满80减26','满45减7','满30减15，满40减20，满70减35','满30减3','满58减8，满88减12，满128减18','满32减5，满52减20，满88减30'],
                num:0,
                flag:false
            }
        },
        computed:{
            
        },
        directives:{
            scrolls:{
                bind(el,binding){
                    document.addEventListener('scroll',function(){
                        if(window.scrollY+document.body.offsetHeight-el.offsetTop==el.offsetHeight&&!binding.value[3]()){
                            binding.value[0]();
                            binding.value[2]();
                            binding.value[1]('a');
                        }
                    });
                }
            }
        },
        methods:{
            reMsg(val){
                return this[val][parseInt(Math.random()*(this[val].length))];
            },
            addNum(){
                this.num += 20;
            },
            setFlag(){
                this.flag = true;
            },
            reFlag(){
                return this.flag;
            },
            insert(str,idx,s){
                var newstr="";
                for(var i=0;i<str.length;i++){
                    if(i==idx){
                        var a = str.slice(0,idx);
                        var b = str.slice(idx);
                        newstr = a+'/'+b;
                    }
                }
                return newstr;
            },
            loadMore(a){
                var _this = this;
                $.ajax({
                    type:'get',
                    url:'http://localhost:10086/list',
                    data:{
                        num:_this.num,
                        lat:_this.$store.state.lat,
                        lng:_this.$store.state.lng
                    },
                    success:function(data){
                        setTimeout(function(){
                            _this.flag = false;
                            var res = JSON.parse(data);
                            $(res).each(function(){
                                var head = 'http://fuss10.elemecdn.com/';
                                var foot = '?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/';
                                var img = _this.insert(this.image_path,1,'/');
                                img = _this.insert(img,4,'/');
                                if(/(png)$/.test(img)){
                                    img = img+'.png';
                                }else if(/(jpeg)$/.test(img)){
                                    img = img+'.jpeg';
                                }
                                this.image_path = head+img+foot;
                                this.new = _this.reMsg('new');
                                this.down = _this.reMsg('down');
                            });
                            _this.restaurant = _this.restaurant.concat(res);
                            console.log(_this.restaurant)
                        },1000);
                    }
                });
            }
        },
        mounted:function(){
            this.loadMore();
        }
    }
</script>

<style scoped lang='scss'>
    .seller{
        h4{
            padding-top:.522222rem;
            padding-left:.212222rem;
            font-size:.4266666rem;
            color:#333;
        }
        .box{
            padding:.522222rem .2122222rem;
            display:flex;
            border-bottom:.0266666px solid #f2f2f2;
            img{
                width:2.066666rem;
                height:2.066666rem;
            }
            >a{
                padding-left:.266666rem;
                flex:1;
                p:first-child{
                    font-size:.426666rem;
                    font-weight:600;
                    color:#333;
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                }
                p:nth-child(3){
                    border-bottom:.026666rem dotted #ccc;
                    padding-bottom:.12222rem;
                }
                p:not(.first){
                    margin-top:.2066666rem;
                    font-size:24px;
                    color:#8A8A8A;
                    span:not(.dis){
                        color:#fff;
                        border-radius:.0522222rem;
                        padding:0 .106666rem 0 .0522222rem;
                    }
                    .new{
                        background:#58bc58;
                    }
                    .down{
                        background:#F08080;
                    }
                    .send{
                        background:#0085FF;
                        float:right;
                    }
                    .dis{
                        float:right;
                        color:#aaa;
                    }
                }
            }
        }
        >div:last-child{
            font-size:.4266666rem;
            text-align:center;
            height:1.6rem;
            padding-bottom:1.42rem;
            line-height:1.6rem;
            color:#666;
            img{
                display:inline;
                width:140px;
                height:140px;
                vertical-align:middle;
            }
            span{
                position:relative;
                left:-22px;
                top:-4px;
            }
        }
    }
</style>