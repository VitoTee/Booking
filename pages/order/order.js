// pages/order/order.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId : null,
    roomMsg : null,
    hotelId : null,
    hotelMsg : null,
    checkInDate : app.globalData.checkInDate,
    checkInValue : app.globalData.checkInValue,
    checkOutDate : app.globalData.checkOutDate,
    checkOutValue : app.globalData.checkOutValue,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //储存参数id
    this.setData({
      // roomId : options.id
      roomId : 2,
      hotelId : 3
    });
    this.getMsg();
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
    let that = this;
    //同步公共数据
    app.syncGlobalData(that, app);

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
   * 获取信息
  */
  getMsg: function(){
    //获取房间信息
    app.globalData.room_data.forEach((item,i)=>{
      if(item.id == this.data.roomId){
        this.setData({
          roomMsg : item
        })
      }
    })
    //获取酒店信息
    app.globalData.hotel_data.forEach((item,i)=>{
      if(item.id == this.data.hotelId){
        this.setData({
          hotelMsg : item
        })
      }
    })
  },
  /**
   * 入住日期改变
  */
  checkInChange: function (e) {
    if (new Date(e.detail.value).getTime() >= new Date().getTime()) {
      //设置入住日期为当前选择日期
      let checkInResult = app.checkInChange(e.detail.value);
      this.setData({
        checkInDate: checkInResult.filterValue,
        checkInValue: checkInResult.value,
        checkInMonthDate: checkInResult.month_date
      });
      //判断选择日期是否大于退房日期
      if (new Date(e.detail.value).getTime() >= new Date(app.globalData.checkOutValue).getTime()) {
        //修改退房日期为选择日期的后一天
        let checkOutResult = app.checkOutChange(new Date(e.detail.value).getTime() + 1000 * 60 * 60 * 24);
        this.setData({
          checkOutDate: checkOutResult.filterValue,
          checkOutValue: checkOutResult.value,
          checkOutMonthDate: checkOutResult.month_date
        })
      }
      this.stayNightsChange();
    } else {
      wx.showToast({
        title: '入住日期选择错误',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 退房日期改变
  */
  checkOutChange: function (e) {
    //当前日期(年-月-日)
    let nowDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    //判断选择日期是否大于当前日期 且 选择日期是否大于入住日期
    if (
      new Date(e.detail.value).getTime() > new Date(nowDate).getTime()
      &&
      new Date(e.detail.value).getTime() > new Date(app.globalData.checkInValue).getTime()
    ) {
      //设置退房日期为当前选择日期
      let checkOutResult = app.checkOutChange(e.detail.value);
      this.setData({
        checkOutDate: checkOutResult.filterValue,
        checkOutValue: checkOutResult.value,
        checkOutMonthDate: checkOutResult.month_date
      });
      this.stayNightsChange();
    } else {
      wx.showToast({
        title: '退房日期选择错误',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 修改入住晚数
  */
  stayNightsChange: function () {
    //修改入住晚数
    let stayNights = app.stayNightsChange(app.globalData.checkInValue, app.globalData.checkOutValue);
    this.setData({
      stayNights: stayNights
    })
  }
})