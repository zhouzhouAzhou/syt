<template>
    <div>
        <!-- wxlogin -->
    </div>
</template>

<script setup lang="ts">
import { SET_TOKEN } from '@/utils/user';
import { useRoute } from 'vue-router';

const $route=useRoute();
console.log('~~~',$route.query);
//持久化存储用户信息
SET_TOKEN(JSON.stringify($route.query));
//次路由组件代码执行:授权成功
let html:any = document.querySelector('html');
html.style.display = 'none';
</script>

<style scoped>

</style>