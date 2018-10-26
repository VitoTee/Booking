// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkInDate: app.globalData.checkInDate,
    checkOutDate: app.globalData.checkOutDate,
    checkInValue: app.globalData.checkInValue,
    checkOutValue: app.globalData.checkOutValue,
    checkInMonthDate: app.globalData.checkInMonthDate,
    checkOutMonthDate: app.globalData.checkOutMonthDate,
    countTime: null,
    detail_id: null,
    detail_info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //存储参数id
    this.setData({
      detail_id : options.id
    })

    //获取详情数据
    this.getDetailInfo(options.id)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    //引用footer组件
    app.getFooterComponent(this);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    //同步公共数据
    app.syncGlobalData(that,app);
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
   * 获取详情数据
  */
  getDetailInfo: function(id){
    app.globalData.hotel_data.forEach((item,i)=>{
      if(item.id == this.data.detail_id){
        this.setData({
          detail_info : item
        })

        //设置当前页面标题
        wx.setNavigationBarTitle({
          title: item.name
        })

        //调用倒数计时器
        this.countDown(item.deadline);

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
    let nowDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
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
  },
  /**
   * 倒计时
  */
  countDown: function(countValue){
    // console.log(countValue);
    let result = null;
    let deadline = new Date(countValue).getTime() + (60*60*16*1000);
    let now = new Date().getTime();
    if(deadline < now){
      result = '活动已结束'
    }else{
      let leftTime = parseInt((deadline - now) / 1000);
      let day = parseInt(leftTime / (60*60*24));
      let h = parseInt(leftTime / (60*60) % 24);
      let m = parseInt((leftTime / 60) % 60);
      let s = leftTime % 60;
      h = h < 10 ? `0${h}` : h;
      m = m < 10 ? `0${m}` : m;
      s = s < 10 ? `0${s}` : s;
      result = `${day}天 ${h} : ${m} : ${s}`;
      setTimeout(()=>{
        this.countDown(countValue);
      },1000)
    }
    this.setData({
      countTime: result
    })
  },
  /**
   * 跳转去地图
  */
  toMap: function(e){
    let {latitude,longitude} = e.currentTarget.dataset;
    console.log(latitude, longitude)
    wx.navigateTo({
      url: `../map/map?latitude=${latitude}&longitude=${longitude}`,
      success: function(res){
        console.log(res);
      }
    })
  }
})