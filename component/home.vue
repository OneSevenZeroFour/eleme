<template>
    <div>
        <deng_ww></deng_ww>
        <xsearch></xsearch>
        <hotkey></hotkey>
        <hdmenu></hdmenu>
        <hdtehui></hdtehui>
        <xlist></xlist>
        <xfooter></xfooter>
    </div>
</template>

<script>
	import hotkey from "./head_hotkey.vue";
	import hdmenu from "./head_slidemenu.vue";
	import hdtehui from "./head_tehui.vue";
    import xlist from './list.vue';
    import xsearch from './search.vue';
    import deng_ww from "./deng/deng_ele.vue";
    export default {
        components:{
            hotkey,
            hdmenu,
            hdtehui,
            xlist,
            xsearch,
            deng_ww
        },
        beforeRouteLeave(to,from,next){
            this.$store.state.destroy();
            next(true);
        }
    }
</script>
