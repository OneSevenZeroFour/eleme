/* DYT */

<template>
    <div class="position_div">
        <span class='ico icon-dingwei1'></span>
        <span>{{ads}}</span>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                prin:''
            }
        },
        computed:{
            ads(){    
                console.log('ads',this.$store.getters.getPosition)
                     
                return this.$store.getters.getPosition;
            }
        },
        methods:{
            getPosition:function(){
                console.log('getPositiion');
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
                            console.log(rs);
                                 
                            var obj = {ads:rs.address,lat:rs.point.lat,lng:rs.point.lng};                                            
                            self.$store.dispatch("letSetPosition", obj);                                 
                        }); 
                              
                    }else{
                        console.log('failed'+this.getStatus());                         
                    }
                     
                },{enableHighAccuracy:true});
            }
        },
        created(){
            this.getPosition();
        }
    }
</script>

<style scoped>
    .ico{
        font-family: "iconfont";
    }
    .position_div{
        width: 60%;
        font-weight: 700;
        margin: 0 .133333rem;
        font-size: .453333rem;
        float:left;
    }
    .position_div .ico{
        font-size: .5rem;
    }
    .position_div span{
        font-weight: 700;
    }
</style>
    