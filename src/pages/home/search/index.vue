<template>
    <div class="search">
        <el-autocomplete
        v-model="hosname"
        :trigger-on-focus="false"
        :fetch-suggestions="fetchData"
        clearable
        class="inline-input w-50"
        placeholder="请你输入医院名称"
        @select="goDetail"
      />
      <el-button type="primary" size="default" @click="" :icon="Search">搜索</el-button>
    </div>
</template>

<script setup lang="ts">
import {
  Search
} from '@element-plus/icons-vue'
import {ref} from 'vue';
import type {HospitalInfo} from '@/api/home/type'
import {reqHospitalInfo} from '@/api/home'

import {useRouter} from 'vue-router'
let $router=useRouter();

//收集搜索的关键字（医院的名字）
let hosname=ref<string>('')

const fetchData=async(keyword:string,cb:any)=>{
    // 当用户输入玩关键字此函数会执行一次，发送请求获取展示的数据即可
    let res:HospitalInfo=await reqHospitalInfo(keyword);
    console.log(res);

    if(res.code==200) {
        let showData=res.data.map(item=>{
            return {
                value: item.hosname,
                hoscode: item.hoscode//医院编码
            }
        })
        //给组件提供展示的户数
        cb(showData)
    }
}

const goDetail=(item:any)=>{
    console.log(item);
    $router.push({path: '/hospital/register',query: {hoscode: item.hoscode}})
}
</script>

<style scoped lang="scss">
    .search {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
        
        ::v-deep(.el-input__wrapper) {
            width: 600px;
            margin-right: 10px;
        }
    }
</style>