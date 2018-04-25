// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
    shopList: [],
    prepaidList: [],
    total: 0,
    count: 0,
    prepaidTotal: 0,
    prepaidCount: 0,
    showShopList: false,
    showPrepaidList: false
  },

  // 查看待支付订单btn
  openShopList: function (e) {
    let showShopList = this.data.showShopList
    let shopList = wx.getStorageSync('storageList'),
      total = wx.getStorageSync('total'),
      count = wx.getStorageSync('count')

    shopList.length > 0 ? this.setData({ shopList }) : this.setData({ shopList: new Array })
    total > 0 ? this.setData({ total }) : this.setData({ total: 0 })
    count > 0 ? this.setData({ count }) : this.setData({ count: 0 })
    this.setData({
      showShopList: !showShopList
    })

  },
  // 查看已支付订单按钮
  openPrepaidList: function (e) {
    let showPrepaidList = this.data.showPrepaidList
    let shopList = wx.getStorageSync('storageList'),
      prepaidList = wx.getStorageSync('prepaidList'),
      total = wx.getStorageSync('total'),
      count = wx.getStorageSync('count'),
      prepaidTotal = wx.getStorageSync('prepaidTotal'),
      prepaidCount = wx.getStorageSync('prepaidCount')

    shopList.length > 0 ? this.setData({ shopList }) : this.setData({ shopList: new Array })
    // prepaidList.length > 0 ? this.setData({ prepaidList }) : this.setData({ prepaidList: new Array })
    prepaidList.length <= 0 ? this.setData({ prepaidList: shopList }) : this.setData({ prepaidList })
    total > 0 ? this.setData({ total }) : this.setData({ total: 0 })
    count > 0 ? this.setData({ count }) : this.setData({ count: 0 })
    // prepaidTotal > 0 ? this.setData({ prepaidTotal: total }) : this.setData({ prepaidTotal: 0 })
    prepaidTotal <= 0 ? this.setData({ prepaidTotal: total }) : this.setData({ prepaidTotal })
    prepaidCount > 0 ? this.setData({ prepaidCount: count }) : this.setData({ prepaidCount: 0 })
    this.setData({
      showPrepaidList: !showPrepaidList
    })
  },

  bitphone: function () {
    wx.makePhoneCall({
      phoneNumber: '1340000'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this, 
      shopList = wx.getStorageSync('storageList'),
      prepaidList = wx.getStorageSync('prepaidList'),      
      total = wx.getStorageSync('total'),
      count = wx.getStorageSync('count'),
      prepaidTotal = wx.getStorageSync('prepaidTotal'),
      prepaidCount = wx.getStorageSync('prepaidCount')

    shopList.length > 0 ? this.setData({ shopList }) : ''
    // prepaidList.length > 0 ? this.setData({ prepaidList }) : ''
    // 模拟数据
    this.setData({ prepaidList: shopList })
    total > 0 ? this.setData({ total }) : ''
    count > 0 ? this.setData({ count }) : ''
    prepaidTotal > 0 ? this.setData({ prepaidTotal }) : ''
    prepaidCount > 0 ? this.setData({ prepaidCount }) : ''

    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
        })
      }
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
    // 页面显示时 订单详情 默认关闭
    this.setData({
      showShopList: false,
      showPrepaidList: false
    })

    
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