// pages/shopcart/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    total: 0,
    count: 0

  },
  // 去结算
  gotoCount: function (e) {
    // 商户ID：2088621816522223
    console.log('确认付款')
    let that = this,
        // timeStamp = new Date(),
        timeStamp = Date.parse(new Date()),
        nonceStr = '12387919873'

    // new Date(): Tue Apr 24 2018 09:58:10 GMT+0800 (中国标准时间)
    // Date.parse(new Date()): 1524632990000
    console.log(timeStamp) 
    console.log(new Date(timeStamp))

    return
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
      success: function(res) {

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  
  // 删除商品
  deleteShopcartInCart: function (e) {
    // 选定被点击的元素
    let addTarget = this.data.shopList.findIndex(item => item.name === e.target.dataset.name);
    let tempPrice = 0;
    let count = this.data.count - 1;
    this.data.shopList[addTarget].num--;

    // 如果减少后商品数量为0
    if (this.data.shopList[addTarget].num < 1) {
      // 总价的减少
      tempPrice = parseInt(this.data.total) - parseInt(this.data.shopList[addTarget].price)
      this.data.shopList.splice(addTarget, 1);
      // console.log(this.data.total)

      this.setData({
        total: tempPrice
      })
    } else {
      // 计算出来新的价格
      tempPrice = parseInt(this.data.total) - parseInt(this.data.shopList[addTarget].price)
      // console.log(this.data.total)
    }
    this.setData({
      shopList: this.data.shopList,
      total: tempPrice,
      count: count
    })
    wx.setStorageSync('storageList', this.data.shopList)
    wx.setStorageSync('count', this.data.count)
    wx.setStorageSync('total', this.data.total)  // ??

    // console.log('删除商品时，', wx.getStorageSync('storageList'), wx.getStorageSync('total'), wx.getStorageSync('count'))
  },

  // 添加商品
  addShopcartInCart: function (e) {
    let count = this.data.count + 1;
    // 添加的商品
    let addTarget = this.data.shopList.findIndex(item => item.name === e.target.dataset.name);
    this.data.shopList[addTarget].num++;
    // 计算新的总价
    let tempPrice = parseInt(this.data.total) + parseInt(this.data.shopList[addTarget].price)
    this.setData({
      shopList: this.data.shopList,
      total: tempPrice,
      count: count
    })

    wx.setStorageSync('storageList', this.data.shopList)
    wx.setStorageSync('count', this.data.count)
    wx.setStorageSync('total', this.data.total)
    // console.log('添加商品时，', wx.getStorageSync('storageList'), wx.getStorageSync('total'), wx.getStorageSync('count'))
  },

  // 结算
  toCount: function (e) {
    console.log('go to count')
    let that = this,
        timeStamp = new Date()


    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    return
    wx.request({
      url: '',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 清空购物车
  toClear: function (e) {
    let length = this.data.shopList.length
    
    if (length != 0) {
      // 清除本地数据缓存
      wx.setStorageSync('storageList', new Array)
      wx.setStorageSync('total', 0)
      wx.setStorageSync('count', 0)
      // 清除data中数据
      this.setData({ 
        shopList: [],
        total: 0,
        count: 0
      })
    }
    console.log('清空购物车')
    console.log(wx.getStorageSync('storageList'), this.data.total)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopList = wx.getStorageSync('storageList'),
        total = wx.getStorageSync('total'),
        count = wx.getStorageSync('count')

    shopList.length > 0 ? this.setData({ shopList }) : ''
    total > 0 ? this.setData({ total }) : ''
    count > 0 ? this.setData({ count }) : ''
    console.log('购物车页面加载时，', wx.getStorageSync('storageList'), wx.getStorageSync('total'), wx.getStorageSync('count'))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let shopList = wx.getStorageSync('storageList'),
      total = wx.getStorageSync('total'),
      count = wx.getStorageSync('count')

    shopList.length > 0 ? this.setData({ shopList }) : ''
    total > 0 ? this.setData({ total }) : ''
    count > 0 ? this.setData({ count }) : ''
    // console.log('购物车页面初次渲染完成时，', wx.getStorageSync('storageList'), wx.getStorageSync('total'), wx.getStorageSync('count'))
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let shopList = wx.getStorageSync('storageList'),
      total = wx.getStorageSync('total'),
      count = wx.getStorageSync('count')

    shopList.length > 0 ? this.setData({ shopList }) : ''
    total > 0 ? this.setData({ total }) : ''
    count > 0 ? this.setData({ count }) : ''
    console.log('购物车页面显示时，', wx.getStorageSync('storageList'), wx.getStorageSync('total'), wx.getStorageSync('count'))
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