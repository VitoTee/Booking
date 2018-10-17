// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //标记点
    markers: [{
      iconPath: "/assets/images/search.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: 50,
      height: 50
    }],
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color: "#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
    controls: [{
      id: 1,
      iconPath: '/assets/images/icons/location.png',
      position: {
        left: 190,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    latitude: '',
    longitude: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      latitude: options.latitude,
      longitude: options.longitude,
      'markers[0].latitude': options.latitude,
      'markers[0].longitude': options.longitude
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

  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  /**
   * 获取用户当前位置坐标
  */
  getCurrentLocation: function(){
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {
        console.log(res);
        return res;
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})