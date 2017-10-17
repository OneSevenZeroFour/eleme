<template>
    <div class='search'>
        <div>
            <div class='iconfont' @click='back()'>&#xe61e;</div>
            <div>
                <div class='iconfont'>&#xe6b1;</div>
                <input type='search' placeholder='请输入商品名称'>
            </div>
            <div @click='sousuo()'>搜索</div>
        </div>
        <div v-show='flag'>
            <p>热门搜索</p>
            <a v-for='a in hot' @click='toSearch(a.word)'>{{a.word}}</a>
        </div>
        <div v-for='a in res' class='box' v-show='!flag'>
            <img :src='a.restaurant.image_path'>
            <a :href="'/shop?id='+a.restaurant.id">
                <p class='first'>{{a.restaurant.name}}</p>
                <p>评分{{a.restaurant.rating}} 月售{{a.restaurant.recent_order_num}}<span v-if='a.restaurant.type' class='send'>蜂鸟专送</span></p>
                <p>￥{{a.restaurant.float_minimum_order_amount}}起送 | 配送费￥{{a.restaurant.float_delivery_fee}}<span class='dis'>{{a.restaurant.distance}} | {{a.restaurant.order_lead_time}}分钟</span></p>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                flag:true,
                hot:'',
                res:[]
            }
        },
        methods:{
            back(){
                this.$store.state.back();
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
            sousuo(){
                var text = document.querySelector('input').value;
                this.toSearch(text);
            },
            toSearch(val){
                var _this = this;
                $.ajax({
                    type:'get',
                    url:'http://localhost:10086/search',
                    data:{
                        data:val,
                        lat:_this.$store.state.lat,
                        lng:_this.$store.state.lng
                    },
                    success:function(data){
                        _this.flag = false;
                        var arr = ['0','1','2','3','4','5','6','7','8','9'];
                        for(var i=0;i<arr.length;i++){
                            if(JSON.parse(data)[arr[i]]){
                                var res = JSON.parse(data)[arr[i]].restaurant_with_foods;
                                break;
                            }
                        }
                        $(res).each(function(){
                            var head = 'http://fuss10.elemecdn.com/';
                            var foot = '?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/';
                            var img = _this.insert(this.restaurant.image_path,1,'/');
                            img = _this.insert(img,4,'/');
                            if(/(png)$/.test(img)){
                                img = img+'.png';
                            }else if(/(jpeg)$/.test(img)){
                                img = img+'.jpeg';
                            }
                            this.restaurant.image_path = head+img+foot;
                        });
                        _this.res = res;
                    }
                });
            }
        },
        mounted:function(){
            document.querySelector('input').focus();
            var _this = this;
            $.ajax({
                type:'get',
                url:'http://localhost:10086/hot',
                success:function(data){
                    _this.hot = JSON.parse(data);
                }
            });
        },
        beforeRouteLeave(to,from,next){
            this.$store.state.destroy();
            next(true);
        }
    }
</script>

<style scoped lang='scss'>
    .search{
        font-size:0.4266666rem;
        >div:first-child{
            overflow:hidden;
            height:.7466666rem;
            padding:.2122222rem;
            display:flex;
            justify-content:space-between;
            div:nth-child(1){
                font-size:.5866666rem;
                line-height:.7266666rem;
                height:100%;
                color:#999;
                font-weight:600;
            }
            div:nth-child(2){
                width:76%;
                display:flex;
                div{
                    width:.7466666rem;
                    text-align:center;
                    line-height:.76rem;
                    font-size:.32rem;
                    color:#999;
                    background:#f5f5f5;
                    display:inline;
                }
                input{
                    flex:1;
                    height:.7466666rem;
                    outline:none;
                    border:0 none;
                    background:#f5f5f5;
                    font-size:.32rem;
                }
            }
            div:nth-child(3){
                font-weight:600;
                height:100%;
                line-height:.746666rem;
                color:#666;
            }
        }
        >div:nth-child(2){
            margin-top:.266666rem;
            padding:0 .212222rem;
            p{ 
                margin-bottom:.266666rem;
                color:#666;
                font-weight:600;
            }
            a{
                display:inline-block;
                font-size:28px;
                height:.56rem;
                color:#666;
                padding:.16rem;
                background:#f5f5f5;
                border-radius:.08rem;
                margin:0 .266666rem .266666rem 0; 
            }
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
    }
</style>