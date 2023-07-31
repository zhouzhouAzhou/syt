import request from '@/utils/request.ts'
import type { HospitalLevelAndRegionResponseData, HospitalResponseData,HospitalInfo } from './type'
enum API {
    HOSPITAL_URL='/hosp/hospital/',
    HOSPITALLEVElANDREGION_URL='/cmn/dict/findByDictCode/',
    HOSPITALINFO_URL='/hosp/hospital/findByHosname/'
}

export const reqHospital=(page: number, limit: number,hostype:'',districtCode='')=>request.get<any,HospitalResponseData>(API.HOSPITAL_URL+`${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)

export const reqHospitalLevelAndRegion=(dictCode: string)=>request.get<any,HospitalLevelAndRegionResponseData>(API.HOSPITALLEVElANDREGION_URL+dictCode)

export const reqHospitalInfo=(hosname:string)=>request.get<any,HospitalInfo>(API.HOSPITALINFO_URL+hosname);

