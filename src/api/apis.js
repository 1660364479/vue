import axios from 'axios'
axios.defaults.baseURL='http://127.0.0.1:5000/'

//登录
 export const click_login=(account,password)=>axios.post('/users/checkLogin',{account,password})
//  添加账号
 export const click_add=(account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})
//  喧染列表
 export const click_obtain=(currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})
//  删除账号
export const click_delete=(id)=>axios.get('/users/del',{params:{id}})
// 批量删除
 export const Bulk_delete=(ids)=>axios.get('/users/batchdel',{params:{ids}})
 // 修改账号
 export const Bulk_modify=(id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup})
 //验证旧密码
 export const chek_Old =(id,oldPwd)=>axios.get('/users/checkoldpwd',{params:{id,oldPwd}})
//  修改密码
 export const change_pwd =(newPwd,id)=>axios.post('/users/editpwd',{newPwd,id})
// 验证token是否过期
export const check_token =(token)=>axios.get('/users/checktoken',{params:{token}})
// 获取账号
export const check_accountinfo =(id)=>axios.get('/users/accountinfo',{params:{id}})
//添加分类
export const check_addcate =(cateName,state)=>axios.post('/goods/addcate',{cateName,state})
// 获取分类
export const check_categories=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})
// 删除
export const check_delete=(id)=>axios.get('/goods/delcate',{params:{id}})
// 修改分类
export const check_modify=(id,cateName)=>axios.post('/goods/editcate',{id,cateName})
//商品分类
export const shop_modify=()=>axios.get('/goods/categories',{params:{}})

//添加商品/goods/add
export const shop_add=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})

// 首页echarts
export const index_echarts=()=>axios.get('/order/totaldata',{params:{}})
// 商品统计echarts
export const Commodity_echarts=(date)=>axios.get('/order/ordertotal',{params:{date}})
//获取商品列表
export const shop_list=(currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize }})
// 删除商品
export const del_shop=(id)=>axios.get('/goods/del',{params:{id}})
// 修改商品
export const change_shop=(name,category,price,imgUrl,goodsDesc,id)=>axios.post('/goods/edit',{name,category,price,imgUrl,goodsDesc,id})
//获取订单列表
export const list_order=(currentPage,pageSize)=>axios.get('/order/list',{params:{currentPage,pageSize}})
//23. 查询
export const list_search=(currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get('/order/search',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})
//24. 获取订单详情
export const list_detail=(id)=>axios.get('/order/detail',{params:{id}})
//修改订单
export const list_edit=(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})
// 26. 获取店铺详情
export const shop_info=()=>axios.get('/shop/info',{params:{}})
// 28. 店铺内容修改
export const shop_xiugai=(id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics)=>axios.post('/shop/edit',{id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics})


