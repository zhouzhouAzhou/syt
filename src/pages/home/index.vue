<template>
    <div>
        <!-- 首页轮播图 -->
        <Carousel />
        <!-- 首页搜索 -->
        <Search />
        <!-- 展示医院的结构 -->
        <el-row>
            <el-col :span="20"><div class="grid-content ep-bg-purple-dark" />
                <!-- 等级子组件 -->
                <Level @getLevel="getLevel"/>
                <!-- 地区子组件 -->
                <Region @getRegion="getRegion"/>
                <!-- 医院 -->
                <div class="hospital" v-if="hasHospitalArr.length>=1">
                    <Card v-for="item in hasHospitalArr" :key="item.id" class="item" :hospitalInfo="item"/>
                   
                </div>
                <el-empty v-else description="暂无数据"/>
                <el-pagination
                    v-model:current-page="pageNo"
                    v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40]"
                    :background="true"
                    layout=" prev, pager, next, jumper,->, sizes, total"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </el-col>
            <el-col :span="4">
                <Tip />
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
    import Carousel from './carousel/index.vue'
    import Search from './search/index.vue'
    import Level from './Level/index.vue'
    import Region from './region/index.vue'
    import Card from './card/index.vue'
    import Tip from './tip/index.vue'
    
    import {onMounted,ref} from 'vue';
    import {reqHospital} from '@/api/home'

    import type {Content,HospitalResponseData} from '@/api/home/type'
    let pageNo=ref<number>(1);
    let pageSize=ref<number>(10);
    let hasHospitalArr= ref<Content>([]);
    let total=ref<number>(0)
    let hostype=ref<string>('');
    let districtCode=ref<string>('')

    onMounted(()=>{
        getHospitalInfo()
    })

    const getHospitalInfo=async ()=>{
        let res:HospitalResponseData=await reqHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value);
        console.log(res);
        if(res.code==200) {
            hasHospitalArr.value=res.data.content;
            total.value=res.data.totalElements;
        } else {
            return Promise.reject(new Error('faile'));
        }
        
    }
    
    const handleCurrentChange=()=>{
        getHospitalInfo()
    }

    const handleSizeChange=()=>{
        pageNo.value=1
        getHospitalInfo()
    }

    const getLevel=(level:string)=>{
        // console.log(level);
        hostype.value=level;
        getHospitalInfo()
    }

    const getRegion=(region:string)=>{
        // console.log(region);
        districtCode.value=region
        getHospitalInfo()

    }
</script>

<style scoped lang="scss">
    .hospital {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
            width: 48%;
            margin: 10px 0;
        }
    }
</style>