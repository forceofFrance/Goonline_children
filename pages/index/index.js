//index.js
//获取应用实例
const app = getApp()

Page({

  formsubmit: function(e){
    console.log("表单发生了点击事件，内容：",e.detail.value);
    console.log("用户名:",e.detail.value.user_name);
    console.log("密码:",e.detail.value.user_password);

    wx.request({
      url: 'http://dev.go-online.org.cn:8081/api/auth?type=password',
      data:{
        user_name:e.detail.value.user_name,
        user_password:e.detail.value.user_password,
      },
      method:"POST",

      header: {
        'content-type': 'application/json' ,// 默认值
        },
        
      success:function(res){
        console.log(res.data);
      }
    })
  },
  
  formreset: function(e){
  
  },



  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})


