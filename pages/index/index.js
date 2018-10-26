//index.js
//获取应用实例
const app = getApp();
let timer;

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })

Page({

  /**
   * 页面的初始数据
   */
  data: {
    intro_data: [],
    hot_data: [],
    hot_getOneData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIntroData();
    this.getHotData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    //引用searchBox组件
    app.getSearchBoxComponent(that);

    //引用footer组件
    app.getFooterComponent(that);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    //引用searchBox组件
    that.searchBoxComponent = that.selectComponent('#searchBoxComponent');
    //同步global数据
    that.searchBoxComponent.syncGlobalData();
    
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
    
  },

  /**
   * 获取今日特惠数据列表
  */
  getIntroData: function(){
    this.setData({
      intro_data: app.globalData.index_intro_data
    })
  },
  /**
   * 获取热门数据列表
  */
  getHotData: function(e){
    let size = 4,
      offset = 0; 
    if(typeof e !== 'undefined'){
      size += e.target.dataset.length;
    }
    this.setData({
      hot_data: app.globalData.index_hot_data.slice(offset,size),
      hot_getOneData: app.globalData.index_hot_data[9]
    })
  },

  /**
   * 倒数定时器
   * deadline => 结束时间
   * key => 数组键
  */
  countDown: function(deadline,key){
    let EndTime = new Date(deadline).getTime();
    let NowTime = new Date().getTime();
    let total_micro_second = EndTime - NowTime;
    let dataList = this.data.intro_data;

    if (typeof key !== 'undefined') {
      dataList[key].deadline = this.dateformats(total_micro_second);
      if (total_micro_second <= 0) {
        dataList[key].deadline = '已结束';
      }
      this.setData({
        intro_data: dataList
      });
      setTimeout(() => {
        this.countDown(deadline, key+1);
      }, 1000)
    }
  },
  /**
   * 时间格式化输出，每1s都会调用一次
  */
  dateformats: function(micro_second) {
    // 总秒数
    var second = Math.floor(micro_second / 1000);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    var hrStr = hr.toString();
    if(hrStr.length == 1) hrStr = '0' + hrStr;
    // 分钟
    var min = Math.floor(second / 60 % 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;
    // 秒
    var sec = Math.floor(second % 60);
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;
    if (day <= 1) {
      return hrStr + ":" + minStr + ":" + secStr;
    } else {
      return day + " 天 " + hrStr + ":" + minStr + ":" + secStr;
    }
  }

})
