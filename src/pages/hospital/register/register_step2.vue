<template>
     <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片:展示就诊人信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User" @click="goUser">添加就诊人</el-button>
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <Visitor
          @click="changeIndex(index)"
          v-for="(user, index) in userArr"
          :key="user.id"
          class="item"
          :user="user"
          :index="index"
          :currentIndex="currentIndex"
        />
      </div>
    </el-card>
    <!-- 卡片:展示医生的信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片身体部分:展示医生的信息 -->
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期:</div>
          </template>
          {{ docInfo.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院:</div>
          </template>
          {{ docInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室:</div>
          </template>
          {{ docInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名:</div>
          </template>
          {{ docInfo.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称:</div>
          </template>
          {{ docInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长:</div>
          </template>
          {{ docInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务器:</div>
          </template>
          <span style="color: red">{{ docInfo.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 确定挂号按钮 -->
    <div class="btn">
      <el-button
        type="primary"
        size="default"
        :disabled="currentIndex == -1 ? true : false"
        @click="submitOrder"
        >确认挂号</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqDocotorInfo, reqGetUser } from '@/api/hospital/index'
import type { Doctor, DoctorInfoData, UserArr,UserResponseData} from '@/api/hospital/type'
import {reqSubmitOrder} from '@/api/user'
import type {SubmitOrder} from '@/api/user/type'
import { User } from '@element-plus/icons-vue'
// import Visitor from './visitor.vue'
import { onMounted,ref } from 'vue';
import {useRoute, useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'
let $route=useRoute()
let $router=useRouter()

let userArr=ref<UserArr>([])
let docInfo=ref<Doctor>({} as Doctor)
let currentIndex=ref<number>(-1)

onMounted(()=>{
    fetchUserData();
    fetchInfo();
})

const fetchUserData=async()=>{
    let res:UserResponseData=await reqGetUser();
    if(res.code==200) {
        userArr.value=res.data
    }
    
}

const fetchInfo= async()=>{
    let res:DoctorInfoData=await reqDocotorInfo($route.query.docId as string);
    
    if(res.code==200) {
        console.log('DoctorInfoData',res.data);
        docInfo.value=res.data
    }
}

const changeIndex=(index:number)=>{
    currentIndex.value=index;
}

const submitOrder=async()=>{
    let res:SubmitOrder=await reqSubmitOrder(docInfo.value.hoscode,docInfo.value.id,userArr.value[currentIndex.value].id);
    console.log(res);
    
    if(res.code==200) {
        console.log(res.data);
        //往用户中心跳转
        $router.push({
            path: '/user/order',
            query: {
                orederId: res.data
            }
        })
    } else {
        ElMessage({
            message: res.message,
            type: 'error'
        })
        Promise.reject(new Error(res.message))
    }
}
</script>

<style scoped lang="scss">
.container {
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 20px;
  }
  .box-card {
    margin: 20px 0px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }
}
</style>
