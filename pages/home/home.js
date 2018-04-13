// pages/home/home.js
let app = getApp()
Page({
// 点餐小程序中购物车页面及逻辑修改，从商品列表中分离到导航栏中，布局修改。
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
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
    list: [{ id: 1, name: '全部', number: 28, }, { id: 2, name: '店铺预约', number: 28, }, { id: 3, name: '产品预约', number: 28, }, { id: 4, name: '领券预约', number: 28, }, { id: 5, name: '拼团预约', number: 28, }, ],
    // 是否隐藏小球
    hide_good_box: true,
  },
  print: function (e) {
    console.log(e.target.dataset)
  },

  torder: function () {
    return
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
        count = this.data.count + 1,
        rollX = e.touches["0"].clientX, // X坐标
        rollY = e.touches["0"].clientY  // Y坐标

    console.log('roll--', rollX, rollY)

    // 每添加一次计算商品总价格
    total = parseInt(total) + parseInt(e.target.dataset.price);
    // 同步获取数据缓存 storageList
    let storageList = wx.getStorageSync('storageList')
    // console.log('上一次添加的数据缓存', storageList, '当前点击的商品',  e.target.dataset)
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
    that.setData({
      total,
      count
    })
    // 同步将数据添加到缓存
    wx.setStorageSync('storageList', that.data.shopList)
    // console.log('shopList', that.data.shopList)
    wx.setStorageSync('total', that.data.total)
    wx.setStorageSync('count', that.data.count)


    console.log('现在的数据缓存中的数据', wx.getStorageSync('storageList'), '总价', this.data.total, '总数', this.data.count)

    // 点击时手指位置
    this.finger = {};
    // 顶点位置
    var topPoint = {};
    // 点击的坐标
    this.finger['x'] = e.touches["0"].clientX;
    this.finger['y'] = e.touches["0"].clientY;

    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }
    // Math.abs() 取绝对值
    // topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

    if (this.finger['x'] > this.busPos['x']) {
      topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
    } else {//
      topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
    }

    //topPoint['x'] = this.busPos['x'] + 80
    // this.linePos = app.bezier([this.finger, topPoint, this.busPos], 30);
    this.linePos = app.bezier([this.busPos, topPoint, this.finger], 30);
    this.startAnimation(e);
  },

  // 动画
  startAnimation: function (e) {
    var index = 0, 
        that = this,
        bezier_points = that.linePos['bezier_points'];

    this.setData({
      hide_good_box: false,
      bus_x: that.finger['x'],
      bus_y: that.finger['y']
    })
    var len = bezier_points.length;
    index = len
    this.timer = setInterval(function () {
      index--;
      // 条件控制 清零时 return
      if (!bezier_points[index]) { return }
      that.setData({
        bus_x: bezier_points[index]['x'],
        bus_y: bezier_points[index]['y']
      })
      if (index < 1) {
        clearInterval(that.timer);
        // that.addGoodToCartFn(e);
        that.setData({
          hide_good_box: true 
        })
      }
    }, 20);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options--', options)

    let userInfo = wx.getStorageSync('userInfo')
    this.setData({ userInfo })

    // 购物车位置
    this.busPos = {};
    // this.busPos['x'] = 45;
    // this.busPos['x'] = app.globalData.ww/2;
    this.busPos['x'] = 56;
    this.busPos['y'] = app.globalData.hh + 20;

    // 页面加载时 创建新的数据缓存 是否有必要？
    wx.setStorageSync('storageList', new Array)
    wx.setStorageSync('total', 0)
    wx.setStorageSync('count', 0)

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
    }, 
    function () {
      wx.hideToast();
    })

    console.log('页面加载时，', wx.getStorageSync('storageList'), wx.getStorageSync('total'), wx.getStorageSync('count'))
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

    console.log('首页显示时onShow', wx.getStorageSync('storageList'), wx.getStorageSync('total'), wx.getStorageSync('count'))
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