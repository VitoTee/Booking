// pages/list/list.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    destination: app.globalData.destination,
    hotelList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      destination : options.city
    })
    this.getHotelList();
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
   * 获取酒店列表
  */
  getHotelList: function(){
    let hotel_data = app.globalData.hotel_data;
    let result = [];
    hotel_data.forEach((item,i)=>{
      if(item.city == this.data.destination){
        result.push(item);
        this.setData({
          hotelList : result
        })
      }
    })
  },
  /**
   * 选择酒店，跳转去详情页
  */
  toDetail: function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id,
      success: function(msg){
      },
      fail: function(err){
        console.log(err);
      }
    })
  }
})