import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/views/GoodList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import orderConfirm from '@/views/orderConfirm'
import Social from '@/views/Social'

Vue.use(Router);



  const routes=[
    {
      path: '/',
      name: 'GoodList',
      component: GoodList
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart,
      meta:{auth:true}
    },
    {
      path: '/Address/:addressId',
      name: 'Address',
      component: Address
    },
    {
      path:'/orderConfirm',
      name:'orderConfirm',
      component:orderConfirm
    },
    {
      path:'/Social',
      name:'Social',
      component:Social,
      meta:{auth:true}
    }

  ];

const router = new Router({
  routes
});
router.beforeEach((to,from ,next)=>{
  let vm = router.app.$options.store.state;
  if (to.meta.auth) {  // 判断该路由是否需要登录权限
    if (vm.nickName) {  // 通过vuex state获取当前的用户名是否存在

      next();
    }
    else {
      var ch = async function () {
        let res = await Vue.$api.user();
        if(res){
          next()
        }else {
          next({
            path: '/',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      };
      ch()
    }
  }
  else {
    next();
  }
});


export default router;
