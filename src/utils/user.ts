// 本地存储操作用户的方法
import { UserInfo } from "@/api/hospital/type";
export const SET_TOKEN=(userInfo: string)=> {
    localStorage.setItem('USERINFO',userInfo);
}

export const GET_TOKEN=():UserInfo=>{
    return JSON.parse(localStorage.getItem('USERINFO') as string)
}

export const REMOVE_TOKEN=()=>{
    localStorage.removeItem('USERINFO')
}