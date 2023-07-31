<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级：</div>
            <ul class="hospital">
                <li :class="{active: activeFlag==''}" @click="changeLevel('')">全部</li>
                <li v-for="level in levelArr" :key="level.value" :class="{active: activeFlag==level.value}" @click="changeLevel(level.value)">{{ level.name }}</li>
                
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from '@/api/home/type.ts';
import {reqHospitalLevelAndRegion} from '@/api/home'
import {onMounted, ref} from 'vue';
// 定义一个数组存储医院等级数据
let levelArr=ref<HospitalLevelAndRegionArr>([])

let activeFlag=ref<string>('');

onMounted(()=>{
    getLevel()
})
const getLevel=async ()=>{
    const res:HospitalLevelAndRegionResponseData=await reqHospitalLevelAndRegion("Hostype");

    if(res.code==200) {
        levelArr=res.data
        console.log(22,levelArr);
        
    }
    
}

const changeLevel=(level:string)=>{
    activeFlag.value=level;
    $emit('getLevel',level)

}

let $emit=defineEmits(['getLevel']);
</script>

<script lang="ts">
export default {
    name: 'Level'
}
</script>

<style scoped lang="scss">
    .level {
        color: #7f7f7f;
        h1 {
            font-weight: 900;
            margin: 10px 0px;
        }
        .content {
            display: flex;
            .left {
                margin-right: 5px;
            }
            .hospital {
                display: flex;
                li {
                    margin-right: 10px;
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