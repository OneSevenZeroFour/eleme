/* DYT */

<template>
    <aside class="weather_div">
        <p class="txt">
            <span class="temp">
                {{weather.temp}}&deg;
            </span>
            <span class="temp">
                {{weather.des}}
            </span> 
        </p>
    
        <img :src="weather.img" alt="" />
    
    </aside>
</template>

<script>
    export default {
        computed:{
            weather(){
                if(this.$store.getters.getPosition!='获取位置中...')
                    this.getWeatherFun();
                return this.$store.getters.getWeather;
                
            }
        },
        methods:{
            getWeatherFun(){
                var self = this;//注意异步里的this
                $.ajax({
                    url:'http://localhost:10086/getWeather',
                    type:'POST',
                    data:{lat:self.$store.getters.getPoint.lat,lng:self.$store.getters.getPoint.lng},
                    success:function(data){     
                        data = JSON.parse(data);
                        var imghash = data.image_hash.slice(0, 1)+'/'+data.image_hash.slice(1, 3)+'/'+data.image_hash.slice(3);
                        ;
                        var url = "https://fuss10.elemecdn.com/"+imghash+".png?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/";
                        var obj = {des:data.description,temp:data.temperature,img:url};
                        self.$store.dispatch("letGetWeather", obj);              
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .weather_div{
        align-items: center;
        text-align: right;
        display: flex;
        width: 20%;
        float:right;
        display:flex;
        color:#fff;
        height: 100%;
    }
    .txt,img{
        flex:1;
    }
    .txt{
        display:flex;
        flex-direction: column;
        text-align: right;
    }
    .txt span{
        flex:1;
        line-height: 1em;
        font-size: .35rem;
        font-weight: 400;
    }
    img{
        margin-left: .106667rem;
        width: .733333rem;
        height: .733333rem;
        border:none;
        display:block;
    }
</style>

    