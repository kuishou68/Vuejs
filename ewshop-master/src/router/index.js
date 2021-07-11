import {createRouter, createWebHistory} from 'vue-router'

// import Home from '../views/Home.vue' // 不使用这种方式
const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Detail = () => import('@/views/detail/Detail')
const Profile = () => import('@/views/profile/Profile')
const ShopCart = () => import('@/views/shopcart/ShopCart')
const Register = () =>   ('@/views/profile/Register')
const Login = () => import('@/views/profile/Login')
const Address = () => import('@/views/profile/Address');
const AddressEdit = () => import('@/views/profile/AddressEdit');
const Order = () => import('@/views/order/Order');
const OrderDetail = () => import('@/views/order/OrderDetail');
const CreateOrder = () => import('@/views/order/CreateOrder');

import store from '@/store'; // ⚪️ 引入状态管理文件夹
import {Notify, Toast} from 'vant'; // 消息提示插件

const routes = [
    {
        path: '', // 访问空路由让它加载 Home 主键
        name: 'DefaultHome',
        component: Home,
        meta: {
            title: '图书兄弟'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: '图书兄弟'
        }
    },
    {
        path: '/category',
        name: 'category',
        component: Category,
        meta: {
            title: '图书兄弟-书本分类'
        }
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail,
        meta: {
            title: '图书兄弟-书本详情'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            title: '图书兄弟-个人中心',
            isAuthRequired: true // 授权才能访问 标志
        }
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: ShopCart,
        meta: {
            title: '图书兄弟-购物车',
            isAuthRequired: true // 授权才能访问 标志
        }
    },
    {
        path: '/address',
        name: 'Address',
        component: Address,
        meta: {
          title:'图书兄弟-地址管理',
          isAuthRequired:true
        }
      },
      {
        path: '/addressedit',
        name: 'AddressEdit',
        component: AddressEdit,
        meta: {
          title:'图书兄弟-编辑地址',
          isAuthRequired:true
        }
      },
      {
        path: '/order',
        name: 'Order',
        component: Order,
        meta: {
          title:'图书兄弟-生成订单',
          isAuthRequired:true
        }
      },
      {
        path: '/createorder',
        name: 'CreateOrder',
        component: CreateOrder,
        meta: {
          title:'图书兄弟-订单预览',
          isAuthRequired:true
        }
      },
      {
        path: '/orderdetail',
        name: 'OrderDetail',
        component: OrderDetail,
        meta: {
          title:'图书兄弟-订单详情',
          isAuthRequired:true
        }
      },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: '图书兄弟-用户注册'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '图书兄弟-用户登录'
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 添加路由导航守卫：路由跳转之前
router.beforeEach((to, from, next) => {
    // 如果需要授权，但当前状态为假，跳转到 登录页面
    // 判断原元素中的isAuthRequired 和 user下面的isLogin状态是否为false
    if (to.meta.isAuthRequired && store.state.user.isLogin === false) {
        Notify('您还没有登录，请先登录！')
        // 如果没有登录，跳转到 login
        return next('/login')
    } else {
        next() // 走到这里，证明已登录，直接放行
    }
    document.title = to.meta.title
})

export default router
