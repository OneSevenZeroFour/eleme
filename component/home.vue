<template>
    <div>
        <hotkey></hotkey>
        <hdmenu></hdmenu>
        <hdtehui></hdtehui>
    </div>
</template>

<script>
	import hotkey from "./head_hotkey.vue";
	import hdmenu from "./head_slidemenu.vue";
	import hdtehui from "./head_tehui.vue";
    export default {
        components:{
            hotkey,
            hdmenu,
            hdtehui
        }
    }
</script>