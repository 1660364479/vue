import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Index from '../pages/Index.vue'
import {check_token} from '../api/apis'

Vue.use(VueRouter)

 const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [{
      path: '/Index/Home',
      name: 'Home',
      component: () => import('../pages/index/Home')
    },
    {
      path: '/Index/People',
      name: 'People',
      component: () => import('../pages/index/People')
    },
    {
      path: '/Index/Order',
      name: 'Order',
      component: () => import('../pages/index/Order')
    },
    {
      path: '/Index/Drugs',
      name: 'Drugs',
      component: () => import('../pages/index/Drugs')
    },
    {
      path: '/Index/Storemanagement',
      name: 'Storemanagement',
      component: () => import('../pages/index/Storemanagement')
    },
    {
      path: '/Index/Commodity',
      name: 'Commodity',
      component: () => import('../pages/index/Commodity')
    },
    {
      path: '/Index/Commodity',
      name: 'Commodity',
      component: () => import('../pages/index/Commodity')
    },
    {
      path: '/Index/Storemanagement',
      name: 'Storemanagement',
      component: () => import('../pages/index/Storemanagement')
    },
    {
      path: '/Index/Productlist',
      name: 'Productlist',
      component: () => import('../pages/index/Productlist')
    },
    {
      path: '/Index/Productadd',
      name: 'Productadd',
      component: () => import('../pages/index/Productadd')
    },
    {
      path: '/Index/OrderStatistics',
      name: 'OrderStatistics',
      component: () => import('../pages/index/OrderStatistics')
    },
    {
      path: '/Index/Accountlist',
      name: 'Accountlist',
      component: () => import('../pages/index/Accountlist')
    },
    {
      path: '/Index/Accountadd',
      name: 'Accountadd',
      component: () => import('../pages/index/Accountadd')
    },
    {
      path: '/Index/Changepsd',
      name: 'Changepsd',
      component: () => import('../pages/index/Changepsd')
    },
    {
      path: '/Index/Classification',
      name: 'Classification',
      component: () => import('../pages/index/Classification')
    },
   
    ]
  }
  ]
})
//权限管理
router.beforeEach((to,from,next)=>{
 from
 console.log(to.path);
 
 if(to.path !='/'){
  check_token(localStorage.token).then(res => {
    console.log(res);
    
    if (res.data.code == 0) {
      //还在登录状态
     next()//进行下一步
    } else {
      // 拦截
      next('/')
     
    }
  });
 }else next()
 
})

export default  router