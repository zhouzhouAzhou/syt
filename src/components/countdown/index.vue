<template>
    <div>
        <span>获取验证码({{ time }})</span>
    </div>
</template>

<script setup lang="ts">
import {ref,watch} from 'vue';
let time=ref<number>(5);
let props=defineProps(['flag']);
let $emit=defineEmits(['getFlag'])

watch(
    ()=>props.flag,
    ()=>{
        let timer=setInterval(()=>{
            time.value--;
            if(time.value==0) {
                $emit('getFlag',false)
                clearInterval(timer)
            }
        },1000)
    },
    {
        immediate: true
    }
)

</script>

<style scoped>

</style>