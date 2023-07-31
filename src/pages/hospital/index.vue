<template>
    <div class="hospital">
        <div class="menu">
            <div class="top">
                <el-icon><HomeFilled /></el-icon>
                <span>/医院信息</span>
            </div>
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router="true"
            >
                <el-menu-item :index="`/hospital/register?hoscode=${$route.query.hoscode}`">
                    <el-icon><icon-menu /></el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item :index="`/hospital/detail?hoscode=${$route.query.hoscode}`">
                    <el-icon><Document /></el-icon>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item :index="`/hospital/notice?hoscode=${$route.query.hoscode}`" >
                    <el-icon><Setting /></el-icon>
                    <span>预约通知</span>
                </el-menu-item>
                <el-menu-item :index="`/hospital/close?hoscode=${$route.query.hoscode}`">
                    <el-icon><InfoFilled /></el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item :index="`/hospital/search?hoscode=${$route.query.hoscode}`">
                    <el-icon color="#409EFC"><Search /></el-icon>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import useDetailStore from '@/store/modules/hospitalDetail'
// 获取仓库对象
let detailStore=useDetailStore()
import {
  Document,
  Menu as IconMenu,
  Setting,
  InfoFilled,
  Search,
  HomeFilled
} from '@element-plus/icons-vue'

import {useRoute} from 'vue-router'
let $route=useRoute()

onMounted(()=>{
    detailStore.getHospital($route.query.hoscode as string);
    detailStore.getDepartment($route.query.hoscode as string)
})
</script>

<style scoped lang="scss">
    .hospital {
        display: flex;

        .menu {
            flex: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            
            .top {
                color: #7f7f7f;
            }
        }

        .content {
            flex: 8
        }
    }
</style>