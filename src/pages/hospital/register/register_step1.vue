<template>
    <div class="wrap">
        <div class="top">
            <div class="hosname">{{ workData.baseMap?.hosname }}</div>
            <div class="line"></div>
            <div>{{ workData.baseMap?.bigname }}</div>
            <div class="dot">.</div>
            <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
        </div>

        <!-- 中间展示日期的结构 -->
        <div class="center">
            <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
            <div class="container">
                <div
                class="item"
                :class="{
                    active: item.status == -1 || item.availableNumber == -1,
                    cur: item.workDate == workTime?.workDate,
                }"
                v-for="item in workData.bookingScheduleList"
                :key="item"
                @click="changeTime(item)"
                >
                <div class="top1">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
                <div class="bottom">
                    <div v-if="item.status == -1">停止挂号</div>
                    <div v-if="item.status == 0">
                    {{
                        item.availableNumber == -1 ? "约满了" : `有号(${item.availableNumber})`
                    }}
                    </div>
                    <div v-if="item.status == 1">即将放号</div>
                </div>
                </div>
            </div>
            <el-pagination
                v-model:current-page="pageNo"
                layout="prev, pager, next"
                :total="workData.total"
                @current-change="fetchWorkData"
            />
        </div>

        <div class="bottom">
            <div class="will" v-if="workTime.status==1">
                <span class="time">2023年6月3日08:30</span>
                <span class="willText">放号</span>
            </div>
            <div class="doctor" v-else>
                <div class="morning">
                    <div class="tip">
                        <svg
                        t="1685757781400"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1631"
                        width="32"
                        height="32"
                        >
                        <path
                            d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                            fill="#1296db"
                            p-id="1632"
                        ></path>
                        </svg>
                        <span class="text">上午号源</span>
                    </div>
                    <div class="doc_info" v-for="doctor in morningArr" :key="doctor.id">
                        <!-- 展示医生的名字|技能 -->
                        <div class="left">
                        <div class="info">
                            <span>{{ doctor.title }}</span>
                            <span>|</span>
                            <span>{{ doctor.docname }}</span>
                        </div>
                        <div class="skill">{{ doctor.skill }}</div>
                        </div>
                        <!-- 右侧区域展示挂号的钱数-->
                        <div class="right">
                        <div class="money">￥{{ doctor.amount }}</div>
                        <el-button type="primary" size="default" @click="goStep2(doctor)">{{
                            doctor.availableNumber
                        }}</el-button>
                        </div>
                    </div>
                </div>
                <div class="morning">
                    <div class="tip">
                        <svg
                        t="1685757781400"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1631"
                        width="32"
                        height="32"
                        >
                        <path
                            d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                            fill="#1296db"
                            p-id="1632"
                        ></path>
                        </svg>
                        <span class="text">下午号源</span>
                    </div>
                    <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
                        <!-- 展示医生的名字|技能 -->
                        <div class="left">
                        <div class="info">
                            <span>{{ doctor.title }}</span>
                            <span>|</span>
                            <span>{{ doctor.docname }}</span>
                        </div>
                        <div class="skill">{{ doctor.skill }}</div>
                        </div>
                        <!-- 右侧区域展示挂号的钱数-->
                        <div class="right">
                        <div class="money">￥{{ doctor.amount }}</div>
                        <el-button type="primary" size="default" @click="goStep2(doctor)">{{
                            doctor.availableNumber
                        }}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqHospitalDocotor, reqHospitalWork } from '@/api/hospital/index'
import type { DocArr, DoctorResponseData, HospitalWordData,Doctor } from '@/api/hospital/type';
import {computed, onMounted,ref} from 'vue'
import { useRoute,useRouter } from 'vue-router';

let $route=useRoute()
let $router=useRouter()


let pageNo=ref<number>(1)
let limit=ref<number>(6)

let workData=ref<any>({})

//存储排班日期，当前数据的第一个
let workTime:any=ref({});
//排班医生数据
let docArr=ref<DocArr>([])

onMounted(()=>{
    fetchWorkData()
});

const fetchWorkData=async ()=>{
    let res:HospitalWordData=await reqHospitalWork(pageNo.value,limit.value,$route.query.hoscode as string,$route.query.depcode as string);
    if(res.code==200) {
        console.log('lalal',res.data);
        workData.value=res.data
        //存储第一天的数据
        workTime.value=workData.value.bookingScheduleList[0];
        getDocotorWorkData();
    }

}

//获取医生排班的方法
const getDocotorWorkData=async ()=>{
    // let res:DoctorResponseData=await reqHospitalDocotor($route.query.hoscode as string,$route.query.depcode as string,workTime.value.workData);
    let res:DoctorResponseData=await reqHospitalDocotor($route.query.hoscode as string,$route.query.depcode as string,'2023-06-08');
    //'2023-06-08'
    if(res.code=200) {
        // console.log('workdata',res.data);
        docArr.value=res.data
        
    }
}

//切换时间
const changeTime=(item:any)=>{
    workTime.value=item
    getDocotorWorkData()
}
//计算上午的医生排班
let morningArr=
computed(()=>{
     return docArr.value.filter((doc:Doctor)=>doc.workTime==0)
})
//计算下午的医生排班
let afterArr=computed(()=>{
     return docArr.value.filter((doc:Doctor)=>doc.workTime==1)
})

let goStep2=(doctor:Doctor)=>{
    $router.push({
        path: '/hospital/register_step2',
        query: {
            docId: doctor.id
        }
    })
}
</script>

<script lang="ts">
export default {
    name: 'register_step1'
}
</script>
<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;
    .line {
      width: 5px;
      height: 20px;
      background: skyblue;
      margin: 0px 5px;
    }
    .dot {
      margin: 0px 5px;
      color: skyblue;
    }
  }
  .center {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .time {
      font-weight: 900;
    }
    .container {
      width: 100%;
      display: flex;
      margin: 30px 0px;
      .item {
        flex: 1;
        width: 100%;
        border: 1px solid skyblue;
        margin: 0px 10px;
        transition: all 0.3s;
        &.active {
          border: 1px solid #ccc;
          color: #7f7f7f;
          .top1 {
            background: #ccc;
          }
        }

        &.cur {
          transform: scale(1.1);
        }
        .top1 {
          background: #e8f2ff;
          height: 30px;
          width: 100%;
          text-align: center;
          line-height: 30px;
        }
        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }
  .bottom {
    .will {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      .time {
        color: red;
      }
      .willText {
        color: skyblue;
      }
    }
    .doctor {
      .morning {
        .tip {
          display: flex;
          align-items: center;
          .text {
            color: #7f7f7f;
            font-weight: 900;
          }
        }
        .doc_info {
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;
          .left {
            .info {
              color: skyblue;
              margin: 10px 0px;
              span {
                margin: 0px 5px;
                font-size: 18px;
                font-weight: 900;
              }
            }
            .skill {
              margin: 10px 0px;
              color: #7f7f7f;
            }
          }
          .right {
            width: 150px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .money {
              color: #7f7f7f;
              font-weight: 900;
            }
          }
        }
      }
    }
  }
}
</style>
