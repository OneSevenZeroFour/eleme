/* DYT */

<template>
    <aside class="weather_div">{{point}}</aside>
</template>

<script>
    export default {
        data(){
            return{
                weather:'天气'
            }
        },
        computed:{
            point(){
                if(this.$store.getters.getPosition!='获取位置中...'){  
                    console.log("ajax");
                    var self = this;//注意异步里的this
                    $.ajax({
                        url:'http://localhost:10086/getWeather',
                        type:'POST',
                        data:{lat:self.$store.getters.getPoint.lat,lng:self.$store.getters.getPoint.lng},
                        success:function(data){                               
                            console.log('success',data);                    
                        }
                    });
                }
                return this.$store.getters.getPoint;                
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
    }
</style>

    