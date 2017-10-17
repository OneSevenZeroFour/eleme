<template>
    <div class='foot'>
        <a v-for='a in arr' :class="{'active':idx==a.id}" :href='a.url'>
            <p :class='a.icon' class='icon iconfont'></p>
            <p>{{a.text}}</p>
        </a>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                idx:'',
                arr:[{
                    text:'外卖',
                    icon:"icon-eliaomo",
                    url:'#/home',
                    id:0
                },{
                    text:'发现',
                    icon:'icon-faxian',
                    url:'#/discover',
                    id:1
                },{
                    text:'订单',
                    icon:'icon-dingdan',
                    url:'#/userorder',
                    id:2
                },{
                    text:'我的',
                    icon:"icon-icon2201",
                    url:'#/me',
                    id:3
                }]
            }
        },
        methods:{

        },
        mounted(){
            switch(this.$route.path){
                case '/home':
                    this.$store.commit('setIdx',0);
                    this.idx = this.$store.state.idx;
                    break;
                case '/discover':
                    this.$store.commit('setIdx',1);
                    this.idx = this.$store.state.idx;
                    break;
                case '/userorder':
                    this.$store.commit('setIdx',2);
                    this.idx = this.$store.state.idx;
                    break;
                case '/me':
                    this.$store.commit('setIdx',3);
                    this.idx = this.$store.state.idx;
                    break;
            }
        }
    }
</script>

<style scoped lang='scss'>
    .foot{
        border-top:.08rem solid #f0f0f0;
        width:100%;
        background:#fff;
        position:fixed;
        bottom:0;
        height:1.42rem;
        display:flex;
        >a{
            color:#999;
            display:flex;
            flex-direction:column;
            justify-content:center;
            font-weight:600;
            text-align:center;
            height:100%;
            flex:1;
            p:first-child{
                font-size:.522222rem;
            }
            p:last-child{
                font-size:.32rem;
            }
        }
        .active{
            color:#0085FF;
        }
    }
</style>