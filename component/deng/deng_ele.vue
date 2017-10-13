/* DYT */

<template>
    <div class="deng_ele">
        <dengposdiv></dengposdiv>
        <dengweadiv></dengweadiv>
    </div>
</template>

<script>
    import dengposdiv from './getPosition.vue';
    import dengweadiv from './weather.vue';
    export default {
        components:{
            dengweadiv,
            dengposdiv
        }
    }
</script>

<style scoped>
    .deng_ele{
        height: 1rem;
        border-bottom: 1px solid #ddd;
        font-size: 0.6rem;
        line-height: 1rem;
        padding:.266667rem .373333rem 0;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        color:#fff;
    }
</style>

    