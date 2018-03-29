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
    imgArray: [],
    // 商品列表
    foodArray: [],
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
  setstorage: function () {
    // wx.getStorage({
    //   key: 'aaa',
    //   success: function (res) {
    //     console.log('getStorage', res)
    //   },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setStorage({
    //   key: 'aaa',
    //   data: 'hello',
    //   success: function (res) {
    //     console.log('setStorage', res)
    //   },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })

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
          imgArray: res.data.navArray,
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