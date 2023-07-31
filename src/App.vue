<template>
  <div class="container">
    <HospitalTop />
    <div class="content">
      <router-view></router-view>
    </div>
    <HospitalBottom />
  </div>
  <Login v-if="userStore.visiable"/>
</template>

<script setup lang="ts">
  /* import request from '@/utils/request.ts'
  import {onMounted} from 'vue';
  onMounted(()=>{
    request.get('/api/hosp/hospital/1/10').then(res=>{
      console.log(res);
      
    })
  }) */
import useUserStore from '@/store/modules/user';
let userStore=useUserStore()
  

</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .content {
      margin-top: 70px;

      // height: 1900px;
      width: 1200px;
    }
  }
</style>