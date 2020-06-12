<template>
  
    <el-container>
      <el-col :span="4" width="200px">
        <el-menu
          default-active="/Index/Home"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          router
          active-text-color="#ffd04b"
        >
          <div v-for="item in newtreelist" :key="item.index">
            <el-submenu v-if="item.children" :index="item.index">
              <template slot="title">
                <i :class="item.icls"></i>
                <span>{{ item.title }}</span>
              </template>
              <!-- 二级 -->
              <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
                <i :class="child.icls"></i>
                <span slot="title">{{ child.title }}</span>
              </el-menu-item>
            </el-submenu>
            <!--一级选项卡 -->
            <el-menu-item v-else :index="item.index">
              <i :class="item.icls"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
      <!-- 右边 -->
      <el-container>
        <el-header height="50px">
          <!-- 面包屑 -->
          <div>
            <el-breadcrumb separator="/" style="float: left;">
              <el-breadcrumb-item
                v-for="item in breadlist"
                :key="item"
                style="line-height: 45px;"
              >{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div style="float: right;display:flex">
              <p style="line-height: 50px;" v-html="username"></p>
              <img style="width:50px; border-radius: 50%;" :src="headimg" />
            </div>
          </div>
        </el-header>
        <div>
          <router-view></router-view>
        </div>
      </el-container>
    </el-container>
</template>

<script>
import { check_token,check_accountinfo } from "../api/apis";

export default {
  data(){
    return {
      treelist: [
        {
          index: "/Index/People",
          icls: "el-icon-menu",
          title: "个人中心",
          role: ["super","normal"]
        },
        {
          index: "/Index/Home",
          icls: "el-icon-menu",
          title: "后台首页",
          role: ["super"]
        },
        {
          index: "account",
          icls: "el-icon-location",
          title: "账号管理",
          role: ["super"],
          children: [
            {
              index: "/Index/Accountadd",
              icls: "el-icon-menu",
              title: "添加账号",
             
            },
            {
              index: "/Index/Changepsd",
              icls: "el-icon-menu",
              title: "修改密码",
      
            },
            {
              index: "/Index/Accountlist",
              icls: "el-icon-menu",
              title: "账号列表",
            
            }
          ]
        },
        {
          index: "/Index/Order",
          icls: "el-icon-document",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "/Index/Storemanagement",
          icls: "el-icon-setting",
          title: "店铺管理",
          role: ["super"]
        },
        {
          index: "sale",
          icls: "el-icon-location",
          title: "销售统计",
          role: ["super"],
          children: [
            {
              index: "/Index/Commodity",
              icls: "el-icon-menu",
              title: "商品统计"
            },
            {
              index: "/Index/OrderStatistics",
              icls: "el-icon-menu",
              title: "订单统计"
            }
          ]
        },
        {
          index: "item",
          icls: "el-icon-location",
          title: "商品管理",
          role: ["super", "normal"],
          children: [
            {
              index: "/Index/Productadd",
              icls: "el-icon-menu",
              title: "添加商品"
            },
            {
              index: "/Index/Productlist",
              icls: "el-icon-menu",
              title: "商品列表"
            },
            {
              index: "/Index/Classification",
              icls: "el-icon-menu",
              title: "商品分类"
            }
          ]
        }
      ],
      breadlist: ["首页"],
      //默认选中
      defaultActive: "",
      username: "",
      role:'',
      headimg:'',
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeBreadlist(hash) {
      let arr = [];
      //根据hash值，改变面包屑数组
      switch (hash) {
        case "/Index/People":
          arr = ["个人中心"];
          break;
        case "/Index/Home":
          arr = ["首页"];
          break;
        case "/Index/Order":
          arr = ["订单管理"];
          break;
        case "/Index/Shop":
          arr = ["商品管理"];
          break;
        case "/Index/Productlist":
          arr = ["商品管理", "商品列表"];
          break;
        case "/Index/Productadd":
          arr = ["商品管理", "商品添加"];
          break;
        case "/Index/Accountadd":
          arr = ["账号管理", "添加账号"];
          break;
        case "/Index/Changepsd":
          arr = ["账号管理", "修改密码"];
          break;
        case "/Index/Accountlist":
          arr = ["账号管理", "账号列表"];
          break;
      }
       this.breadlist = arr;
    }
  },
  //权限
  computed: {
    newtreelist() {
       return this.treelist.filter(i => i.role.includes(this.role));
    }
  },
  
  watch: {
    //监听路由对象的变化
    $route: {
      handler: val => {
        window._indexthis.changeBreadlist(val.path);
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    let hash = this.$route.path;
    this.defaultActive = hash;
    //改变面包屑数组
    this.changeBreadlist(hash);
    //保存这个this
    window._indexthis = this;

    // 验证token是否过期
    check_token(localStorage.token).then(res => {
      if (res.data.code == 0) {
        //还在登录状态
        this.username = localStorage.acc;
      } else {
        //登录失效
        this.username = "<a href='#/'>亲，请登录</a>";
      }
    });
    console.log(localStorage.role);
    console.log(localStorage.id);
    this.role=localStorage.role
    //获取用户信息
    check_accountinfo(localStorage.id).then(res=>{
     console.log(res.data.accountInfo.imgUrl);
     this.headimg=res.data.accountInfo.imgUrl
     this.username=res.data.accountInfo.account
    })
    
  },
 
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
 
}
.el-header div span {
  font-size: 16px;
}
.el-header div a {
  text-decoration: none;
  font-size: 16px;
}
.el-menu{
  width: 100%;
  height: 100%;
}
.el-menu-item{
  width: 100%;
  height: 100%;
}

</style>