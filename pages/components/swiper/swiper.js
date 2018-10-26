// pages/components/swiper/swiper.js
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
    picList : []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPicList: function(arr){
      this.setData({
        picList: arr
      })
    }
  }
})
