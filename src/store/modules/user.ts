//定义用户想象的仓库
import { reqCode,reqUserLogin } from '@/api/hospital';
import type { UserLoginResponseData,LoginData, UserInfo } from '@/api/hospital/type';
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from '@/utils/user';
import {defineStore} from 'pinia'
import { UserState } from './interface';

const useUserStore=defineStore('User',{
    state: ():UserState=>{
        return {
            visiable: false,//用于控制登录组件的dialog显示与隐藏
            code: '',
            userInfo: GET_TOKEN() as UserInfo||{}
        }
    },
    actions: {
        //获取验证码的方法
        async getCode(phone: string) {
            //在想服务器携带手机号码，获取验证码
            //正常开发的时候,只需要发一个请求，后台就会将验证码推送到用户手机设备当中
            //当然咱们目前服务器不能向用户手机设备推送验证码(花钱)
            let result: any = await reqCode(phone);
            if (result.code == 200) {
                this.code = result.data;
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }

        },
        async Login(data: LoginData) {
            let res:UserLoginResponseData=await reqUserLogin(data)
            if(res.code==200) {
                // console.log(res.data);
                this.userInfo=res.data
                // 本地存储持久化存储用户信息
                SET_TOKEN(JSON.stringify(this.userInfo))
                return 'ok'
            } else {
                return Promise.reject(new Error(res.message))
            }
        },
        logout() {
            // Object.assign(this.userInfo,{name:'',token: ''})
            this.userInfo={name:'',token: ''}
            REMOVE_TOKEN()
        },
        queryState() {
            //开启定时器每隔一段时间问:本地村是都拥有用户信息
            let timer = setInterval(() => {
                //本地存储已有有数据:扫码成功
                if (GET_TOKEN()) {
                    //关闭对话框
                    this.visiable = false;
                    this.userInfo = GET_TOKEN() as UserInfo;
                    clearInterval(timer);
                }
            }, 1000);
        }
    },
    getters: {
        
    }
})

export default useUserStore;