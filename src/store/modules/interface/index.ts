import type { HosPitalDetail,DepartmentArr } from '@/api/hospital/type'
import type { UserInfo } from '@/api/hospital/type'
export interface DetailState {
    hospitalInfo: HosPitalDetail,
    departmentArr: DepartmentArr
}

export interface UserState {
    visiable: boolean,
    code: string,
    userInfo: UserInfo
}