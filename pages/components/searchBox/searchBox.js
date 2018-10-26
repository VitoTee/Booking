// pages/components/searchBox/searchBox.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    roomNumArr: app.globalData.roomNumArr,
    roomNumIndex: app.globalData.roomNumIndex,
    adultNumArr: app.globalData.adultNumArr,
    adultNumIndex: app.globalData.adultNumIndex,
    childNumArr: app.globalData.childNumArr,
    childNumIndex: app.globalData.childNumIndex,
    checkInDate: app.globalData.checkInDate,
    checkOutDate: app.globalData.checkOutDate,
    checkInValue: app.globalData.checkInValue,
    checkOutValue: app.globalData.checkOutValue,
    checkInMonthDate: app.globalData.checkInMonthDate,
    checkOutMonthDate: app.globalData.checkOutMonthDate,
    stayNights: app.globalData.stayNights,
    destination: app.globalData.destination,
    search_box: false,
    animationSearchBox: {},
    animationCloseBtn: {},
    animationMask: {},
    animationCitySearchBox: {},
    inputCanTap: false,
    inputIsDisabled: true,
    city_data: [],
    isSeaching: false,
    isLoading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 客房数量改变
    */
    roomNumChange: function (e) {
      app.roomNumChange(e);
      this.setData({
        roomNumIndex: app.globalData.roomNumIndex
      })
    },

    /**
     * 成人数量改变
    */
    adultNumChange: function (e) {
      app.adultNumChange(e);
      this.setData({
        adultNumIndex: e.detail.value
      })
    },

    /**
     * 儿童数量改变
    */
    childNumChange: function (e) {
      app.childNumChange(e);
      this.setData({
        childNumIndex: e.detail.value
      })
    },

    /**
     * 显示搜索picker
    */
    showSearchBox: function () {
      this.animation = wx.createAnimation({
        duration: 350
      });
      // search box
      this.animation.left(0).step();
      this.setData({ animationSearchBox: this.animation.export() });
      this.animation.currentTransform = [];
      // close btn
      this.animation.opacity(1).step();
      this.setData({ animationCloseBtn: this.animation.export() })
      this.animation.currentTransform = [];
      // mask
      this.animation.opacity(1).left(0).step();
      this.setData({ animationMask: this.animation.export() })
      this.animation.currentTransform = [];
      // others
      this.setData({
        search_box: true,
        placeholderColor: '#80808',
        inputCanTap: true
      })

    },

    /**
     * 隐藏搜索picker
    */
    hideSearchBox: function () {
      // search box
      this.animation.left('-100%').step();
      this.setData({ animationSearchBox: this.animation.export() });
      this.animation.currentTransform = [];
      // close btn
      this.animation.opacity(0).step();
      this.setData({ animationCloseBtn: this.animation.export() })
      this.animation.currentTransform = [];
      // mask
      this.animation.opacity(0).left('-100%').step();
      this.setData({ animationMask: this.animation.export() })
      this.animation.currentTransform = [];
      // others
      this.setData({
        search_box: false,
        placeholderColor: '#4393F7',
        inputCanTap: false
      })
    },

    /**
     * 显示城市搜索框
    */
    showCitySearchBox: function (e) {
      this.animation = wx.createAnimation({
        duration: 350
      });
      let canTap = e.target.dataset.cantap;
      if (canTap) {
        this.animation.left(0).step();
        this.setData({ animationCitySearchBox: this.animation.export() });
        this.animation.currentTransform = [];
      } else {
        this.showSearchBox();
      }
    },

    /**
     * 隐藏城市搜索框
    */
    hideCitySearchBox: function () {
      this.animation.left('100%').step();
      this.setData({ animationCitySearchBox: this.animation.export() });
      this.animation.currentTransform = [];
      // this.hideSearchBox();
      this.setData({
        inputSearchBox: false
      })
    },

    /**
     * 隐藏所有(城市搜索框 + 搜索picker)
    */
    hideAll: function () {
      this.hideCitySearchBox();
      this.hideSearchBox();
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
    },

    /**
     * 修改选择目的地
    */
    destinationChange: function (e) {
      let { id, city } = e.currentTarget.dataset;
      if (city) {
        let result = app.destinationChange(id, city);
        this.setData({
          destination: result
        })
      }
      this.hideCitySearchBox();
    },

    /**
     * 获取城市搜索框列表
    */
    getCityData: function () {
      this.setData({
        city_data: app.globalData.city_data
      })
    },

    /**
     * 同步globalData数据
    */
    syncGlobalData: function () {
      let that = this;
      app.syncGlobalData(that,app)
    },

    /**
     * 用户点击完成按钮/键盘输入时触发
    */
    inputConfirm: function (e) {
      this.setData({
        isSearching: true,
        isLoading: true
      })
      let keyword = e.detail.value;
      let result = [];
      if (keyword) {
        app.globalData.city_data.forEach((value, i) => {
          if (value.city == keyword || value.country == keyword) {
            result.push(value);
          }
        })
      } else {
        result = app.globalData.city_data
      }
      this.setData({
        city_data: result
      })
      setTimeout(() => {
        this.setData({
          isLoading: false
        })
      }, 1000)
    },

    /**
     * 搜特惠
    */
    toSearch: function(){
      let destination = this.data.destination;
      if (destination !== "输入目的地开始搜索"){
        app.globalData.destination = destination;
        wx.navigateTo({
          url: `/pages/list/list?city=${this.data.destination}`,
          success: (msg)=>{
            this.hideSearchBox();
          },
          fail: function(){}
        })
      }else
        wx.showToast({
          title : '请选择目的地',
          icon : 'loading'
        })
        return;
    }
  }
})
