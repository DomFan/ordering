//app.js
App({
  onLaunch: function () {
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('appId', 'wxf44e40ccfe45397e')

    let that = this;
    wx.getSystemInfo({//  获取页面的有关信息
      success: function (res) {
        console.log('getSystemInfo', res)
        wx.setStorageSync('systemInfo', res)
        var ww = res.windowWidth;
        var hh = res.windowHeight;
        that.globalData.ww = ww;
        that.globalData.hh = hh;
      }
    });
    // console.log(that.globalData.ww, that.globalData.hh)

    // 获取用户相关信息
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        console.log('getUserInfo', res)
        // {avatarUrl:       "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqOibyjDOz1oFuVBZdibnSLljUAkCMfibSxUtdaerJiblm3wJbnZsEiavgS2tbkmKPkCD9VtFmibhJK62EQ/0",         city: "Chaoyang", country: "China", gender: 1, language: "zh_CN", nickName: "范儿", province: "Beijing" }
        wx.setStorageSync('userInfo', res.userInfo)
      },
      fail: function(res) {},
      complete: function(res) {},
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('login,', res, res.code)
        if (res.code) {
          return
          //发起网络请求
          wx.request({
            url: '',
            data: {
              code: res.code,
              appId: 'wxf44e40ccfe45397e'
            },
            success: function (res) {
              console.log('login -> code -> openId', res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  // 贝塞尔曲线
  bezier: function (pots, amount) {
    var pot;
    var lines;
    var ret = [];
    var points;
    for (var i = 0; i <= amount; i++) {
      points = pots.slice(0);
      lines = [];
      while (pot = points.shift()) {
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount));
        } else if (lines.length > 1) {
          points = lines;
          lines = [];
        } else {
          break;
        }
      }
      ret.push(lines[0]);
    }
    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
      var ret = [];
      pointA = points[0];//点击
      pointB = points[1];//中间
      xDistance = pointB.x - pointA.x;
      yDistance = pointB.y - pointA.y;
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
      tan = yDistance / xDistance;
      radian = Math.atan(tan);
      tmpPointDistance = pointDistance * rate;
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      };
      return ret;
    }
    return {
      'bezier_points': ret
    };
  },

  globalData: {
    userInfo: null,
    changeID: null
  }
})