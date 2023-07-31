// 路由鉴权
import router from "./router";
import NProgress from 'nprogress'
import '../node_modules/nprogress/nprogress.css'
import pinia from '@/store'
import useUserStore from "./store/modules/user";
let useStore=useUserStore(pinia);
NProgress.configure({ showSpinner: false });

//存储用户未登录可以访问路由得路径
let whiteList = ["/home", '/hospital/register', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search'];

router.beforeEach((to,from,next)=>{
    NProgress.start();
    document.title=`医疗-${to.meta.title}`
    let token=useStore.userInfo.token;
    if(token) {
        next()
    } else {
        if(whiteList.includes(to.path)) {
            next();
        } else {
            useStore.visiable=true;
            next({
                path: '/home',
                query: {
                    redirect: to.fullPath
                }
            })
        }
            
        
    }
})

router.afterEach((to,from)=>{
    NProgress.done();
})