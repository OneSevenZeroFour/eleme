<template>
    <div class='box'>
        <div>
            <span class='iconfont' @click='back()'>&#xe61e;</span>
            <h4>发现</h4>
        </div>
        <div></div>
        <div>
            <div v-for='a in arr'>
                <div>
                    <p>{{a.head}}</p>
                    <p>{{a.text}}</p>
                </div>
                <img :src="a.img">
            </div>
        </div>
        <img src='https://fuss10.elemecdn.com/b/6d/656006edcd86033a1b32b23ddea37jpeg.jpeg?imageMogr/format/webp/'>
        <div>
            <div v-for='a in found'>
                <h4><span :class='a.icon' class='icon iconfont'></span>{{a.head}}</h4>
                <p>{{a.text}}</p>
                <div>
                    <div v-for='b in a.box'>
                        <img :src='b.img'>
                        <p>{{b.text}}</p>
                        <p><span v-if='!b.gift'>￥</span>{{b.price}}<span v-if='b.gift'>金币</span></p>
                    </div>
                </div>
                <a>查看更多</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                arr:[{
                    head:'金币商城',
                    text:'0元好物在这里',
                    img:'https://fuss10.elemecdn.com/8/38/9c9aea0e856149083d84af3444b78jpeg.jpeg?imageMogr/format/webp/'
                },{
                    head:'必吃爆料',
                    text:'最夯外卖指南',
                    img:'https://fuss10.elemecdn.com/2/36/b784087aff96a97f4e5183d0d784fjpeg.jpeg?imageMogr/format/webp/'
                },{
                    head:'推荐有奖',
                    text:'5元现金拿不停',
                    img:'https://fuss10.elemecdn.com/6/76/8d42eef97ff4c1c2b671085358541jpeg.jpeg?imageMogr/format/webp/'
                },{
                    head:'周边优惠',
                    text:'领取口碑好券',
                    img:'https://fuss10.elemecdn.com/5/10/2351e989d4171479ba0d7b5c06053jpeg.jpeg?imageMogr/format/webp/'
                }],
                found:[{
                    head:'美食热推',
                    icon:'icon-zan',
                    text:'你的口味，我都懂得',
                    box:[{
                        img:'https://fuss10.elemecdn.com/c/ce/e1c13cc680ee471cbff835930d9c4jpeg.jpeg?imageMogr/format/webp/',
                        text:'蒜香鸡腿卤肉饭',
                        price:28
                    },{
                        img:'https://fuss10.elemecdn.com/8/ec/fd3c35aa3b58698faee464398e0c1jpeg.jpeg?imageMogr/format/webp/',
                        text:'回忆的盒饭/1份',
                        price:30
                    },{
                        img:'https://fuss10.elemecdn.com/1/54/5ece2ef2604d2c63f8816fcb516bbjpeg.jpeg?imageMogr/format/webp/',
                        text:'福建肉骨茶套餐',
                        price:48
                    }]
                },{
                    head:'天天特价',
                    icon:'icon-biaoqian',
                    text:'特价商品，一网打尽',
                    box:[{
                        img:'https://fuss10.elemecdn.com/4/4a/e008f5993aa6b876c3804fe9e50c1jpeg.jpeg?imageMogr/format/webp/',
                        text:'荤食天地A套餐',
                        price:18.41
                    },{
                        img:'https://fuss10.elemecdn.com/1/f0/12cb45a52fab29e88634760d2800bjpeg.jpeg?imageMogr/format/webp/',
                        text:'招牌蜜汁烤肉拌饭+配菜+时蔬+蛋+饮料',
                        price:12.99
                    },{
                        img:'https://fuss10.elemecdn.com/b/17/3e5d0b0029efd8cc8ca4a776a2e35jpeg.jpeg?imageMogr/format/webp/',
                        text:'烧鸭盐鸡拼烧肉饭（特价回馈）',
                        price:18.8
                    }]
                },{
                    head:'限时好礼',
                    icon:'icon-icon-test',
                    text:'金币换豪礼',
                    box:[{
                        img:'https://fuss10.elemecdn.com/7/c5/f595b52bc6b50c9899398dccffd42jpeg.jpeg?imageMogr/format/webp/',
                        text:'food-name ui-ellipsis',
                        price:105,
                        gift:true
                    },{
                        img:'https://fuss10.elemecdn.com/0/53/47a80976e90c99f40b745cde5246fjpeg.jpeg?imageMogr/format/webp/',
                        text:'iPhone 7 32G',
                        price:15,
                        gift:true
                    },{
                        img:'https://fuss10.elemecdn.com/d/56/8b479231309654bfa07f28999768bjpeg.jpeg?imageMogr/format/webp/',
                        text:'阳澄湖大闸蟹礼盒',
                        price:9,
                        gift:true
                    }]
                }]
            }
        },
        methods:{
            back(){
                this.$store.state.back();
            }
        }
    }
</script>

<style scoped lang='scss'>
    .box{
        padding-bottom:1.42rem;
        background:#f4f4f4;
        >div:first-child{
            z-index:11;
            position:fixed;
            top:0;
            width:100%;
            height:1.2rem;
            background:#0085FF;
            h4{
                height:100%;
                line-height:1.2rem;
                font-size:.48rem;
                font-weight:600;
                text-align:center;
                color:#fff;
            }
            span{
                position:absolute;
                left:.266666rem;
                top:.28rem;
                color:#fff;
                font-size:.586666rem;
                font-weight:600;
            }
        }
        >div:nth-child(2){
            height:1.2rem;
        }
        >div:nth-child(3){
            background:#fff;
            position:relative;
            width:100%;
            overflow:hidden;
            border-bottom:.0266666rem solid #ddd;
            >div{
                box-sizing:border-box;
                padding:.3722222rem;
                width:50%;
                float:left;
                display:flex;
                div{
                    flex:1;
                    p:first-child{
                        color:#FF8C00;
                        font-size:.416666rem;
                    }
                    p:last-child{
                        margin-top:.106666rem;
                        color:#aaa;
                        font-size:.32rem;
                    }
                }
                img{
                    width:1.22222rem;
                    height:1.22222rem;
                }
            }
            &::before{
                content:'';
                height:100%;
                width:1px;
                z-index:10;
                background:#ddd;
                position:absolute;
                left:50%;
            }
            >div:nth-child(1),>div:nth-child(2){
                border-bottom:.026666rem solid #ddd;
            }
            >div:nth-child(2) p:first-child{
                color:#FF7256;
            }
            >div:nth-child(3) p:first-child{
                color:#0085FF;
            }
            >div:nth-child(4) p:first-child{
                color:#FF3030;
            }
        }
        >img{
            margin-top:.266666rem;
            height:2.4rem;
            width:100%;
            display:block;
        }
        >div:nth-child(5){
            >div{
                margin-top:.266666rem;
                background:#fff;
                h4{
                    padding-top:.426666rem;
                    font-size:32px;
                    text-align:center;
                    span{
                        font-size:36px;
                        color:#EE5C42;
                    }
                }
                >p{
                    text-align:center;
                    font-size:24px;
                    color:#999;
                    padding-bottom:.426666rem;
                }
                >div{
                    width:100%;
                    display:flex;
                    justify-content:space-around;
                    >div{
                        width:28%;
                        img{
                            margin:0 auto;
                            width:2.66666rem;
                            height:2.66666rem;
                            display:block;
                        }
                        P{
                            margin-top:.266666rem;
                        }
                        p:nth-child(2){
                            font-size:26px;
                            color:#333;
                            width:100%;
                            overflow:hidden;
                            white-space:nowrap;
                            text-overflow:ellipsis;
                        }
                        p:nth-child(3){
                            color:#EE5C42;
                            font-size:24px;
                        }
                    }
                    
                }
                >a{
                    color:#A8A8A8;
                    font-size:28px;
                    display:block;
                    text-align:center;
                    padding:.26666rem 0;
                }
            }
        }
    }
</style>