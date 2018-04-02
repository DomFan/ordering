// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      "name": "咖啡小食随心配套餐",
      "price": "12.0",
      "url": "http://imgm.4008823823.com.cn/kfcmwos/img//S/270_117807.jpg"
    },
    navArray: [],
    // 商品列表
    foodArray: [],
    // 购物车列表
    shopList: [],
    // 购物车总价
    total: 0,
    // 购物车商品数量
    count: 0,

  },

  torder: function () {
    console.log('go')
    // wx.switchTab({
      //   url: '../order/order',
      //   success: function(res) {},
      //   fail: function(res) {},
      //   complete: function(res) {},
      // })
    wx.navigateTo({
      url: '../order/order',
    })
    // {
      //   "selectedIconPath": "images/order_s.png",
      //     "iconPath": "images/order.png",
      //       "pagePath": "pages/order/order",
      //         "text": "订单"
      // },
    },

  // 加号 添加购物车
  addShopcart: function (e) {
    let that = this,
        shopList = this.data.shopList,
        // 计数
        itemNum = 1,
        // 总价
        total = this.data.total,
        count = this.data.count + 1

    total = parseInt(total) + parseInt(e.target.dataset.price);
    // 同步获取数据缓存 storageList
    let storageList = wx.getStorageSync('storageList')
    console.log('上一次添加的数据缓存', storageList, '当前点击的商品',  e.target.dataset)
    // 条件判断
    // 商品列表中是否有商品
    if (that.data.shopList.length > 0) {
      // 商品名是否相同 不重复添加同名商品
      let isHave = that.data.shopList.findIndex(item => item.name == e.target.dataset.name)
      // console.log('isHave--', isHave)
      // isHave 不等于1 则表示商品列表中存在该商品
      if (isHave != -1) {
        // debugger
        that.data.shopList[isHave].num++
      } else { 
        // debugger
        // isHave为-1 表示商品列表中无该商品 添加新的商品进列表
        that.data.shopList.push({
          name: e.target.dataset.name,
          price: e.target.dataset.price,
          num: itemNum
        })
      }
    // 没有商品时直接添加
    } else {
      that.data.shopList.push({
        name: e.target.dataset.name,
        price: e.target.dataset.price,
        num: itemNum
      })
    }
    // 同步将数据添加到缓存
    wx.setStorageSync('storageList', that.data.shopList)
    // console.log('shopList', that.data.shopList)
    console.log('现在的数据缓存中的数据', wx.getStorageSync('storageList'))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面加载时 创建新的数据缓存 是否有必要？
    wx.setStorageSync('storageList', new Array)

    let that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 0,
      mask: true
    })
    // 发送请求
    wx.request({
      url: 'http://easy-mock.com/mock/5905d4597a878d73716e2c6b/kfc/kfc',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          navArray: res.data.navArray,
          foodArray: res.data.foodArray
        })
      }
    }, function () {
      wx.hideToast();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})