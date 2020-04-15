const common=require('../utils/common')
const network=require('../utils/network')

// 获取轮播图数据
function GetSwiperData(){
  return network.request({
    url:common.baseUrl+"/api/Home/GetSwiperItemList",
    method:'Get'
  })
}

// 获取推荐数据
function GetRecommendData(){
  return network.request({
    url:common.baseUrl+"/api/Home/GetRecommendItemList",
    method:'Get',
    data:{
      recommendType:0,
      count:4
    }
  })
}

// 获取本周流行数据
function GetWeeklyData(){
  return network.request({
    url:common.baseUrl+"/api/Home/GetRecommendItemList",
    method:'Get',
    data:{
      recommendType:1,
      count:8
    }
  })
}

// 获取页签商品数据
function GetTabGoodItem(tabIndex,page){
  return network.request({
    url:common.baseUrl+"/api/Home/GetMoguGoodItemList",
    method:'Get',
    data:{
      type:tabIndex,
      sort:'CreateTime',
      isAscending:true,
      page:page,
      pageSize:10
    }
  })
}

module.exports={
  GetSwiperData,
  GetRecommendData,
  GetWeeklyData,
  GetTabGoodItem
}