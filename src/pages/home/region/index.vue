<template>
    <div class="region">
        <div class="content">
            <div class="left">地区：</div>
            <ul class="all">
                <li :class="{active: activeFlag==''}" @click="changeLevel('')">全部</li>
                <li v-for="region in regionArr" :key="region.value" :class="{active: activeFlag==region.value}" @click="changeLevel(region.value)">{{region.name}}</li>
                
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reqHospitalLevelAndRegion} from '@/api/home'
// import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from '@/api/home/type.ts'
import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from '@/api/home/type.ts';

import {ref,onMounted} from 'vue'

let regionArr=ref<HospitalLevelAndRegionArr>([])
let activeFlag=ref<string>('');

onMounted(()=>{
    getRegion()
})

const getRegion=async ()=>{
    let res:HospitalLevelAndRegionResponseData=await reqHospitalLevelAndRegion('Beijin');
    if(res.code==200) {
        regionArr=res.data;       
        console.log(11,regionArr);
         
    } else {
        return Promise.reject(new Error('error!'));
    }
}

const changeLevel=(region:string)=>{
    activeFlag.value=region
    $emit('getRegion',region);
}

let $emit=defineEmits(['getRegion']);

</script>

<script lang="ts">
export default {
    name: 'Region'
}
</script>

<style scoped lang="scss">
    .region {
        color: #7f7f7f;
        margin-top: 10px;
        .content {
            display: flex;
            .left {
                // margin-right: 10px;
                width: 55px;
            }
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
                .active {
                    color: #55a6fe;
                }
                li:hover {
                    color: #55a6fe;
                    cursor: pointer;
                }
            }
        }
    }
</style>