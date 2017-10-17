/* DYT */

<template>
    <div>
        <xfound></xfound>
        <xfooter></xfooter>
    </div>
</template>

<script>
    import xfound from './found.vue';
    export default {
        components:{
            xfound
        },
        beforeRouteLeave(to,from,next){
            this.$store.state.destroy();
            next(true);
        }
    }
</script>

<style scoped>
    
</style>

    