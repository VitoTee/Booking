// pages/room/room.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    room_info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.getRoomDetail(id);
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
  /**
   * 获取房间信息
  */
  getRoomDetail: function(id){
    app.globalData.room_data.forEach((item,i)=>{
      if(item.id == id){
        this.setData({
          room_info : item
        })
        //引用swiper组件
        this.swiperComponent = this.selectComponent('#swiperComponent');
        //调用方法 - 给组件传picList
        this.swiperComponent.getPicList(item.picList);

        //修改当前页标题
        wx.setNavigationBarTitle({
          "title": item.name
        })
      }
      return;
    })
  }
})