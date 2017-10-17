/* DYT */

<template>
    <div class="position_div">
        <span class='ico icon-dingwei1'></span>
        <a href="#/searchNear">{{ads}} <span class='ico icon-up'></span></a>
    </div>
</template>

<script>
    export default {
        computed:{
            ads(){    
                console.log('ads',this.$store.getters.getPosition);                     
                return this.$store.getters.getPosition;
            }
        }
        
    }
</script>

<style scoped>
    .ico{
        font-family: "iconfont";
    }
    .position_div{
        width: 55%;
        font-weight: 700;
        margin: 0 .133333rem;
        margin-left: 0;
        font-size: .453333rem;
        float:left;
    }
    .position_div>span,.position_div a{
        float:left;
    }
    .position_div a{
        color:#fff;
        display:block;
        width: 80%;
        padding-right: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position:relative;
    }
    .position_div .ico{
        font-size: .5rem;
    }
    .position_div>span{
        font-weight: 700;
    }
    .position_div a span.ico{
        font-size: 0.2rem;
        position:absolute;
        right: 0;
        top: 0;
    }
</style>
    