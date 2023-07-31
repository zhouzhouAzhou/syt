import request from "@/utils/request";
import type { DepartmentResponseData, HospitalDetailResponseData,LoginData,UserLoginResponseData, WXLoginResponseData,HospitalWordData, DoctorResponseData, UserResponseData, DoctorInfoData } from './type'
enum API {
    HOSPITALDEATAIL_URL='/hosp/hospital/',
    HOSPITALDEPARTMENT_URL='/hosp/hospital/department/',
    GETUSERCODE_URL='/sms/send/',
    USERLOGIN_URL='/user/login',
    WXLOGIN_URL='/user/weixin/getLoginParam/',
    //获取某一个医院的某一个科室预约挂号的数据
    HOSPITALWORK_URL='/hosp/hospital/auth/getBookingScheduleRule/',
    //获取医院某一个科室某一天相应医生排班的数据
    HOSPITALDOCOTOR_URL='/hosp/hospital/auth/findScheduleList/',
    //获取某一个账号下就诊人的信息
    GETUSER_URL='/user/patient/auth/findAll',
    //获取挂号医生的信息
    GETDOCTOR_URL='/hosp/hospital/getSchedule/'
}

export const reqHospitalDetail=(hoscode: string)=>request.get<any,HospitalDetailResponseData>(API.HOSPITALDEATAIL_URL+hoscode);

export const reqHospitalDepartment=(hoscode: string)=>request.get<any,DepartmentResponseData>(API.HOSPITALDEPARTMENT_URL+hoscode)

export const reqCode=(phone: string)=>request.get<any,any>(API.GETUSERCODE_URL+phone)

export const reqUserLogin=(data:LoginData)=>request.post<any,UserLoginResponseData>(API.USERLOGIN_URL,data)

export const reqWxLogin = (wxRedirectUri: string) => request.get<any, WXLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`);

// GET /api/hosp/hospital/auth/getBookingScheduleRule/{page}/{limit}/{hoscode}/{depcode}
export const reqHospitalWork=(page:number,limit:number,hoscode:string,depcode:string)=>request.get<any,HospitalWordData>(API.HOSPITALWORK_URL+`${page}/${limit}/${hoscode}/${depcode}`)

// GET /api/hosp/hospital/auth/findScheduleList/{hoscode}/{depcode}/{workDate}
export const reqHospitalDocotor=(hoscode:string,depcode:string,workDate:string)=>request.get<any,DoctorResponseData>(API.HOSPITALDOCOTOR_URL+`/${hoscode}/${depcode}/${workDate}`)

export const reqGetUser=()=>request.get<any,UserResponseData>(API.GETUSER_URL)

// /api/hosp/hospital/getSchedule/{scheduleId}
export const reqDocotorInfo=(schedulerId: string)=>request.get<any,DoctorInfoData>(API.GETDOCTOR_URL+schedulerId)