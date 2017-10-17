/* DYT */

<template>
    <div>
        <xsearch></xsearch>
        <xlist></xlist>
        <xfooter></xfooter>
    </div>
</template>

<script>
    import xlist from './list.vue';
    import xsearch from './search.vue';
    export default {
        components:{
            xlist,
            xsearch
        },
        beforeRouteLeave(to,from,next){
            this.$store.state.destroy();
            next(true);
        }
    }
</script>

<style scoped>
    
</style>

    