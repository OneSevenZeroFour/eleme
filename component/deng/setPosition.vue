/* DYT */

<template>
    <div class="searby_div">
        <header>
            <a href="#/home" class="ico icon-arrow-left"></a>
            选择收货地址
            <a class="add" href="#">新增地址</a>
        </header>
        <div class="search_box">
            <div id="search">
                <span class="ico icon-sousuo"></span>
                <input v-getkw="getNearbyFun" type="text" placeholder='请输入地址' />
            </div>
        </div>
        <div v-if='!list' class="default">
            <h4>当前地址</h4>
            <p>
                {{ads}} 
                <span class="afreshPosition" v-refrespoint="getPosition">
                    <span class="ico icon-dingwei"></span>
                    重新定位
                </span>
            </p>
        </div>
        <ul v-if='list' class="searby_list">
            <li v-for="item in list" v-selectapoint="setAPoint">
                <p class="name" :lat="item.latitude" :lng="item.longitude">{{item.name}}</p>
                <p class="address">{{item.address}}</p>
            </li>
        </ul>
        <div class="error" v-if='nores'>
            <img src="https://fuss10.elemecdn.com/6/87/4efda8c6bf4734d39faf86fe190c3gif.gif" alt="" />
            <p class="noress">没有搜索结果</p>
            <p class="tips">换个关键字试试</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                list:false,
                nores:false
            }
        },
        computed:{
            ads(){    
                return this.$store.getters.getPosition;
            }
        },
        methods:{
            getNearbyFun(kkk){
                console.log('getNearby.You can select a new point.');
                var self = this;
                $.ajax({
                    url:'http://localhost:10086/getNearby',
                    type:'POST',
                    data:{kw:"广州",lat:self.$store.getters.getPoint.lat,lng:self.$store.getters.getPoint.lng,ofs:0,num:20},
                    success:function(data){   
                        data = JSON.parse(data);                          
                        if(data.name=="INVALID_PARAM"){
                            self.nores = true;
                        }else{
                            self.nores = false;
                            self.list = data;                    
                        }
                    }
                });
            },
            getPosition:function(){
                console.log('getPositiion Again');
                var self = this;
                var geo = new BMap.Geolocation();
                if(!geo){
                    console.log("垃圾网络");
                    return false;   
                }
                geo.getCurrentPosition(function(data){
                    if(this.getStatus()==BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(data.point);
                        var lat = data.point.lat;
                        var lgt = data.point.lng;

                        var point_ = new BMap.Point(lgt,lat);
                        var geoc = new BMap.Geocoder();    
                        geoc.getLocation(point_, function(rs){
                            console.log(rs,rs.street);
                            var obj = {ads:rs.address,lat:rs.point.lat,lng:rs.point.lng};            
                            self.$store.dispatch("letSetPosition", obj);                              
                        }); 
                              
                    }else{
                        console.log('failed'+this.getStatus());                        
                    }
                     
                },{enableHighAccuracy:true});
            },
            setAPoint(obj){
                this.$store.dispatch("letSetPosition", obj);
            }
        },
        directives:{
            getkw(el,bind){    
                $(el).on("keyup",()=>{
                    bind.value($(el).val());
                })
            },
            refrespoint(el,bind){
                $(el).on('click',()=>{
                    bind.value();
                });
            },
            selectapoint(el,bind){
                $(el).on('click',function(e){
                    var k = $(el).find('.name')
                    var obj = {ads:k.html(),lat:k.attr("lat"),lng:k.attr("lng")};
                    bind.value(obj);            
                    router.push('/home');
                })
            }
        }
    }
</script>

<style scoped>
    .searby_div{
        width: 100%;
        height: 100%;
        background: #f2f2f2;;
    }
/*====================================header================================*/
    header{
        position:relative;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        text-align: center;
        font-size: .48rem;
        color:#FFF;
        line-height: 1.173333rem;
    }
    header .ico{
        position: absolute;
        left: .333333rem;
        top: 0;
        font-size: .533333rem;
        color:#FFF;
    }
    header .add{
        font-size: .426667rem;
        position: absolute;
        top: 0;
        right: .426667rem;
        color:#fff;
    }
/*==============================search==================================*/
    .search_box{
        background: #fff;        
        padding: .266667rem .4rem;
    }
    #search{
        position: relative;
        padding: .24rem .48rem .24rem .88rem;
        color: #999;
        border-radius: .026667rem;
        background: #f2f2f2;
        font-size: .346667rem;
        line-height: .48rem;
    }
    #search .ico{
        position:absolute;
        left: .4rem;
        top: .24rem;
    }
    #search input{
        width: 100%;
        outline: none;
        border:none;
        padding: 0;
        font-size: .346667rem;
        background: transparent;
        color:#666;
    }
/*================================initial===============================*/
    .default h4{
        font-size: .346667rem;
        line-height: .48rem;
        padding: .4rem 0 .186667rem .4rem;
        color: #666;
        background: #f2f2f2;
        font-weight: normal;
    }
    .default p{
        background: #fff;
        height: 1.173333rem;
        line-height: 1.173333rem;
        font-size: .4rem;
        color: #333;
        padding: 0 .453333rem 0 .4rem;
        font-weight: 700;
    }
    .default p>span{
        float:right;
        color:#2395ff;
        font-weight: 400;
    }
/*===============================list=====================================*/
    .searby_list li{
        border-top: 1px solid #eee;
        font-size: .32rem;
        background-color: #fff;
        padding: .293333rem .4rem;
        color: #2a2a2a;
    }
    .searby_list li .name{
        font-weight: 700;
        font-size: .4rem;
        color: #333;
    }
    .searby_list li .address{
        color: #333;
        font-size: .32rem;
        line-height: .453333rem;
        margin-top: .053333rem;
    }
/*==================================error==================================*/
    .error{
        padding-top: 4rem;
        text-align: center;
    }
    .error img{
        display: block;
        margin:0 auto;
    }
    .error .noress{
        color: #6a6a6a;
        font-weight: 400;
        font-size: .453333rem;
        margin: .333333rem 0 .266667rem;
    }
    .error .tips{
        margin: 0 0 .333333rem;
        color: #999;
        font-size: .306667rem;
        font-weight: 400;
    }
</style>

