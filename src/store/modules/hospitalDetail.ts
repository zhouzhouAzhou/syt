import { defineStore } from 'pinia'
//pinia仓库写法：组合式API、选择式API写法
import { reqHospitalDepartment, reqHospitalDetail } from '@/api/hospital'
import type { DepartmentResponseData, HosPitalDetail, HospitalDetailResponseData,DepartmentArr } from '@/api/hospital/type'
import type { DetailState } from './interface'
const useDetailStore= defineStore('Detail',{
    state: ():DetailState=>{
        return {
            hospitalInfo: ({} as HosPitalDetail),
            departmentArr: ({} as DepartmentArr)
        }
    },
    actions: {
        //获取医院详情的方法
       async getHospital(hoscode: string) {
            let res:HospitalDetailResponseData=await reqHospitalDetail(hoscode);
            if(res.code==200) {
                console.log(res.data);
                this.hospitalInfo=res.data
            }
        },
        async getDepartment(hoscode: string) {
            let res:DepartmentResponseData=await reqHospitalDepartment(hoscode);
            if(res.code==200) {
                this.departmentArr=res.data
                console.log(this.departmentArr);
                
            }
        }
    },
    getters: {

    }
})

export default useDetailStore